const async = require('async');
const generatedLandmarks = require('./dummyData/generateLandmarksData.js');
const { db } = require('./../../database/mongoDB/index.js');
const { Listing } = require('./../../database/mongoDB/index.js');
const { Neighborhood } = require('./../../database/mongoDB/index.js');
const { Landmark } = require('./../../database/mongoDB/index.js');
const faker = require('faker');

var neighbsArray = [
  'Hackney', 'Camden Town', 'Marylebone', 'Greenwich', 'Hackney', 'Brixton', 'Islington', 'Soho', 'Paddington', 'Chelsea', 'Kensington', 'Mayfair'
]

var totalAdded = 0;

function generateDummyArray(i) {
  return new Promise((resolve, reject) => {
    var scaleListingsArray = [];
    for (var j = 0; j < 10000; j++) {
      var listing = new Listing({
        "listingId": Math.floor(Math.random() * 10) * j,
        "hostFirstName": faker.name.firstName(),
        "city": 'London',
        "region": 'England',
        "country": 'United Kingdom',
        "neighb": neighbsArray[Math.floor(Math.random() * 10)],
        "listingLat": Number((Math.random() * 100).toFixed(6)),
        "listingLong": Number((Math.random() * 100).toFixed(6)),
        "neighbDesc": faker.lorem.paragraph(),
        "gettingAroundDesc": faker.lorem.paragraph(),
        "feature1": faker.lorem.sentence(),
        "feature2": faker.lorem.sentence(),
        "feature3": faker.lorem.sentence(),
        "feature4": faker.lorem.sentence(),
        "feature5": faker.lorem.sentence(),
        "feature6": faker.lorem.sentence(),
        "feature7": faker.lorem.sentence()
      })
      scaleListingsArray.push(listing)
    }
    resolve(scaleListingsArray);
  })
}

function insertAsyncListing(callback) {
    
  function insertRecs(array) {
    return new Promise((resolve, reject) => {
      Listing.insertMany(array, (err, docs) => {
        if (err) {
          reject(console.log('ERROR @ insertMany:', err));
        } else {
          console.log('RAM usage:', process.memoryUsage().heapUsed/1000000, 'MBs');
          totalAdded += 10000;
          console.log('Current total records:', totalAdded);
          resolve();
        }
      })
    })
  }

  async function initialize() {
    console.log('****** Begin Data Injection ******')
    var begin = Date.now();
    for (var i = 0; i < 1000; i++) {
      var listingArray = await generateDummyArray(i)
      await insertRecs(listingArray);
    }
    var end = Date.now();
    var timeSpent = ((end - begin) / 1000) / 60;
    callback(timeSpent);
  }
  initialize(); 
}

insertAsyncListing((time) => {
  console.log('Listing table populated with ' + totalAdded + ' records in ' + time + ' minutes');
  console.log('****** End Data Injection ******');
});

// // Insert Landmarks
// Landmark.collection.insert(generatedLandmarks)