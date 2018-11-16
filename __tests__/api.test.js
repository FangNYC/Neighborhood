const app = require('./../server/server.js');
const request = require('supertest');
const { getListingData } = require('./../server/models/models.js');
const { generateDummyArray } = require('./../server/models/dummyData/generateListingsArray');
const faker = require('faker');
const mongoose = require('mongoose');
const { Listing } = require('./../database/mongoDB/index.js');
const MongoClient = require('mongodb').MongoClient;

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

  test('It should read 1 listing from the database in 0-10% position', (done) => {
    var testId = 100
    var sql = `
      SELECT * FROM listings WHERE id=${testId}
    `;

    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        expect(result.rows[0].id).toBe(100)
        done();
      }
    })
  })

  test('It should read 1 listing from the database in 90%+ position', (done) => {
    var testId = 9000000
    var sql = `
      SELECT * FROM listings WHERE id=${testId}
    `;

    pool.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('RESULT FROM POSTGRES QUERY:', result.rows[0]);
        expect(result.rows[0].id).toBe(9000000)
        done();
      }
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
  
  afterAll(() => {
    pool.end();
  })

})

//////// MONGODB TESTS //////////

const testListing = new Listing({
  "id": 11000000,
  "hostFirstName": faker.name.firstName(),
  "city": 'London',
  "region": 'England',
  "country": 'United Kingdom',
  "neighb": 1,
  "listingLat": Number((Math.random() * 100).toFixed(6)),
  "listingLong": Number((Math.random() * 100).toFixed(6)),
  "neighbDesc": faker.lorem.paragraph(),
  "gettingAroundDesc": faker.lorem.paragraph(),
  "feature1": faker.lorem.words(),
  "feature2": faker.lorem.words(),
  "feature3": faker.lorem.words(),
  "feature4": faker.lorem.words(),
  "feature5": faker.lorem.words(),
  "feature6": faker.lorem.words(),
  "feature7": faker.lorem.words()
})

// At present, setting up mongo connection without Before All. 
// TODO: figure out how to access before all scope in subsequent tests.

const url = 'mongodb://localhost/neighborhood';
const dbName = 'neighborhood';
const client = new MongoClient(url);
const connection = client.connect() 

describe('Test raw MongoDB READ / WRITE', () => {

  test('It should insert one new listing directly to MongoDB', (done) => {
    const connect = connection;
    connect.then(() => {

      const db = client.db(dbName);
      const collection = db.collection('listings');
      collection.insertOne(testListing, (err, result) => {
        if(err) {
          console.log(err)
        } else {
          console.log("Documented added to MongoDB:", result.ops[0])
          expect(result.result.n).toBe(1);
          done();
        }
      })
    })
  })

  test('It should read 1 listing from the database in 0-10% position', (done) => {
    const connect = connection;
    connect.then(() => {

      const db = client.db(dbName)
      const collection = db.collection('listings')
      collection.findOne({id: 100}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('RESULT FROM MONGODB QUERY:', result);
          expect(result.id).toBe(100);
          done();
        }
      })

    })
  })

  test('It should read 1 listing from the database in 0-10% position', (done) => {
    const connect = connection;
    connect.then(() => {

      const db = client.db(dbName)
      const collection = db.collection('listings')
      collection.findOne({id: 11000000}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('RESULT FROM MONGODB QUERY:', result);
          expect(result.id).toBe(100);
          done();
        }
      })

    })
  })

  afterAll(() => {
    connection.close();
  })

})
