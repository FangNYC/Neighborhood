const app = require('./../server/server.js');
const request = require('supertest');
const { getListingData } = require('./../server/models/models.js')

describe('Test the root path', () => {
  test('It should respond 200 to GET /', () => {
    return request(app)
      .get('/')
      .expect(200)
  })
})

describe('Test GET from listing data api', () => {

  // beforeAll(() => {
  //   mongoDB.connect();
  // });

  // afterAll((done) => {
  //   mongoDB.disconnect(done);
  // });

  test('It should respond 200 for id 123', () => {
    return request(app)
      .get('/listingdata?id=123')
      .expect(200)
  })

})

describe('Test POST to the listing data api', () => {
  test('It should respond 200 after posting new record', () => {
    return request(app)
      .post('/listingdata')
      .expect(200)
  })

})

describe('Test get from the neighborhood data api', () => {
  test('It should respond to GET for id 123', () => {
    return request(app)
      .get('/neighborhooddata?id=123')
      .expect(200)
  })
})

describe('Test get from the landmarks data api', () => {
  test('It should respond to GET for id 123', () => {
    return request(app)
      .get('/landmarksdata?id=123')
      .expect(200)
  })
})

describe('Test PSQL fetch listings table', () => {
  test('It should fetch data through Sequelize', () => {
    return 
    getListingData(9000000);


  })
})