const models = require('../models/models');
const { generateDummyArray } = require('./../models/dummyData/generateListingsArray');
const Listing = models.listingSchema;

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

  ////////// POST METHODS FOR DB TESTING PURPOSES ONLY ////////

  postListingData: (req, res) => { 
    generateDummyArray(1)
      .then((result) => {
        var listing = result;
        Listing.bulkCreate(listing, {returning: true})
          .then((result) => {
            console.log('One record sucessfully added to listings');
            res.send();
            return result[0].dataValues.id;
          })
          .then((listingId) => {
            Listing.destroy({
              where: {
                id: listingId
              }
            })
              .then(() => {
                console.log('Test post deleted')
              })
          })
      .catch((error) => {
        console.log('Error adding record to db:', error);
      })
        
      })
  }, 

}