CREATE TABLE airports(
id integer PRIMARY KEY,
ident text,
type text,
name text,
lat double precision,
long double precision,
elevation_ft integer,
continent text,
iso_country text,
iso_region text,
municipality text,
scheduled_service integer,
gps_code text,
iata_code text,
local_code text,
home_link text,
wikipedia_link text,
keywords text,
score integer,
last_updated text
);

SELECT AddGeometryColumn('airports', 'geometry', 4326, 'POINT', 2);
UPDATE airports SET geometry = ST_SetSRID(ST_MakePoint(long, lat), 4326);