const app = require('./../server/server.js');
const request = require('supertest');
const { getListingData } = require('./../server/models/models.js');
const { generateDummyArray } = require('./../server/models/dummyData/generateListingsArray');
const faker = require('faker');
const { Pool, Client } = require('pg');

////////// API TESTS //////////

describe('Test the server API fetching', () => {
  test('It should respond 200 to root path', () => {
    return request(app)
      .get('/')
      .expect(200)
  })

  test('It should respond 200 to GET listingdata for id 123', () => {
    return request(app)
      .get('/listingdata?id=123')
      .expect(200)
  })

  test('It should respond 200 to GET neighborhooddata for id 5', () => {
    return request(app)
      .get('/neighborhooddata?id=5')
      .expect(200)
  })

  test('It should respond 200 to GET landmarkdata', () => {
    return request(app)
      .get('/landmarksdata')
      .expect(200)
  })

})

////////// POSTGRES TESTS //////////

const testValues = [faker.name.firstName(), Math.floor(Math.random() * 15) + 1, faker.lorem.paragraph(), faker.lorem.paragraph(), Number((Math.random() * 100).toFixed(6)), Number((Math.random() * 100).toFixed(6)), "2018-11-12 15:52:31.126-05", "2018-11-12 15:52:31.126-05"]

console.log('TEST VALUES', testValues);

describe('Test raw Postgres READ / WRITE', () => {

  beforeAll(() => {
    const { Pool } = require('pg')
    return pool = new Pool({
      user: 'root',
      host: 'localhost',
      database: 'neighborhood',
      password: 'hrnyc18',
      port: 5432
    })
  })

  test('It should insert one new listing directly to Postgres', (done) => {

    var sql = 
    `
      INSERT INTO listings ("hostFirstName", "neighbId", "neighbDesc", "gettingAroundDesc", "listingLat", "listingLong", "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    var begin = Date.now();
    pool.query(sql, testValues, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        var end = Date.now();
        var timeSpent = ((end - begin) / 1000) / 60;
        console.log('PSQL insert time:', timeSpent)
        expect(result.rowCount).toBe(1)
      }
    })
    done();
  })

  // test('It should delete the added listing', (done) => {
      

  // })

  
  afterAll(() => {
    pool.end();
  })

})


  // beforeAll(() => {
  //   mongoDB.connect();
  // });

  // afterAll((done) => {
  //   mongoDB.disconnect(done);
  // });