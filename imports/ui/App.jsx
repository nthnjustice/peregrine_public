import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import { useCurrentUser } from 'react-meteor-hooks';

import { Global } from './Global';
import Signin from './Signin';
import Navbar from './Navbar';
import Workbook from './Workbook';
import Map from './Map';
import Table from './Table';

const browserHistory = createBrowserHistory();

Tracker.autorun(() => {
  let path = browserHistory.location.pathname;
  let authenticatedPages = ['/workbook', '/map', '/table'];
  let unauthenticatedPages = ['/'];

  if (authenticatedPages.includes(path) && !Meteor.userId()) {
    browserHistory.replace('/');
  } else if (unauthenticatedPages.includes(path) && Meteor.userId()) {
    browserHistory.replace('/workbook');
  }
});

let flights = {
  "type": "FeatureCollection",
  "features": [
    {
      "id": 0,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -0.461941,
          51.4706
        ]
      },
      "properties": {
        "lat": 51.4706,
        "long": -0.461941,
        "name": "London Heathrow Airport",
        "type": "large_airport",
        "ident": "EGLL",
        "score": 1251675,
        "gps_code": "EGLL",
        "keywords": "LON | Londres",
        "continent": "EU",
        "home_link": "http://www.heathrowairport.com/",
        "iata_code": "LHR",
        "iso_region": "GB-ENG",
        "local_code": "",
        "iso_country": "GB",
        "elevation_ft": 83,
        "last_updated": "2018-09-16T02:32:35+00:00",
        "municipality": "London",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Heathrow_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 1,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -118.4079971,
          33.94250107
        ]
      },
      "properties": {
        "lat": 33.94250107,
        "long": -118.4079971,
        "name": "Los Angeles International Airport",
        "type": "large_airport",
        "ident": "KLAX",
        "score": 1335475,
        "gps_code": "KLAX",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.iflylax.com/",
        "iata_code": "LAX",
        "iso_region": "US-CA",
        "local_code": "LAX",
        "iso_country": "US",
        "elevation_ft": 125,
        "last_updated": "2010-01-23T11:27:55+00:00",
        "municipality": "Los Angeles",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Los_Angeles_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 2,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.77890015,
          40.63980103
        ]
      },
      "properties": {
        "lat": 40.63980103,
        "long": -73.77890015,
        "name": "John F Kennedy International Airport",
        "type": "large_airport",
        "ident": "KJFK",
        "score": 1052075,
        "gps_code": "KJFK",
        "keywords": "Manhattan | New York City | NYC | Idlewild",
        "continent": "NA",
        "home_link": "http://www.panynj.gov/CommutingTravel/airports/html/kennedy.html",
        "iata_code": "JFK",
        "iso_region": "US-NY",
        "local_code": "JFK",
        "iso_country": "US",
        "elevation_ft": 13,
        "last_updated": "2010-01-23T11:27:54+00:00",
        "municipality": "New York",
        "wikipedia_link": "http://en.wikipedia.org/wiki/John_F._Kennedy_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 3,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.9048,
          41.9786
        ]
      },
      "properties": {
        "lat": 41.9786,
        "long": -87.9048,
        "name": "Chicago O'Hare International Airport",
        "type": "large_airport",
        "ident": "KORD",
        "score": 1503175,
        "gps_code": "KORD",
        "keywords": "CHI | Orchard Place",
        "continent": "NA",
        "home_link": "https://www.flychicago.com/ohare/home/pages/default.aspx",
        "iata_code": "ORD",
        "iso_region": "US-IL",
        "local_code": "ORD",
        "iso_country": "US",
        "elevation_ft": 672,
        "last_updated": "2018-09-16T02:35:35+00:00",
        "municipality": "Chicago",
        "wikipedia_link": "http://en.wikipedia.org/wiki/O'Hare_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 4,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -84.428101,
          33.6367
        ]
      },
      "properties": {
        "lat": 33.6367,
        "long": -84.428101,
        "name": "Hartsfield Jackson Atlanta International Airport",
        "type": "large_airport",
        "ident": "KATL",
        "score": 2002475,
        "gps_code": "KATL",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.atlanta-airport.com/",
        "iata_code": "ATL",
        "iso_region": "US-GA",
        "local_code": "ATL",
        "iso_country": "US",
        "elevation_ft": 1026,
        "last_updated": "2018-09-19T14:50:01+00:00",
        "municipality": "Atlanta",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Hartsfield–Jackson_Atlanta_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 5,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.55,
          49.012798
        ]
      },
      "properties": {
        "lat": 49.012798,
        "long": 2.55,
        "name": "Charles de Gaulle International Airport",
        "type": "large_airport",
        "ident": "LFPG",
        "score": 1127475,
        "gps_code": "LFPG",
        "keywords": "PAR | Aéroport Roissy-Charles de Gaulle | Roissy Airport",
        "continent": "EU",
        "home_link": "http://www.aeroportsdeparis.fr/",
        "iata_code": "CDG",
        "iso_region": "FR-J",
        "local_code": "",
        "iso_country": "FR",
        "elevation_ft": 392,
        "last_updated": "2018-09-15T03:23:45+00:00",
        "municipality": "Paris",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Charles_de_Gaulle_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 6,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.76389,
          52.308601
        ]
      },
      "properties": {
        "lat": 52.308601,
        "long": 4.76389,
        "name": "Amsterdam Airport Schiphol",
        "type": "large_airport",
        "ident": "EHAM",
        "score": 1093275,
        "gps_code": "EHAM",
        "keywords": "",
        "continent": "EU",
        "home_link": "http://www.schiphol.nl/",
        "iata_code": "AMS",
        "iso_region": "NL-NH",
        "local_code": "",
        "iso_country": "NL",
        "elevation_ft": -11,
        "last_updated": "2018-09-14T06:20:40+00:00",
        "municipality": "Amsterdam",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Amsterdam_Airport_Schiphol",
        "scheduled_service": 1
      }
    },
    {
      "id": 7,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.375,
          37.6189994812012
        ]
      },
      "properties": {
        "lat": 37.6189994812012,
        "long": -122.375,
        "name": "San Francisco International Airport",
        "type": "large_airport",
        "ident": "KSFO",
        "score": 1112475,
        "gps_code": "KSFO",
        "keywords": "QSF | QBA",
        "continent": "NA",
        "home_link": "http://www.flysfo.com/",
        "iata_code": "SFO",
        "iso_region": "US-CA",
        "local_code": "SFO",
        "iso_country": "US",
        "elevation_ft": 13,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "San Francisco",
        "wikipedia_link": "http://en.wikipedia.org/wiki/San_Francisco_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 8,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.570556,
          50.033333
        ]
      },
      "properties": {
        "lat": 50.033333,
        "long": 8.570556,
        "name": "Frankfurt am Main Airport",
        "type": "large_airport",
        "ident": "EDDF",
        "score": 1144675,
        "gps_code": "EDDF",
        "keywords": "EDAF | Rhein-Main Air Base",
        "continent": "EU",
        "home_link": "http://www.frankfurt-airport.de/",
        "iata_code": "FRA",
        "iso_region": "DE-HE",
        "local_code": "",
        "iso_country": "DE",
        "elevation_ft": 364,
        "last_updated": "2017-06-08T15:45:19+00:00",
        "municipality": "Frankfurt am Main",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Frankfurt_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 9,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -74.168701171875,
          40.6925010681152
        ]
      },
      "properties": {
        "lat": 40.6925010681152,
        "long": -74.168701171875,
        "name": "Newark Liberty International Airport",
        "type": "large_airport",
        "ident": "KEWR",
        "score": 1064475,
        "gps_code": "KEWR",
        "keywords": "Manhattan | New York City | NYC",
        "continent": "NA",
        "home_link": "http://www.panynj.gov/CommutingTravel/airports/html/newarkliberty.html",
        "iata_code": "EWR",
        "iso_region": "US-NJ",
        "local_code": "EWR",
        "iso_country": "US",
        "elevation_ft": 18,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Newark",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Newark_Liberty_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 10,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.038002,
          32.896801
        ]
      },
      "properties": {
        "lat": 32.896801,
        "long": -97.038002,
        "name": "Dallas Fort Worth International Airport",
        "type": "large_airport",
        "ident": "KDFW",
        "score": 1203175,
        "gps_code": "KDFW",
        "keywords": "QDF",
        "continent": "NA",
        "home_link": "https://www.dfwairport.com/",
        "iata_code": "DFW",
        "iso_region": "US-TX",
        "local_code": "DFW",
        "iso_country": "US",
        "elevation_ft": 607,
        "last_updated": "2018-09-19T14:53:02+00:00",
        "municipality": "Dallas-Fort Worth",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Dallas/Fort_Worth_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 11,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -115.1520004,
          36.08010101
        ]
      },
      "properties": {
        "lat": 36.08010101,
        "long": -115.1520004,
        "name": "McCarran International Airport",
        "type": "large_airport",
        "ident": "KLAS",
        "score": 1068475,
        "gps_code": "KLAS",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.mccarran.com/",
        "iata_code": "LAS",
        "iso_region": "US-NV",
        "local_code": "LAS",
        "iso_country": "US",
        "elevation_ft": 2181,
        "last_updated": "2010-07-05T16:48:39+00:00",
        "municipality": "Las Vegas",
        "wikipedia_link": "http://en.wikipedia.org/wiki/McCarran_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 12,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -81.3089981079102,
          28.4293994903564
        ]
      },
      "properties": {
        "lat": 28.4293994903564,
        "long": -81.3089981079102,
        "name": "Orlando International Airport",
        "type": "large_airport",
        "ident": "KMCO",
        "score": 1044075,
        "gps_code": "KMCO",
        "keywords": "Disney World |Epcot Center",
        "continent": "NA",
        "home_link": "http://www.orlandoairports.net/",
        "iata_code": "MCO",
        "iso_region": "US-FL",
        "local_code": "MCO",
        "iso_country": "US",
        "elevation_ft": 96,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Orlando",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Orlando_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 13,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.87259674,
          40.77719879
        ]
      },
      "properties": {
        "lat": 40.77719879,
        "long": -73.87259674,
        "name": "La Guardia Airport",
        "type": "large_airport",
        "ident": "KLGA",
        "score": 1030575,
        "gps_code": "KLGA",
        "keywords": "Manhattan | New York City | NYC | Glenn H. Curtiss Airport | North Beach Airport | La Guardia",
        "continent": "NA",
        "home_link": "http://www.panynj.gov/CommutingTravel/airports/html/laguardia.html",
        "iata_code": "LGA",
        "iso_region": "US-NY",
        "local_code": "LGA",
        "iso_country": "US",
        "elevation_ft": 21,
        "last_updated": "2010-01-23T11:27:55+00:00",
        "municipality": "New York",
        "wikipedia_link": "http://en.wikipedia.org/wiki/LaGuardia_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 14,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -104.672996521,
          39.861698150635
        ]
      },
      "properties": {
        "lat": 39.861698150635,
        "long": -104.672996521,
        "name": "Denver International Airport",
        "type": "large_airport",
        "ident": "KDEN",
        "score": 1103275,
        "gps_code": "KDEN",
        "keywords": "DVX | KVDX",
        "continent": "NA",
        "home_link": "http://www.flydenver.com/",
        "iata_code": "DEN",
        "iso_region": "US-CO",
        "local_code": "DEN",
        "iso_country": "US",
        "elevation_ft": 5431,
        "last_updated": "2015-11-13T09:28:42+00:00",
        "municipality": "Denver",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Denver_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 15,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.45580292,
          38.94449997
        ]
      },
      "properties": {
        "lat": 38.94449997,
        "long": -77.45580292,
        "name": "Washington Dulles International Airport",
        "type": "large_airport",
        "ident": "KIAD",
        "score": 1023875,
        "gps_code": "KIAD",
        "keywords": "WAS",
        "continent": "NA",
        "home_link": "http://www.mwaa.com/dulles/",
        "iata_code": "IAD",
        "iso_region": "US-DC",
        "local_code": "IAD",
        "iso_country": "US",
        "elevation_ft": 312,
        "last_updated": "2010-01-23T11:27:53+00:00",
        "municipality": "Washington",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Washington_Dulles_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 16,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -80.2906036376953,
          25.7931995391846
        ]
      },
      "properties": {
        "lat": 25.7931995391846,
        "long": -80.2906036376953,
        "name": "Miami International Airport",
        "type": "large_airport",
        "ident": "KMIA",
        "score": 1073075,
        "gps_code": "KMIA",
        "keywords": "MFW | South Florida",
        "continent": "NA",
        "home_link": "http://www.miami-airport.com/",
        "iata_code": "MIA",
        "iso_region": "US-FL",
        "local_code": "MIA",
        "iso_country": "US",
        "elevation_ft": 8,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Miami",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Miami_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 17,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -112.012001037598,
          33.4342994689941
        ]
      },
      "properties": {
        "lat": 33.4342994689941,
        "long": -112.012001037598,
        "name": "Phoenix Sky Harbor International Airport",
        "type": "large_airport",
        "ident": "KPHX",
        "score": 1060875,
        "gps_code": "KPHX",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://phoenix.gov/skyharborairport/",
        "iata_code": "PHX",
        "iso_region": "US-AZ",
        "local_code": "PHX",
        "iso_country": "US",
        "elevation_ft": 1135,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Phoenix",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Phoenix_Sky_Harbor_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 18,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.308998,
          47.449001
        ]
      },
      "properties": {
        "lat": 47.449001,
        "long": -122.308998,
        "name": "Seattle Tacoma International Airport",
        "type": "large_airport",
        "ident": "KSEA",
        "score": 1038675,
        "gps_code": "KSEA",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.portseattle.org/seatac/",
        "iata_code": "SEA",
        "iso_region": "US-WA",
        "local_code": "SEA",
        "iso_country": "US",
        "elevation_ft": 433,
        "last_updated": "2018-09-19T14:50:47+00:00",
        "municipality": "Seattle",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Seattle–Tacoma_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 19,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -71.00520325,
          42.36429977
        ]
      },
      "properties": {
        "lat": 42.36429977,
        "long": -71.00520325,
        "name": "General Edward Lawrence Logan International Airport",
        "type": "large_airport",
        "ident": "KBOS",
        "score": 1035875,
        "gps_code": "KBOS",
        "keywords": "General Edward Lawrence Logan International Airport",
        "continent": "NA",
        "home_link": "http://www.massport.com/logan/",
        "iata_code": "BOS",
        "iso_region": "US-MA",
        "local_code": "BOS",
        "iso_country": "US",
        "elevation_ft": 20,
        "last_updated": "2010-01-23T11:27:48+00:00",
        "municipality": "Boston",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Logan_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 20,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -0.190278,
          51.148102
        ]
      },
      "properties": {
        "lat": 51.148102,
        "long": -0.190278,
        "name": "London Gatwick Airport",
        "type": "large_airport",
        "ident": "EGKK",
        "score": 1049275,
        "gps_code": "EGKK",
        "keywords": "LON | Crawley | Charlwood",
        "continent": "EU",
        "home_link": "http://www.gatwickairport.com/",
        "iata_code": "LGW",
        "iso_region": "GB-ENG",
        "local_code": "",
        "iso_country": "GB",
        "elevation_ft": 202,
        "last_updated": "2018-09-15T03:32:04+00:00",
        "municipality": "London",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Gatwick_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 21,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.241096496582,
          39.871898651123
        ]
      },
      "properties": {
        "lat": 39.871898651123,
        "long": -75.241096496582,
        "name": "Philadelphia International Airport",
        "type": "large_airport",
        "ident": "KPHL",
        "score": 1031075,
        "gps_code": "KPHL",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.phl.org/",
        "iata_code": "PHL",
        "iso_region": "US-PA",
        "local_code": "PHL",
        "iso_country": "US",
        "elevation_ft": 36,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Philadelphia",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Philadelphia_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 22,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -95.3414001464844,
          29.9843997955322
        ]
      },
      "properties": {
        "lat": 29.9843997955322,
        "long": -95.3414001464844,
        "name": "George Bush Intercontinental Houston Airport",
        "type": "large_airport",
        "ident": "KIAH",
        "score": 1055675,
        "gps_code": "KIAH",
        "keywords": "QHO",
        "continent": "NA",
        "home_link": "http://www.fly2houston.com/iah",
        "iata_code": "IAH",
        "iso_region": "US-TX",
        "local_code": "IAH",
        "iso_country": "US",
        "elevation_ft": 97,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Houston",
        "wikipedia_link": "http://en.wikipedia.org/wiki/George_Bush_Intercontinental_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 23,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -80.9430999755859,
          35.2140007019043
        ]
      },
      "properties": {
        "lat": 35.2140007019043,
        "long": -80.9430999755859,
        "name": "Charlotte Douglas International Airport",
        "type": "large_airport",
        "ident": "KCLT",
        "score": 1028075,
        "gps_code": "KCLT",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.charlotteairport.com/",
        "iata_code": "CLT",
        "iso_region": "US-NC",
        "local_code": "CLT",
        "iso_country": "US",
        "elevation_ft": 748,
        "last_updated": "2009-01-30T14:52:52+00:00",
        "municipality": "Charlotte",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Charlotte/Douglas_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 24,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -79.6305999756,
          43.6772003174
        ]
      },
      "properties": {
        "lat": 43.6772003174,
        "long": -79.6305999756,
        "name": "Lester B. Pearson International Airport",
        "type": "large_airport",
        "ident": "CYYZ",
        "score": 1040275,
        "gps_code": "CYYZ",
        "keywords": "YTO | Toronto International Airport | Malton",
        "continent": "NA",
        "home_link": "http://www.gtaa.com/",
        "iata_code": "YYZ",
        "iso_region": "CA-ON",
        "local_code": "YYZ",
        "iso_country": "CA",
        "elevation_ft": 569,
        "last_updated": "2009-10-15T13:44:39+00:00",
        "municipality": "Toronto",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Toronto_Pearson_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 25,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -83.353401184082,
          42.2123985290527
        ]
      },
      "properties": {
        "lat": 42.2123985290527,
        "long": -83.353401184082,
        "name": "Detroit Metropolitan Wayne County Airport",
        "type": "large_airport",
        "ident": "KDTW",
        "score": 1079375,
        "gps_code": "KDTW",
        "keywords": "DTT | Detroit Metro Airport",
        "continent": "NA",
        "home_link": "http://www.metroairport.com/",
        "iata_code": "DTW",
        "iso_region": "US-MI",
        "local_code": "DTW",
        "iso_country": "US",
        "elevation_ft": 645,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Detroit",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Detroit_Metropolitan_Wayne_County_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 26,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.037697,
          38.8521
        ]
      },
      "properties": {
        "lat": 38.8521,
        "long": -77.037697,
        "name": "Ronald Reagan Washington National Airport",
        "type": "large_airport",
        "ident": "KDCA",
        "score": 1016175,
        "gps_code": "KDCA",
        "keywords": "WAS",
        "continent": "NA",
        "home_link": "http://www.flyreagan.com/dca/reagan-national-airport",
        "iata_code": "DCA",
        "iso_region": "US-DC",
        "local_code": "DCA",
        "iso_country": "US",
        "elevation_ft": 15,
        "last_updated": "2016-12-13T09:13:00+00:00",
        "municipality": "Washington",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Ronald_Reagan_Washington_National_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 27,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          11.7861,
          48.353802
        ]
      },
      "properties": {
        "lat": 48.353802,
        "long": 11.7861,
        "name": "Munich Airport",
        "type": "large_airport",
        "ident": "EDDM",
        "score": 1026675,
        "gps_code": "EDDM",
        "keywords": "Franz Josef Strauss Airport | Flughafen München Franz Josef Strauß",
        "continent": "EU",
        "home_link": "http://www.munich-airport.com/",
        "iata_code": "MUC",
        "iso_region": "DE-BY",
        "local_code": "",
        "iso_country": "DE",
        "elevation_ft": 1487,
        "last_updated": "2018-09-14T06:19:46+00:00",
        "municipality": "Munich",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Munich_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 28,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.07846,
          41.2971
        ]
      },
      "properties": {
        "lat": 41.2971,
        "long": 2.07846,
        "name": "Barcelona International Airport",
        "type": "large_airport",
        "ident": "LEBL",
        "score": 1020675,
        "gps_code": "LEBL",
        "keywords": "El Prat Airport",
        "continent": "EU",
        "home_link": "http://www.aena.es/en/barcelona-airport/index.html",
        "iata_code": "BCN",
        "iso_region": "ES-CT",
        "local_code": "",
        "iso_country": "ES",
        "elevation_ft": 12,
        "last_updated": "2018-09-15T03:30:02+00:00",
        "municipality": "Barcelona",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Barcelona%E2%80%93El_Prat_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 29,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -93.221802,
          44.882
        ]
      },
      "properties": {
        "lat": 44.882,
        "long": -93.221802,
        "name": "Minneapolis-St Paul International/Wold-Chamberlain Airport",
        "type": "large_airport",
        "ident": "KMSP",
        "score": 1085275,
        "gps_code": "KMSP",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.mspairport.com/",
        "iata_code": "MSP",
        "iso_region": "US-MN",
        "local_code": "MSP",
        "iso_country": "US",
        "elevation_ft": 841,
        "last_updated": "2018-09-19T14:51:47+00:00",
        "municipality": "Minneapolis",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Minneapolis–Saint_Paul_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 30,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.2388889,
          41.8002778
        ]
      },
      "properties": {
        "lat": 41.8002778,
        "long": 12.2388889,
        "name": "Leonardo da Vinci–Fiumicino Airport",
        "type": "large_airport",
        "ident": "LIRF",
        "score": 1031875,
        "gps_code": "LIRF",
        "keywords": "ROM | Rome Fiumicino Airport | Fiumicino Airport",
        "continent": "EU",
        "home_link": "http://www.adr.it/portal/portal/adr/Fiumicino/Leonardo_da_vinci/Header_Window?action=2",
        "iata_code": "FCO",
        "iso_region": "IT-62",
        "local_code": "RM11",
        "iso_country": "IT",
        "elevation_ft": 13,
        "last_updated": "2016-10-08T00:37:02+00:00",
        "municipality": "Rome",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Leonardo_da_Vinci%E2%80%93Fiumicino_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 31,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -3.56264,
          40.471926
        ]
      },
      "properties": {
        "lat": 40.471926,
        "long": -3.56264,
        "name": "Adolfo Suárez Madrid–Barajas Airport",
        "type": "large_airport",
        "ident": "LEMD",
        "score": 1041675,
        "gps_code": "LEMD",
        "keywords": "Leganés | Madrid Barajas International Airport",
        "continent": "EU",
        "home_link": "http://www.aena.es/en/passengers/passengers.html",
        "iata_code": "MAD",
        "iso_region": "ES-M",
        "local_code": "",
        "iso_country": "ES",
        "elevation_ft": 1998,
        "last_updated": "2018-09-13T12:25:48+00:00",
        "municipality": "Madrid",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Adolfo_Su%C3%A1rez_Madrid%E2%80%93Barajas_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 32,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.48443984985,
          50.9014015198
        ]
      },
      "properties": {
        "lat": 50.9014015198,
        "long": 4.48443984985,
        "name": "Brussels Airport",
        "type": "large_airport",
        "ident": "EBBR",
        "score": 1024675,
        "gps_code": "EBBR",
        "keywords": "",
        "continent": "EU",
        "home_link": "http://www.brusselsairport.be/en/",
        "iata_code": "BRU",
        "iso_region": "BE-BRU",
        "local_code": "",
        "iso_country": "BE",
        "elevation_ft": 184,
        "last_updated": "2011-06-29T18:07:02+00:00",
        "municipality": "Brussels",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Brussels_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 33,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.656000137329,
          55.617900848389
        ]
      },
      "properties": {
        "lat": 55.617900848389,
        "long": 12.656000137329,
        "name": "Copenhagen Kastrup Airport",
        "type": "large_airport",
        "ident": "EKCH",
        "score": 1020075,
        "gps_code": "EKCH",
        "keywords": "København | Malmö",
        "continent": "EU",
        "home_link": "http://www.cph.dk/en/",
        "iata_code": "CPH",
        "iso_region": "DK-84",
        "local_code": "",
        "iso_country": "DK",
        "elevation_ft": 17,
        "last_updated": "2015-09-19T15:12:02+00:00",
        "municipality": "Copenhagen",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Copenhagen_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 34,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.54917,
          47.464699
        ]
      },
      "properties": {
        "lat": 47.464699,
        "long": 8.54917,
        "name": "Zürich Airport",
        "type": "large_airport",
        "ident": "LSZH",
        "score": 1025475,
        "gps_code": "LSZH",
        "keywords": "",
        "continent": "EU",
        "home_link": "http://www.zurich-airport.com/",
        "iata_code": "ZRH",
        "iso_region": "CH-ZH",
        "local_code": "",
        "iso_country": "CH",
        "elevation_ft": 1416,
        "last_updated": "2018-09-21T03:05:35+00:00",
        "municipality": "Zurich",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Zurich_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 35,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -117.190002441,
          32.7336006165
        ]
      },
      "properties": {
        "lat": 32.7336006165,
        "long": -117.190002441,
        "name": "San Diego International Airport",
        "type": "large_airport",
        "ident": "KSAN",
        "score": 1017175,
        "gps_code": "KSAN",
        "keywords": "Lindbergh Field",
        "continent": "NA",
        "home_link": "http://www.san.org/",
        "iata_code": "SAN",
        "iso_region": "US-CA",
        "local_code": "SAN",
        "iso_country": "US",
        "elevation_ft": 17,
        "last_updated": "2014-12-10T01:00:52+00:00",
        "municipality": "San Diego",
        "wikipedia_link": "http://en.wikipedia.org/wiki/San_Diego_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 36,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -80.152702,
          26.072599
        ]
      },
      "properties": {
        "lat": 26.072599,
        "long": -80.152702,
        "name": "Fort Lauderdale Hollywood International Airport",
        "type": "large_airport",
        "ident": "KFLL",
        "score": 1015275,
        "gps_code": "KFLL",
        "keywords": "MFW | South Florida",
        "continent": "NA",
        "home_link": "http://www.broward.org/airport",
        "iata_code": "FLL",
        "iso_region": "US-FL",
        "local_code": "FLL",
        "iso_country": "US",
        "elevation_ft": 9,
        "last_updated": "2018-09-16T02:40:06+00:00",
        "municipality": "Fort Lauderdale",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Fort_Lauderdale–Hollywood_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 37,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -111.977996826172,
          40.7883987426758
        ]
      },
      "properties": {
        "lat": 40.7883987426758,
        "long": -111.977996826172,
        "name": "Salt Lake City International Airport",
        "type": "large_airport",
        "ident": "KSLC",
        "score": 1025075,
        "gps_code": "KSLC",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "SLC",
        "iso_region": "US-UT",
        "local_code": "SLC",
        "iso_country": "US",
        "elevation_ft": 4227,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Salt Lake City",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Salt_Lake_City_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 38,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.668297,
          39.1754
        ]
      },
      "properties": {
        "lat": 39.1754,
        "long": -76.668297,
        "name": "Baltimore/Washington International Thurgood Marshall Airport",
        "type": "large_airport",
        "ident": "KBWI",
        "score": 1021075,
        "gps_code": "KBWI",
        "keywords": "WAS",
        "continent": "NA",
        "home_link": "https://www.bwiairport.com/",
        "iata_code": "BWI",
        "iso_region": "US-MD",
        "local_code": "BWI",
        "iso_country": "US",
        "elevation_ft": 146,
        "last_updated": "2018-09-16T02:37:47+00:00",
        "municipality": "Baltimore",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Baltimore%E2%80%93Washington_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 39,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.752403,
          41.785999
        ]
      },
      "properties": {
        "lat": 41.785999,
        "long": -87.752403,
        "name": "Chicago Midway International Airport",
        "type": "large_airport",
        "ident": "KMDW",
        "score": 1015475,
        "gps_code": "KMDW",
        "keywords": "CHI",
        "continent": "NA",
        "home_link": "https://www.flychicago.com/midway/home/pages/default.aspx",
        "iata_code": "MDW",
        "iso_region": "US-IL",
        "local_code": "MDW",
        "iso_country": "US",
        "elevation_ft": 620,
        "last_updated": "2018-09-16T02:34:32+00:00",
        "municipality": "Chicago",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Midway_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 40,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -6.27007,
          53.421299
        ]
      },
      "properties": {
        "lat": 53.421299,
        "long": -6.27007,
        "name": "Dublin Airport",
        "type": "large_airport",
        "ident": "EIDW",
        "score": 1014475,
        "gps_code": "EIDW",
        "keywords": "Aerfort Bhaile Átha Cliath",
        "continent": "EU",
        "home_link": "http://www.dublinairport.com/",
        "iata_code": "DUB",
        "iso_region": "IE-D",
        "local_code": "",
        "iso_country": "IE",
        "elevation_ft": 242,
        "last_updated": "2018-07-19T09:23:39+00:00",
        "municipality": "Dublin",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Dublin_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 41,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          103.994003,
          1.35019
        ]
      },
      "properties": {
        "lat": 1.35019,
        "long": 103.994003,
        "name": "Singapore Changi Airport",
        "type": "large_airport",
        "ident": "WSSS",
        "score": 1034575,
        "gps_code": "WSSS",
        "keywords": "",
        "continent": "AS",
        "home_link": "http://www.changiairport.com/",
        "iata_code": "SIN",
        "iso_region": "SG-04",
        "local_code": "",
        "iso_country": "SG",
        "elevation_ft": 22,
        "last_updated": "2016-12-24T14:43:39+00:00",
        "municipality": "Singapore",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Singapore_Changi_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 42,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -123.183998108,
          49.193901062
        ]
      },
      "properties": {
        "lat": 49.193901062,
        "long": -123.183998108,
        "name": "Vancouver International Airport",
        "type": "large_airport",
        "ident": "CYVR",
        "score": 1018875,
        "gps_code": "CYVR",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.yvr.ca/",
        "iata_code": "YVR",
        "iso_region": "CA-BC",
        "local_code": "",
        "iso_country": "CA",
        "elevation_ft": 14,
        "last_updated": "2013-07-22T11:09:16+00:00",
        "municipality": "Vancouver",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Vancouver_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 43,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          16.569700241089,
          48.110298156738
        ]
      },
      "properties": {
        "lat": 48.110298156738,
        "long": 16.569700241089,
        "name": "Vienna International Airport",
        "type": "large_airport",
        "ident": "LOWW",
        "score": 1013675,
        "gps_code": "LOWW",
        "keywords": "",
        "continent": "EU",
        "home_link": "http://www.viennaairport.com/en/",
        "iata_code": "VIE",
        "iso_region": "AT-9",
        "local_code": "",
        "iso_country": "AT",
        "elevation_ft": 600,
        "last_updated": "2015-08-08T12:17:38+00:00",
        "municipality": "Vienna",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Vienna_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 44,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -90.370003,
          38.748697
        ]
      },
      "properties": {
        "lat": 38.748697,
        "long": -90.370003,
        "name": "St Louis Lambert International Airport",
        "type": "large_airport",
        "ident": "KSTL",
        "score": 1047075,
        "gps_code": "KSTL",
        "keywords": "Lambert St Louis",
        "continent": "NA",
        "home_link": "https://www.flystl.com/",
        "iata_code": "STL",
        "iso_region": "US-MO",
        "local_code": "STL",
        "iso_country": "US",
        "elevation_ft": 618,
        "last_updated": "2018-09-21T03:04:43+00:00",
        "municipality": "St Louis",
        "wikipedia_link": "https://en.wikipedia.org/wiki/St._Louis_Lambert_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 45,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          140.386001587,
          35.7647018433
        ]
      },
      "properties": {
        "lat": 35.7647018433,
        "long": 140.386001587,
        "name": "Narita International Airport",
        "type": "large_airport",
        "ident": "RJAA",
        "score": 1033675,
        "gps_code": "RJAA",
        "keywords": "TYO | Tokyo Narita Airport | New Tokyo International Airport",
        "continent": "AS",
        "home_link": "",
        "iata_code": "NRT",
        "iso_region": "JP-12",
        "local_code": "",
        "iso_country": "JP",
        "elevation_ft": 141,
        "last_updated": "2015-01-23T13:00:50+00:00",
        "municipality": "Tokyo",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Narita_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 46,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -157.924228,
          21.32062
        ]
      },
      "properties": {
        "lat": 21.32062,
        "long": -157.924228,
        "name": "Daniel K Inouye International Airport",
        "type": "large_airport",
        "ident": "PHNL",
        "score": 1029375,
        "gps_code": "PHNL",
        "keywords": "Hickam Air Force Base | HIK | PHIK | KHNL | Honolulu International",
        "continent": "NA",
        "home_link": "http://airports.hawaii.gov/hnl/",
        "iata_code": "HNL",
        "iso_region": "US-HI",
        "local_code": "HNL",
        "iso_country": "US",
        "elevation_ft": 13,
        "last_updated": "2018-09-16T02:42:33+00:00",
        "municipality": "Honolulu",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Daniel_K._Inouye_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 72,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -89.9766998291016,
          35.0424003601074
        ]
      },
      "properties": {
        "lat": 35.0424003601074,
        "long": -89.9766998291016,
        "name": "Memphis International Airport",
        "type": "large_airport",
        "ident": "KMEM",
        "score": 1014475,
        "gps_code": "KMEM",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "MEM",
        "iso_region": "US-TN",
        "local_code": "MEM",
        "iso_country": "US",
        "elevation_ft": 341,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Memphis",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Memphis_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 47,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.7407989502,
          45.4706001282
        ]
      },
      "properties": {
        "lat": 45.4706001282,
        "long": -73.7407989502,
        "name": "Montreal / Pierre Elliott Trudeau International Airport",
        "type": "large_airport",
        "ident": "CYUL",
        "score": 51875,
        "gps_code": "CYUL",
        "keywords": "YMQ | Dorval Airport",
        "continent": "NA",
        "home_link": "http://www.admtl.com/passager/Home.aspx",
        "iata_code": "YUL",
        "iso_region": "CA-QC",
        "local_code": "YUL",
        "iso_country": "CA",
        "elevation_ft": 118,
        "last_updated": "2014-03-16T22:14:44+00:00",
        "municipality": "Montréal",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Montr%C3%A9al-Pierre_Elliott_Trudeau_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 48,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          55.3643989563,
          25.2527999878
        ]
      },
      "properties": {
        "lat": 25.2527999878,
        "long": 55.3643989563,
        "name": "Dubai International Airport",
        "type": "large_airport",
        "ident": "OMDB",
        "score": 1013675,
        "gps_code": "OMDB",
        "keywords": "<U+0645><U+0637><U+0627><U+0631> <U+062F><U+0628><U+064A> <U+0627><U+0644><U+062F><U+0648><U+0644><U+064A><U+200E>",
        "continent": "AS",
        "home_link": "http://www.dubaiairport.com/dia/english/home/",
        "iata_code": "DXB",
        "iso_region": "AE-DU",
        "local_code": "",
        "iso_country": "AE",
        "elevation_ft": 62,
        "last_updated": "2013-05-04T06:01:33+00:00",
        "municipality": "Dubai",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Dubai_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 49,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          0.234999999404,
          51.8849983215
        ]
      },
      "properties": {
        "lat": 51.8849983215,
        "long": 0.234999999404,
        "name": "London Stansted Airport",
        "type": "large_airport",
        "ident": "EGSS",
        "score": 1012275,
        "gps_code": "EGSS",
        "keywords": "LON",
        "continent": "EU",
        "home_link": "http://www.stanstedairport.com/",
        "iata_code": "STN",
        "iso_region": "GB-ENG",
        "local_code": "",
        "iso_country": "GB",
        "elevation_ft": 348,
        "last_updated": "2012-11-12T18:56:40+00:00",
        "municipality": "London",
        "wikipedia_link": "http://en.wikipedia.org/wiki/London_Stansted_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 50,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          14.26,
          50.1008
        ]
      },
      "properties": {
        "lat": 50.1008,
        "long": 14.26,
        "name": "Václav Havel Airport Prague",
        "type": "large_airport",
        "ident": "LKPR",
        "score": 51475,
        "gps_code": "LKPR",
        "keywords": "Letište Praha-Ruzyne | Ruzyne International Airport | Letište Václava Havla Praha",
        "continent": "EU",
        "home_link": "http://www.prg.aero",
        "iata_code": "PRG",
        "iso_region": "CZ-PR",
        "local_code": "",
        "iso_country": "CZ",
        "elevation_ft": 1247,
        "last_updated": "2016-10-16T16:24:57+00:00",
        "municipality": "Prague",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Ruzyn%C4%9B_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 51,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          113.915001,
          22.308901
        ]
      },
      "properties": {
        "lat": 22.308901,
        "long": 113.915001,
        "name": "Hong Kong International Airport",
        "type": "large_airport",
        "ident": "VHHH",
        "score": 1044675,
        "gps_code": "VHHH",
        "keywords": "Chek Lap Kok Airport | <U+8D64><U+9C72><U+89D2><U+6A5F><U+5834>",
        "continent": "AS",
        "home_link": "http://www.hongkongairport.com/",
        "iata_code": "HKG",
        "iso_region": "HK-U-A",
        "local_code": "",
        "iso_country": "HK",
        "elevation_ft": 28,
        "last_updated": "2018-09-15T13:33:37+00:00",
        "municipality": "Hong Kong",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Hong_Kong_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 52,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.5979996,
          45.58869934
        ]
      },
      "properties": {
        "lat": 45.58869934,
        "long": -122.5979996,
        "name": "Portland International Airport",
        "type": "large_airport",
        "ident": "KPDX",
        "score": 1015775,
        "gps_code": "KPDX",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "PDX",
        "iso_region": "US-OR",
        "local_code": "PDX",
        "iso_country": "US",
        "elevation_ft": 31,
        "last_updated": "2010-01-23T11:28:03+00:00",
        "municipality": "Portland",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Portland_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 53,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          17.918600082397,
          59.651901245117
        ]
      },
      "properties": {
        "lat": 59.651901245117,
        "long": 17.918600082397,
        "name": "Stockholm-Arlanda Airport",
        "type": "large_airport",
        "ident": "ESSA",
        "score": 1019975,
        "gps_code": "ESSA",
        "keywords": "",
        "continent": "EU",
        "home_link": "http://www.swedavia.se/arlanda/",
        "iata_code": "ARN",
        "iso_region": "SE-AB",
        "local_code": "",
        "iso_country": "SE",
        "elevation_ft": 137,
        "last_updated": "2015-07-28T21:54:56+00:00",
        "municipality": "Stockholm",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Stockholm-Arlanda_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 54,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          151.177001953125,
          -33.9460983276367
        ]
      },
      "properties": {
        "lat": -33.9460983276367,
        "long": 151.177001953125,
        "name": "Sydney Kingsford Smith International Airport",
        "type": "large_airport",
        "ident": "YSSY",
        "score": 1027975,
        "gps_code": "YSSY",
        "keywords": "RAAF Station Mascot",
        "continent": "OC",
        "home_link": "http://www.sydneyairport.com.au/",
        "iata_code": "SYD",
        "iso_region": "AU-NSW",
        "local_code": "",
        "iso_country": "AU",
        "elevation_ft": 21,
        "last_updated": "2008-06-26T14:52:34+00:00",
        "municipality": "Sydney",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Kingsford_Smith_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 55,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -82.533203125,
          27.9755001068115
        ]
      },
      "properties": {
        "lat": 27.9755001068115,
        "long": -82.533203125,
        "name": "Tampa International Airport",
        "type": "large_airport",
        "ident": "KTPA",
        "score": 1017475,
        "gps_code": "KTPA",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "TPA",
        "iso_region": "US-FL",
        "local_code": "TPA",
        "iso_country": "US",
        "elevation_ft": 26,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Tampa",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Tampa_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 56,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -9.13592,
          38.7813
        ]
      },
      "properties": {
        "lat": 38.7813,
        "long": -9.13592,
        "name": "Humberto Delgado Airport (Lisbon Portela Airport)",
        "type": "large_airport",
        "ident": "LPPT",
        "score": 1011275,
        "gps_code": "LPPT",
        "keywords": "Lisboa",
        "continent": "EU",
        "home_link": "http://www.ana.pt/en-US/Aeroportos/lisboa/Lisboa/Pages/HomeLisboa.aspx",
        "iata_code": "LIS",
        "iso_region": "PT-11",
        "local_code": "",
        "iso_country": "PT",
        "elevation_ft": 374,
        "last_updated": "2018-03-17T17:43:44+00:00",
        "municipality": "Lisbon",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Lisbon_Portela_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 57,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          28.8146,
          40.976898
        ]
      },
      "properties": {
        "lat": 40.976898,
        "long": 28.8146,
        "name": "Atatürk International Airport",
        "type": "large_airport",
        "ident": "LTBA",
        "score": 1015875,
        "gps_code": "LTBA",
        "keywords": "Ataturk | Yesilköy | Yesilkoy",
        "continent": "AS",
        "home_link": "http://www.ataturkairport.com/eng/",
        "iata_code": "ISL",
        "iso_region": "TR-34",
        "local_code": "",
        "iso_country": "TR",
        "elevation_ft": 163,
        "last_updated": "2019-04-14T22:13:30+00:00",
        "municipality": "Istanbul",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Atat%C3%BCrk_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 58,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -84.6678009033,
          39.0488014221
        ]
      },
      "properties": {
        "lat": 39.0488014221,
        "long": -84.6678009033,
        "name": "Cincinnati Northern Kentucky International Airport",
        "type": "large_airport",
        "ident": "KCVG",
        "score": 1029475,
        "gps_code": "KCVG",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "CVG",
        "iso_region": "US-KY",
        "local_code": "CVG",
        "iso_country": "US",
        "elevation_ft": 896,
        "last_updated": "2010-09-23T09:14:54+00:00",
        "municipality": "Cincinnati",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Cincinnati/Northern_Kentucky_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 59,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -90.2580032348633,
          29.9934005737305
        ]
      },
      "properties": {
        "lat": 29.9934005737305,
        "long": -90.2580032348633,
        "name": "Louis Armstrong New Orleans International Airport",
        "type": "large_airport",
        "ident": "KMSY",
        "score": 1012575,
        "gps_code": "KMSY",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "MSY",
        "iso_region": "US-LA",
        "local_code": "MSY",
        "iso_country": "US",
        "elevation_ft": 4,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "New Orleans",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Louis_Armstrong_New_Orleans_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 60,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          13.2877,
          52.5597
        ]
      },
      "properties": {
        "lat": 52.5597,
        "long": 13.2877,
        "name": "Berlin-Tegel Airport",
        "type": "large_airport",
        "ident": "EDDT",
        "score": 1012675,
        "gps_code": "EDDT",
        "keywords": "BER | Otto Lilienthal",
        "continent": "EU",
        "home_link": "http://www.berlin-airport.de/en/travellers-txl/index.php",
        "iata_code": "TXL",
        "iso_region": "DE-BE",
        "local_code": "",
        "iso_country": "DE",
        "elevation_ft": 122,
        "last_updated": "2018-09-21T03:06:36+00:00",
        "municipality": "Berlin",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Berlin_Tegel_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 61,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          100.747001647949,
          13.6810998916626
        ]
      },
      "properties": {
        "lat": 13.6810998916626,
        "long": 100.747001647949,
        "name": "Suvarnabhumi Airport",
        "type": "large_airport",
        "ident": "VTBS",
        "score": 51150,
        "gps_code": "VTBS",
        "keywords": "",
        "continent": "AS",
        "home_link": "",
        "iata_code": "BKK",
        "iso_region": "TH-10",
        "local_code": "",
        "iso_country": "TH",
        "elevation_ft": 5,
        "last_updated": "2009-01-29T16:23:22+00:00",
        "municipality": "Bangkok",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Suvarnabhumi_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 62,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -86.6781997680664,
          36.1245002746582
        ]
      },
      "properties": {
        "lat": 36.1245002746582,
        "long": -86.6781997680664,
        "name": "Nashville International Airport",
        "type": "large_airport",
        "ident": "KBNA",
        "score": 52075,
        "gps_code": "KBNA",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "BNA",
        "iso_region": "US-TN",
        "local_code": "BNA",
        "iso_country": "US",
        "elevation_ft": 599,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Nashville",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Nashville_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 63,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -80.23290253,
          40.49150085
        ]
      },
      "properties": {
        "lat": 40.49150085,
        "long": -80.23290253,
        "name": "Pittsburgh International Airport",
        "type": "large_airport",
        "ident": "KPIT",
        "score": 1021875,
        "gps_code": "KPIT",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "PIT",
        "iso_region": "US-PA",
        "local_code": "PIT",
        "iso_country": "US",
        "elevation_ft": 1203,
        "last_updated": "2010-01-23T11:28:03+00:00",
        "municipality": "Pittsburgh",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Pittsburgh_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 64,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.72811,
          45.6306
        ]
      },
      "properties": {
        "lat": 45.6306,
        "long": 8.72811,
        "name": "Malpensa International Airport",
        "type": "large_airport",
        "ident": "LIMC",
        "score": 1019475,
        "gps_code": "LIMC",
        "keywords": "MIL",
        "continent": "EU",
        "home_link": "http://www.sea-aeroportimilano.it/en/malpensa/index.phtml",
        "iata_code": "MXP",
        "iso_region": "IT-25",
        "local_code": "MI12",
        "iso_country": "IT",
        "elevation_ft": 768,
        "last_updated": "2019-09-26T01:44:19+00:00",
        "municipality": "Milan",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Malpensa_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 65,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.221001,
          37.721298
        ]
      },
      "properties": {
        "lat": 37.721298,
        "long": -122.221001,
        "name": "Metropolitan Oakland International Airport",
        "type": "large_airport",
        "ident": "KOAK",
        "score": 1012475,
        "gps_code": "KOAK",
        "keywords": "QSF | QBA",
        "continent": "NA",
        "home_link": "http://www.oaklandairport.com/",
        "iata_code": "OAK",
        "iso_region": "US-CA",
        "local_code": "OAK",
        "iso_country": "US",
        "elevation_ft": 9,
        "last_updated": "2017-05-27T22:59:41+00:00",
        "municipality": "Oakland",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Oakland_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 66,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -121.929001,
          37.362598
        ]
      },
      "properties": {
        "lat": 37.362598,
        "long": -121.929001,
        "name": "Norman Y. Mineta San Jose International Airport",
        "type": "large_airport",
        "ident": "KSJC",
        "score": 1014275,
        "gps_code": "KSJC",
        "keywords": "QSF | QBA",
        "continent": "NA",
        "home_link": "http://www.flysanjose.com/",
        "iata_code": "SJC",
        "iso_region": "US-CA",
        "local_code": "SJC",
        "iso_country": "US",
        "elevation_ft": 62,
        "last_updated": "2017-05-27T23:04:55+00:00",
        "municipality": "San Jose",
        "wikipedia_link": "http://en.wikipedia.org/wiki/San_Jose_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 67,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          11.100399971008,
          60.193901062012
        ]
      },
      "properties": {
        "lat": 60.193901062012,
        "long": 11.100399971008,
        "name": "Oslo Gardermoen Airport",
        "type": "large_airport",
        "ident": "ENGM",
        "score": 1015675,
        "gps_code": "ENGM",
        "keywords": "",
        "continent": "EU",
        "home_link": "https://avinor.no/en/airport/oslo-airport",
        "iata_code": "OSL",
        "iso_region": "NO-02",
        "local_code": "",
        "iso_country": "NO",
        "elevation_ft": 681,
        "last_updated": "2015-08-14T11:43:32+00:00",
        "municipality": "Oslo",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Oslo_Airport |_Gardermoen",
        "scheduled_service": 1
      }
    },
    {
      "id": 68,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -78.7874984741211,
          35.8776016235352
        ]
      },
      "properties": {
        "lat": 35.8776016235352,
        "long": -78.7874984741211,
        "name": "Raleigh Durham International Airport",
        "type": "large_airport",
        "ident": "KRDU",
        "score": 1011675,
        "gps_code": "KRDU",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "RDU",
        "iso_region": "US-NC",
        "local_code": "RDU",
        "iso_country": "US",
        "elevation_ft": 435,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Raleigh/Durham",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Raleigh-Durham_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 69,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          19.261093,
          47.42976
        ]
      },
      "properties": {
        "lat": 47.42976,
        "long": 19.261093,
        "name": "Budapest Liszt Ferenc International Airport",
        "type": "large_airport",
        "ident": "LHBP",
        "score": 51675,
        "gps_code": "LHBP",
        "keywords": "Ferihegyi nemzetközi repülotér | Budapest Liszt Ferenc international Airport",
        "continent": "EU",
        "home_link": "http://www.bud.hu/english",
        "iata_code": "BUD",
        "iso_region": "HU-PE",
        "local_code": "",
        "iso_country": "HU",
        "elevation_ft": 495,
        "last_updated": "2018-10-09T00:04:01+00:00",
        "municipality": "Budapest",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Budapest_Ferenc_Liszt_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 70,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -97.6698989868164,
          30.1944999694824
        ]
      },
      "properties": {
        "lat": 30.1944999694824,
        "long": -97.6698989868164,
        "name": "Austin Bergstrom International Airport",
        "type": "large_airport",
        "ident": "KAUS",
        "score": 51675,
        "gps_code": "KAUS",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.ci.austin.tx.us/austinairport/",
        "iata_code": "AUS",
        "iso_region": "US-TX",
        "local_code": "AUS",
        "iso_country": "US",
        "elevation_ft": 542,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Austin",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Austin-Bergstrom_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 71,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -86.8770980835,
          21.0365009308
        ]
      },
      "properties": {
        "lat": 21.0365009308,
        "long": -86.8770980835,
        "name": "Cancún International Airport",
        "type": "large_airport",
        "ident": "MMUN",
        "score": 51150,
        "gps_code": "MMUN",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.asur.com.mx/asur/ingles/aeropuertos/cancun/cancun.asp",
        "iata_code": "CUN",
        "iso_region": "MX-ROO",
        "local_code": "",
        "iso_country": "MX",
        "elevation_ft": 22,
        "last_updated": "2011-06-13T12:26:12+00:00",
        "municipality": "Cancún",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Canc%C3%BAn_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 73,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          23.9444999695,
          37.9364013672
        ]
      },
      "properties": {
        "lat": 37.9364013672,
        "long": 23.9444999695,
        "name": "Eleftherios Venizelos International Airport",
        "type": "large_airport",
        "ident": "LGAV",
        "score": 51600,
        "gps_code": "LGAV",
        "keywords": "",
        "continent": "EU",
        "home_link": "http://www.aia.gr",
        "iata_code": "ATH",
        "iso_region": "GR-A1",
        "local_code": "",
        "iso_country": "GR",
        "elevation_ft": 308,
        "last_updated": "2013-11-08T08:51:37+00:00",
        "municipality": "Athens",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Athens_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 74,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.3794444,
          48.7233333
        ]
      },
      "properties": {
        "lat": 48.7233333,
        "long": 2.3794444,
        "name": "Paris-Orly Airport",
        "type": "large_airport",
        "ident": "LFPO",
        "score": 1032775,
        "gps_code": "LFPO",
        "keywords": "PAR",
        "continent": "EU",
        "home_link": "",
        "iata_code": "ORY",
        "iso_region": "FR-J",
        "local_code": "",
        "iso_country": "FR",
        "elevation_ft": 291,
        "last_updated": "2016-10-02T05:09:17+00:00",
        "municipality": "Paris",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Orly_Airport_(Paris)",
        "scheduled_service": 1
      }
    },
    {
      "id": 75,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          6.10895013809204,
          46.2380981445312
        ]
      },
      "properties": {
        "lat": 46.2380981445312,
        "long": 6.10895013809204,
        "name": "Geneva Cointrin International Airport",
        "type": "large_airport",
        "ident": "LSGG",
        "score": 51275,
        "gps_code": "LSGG",
        "keywords": "",
        "continent": "EU",
        "home_link": "http://www.gva.ch/",
        "iata_code": "GVA",
        "iso_region": "CH-GE",
        "local_code": "",
        "iso_country": "CH",
        "elevation_ft": 1411,
        "last_updated": "2009-01-30T17:54:37+00:00",
        "municipality": "Geneva",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Geneva_Cointrin_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 76,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -94.713898,
          39.2976
        ]
      },
      "properties": {
        "lat": 39.2976,
        "long": -94.713898,
        "name": "Kansas City International Airport",
        "type": "large_airport",
        "ident": "KMCI",
        "score": 1015075,
        "gps_code": "KMCI",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.flykci.com/",
        "iata_code": "MCI",
        "iso_region": "US-MO",
        "local_code": "MCI",
        "iso_country": "US",
        "elevation_ft": 1026,
        "last_updated": "2016-05-31T09:33:29+00:00",
        "municipality": "Kansas City",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Kansas_City_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 77,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -98.4698028564453,
          29.5337009429932
        ]
      },
      "properties": {
        "lat": 29.5337009429932,
        "long": -98.4698028564453,
        "name": "San Antonio International Airport",
        "type": "large_airport",
        "ident": "KSAT",
        "score": 1475,
        "gps_code": "KSAT",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "SAT",
        "iso_region": "US-TX",
        "local_code": "SAT",
        "iso_country": "US",
        "elevation_ft": 809,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "San Antonio",
        "wikipedia_link": "http://en.wikipedia.org/wiki/San_Antonio_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 78,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -2.27495002746582,
          53.3536987304688
        ]
      },
      "properties": {
        "lat": 53.3536987304688,
        "long": -2.27495002746582,
        "name": "Manchester Airport",
        "type": "large_airport",
        "ident": "EGCC",
        "score": 1020475,
        "gps_code": "EGCC",
        "keywords": "Ringway Airport | RAF Ringway",
        "continent": "EU",
        "home_link": "http://www.manchesterairport.co.uk/",
        "iata_code": "MAN",
        "iso_region": "GB-ENG",
        "local_code": "",
        "iso_country": "GB",
        "elevation_ft": 257,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Manchester",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Manchester_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 79,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          6.76678,
          51.289501
        ]
      },
      "properties": {
        "lat": 51.289501,
        "long": 6.76678,
        "name": "Düsseldorf Airport",
        "type": "large_airport",
        "ident": "EDDL",
        "score": 1017675,
        "gps_code": "EDDL",
        "keywords": "",
        "continent": "EU",
        "home_link": "http://www.dus.com/dus_en/",
        "iata_code": "DUS",
        "iso_region": "DE-NW",
        "local_code": "",
        "iso_country": "DE",
        "elevation_ft": 147,
        "last_updated": "2017-06-08T15:44:10+00:00",
        "municipality": "Düsseldorf",
        "wikipedia_link": "http://en.wikipedia.org/wiki/D%C3%BCsseldorf_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 80,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -95.27890015,
          29.64539909
        ]
      },
      "properties": {
        "lat": 29.64539909,
        "long": -95.27890015,
        "name": "William P Hobby Airport",
        "type": "large_airport",
        "ident": "KHOU",
        "score": 1011575,
        "gps_code": "KHOU",
        "keywords": "QHO",
        "continent": "NA",
        "home_link": "http://www.fly2houston.com/hobbyHome",
        "iata_code": "HOU",
        "iso_region": "US-TX",
        "local_code": "HOU",
        "iso_country": "US",
        "elevation_ft": 46,
        "last_updated": "2010-01-23T11:27:52+00:00",
        "municipality": "Houston",
        "wikipedia_link": "http://en.wikipedia.org/wiki/William_P._Hobby_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 81,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          24.963300704956,
          60.317199707031
        ]
      },
      "properties": {
        "lat": 60.317199707031,
        "long": 24.963300704956,
        "name": "Helsinki Vantaa Airport",
        "type": "large_airport",
        "ident": "EFHK",
        "score": 51875,
        "gps_code": "EFHK",
        "keywords": "",
        "continent": "EU",
        "home_link": "http://www.finavia.fi/en/helsinki-airport",
        "iata_code": "HEL",
        "iso_region": "FI-ES",
        "local_code": "",
        "iso_country": "FI",
        "elevation_ft": 179,
        "last_updated": "2015-07-30T15:00:21+00:00",
        "municipality": "Helsinki",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Helsinki-Vantaa_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 82,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          116.584999084473,
          40.0801010131836
        ]
      },
      "properties": {
        "lat": 40.0801010131836,
        "long": 116.584999084473,
        "name": "Beijing Capital International Airport",
        "type": "large_airport",
        "ident": "ZBAA",
        "score": 1021575,
        "gps_code": "ZBAA",
        "keywords": "BJS | Bejing | Peking | Olympics",
        "continent": "AS",
        "home_link": "http://en.bcia.com.cn/",
        "iata_code": "PEK",
        "iso_region": "CN-11",
        "local_code": "",
        "iso_country": "CN",
        "elevation_ft": 116,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Beijing",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Beijing_Capital_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 4363,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          6.7875,
          49.863888
        ]
      },
      "properties": {
        "lat": 49.863888,
        "long": 6.7875,
        "name": "Trier-Föhren Airport",
        "type": "small_airport",
        "ident": "EDRT",
        "score": 50,
        "gps_code": "EDRT",
        "keywords": "",
        "continent": "EU",
        "home_link": "",
        "iata_code": "",
        "iso_region": "DE-RP",
        "local_code": "",
        "iso_country": "DE",
        "elevation_ft": 666,
        "last_updated": "2017-02-22T16:51:56+00:00",
        "municipality": "Trier",
        "wikipedia_link": "",
        "scheduled_service": 0
      }
    },
    {
      "id": 83,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -117.8679962,
          33.67570114
        ]
      },
      "properties": {
        "lat": 33.67570114,
        "long": -117.8679962,
        "name": "John Wayne Airport-Orange County Airport",
        "type": "large_airport",
        "ident": "KSNA",
        "score": 51150,
        "gps_code": "KSNA",
        "keywords": "Disney | Disneyland | Orange County",
        "continent": "NA",
        "home_link": "http://www.ocair.com/",
        "iata_code": "SNA",
        "iso_region": "US-CA",
        "local_code": "SNA",
        "iso_country": "US",
        "elevation_ft": 56,
        "last_updated": "2010-01-26T11:26:00+00:00",
        "municipality": "Santa Ana",
        "wikipedia_link": "http://en.wikipedia.org/wiki/John_Wayne_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 84,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -114.019996643,
          51.113899231
        ]
      },
      "properties": {
        "lat": 51.113899231,
        "long": -114.019996643,
        "name": "Calgary International Airport",
        "type": "large_airport",
        "ident": "CYYC",
        "score": 51275,
        "gps_code": "CYYC",
        "keywords": "McCall Field",
        "continent": "NA",
        "home_link": "http://www.calgaryairport.com/",
        "iata_code": "YYC",
        "iso_region": "CA-AB",
        "local_code": "",
        "iso_country": "CA",
        "elevation_ft": 3557,
        "last_updated": "2014-03-18T23:08:53+00:00",
        "municipality": "Calgary",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Calgary_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 85,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          101.70999908447,
          2.745579957962
        ]
      },
      "properties": {
        "lat": 2.745579957962,
        "long": 101.70999908447,
        "name": "Kuala Lumpur International Airport",
        "type": "large_airport",
        "ident": "WMKK",
        "score": 1017575,
        "gps_code": "WMKK",
        "keywords": "KLIA",
        "continent": "AS",
        "home_link": "",
        "iata_code": "KUL",
        "iso_region": "MY-14",
        "local_code": "",
        "iso_country": "MY",
        "elevation_ft": 69,
        "last_updated": "2015-08-02T19:22:21+00:00",
        "municipality": "Kuala Lumpur",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Kuala_Lumpur_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 86,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -81.8498001099,
          41.4117012024
        ]
      },
      "properties": {
        "lat": 41.4117012024,
        "long": -81.8498001099,
        "name": "Cleveland Hopkins International Airport",
        "type": "large_airport",
        "ident": "KCLE",
        "score": 1015875,
        "gps_code": "KCLE",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.clevelandairport.com/",
        "iata_code": "CLE",
        "iso_region": "US-OH",
        "local_code": "CLE",
        "iso_country": "US",
        "elevation_ft": 791,
        "last_updated": "2010-10-22T20:04:02+00:00",
        "municipality": "Cleveland",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Cleveland_Hopkins_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 87,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -22.605600357056,
          63.985000610352
        ]
      },
      "properties": {
        "lat": 63.985000610352,
        "long": -22.605600357056,
        "name": "Keflavik International Airport",
        "type": "large_airport",
        "ident": "BIKF",
        "score": 1675,
        "gps_code": "BIKF",
        "keywords": "Keflavik Naval Air Station |REK",
        "continent": "EU",
        "home_link": "",
        "iata_code": "KEF",
        "iso_region": "IS-2",
        "local_code": "",
        "iso_country": "IS",
        "elevation_ft": 171,
        "last_updated": "2016-01-04T17:20:26+00:00",
        "municipality": "Reykjavík",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Keflav%C3%ADk_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 88,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -99.072098,
          19.4363
        ]
      },
      "properties": {
        "lat": 19.4363,
        "long": -99.072098,
        "name": "Licenciado Benito Juarez International Airport",
        "type": "large_airport",
        "ident": "MMMX",
        "score": 1025275,
        "gps_code": "MMMX",
        "keywords": "AICM",
        "continent": "NA",
        "home_link": "https://www.aicm.com.mx",
        "iata_code": "MEX",
        "iso_region": "MX-DIF",
        "local_code": "ME1",
        "iso_country": "MX",
        "elevation_ft": 7316,
        "last_updated": "2018-05-04T00:43:52+00:00",
        "municipality": "Mexico City",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Mexico_City_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 89,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -86.294403,
          39.7173
        ]
      },
      "properties": {
        "lat": 39.7173,
        "long": -86.294403,
        "name": "Indianapolis International Airport",
        "type": "large_airport",
        "ident": "KIND",
        "score": 52075,
        "gps_code": "KIND",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.indianapolisairport.com/",
        "iata_code": "IND",
        "iso_region": "US-IN",
        "local_code": "IND",
        "iso_country": "US",
        "elevation_ft": 797,
        "last_updated": "2016-07-08T18:41:42+00:00",
        "municipality": "Indianapolis",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Indianapolis_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 90,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -96.851799,
          32.847099
        ]
      },
      "properties": {
        "lat": 32.847099,
        "long": -96.851799,
        "name": "Dallas Love Field",
        "type": "large_airport",
        "ident": "KDAL",
        "score": 1675,
        "gps_code": "KDAL",
        "keywords": "QDF",
        "continent": "NA",
        "home_link": "http://www.dallas-lovefield.com/",
        "iata_code": "DAL",
        "iso_region": "US-TX",
        "local_code": "DAL",
        "iso_country": "US",
        "elevation_ft": 487,
        "last_updated": "2017-06-18T20:36:36+00:00",
        "municipality": "Dallas",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Dallas_Love_Field",
        "scheduled_service": 1
      }
    },
    {
      "id": 91,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.73881006241,
          39.551700592
        ]
      },
      "properties": {
        "lat": 39.551700592,
        "long": 2.73881006241,
        "name": "Palma De Mallorca Airport",
        "type": "large_airport",
        "ident": "LEPA",
        "score": 51200,
        "gps_code": "LEPA",
        "keywords": "Son Sant Joan Airport | LESJ",
        "continent": "EU",
        "home_link": "http://www.aena.es/csee/Satellite?cid=1046276292735&pagename=subHome&Language=EN_GB&SiteName=PMI&c=Page",
        "iata_code": "PMI",
        "iso_region": "ES-PM",
        "local_code": "",
        "iso_country": "ES",
        "elevation_ft": 27,
        "last_updated": "2010-08-31T21:55:29+00:00",
        "municipality": "Palma De Mallorca",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Son_Sant_Joan_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 92,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -106.609001,
          35.040199
        ]
      },
      "properties": {
        "lat": 35.040199,
        "long": -106.609001,
        "name": "Albuquerque International Sunport",
        "type": "large_airport",
        "ident": "KABQ",
        "score": 450,
        "gps_code": "KABQ",
        "keywords": "",
        "continent": "NA",
        "home_link": "http://www.abqsunport.com/",
        "iata_code": "ABQ",
        "iso_region": "US-NM",
        "local_code": "ABQ",
        "iso_country": "US",
        "elevation_ft": 5355,
        "last_updated": "2018-09-15T18:43:33+00:00",
        "municipality": "Albuquerque",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Albuquerque_International_Sunport",
        "scheduled_service": 1
      }
    },
    {
      "id": 93,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          144.843002,
          -37.673302
        ]
      },
      "properties": {
        "lat": -37.673302,
        "long": 144.843002,
        "name": "Melbourne International Airport",
        "type": "large_airport",
        "ident": "YMML",
        "score": 1016075,
        "gps_code": "YMML",
        "keywords": "",
        "continent": "OC",
        "home_link": "http://melbourneairport.com.au/",
        "iata_code": "MEL",
        "iso_region": "AU-VIC",
        "local_code": "",
        "iso_country": "AU",
        "elevation_ft": 434,
        "last_updated": "2017-03-06T19:29:22+00:00",
        "municipality": "Melbourne",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Melbourne_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 94,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -3.37249994277954,
          55.9500007629395
        ]
      },
      "properties": {
        "lat": 55.9500007629395,
        "long": -3.37249994277954,
        "name": "Edinburgh Airport",
        "type": "large_airport",
        "ident": "EGPH",
        "score": 51275,
        "gps_code": "EGPH",
        "keywords": "",
        "continent": "EU",
        "home_link": "http://www.edinburghairport.com/",
        "iata_code": "EDI",
        "iso_region": "GB-SCT",
        "local_code": "",
        "iso_country": "GB",
        "elevation_ft": 135,
        "last_updated": "2009-02-24T17:18:55+00:00",
        "municipality": "Edinburgh",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Edinburgh_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 95,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.3519,
          45.505299
        ]
      },
      "properties": {
        "lat": 45.505299,
        "long": 12.3519,
        "name": "Venice Marco Polo Airport",
        "type": "large_airport",
        "ident": "LIPZ",
        "score": 1000,
        "gps_code": "LIPZ",
        "keywords": "Venezia Tessera",
        "continent": "EU",
        "home_link": "http://www.veniceairport.com/core/index.jsp?_requestid=37300&language=en",
        "iata_code": "VCE",
        "iso_region": "IT-34",
        "local_code": "VE05",
        "iso_country": "IT",
        "elevation_ft": 7,
        "last_updated": "2016-07-02T10:46:17+00:00",
        "municipality": "Venice",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Venice_Marco_Polo_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 96,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.896598815918,
          42.9472007751465
        ]
      },
      "properties": {
        "lat": 42.9472007751465,
        "long": -87.896598815918,
        "name": "General Mitchell International Airport",
        "type": "large_airport",
        "ident": "KMKE",
        "score": 1575,
        "gps_code": "KMKE",
        "keywords": "",
        "continent": "NA",
        "home_link": "",
        "iata_code": "MKE",
        "iso_region": "US-WI",
        "local_code": "MKE",
        "iso_country": "US",
        "elevation_ft": 723,
        "last_updated": "2008-06-13T14:30:04+00:00",
        "municipality": "Milwaukee",
        "wikipedia_link": "http://en.wikipedia.org/wiki/General_Mitchell_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 97,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          121.805000305176,
          31.1434001922607
        ]
      },
      "properties": {
        "lat": 31.1434001922607,
        "long": 121.805000305176,
        "name": "Shanghai Pudong International Airport",
        "type": "large_airport",
        "ident": "ZSPD",
        "score": 51150,
        "gps_code": "ZSPD",
        "keywords": "",
        "continent": "AS",
        "home_link": "",
        "iata_code": "PVG",
        "iso_region": "CN-31",
        "local_code": "",
        "iso_country": "CN",
        "elevation_ft": 13,
        "last_updated": "2009-01-30T18:17:35+00:00",
        "municipality": "Shanghai",
        "wikipedia_link": "http://en.wikipedia.org/wiki/Shanghai_Pudong_International_Airport",
        "scheduled_service": 1
      }
    },
    {
      "id": 98,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -0.368333011865616,
          51.874698638916
        ]
      },
      "properties": {
        "lat": 51.874698638916,
        "long": -0.368333011865616,
        "name": "London Luton Airport",
        "type": "large_airport",
        "ident": "EGGW",
        "score": 51275,
        "gps_code": "EGGW",
        "keywords": "LON",
        "continent": "EU",
        "home_link": "http://www.london-luton.co.uk/en/",
        "iata_code": "LTN",
        "iso_region": "GB-ENG",
        "local_code": "",
        "iso_country": "GB",
        "elevation_ft": 526,
        "last_updated": "2009-02-24T10:04:22+00:00",
        "municipality": "London",
        "wikipedia_link": "http://en.wikipedia.org/wiki/London_Luton_Airport",
        "scheduled_service": 1
      }
    }
  ]
}

const globalState = {
  workbook: null,
  airports: flights,
  flights: null,
  pings: null
};

const globalReducer = (state, action) => {
  switch(action.type) {
    case 'updateWorkbook':
      return {...state, workbook: action.workbook};
    case 'updateAirports':
      return {...state, airports: action.airports};
    case 'updateFlights':
      return {...state, flights: action.flights};
    case 'updatePings':
      return {...state, pings: action.pings};
    default:
      return state;
  }
};

export default function App() {
  return(
    <Global state={globalState} reducer={globalReducer}>
      <Router history={browserHistory}>
        {useCurrentUser() &&
          <Navbar browserHistory={browserHistory}/>
        }
        <Switch>
          <Route exact path="/" component={Signin}/>
          <Route exact path="/workbook" component={Workbook}/>
          <Route exact path="/map" render={props => <Map {...props}/>}/>
          <Route exact path="/table" render={props => <Table {...props}/>}/>
        </Switch>
      </Router>
    </Global>
  );
}