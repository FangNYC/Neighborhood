const Sequelize = require('sequelize');
const pg = require('pg');
const hstore = require('pg-hstore');
// const dbpw = require('../config.js').AmazonDBpw;

////////// Set up Postgres connection //////////
const db = new Sequelize('neighborhood', 'postgres', 'hrnyc18',
  {
    dialect: 'postgres',
    pool: {
      max: 10,
      min: 1,
      idle: 10000
    },
    logging: false,
    host: '3.16.43.119',
    post: 5432
  } 
)

db.authenticate()
  .then(() => {
    console.log('PostgreSQL connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;