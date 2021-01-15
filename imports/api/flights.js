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

const fetchFlights = workbook => {
  let pool = getPool();

  return new Promise(resolve => {
    pool.connect();

    pool.query(workbook.query, (error, response) => {
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
  'flights.fetch': async workbook => {
    let flights = await fetchFlights(workbook);

    if (flights) {
      return flights;
    } else {
      throw new Meteor.Error('failed');
    }
  }
});