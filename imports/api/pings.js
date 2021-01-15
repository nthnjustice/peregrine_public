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

function buildQuery(flights) {
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
        'properties', to_jsonb(inputs) - 'rcvr' - 'geometry'
      ) AS feature
      FROM (
        SELECT * FROM adsb
        WHERE (
  `;

  flights.features.map(feature => {
    query += `fid = '${feature.properties.fid}' or `
  });

  query = query.slice(0, query.length - 4);
  query += ')) AS inputs) AS features;';

  return query;
}

const fetchPings = flights => {
  let pool = getPool();

  return new Promise(resolve => {
    pool.connect();

    pool.query(buildQuery(flights), (error, response) => {
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
  'pings.fetch': async flights => {
    if (!flights.features) {
      return flights;
    }

    let pings = await fetchPings(flights);

    if (pings) {
      return pings;
    } else {
      throw new Meteor.Error('failed');
    }
  }
});