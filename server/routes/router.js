const router = require('express').Router();
const controller = require('../controllers/main');
const path = require('path');

router.get('/listingdata', controller.getListingData);
router.get('/neighborhooddata', controller.getNeighbData);
router.get('/landmarkdata', controller.getLandmarkData);

////// MONGODB ROUTES //////
// router.get('/listingdata', controller.getListingDataMongo);

////// Post + Delete routes for testing purposes only //////
router.post('/listingdata', controller.postListingData);
router.delete('/listingdata', controller.deleteListingData)

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
})

module.exports = router; 