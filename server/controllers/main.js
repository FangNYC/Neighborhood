const models = require('../models/models');
const { generateDummyArray } = require('./../models/dummyData/generateListingsArray');
const Listing = models.listingSchema;
const { addListings } = require('./../models/models.js')
const { deleteListing } = require('./../models/models.js')
// const { getListingData } = require('./../../database/mongoDB/index.js');
 
module.exports = {
  getListingData: (req, res) => {
    models.getListingData(req.query.id)
    .then((listing) => {
      if (listing.length < 1) {
        res.status(404);
        res.send('Not Found');
      } else {
        res.send(listing);
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }, 

  getNeighbData: (req, res) => {
    models.getNeighbData(req.query.id)
    .then((neighborhood) => {
      res.send(neighborhood);
    })
    .catch((err) => {
      console.error(err);
    })
  },

  getLandmarkData: (req, res) => {
    models.calcNearestLandmarks(req.query.listingLat, req.query.listingLong)
    .then(models.getLandmarkData()
    .then((landmarks) => {
      res.send(landmarks);
    }))
    .catch((err) => {
      console.error(err);
    })
  },

  // getListingDataMongo: (req, res) => {
  //   var id = req.query.id;
  //   getListingData(id, (data) => {
  //     res.send(data);
  //   })
  // },

  //////// POST + DELETE METHODS FOR DB TESTING PURPOSES ONLY ////////
  
  postListingData: (req, res) => { 
    addListings(listings, (newId) => {
      res.send();
    });
  },

  deleteListingData: (req, res) => {
    let listingId = req.query.id;
    deleteListing(listingId, res)
  }
}