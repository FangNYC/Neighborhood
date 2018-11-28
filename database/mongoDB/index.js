const mongoose = require('mongoose');
const autoinc = require('mongoose-sequence')(mongoose);

////////// Set up Mongoose connection //////////
mongoose.connect('mongodb://localhost/neighborhood');
mongoose.set('useCreateIndex', true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connection has been established successfully')
});

////////// Define schemas + models //////////
var listingsSchema = new mongoose.Schema({
  id: Number,
  hostFirstName: String,
  city: String,
  region: String,
  country: String,
  neighb: String,
  listingLat: Number,
  listingLong: Number,
  neighbDesc: String,
  gettingAroundDesc: String,
  feature1: String,
  feature2: String,
  feature3: String,
  feature4: String,
  feature5: String,
  feature6: String,
  feature7: String
});
listingsSchema.plugin(autoinc, {inc_field: 'id', start: 1000000});
var Listing = mongoose.model('Listing', listingsSchema);

// var landmarksSchema = new mongoose.Schema({
//   id: Number,
//   landmarkName: String,
//   landmarkLat: Number,
//   landmarkLong: Number,
//   distance: Number
// })
// var Landmark = mongoose.model('Landmark', landmarksSchema)

////////// Database Methods //////////

const getListingData = (id, callback) => {
  Listing.findOne({id: id}, (err, obj) => {
    if (err) {
      console.log('Mongoose fetch error:', err);
    } else {
      callback(obj);
    }
  })
}


module.exports.db = db;
module.exports.Listing = Listing;
// module.exports.Landmark = Landmark;
module.exports.getListingData = getListingData;

