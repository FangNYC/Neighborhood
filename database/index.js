const Sequelize = require('sequelize');
const pg = require('pg');
const hstore = require('pg-hstore');
// const dbpw = require('../config.js').AmazonDBpw;

const db = new Sequelize('neighborhood', 'root', 'hrnyc18',
  {
    dialect: 'postgres',
    pool: {
      max: 10,
      min: 1,
      idle: 10000
    },
    logging: false
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