import { Meteor } from 'meteor/meteor';
import { Pool } from 'pg';

const getPool = () => {
  return new Pool({
    user: Meteor.settings.local.user,
    host: Meteor.settings.local.host,
    database: Meteor.settings.local.database,
    password: Meteor.settings.local.password,
    port: Meteor.settings.local.port
  });
};

const fetchAirports = () => {
  let pool = getPool();
  let query = `
    SELECT jsonb_build_object(
      'type', 'FeatureCollection',
      'features', jsonb_agg(features.feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type', 'Feature',
        'id', id,
        'geometry', ST_AsGeoJSON(geometry)::jsonb,
        'properties', to_jsonb(inputs) - 'id' - 'geometry'
      ) AS feature
      FROM (
        SELECT * FROM airports LIMIT
      ) AS inputs
    ) AS features;
  `;

  return new Promise(resolve => {
    pool.connect();

    pool.query(query, (error, response) => {
      if (!error) {
        resolve(response.rows[0].jsonb_build_object);
      } else {
        resolve(null)
      }
      
      pool.end();
    });
  });
};

Meteor.methods({
  'airports.fetch': async () => {
    let airports = await fetchAirports();

    if (airports) {
      return airports;
    } else {
      throw new Meteor.Error('failed');
    }
  }
});