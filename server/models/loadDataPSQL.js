const async = require('async');
const models = require('./models.js');
const { generateDummyArray } = require('./dummyData/generateListingsArray');
const generatedLandmarks = require('./dummyData/generateLandmarksData.js');
const neighbs = require('./dummyData/neighbsData.js').neighbsArray;
const Listing = models.listingSchema;
const Neighborhood = models.neighborhoodSchema;
const Landmark = models.landmarkSchema;
const landmarks = generatedLandmarks.landmarksData;

// ====================================================================
// This script generates 10M listings records and injects into Postgres 
// ====================================================================

let totalAdded = 0;
let BATCH_SIZE = 10000;
let NUM_CYCLES = 1000;

const insertAsync = (callback) => {
    
  const insert = (array) => {
    return new Promise((resolve, reject) => {
      Listing.bulkCreate(array)
        .then(() => {
          console.log('RAM usage:', process.memoryUsage().heapUsed/1000000, 'MBs');
          totalAdded += BATCH_SIZE;
          console.log('Current total records:', totalAdded);
          resolve();
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  async function initialize() {
    console.log('****** Begin Data Injection ******')
    let begin = Date.now();
    for (let i = 0; i < NUM_CYCLES; i++) {
      let listingArray = await generateDummyArray(BATCH_SIZE)
      await insert(listingArray);
    }
    let end = Date.now();
    let timeSpent = ((end - begin) / 1000) / 60;
    callback(timeSpent);
  }
  initialize(); 
}

// Sequelize models insertion:
Listing.sync({force: true})
.then(() => {
  insertAsync((time) => {
    console.log('Listing table populated with ' + totalAdded + ' records in ' + time + ' minutes');
    console.log('****** End Data Injection ******');
  });
})
.catch((err) => {
  console.error(err);
})

Neighborhood.sync({force: true})
.then(() => {
  Neighborhood.bulkCreate(neighbs)
})
.catch((err) => {
  console.error(err);
})

landmarks.then((results) => {
  Landmark.sync({force: true})
  .then(() => {
    Landmark.bulkCreate(results)
  })
  .catch((err) => {
    console.error(err);
  })
})
