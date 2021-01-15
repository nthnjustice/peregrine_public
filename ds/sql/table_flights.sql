CREATE TABLE flights(
airport_dst text,
airport_src text,
atairport_dst bool,
atairport_src bool,
fid integer PRIMARY KEY,
icao text,
linestring text,
ongnd_dst bool,
ongnd_src bool,
ping_dst integer,
ping_src integer,
postime_dst double precision,
postime_src double precision
);

SELECT AddGeometryColumn('flights', 'geometry', 4326, 'LINESTRING', 2);
UPDATE flights SET geometry = ST_SetSRID(ST_GeomFromText(linestring), 4326);