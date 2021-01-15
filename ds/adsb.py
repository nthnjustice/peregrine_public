import numpy as np
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
from geopy import distance


class TABLE:
    def __init__(self, df, name, key):
        self.df = df
        self.name = name
        self.key = key

    def build_sql(self):
        cols = self.df.columns.tolist()
        sql = "CREATE TABLE " + self.name + "(\n"

        for i in cols:
            if i == "geometry":
                continue

            sql += i
            dtype = self.df[i].dtype

            if dtype == "int64" or dtype == "int32":
                sql += " integer"
            elif dtype == "bool":
                sql += " bool"
            elif dtype == "object":
                sql += " text"
            elif dtype == "float64" or dtype == "float32":
                sql += " double precision"

            if i == self.key:
                sql += " PRIMARY KEY"

            sql += ",\n"

        return sql[:-2] + "\n);"


class AIRPORTS:
    def __init__(self):
        self.df = None
        self.buffers = None

    def load_csv(self, path):
        self.df = pd.read_csv(path, low_memory=False)

        geometry = [Point(coords) for coords in zip(self.df["long"], self.df["lat"])]
        crs = {"init": "epsg:4326"}
        self.df = gpd.GeoDataFrame(self.df, geometry=geometry, crs=crs)

    def load_shapefile(self, path):
        self.buffers = gpd.read_file(path)

        self.buffers.drop(columns=["BUFF_DIST", "ORIG_FID"], inplace=True)
        self.buffers.columns = ["id", "ident", "type", "name", "lat", "long", "elevation_ft", "continent",
                                "iso_country", "iso_region", "municipality", "scheduled_service", "gps_code",
                                "iata_code", "local_code", "home_link", "wikipedia_link", "keywords", "score",
                                "last_updated", "geometry"]

    def save_sql(self, path):
        sql = TABLE(self.df, "airports", "id").build_sql()
        sql += "\n\nSELECT AddGeometryColumn('airports', 'geometry', 4326, 'POINT', 2);"
        sql = "{0}\nUPDATE airports SET geometry = ST_SetSRID(ST_MakePoint(long, lat), 4326);".format(sql)

        with open(path, 'w') as file:
            file.write(sql)


class ADSB:
    def __init__(self, airports):
        self.airports = airports.df
        self.buffers = airports.buffers
        self.df = None

    def load_csv(self, path):
        self.df = pd.read_csv(path, low_memory=False).loc[1:2, ]

    def compile(self):
        self.prep_data()
        self.build_features()
        self.clean_data()

    def prep_data(self):
        self.df["altsp"] = self.df.apply(lambda x: x["alt"] if x["altt"] == 0 else np.NaN, axis=1)
        self.df["altmsl"] = self.df.apply(lambda x: x["alt"] if x["altt"] == 1 else np.NaN, axis=1)

        self.df["spdtyp"] = self.df["spdtyp"].replace(np.nan, 0)
        self.df["spdgnd"] = self.df.apply(lambda x: x["spd"] if x["spdtyp"] == 0 else np.NaN, axis=1)
        self.df["spdgndrv"] = self.df.apply(lambda x: x["spd"] if x["spdtyp"] == 1 else np.NaN, axis=1)
        self.df["spdind"] = self.df.apply(lambda x: x["spd"] if x["spdtyp"] == 2 else np.NaN, axis=1)
        self.df["spdtru"] = self.df.apply(lambda x: x["spd"] if x["spdtyp"] == 3 else np.NaN, axis=1)

        self.df["trakgnd"] = self.df.apply(lambda x: x["trak"] if x["trkh"] == 0 else np.NaN, axis=1)
        self.df["trakhead"] = self.df.apply(lambda x: x["trak"] if x["trkh"] == 1 else np.NaN, axis=1)

        self.df["vsibaro"] = self.df.apply(lambda x: x["vsi"] if x["vsit"] == 0 else np.NaN, axis=1)
        self.df["vsigeo"] = self.df.apply(lambda x: x["vsi"] if x["vsit"] == 1 else np.NaN, axis=1)

        self.df["pid"] = range(len(self.df))
        self.df["height"] = np.NaN
        self.df["ongnd"] = np.NaN
        self.df["atairport"] = np.NaN
        self.df["airport"] = np.NaN
        self.df["fid"] = np.NaN

        geometry = [Point(coords) for coords in zip(self.df["long"], self.df["lat"])]
        crs = {"init": "epsg:4326"}
        self.df = gpd.GeoDataFrame(self.df, geometry=geometry, crs=crs)

    def build_features(self):
        for i in range(len(self.df)):
            self.get_height(i)
            self.get_ongnd(i)
            intersects = self.buffers.contains(self.df.loc[i, "geometry"])
            self.get_atairport(i, intersects)
            self.get_airport(i, intersects)

        self.get_fid()

    def get_height(self, i):
        if self.df.loc[i, "altt"] == 0:
            self.df.loc[i, "height"] = self.df.loc[i, "altsp"] - (self.df.loc[i, "RASTERVALU"] * 3.281)
        else:
            self.df.loc[i, "height"] = self.df.loc[i, "altmsl"]

    def get_ongnd(self, i):
        speed = False
        height = False
        vsi = False

        if self.df.loc[i, "spd"] < 175:
            speed = True

        if self.df.loc[i, "height"] <= 500:
            height = True

        if -800 < self.df.loc[i, "vsi"] < 3000:
            vsi = True

        if speed and height and vsi:
            self.df.loc[i, "ongnd"] = True
        else:
            self.df.loc[i, "ongnd"] = False

    def get_atairport(self, i, intersects):
        if self.df.loc[i, "ongnd"] is True and len(intersects[intersects].index) > 0:
            self.df.loc[i, "atairport"] = True
        else:
            self.df.loc[i, "atairport"] = False

    def get_airport(self, i, intersects):
        if self.df.loc[i, "atairport"] is True:
            intersects = self.airports.loc[intersects[intersects].index.values, ]
            index = intersects.distance(self.df.loc[i, "geometry"]).idxmin()
            self.df.loc[i, "airport"] = intersects.loc[index, "ident"]

    def get_fid(self):
        fid = 0

        for icao in self.df["icao"].unique().tolist():
            df = self.df[self.df["icao"] == icao].sort_values("postime", ascending=False)
            pings = []
            pairs = []

            for index, row in df.iterrows():
                pings.append((index, row["postime"], row["ongnd"], row["call"], row["spd"], (row["lat"], row["long"])))

            for i in range(len(pings) - 1):
                p1 = pings[i]
                p2 = pings[i + 1]
                elapsed = (p1[1] - p2[1]) / 3600000
                euclidean = distance.distance(p1[5], p2[5]).km
                pairs.append([(p1[0], p2[0]), (p1[2], p2[2]), (p1[3], p2[3]), elapsed, euclidean])

                if i == 0:
                    spd = p1[4] * 1.852
                    pairs[i].extend([spd, elapsed * spd, euclidean - (elapsed * spd)])

                    if elapsed > 0.25:
                        pairs[i].append((euclidean - (elapsed * spd)) / elapsed)
                elif elapsed == 0:
                    spd = sum([p1[4] * 1.852, pairs[i - 1][5]]) / 2
                    pairs[i].extend([spd, elapsed * spd, euclidean - (elapsed * spd)])
                elif elapsed != 0:
                    spd = sum([euclidean / elapsed, pairs[i - 1][5]]) / 2
                    pairs[i].extend([spd, elapsed * spd, euclidean - (elapsed * spd)])

                    if elapsed > 0.25:
                        pairs[i].append((euclidean - (elapsed * spd)) / elapsed)

            deviation = list(map(lambda x: x[-1], pairs))

            for i in range(len(pairs)):
                pair = pairs[i]
                status = pair[1][0]
                self.df.loc[pair[0][0], "fid"] = fid

                if len(pair) == 9 and pair[-1] < np.percentile(deviation, 10):
                    fid += 1
                    continue

                if pair[1][1] == status:
                    self.df.loc[pair[0][1], "fid"] = fid
                else:
                    for j in range(i + 1, len(pairs)):
                        pair = pairs[j]
                        status = pair[1][0]
                        self.df.loc[pair[0][0], "fid"] = fid
                        self.df.loc[pair[0][1], "fid"] = fid

                        if pair[1][1] != status:
                            fid += 1
                            i = j + 1
                            break

    def clean_data(self):
        self.df.rename(columns={"RASTERVALU": "elevation"}, inplace=True)
        self.df.drop(columns=["OBJECTID"], inplace=True)
        self.df["fid"].fillna(-1, inplace=True)
        self.df["fid"] = self.df["fid"].astype("int64")

    def save_csv(self, path):
        self.df.drop(columns=["geometry"]).to_csv(path, index=False)

    def save_sql(self, path):
        sql = TABLE(self.df, "adsb", "pid").build_sql()
        sql += "\n\nSELECT AddGeometryColumn('adsb', 'geometry', 4326, 'POINT', 2);"
        sql = "{0}\nUPDATE adsb SET geometry = ST_SetSRID(ST_MakePoint(long, lat), 4326);".format(sql)

        with open(path, 'w') as file:
            file.write(sql)


class FLIGHTS:
    def __init__(self, airports, adsb):
        self.airports = airports.df
        self.adsb = adsb.df
        self.df = pd.DataFrame()

    def compile(self):
        print(self.adsb)
        for fid in self.adsb["fid"].unique().tolist():
            if np.isnan(fid) == False:
                df = self.adsb[self.adsb["fid"] == fid].sort_values("postime", ascending=True)
                df.reset_index(inplace=True)

                if len(df) > 1:
                    src = df.loc[0, ]
                    dst = df.loc[len(df) - 1, ]

                    row = {"fid": int(fid), "linestring": self.get_linestring(df), "icao": src["icao"],
                           "ping_src": src["pid"], "ping_dst": dst["pid"],
                           "postime_src": src["postime"], "postime_dst": dst["postime"],
                           "ongnd_src": src["ongnd"], "ongnd_dst": dst["ongnd"],
                           "atairport_src": src["atairport"], "atairport_dst": dst["atairport"],
                           "airport_src": src["airport"], "airport_dst": dst["airport"]}
                    self.df = self.df.append(pd.DataFrame([row]), ignore_index=True)

    @staticmethod
    def get_linestring(df):
        linestring = "LINESTRING("

        for i in range(len(df)):
            linestring += str(df.loc[i, "long"]) + " " + str(df.loc[i, "lat"]) + ", "

        return linestring[:-2] + ")"

    def save_csv(self, path):
        self.df.to_csv(path, index=False)

    def save_sql(self, path):
        sql = TABLE(self.df, "flights", "fid").build_sql()
        sql += "\n\nSELECT AddGeometryColumn('flights', 'geometry', 4326, 'LINESTRING', 2);"
        sql = "{0}\nUPDATE flights SET geometry = ST_SetSRID(ST_GeomFromText(linestring), 4326);".format(sql)

        with open(path, 'w') as file:
            file.write(sql)


airports = AIRPORTS()
airports.load_csv("data/airports/airports.csv")
airports.load_shapefile("data/airports/buffers/10km/airports_10km.shp")
# airports.save_sql("sql/table_airports.sql")

adsb = ADSB(airports)
adsb.load_csv("data/adsb/test_set3_elev.csv")
adsb.compile()
# adsb.save_csv("data/adsb/test_set3_processed.csv")
# adsb.save_sql("sql/table_adsb.sql")

flights = FLIGHTS(airports, adsb)
flights.compile()
# flights.save_csv("data/flights/test_set3_flights.csv")
# flights.save_sql("sql/table_flights.sql")
