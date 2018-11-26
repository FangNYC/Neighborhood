const async = require('async');
const { db } = require('./../../database/mongoDB/index.js');
const { Listing } = require('./../../database/mongoDB/index.js');
const { Landmark } = require('./../../database/mongoDB/index.js');
const generatedLandmarks = require('./dummyData/generateLandmarksData.js');
const landmarks = generatedLandmarks.landmarksData;
const faker = require('faker');

// ===================================================================
// This script generates 10M listings records and injects into MongoDB
// ===================================================================

const neighbsArray = [
  'Hackney', 'Camden Town', 'Marylebone', 'Greenwich', 'Hackney', 'Brixton', 'Islington', 'Soho', 'Paddington', 'Chelsea', 'Kensington', 'Mayfair'
]

let totalAdded = 0;
let counter = 0

let BATCH_SIZE = 10000;
let NUM_CYCLES = 1000;

function generateDummyArray(i) {
  return new Promise((resolve, reject) => {
    let scaleListingsArray = [];
    for (let j = 0; j < BATCH_SIZE; j++) {
      counter++;
      let listing = new Listing({
        "id": counter,
        "hostFirstName": faker.name.firstName(),
        "city": 'London',
        "region": 'England',
        "country": 'United Kingdom',
        "neighb": neighbsArray[Math.floor(Math.random() * 10)],
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
      scaleListingsArray.push(listing)
    }
    resolve(scaleListingsArray);
  })
}

const insertAsyncListing = (callback) => {
    
  function insertRecs(array) {
    return new Promise((resolve, reject) => {
      Listing.insertMany(array, (err, docs) => {
        if (err) {
          reject(console.log('ERROR @ insertMany:', err));
        } else {
          console.log('RAM usage:', process.memoryUsage().heapUsed/1000000, 'MBs');
          totalAdded += BATCH_SIZE;
          console.log('Current total records:', totalAdded);
          resolve();
        }
      })
    })
  }

  async function initialize() {
    console.log('****** Begin Data Injection ******')
    let begin = Date.now();
    for (let i = 0; i < NUM_CYCLES; i++) {
      let listingArray = await generateDummyArray(i)
      await insertRecs(listingArray);
    }
    let end = Date.now();
    let timeSpent = ((end - begin) / 1000) / 60;
    callback(timeSpent);
  }
  initialize(); 
}

insertAsyncListing((time) => {
  console.log('Listing table populated with ' + totalAdded + ' records in ' + time + ' minutes');
  console.log('****** End Data Injection ******');
});

// Insert Landmarks
landmarks.then((results) => {
  Landmark.collection.insert(results)
})
