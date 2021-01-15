import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Workbooks = new Mongo.Collection('workbooks');

if (Meteor.isServer) {
  Meteor.publish('workbooks', function() {
    return Workbooks.find();
  });
}

function buildQuery(workbook) {
  let query = `
    SELECT jsonb_build_object(
      'type', 'FeatureCollection',
      'features', jsonb_agg(features.feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type', 'Feature',
        'id', fid,
        'geometry', ST_AsGeoJSON(geometry)::jsonb,
        'properties', to_jsonb(inputs) - 'airport_dst' - 'postime_src'
      ) AS feature
      FROM (
        SELECT * FROM flights
        WHERE (postime_src >= ${workbook.fromEpoch} AND postime_dst <= ${workbook.toEpoch})
  `;

  if (workbook.icaos.length > 0) {
    query += ' AND (';
    
    workbook.icaos.map(icao => {
      query += `icao = '${icao}' or `;
    });

    query = query.slice(0, query.length - 4);
    query += ')';
  }

  if (Array.isArray(workbook.sources)) {
    if (workbook.sources.length > 0) {
      query += ' AND (';

      workbook.sources.map(source => {
        query += `airport_src = '${source}' or `;
      });

      query = query.slice(0, query.length - 4);
      query += ')';
    }
  }

  if (Array.isArray(workbook.destinations)) {
    if (workbook.destinations.length > 0) {
      query += ' AND (';

      workbook.destinations.map(source => {
        query += `airport_dst = '${source}' or `;
      });

      query = query.slice(0, query.length - 4);
      query += ')';
    }
  }

  if (workbook.areas) {
    query += ` AND ST_Intersects(flights.geometry, 'SRID=4326;POLYGON((`;

    workbook.areas.features[0].geometry.coordinates[0].map(coords => {
      query += `${coords[0]} ${coords[1]}, `
    });

    query = query.slice(0, query.length - 2);
    query += `))')`;
  }

  query += ') AS inputs) AS features;';

  return query;
}

Meteor.methods({
  'workbooks.insert'(workbook) {
    if (Workbooks.findOne({title: workbook.title})) {
      throw new Meteor.Error('duplicate', 'title');
    } else {
      workbook.query = buildQuery(workbook);
      workbook.created = new Date();
      Workbooks.insert({...workbook});
    }
  },
  'workbooks.remove'(workbook) {
    Workbooks.remove({_id: workbook._id});
  }
});