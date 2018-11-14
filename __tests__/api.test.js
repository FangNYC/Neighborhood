const app = require('./../server/server.js');
const request = require('supertest');

describe('Test the root path', () => {
  test('It should respond to GET', () => {
    return request(app)
      .get('/')
      .expect(200)
  })
})

describe('Test the listing data api', () => {

  // beforeAll(() => {
  //   mongoDB.connect();
  // });

  // afterAll((done) => {
  //   mongoDB.disconnect(done);
  // });

  test('It should respond to GET for id 123', () => {
    return request(app)
      .get('/listingdata?id=123')
      .expect(200)
  })

  test('It should respond to GET for id 5000000', () => {
    return request(app)
      .get('/listingdata?id=5000000')
      .expect(200)
  })

  test('It should respond to GET for id 9000000', () => {
    return request(app)
      .get('/listingdata?id=9000000')
      .expect(200)
  })

})

describe('Test the neighborhood data api', () => {
  test('It should respond to GET for id 123', () => {
    return request(app)
      .get('/neighborhooddata/123')
      .expect(200)
  })
})

describe('Test the landmarks data api', () => {
  test('It should respond to GET for id 123', () => {
    return request(app)
      .get('/landmarksdata/123')
      .expect(200)
  })
})