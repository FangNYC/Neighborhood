var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/neighborhood');
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connection has been established successfully')
});

// Define schemas + models:
var listingsSchema = new mongoose.Schema({
  listingId: {type: Number, required: true},
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
var Listing = mongoose.model('Listing', listingsSchema);

// db.createCollection('counters');
// db.counters.insert({_id: 'productid', sequence_value: 0});

// function getNextSequenceValue(sequenceName){
//   var sequenceDocument = db.counters.findAndModify({
//   query:{_id: sequenceName },
//   update: {$inc:{sequence_value:1}},
//   new:true
//     });
// return sequenceDocument.sequence_value;
// }

var landmarksSchema = new mongoose.Schema({
  id: Number,
  landmarkName: String,
  landmarkLat: Number,
  landmarkLong: Number,
  distance: Number
})
var Landmark = mongoose.model('Landmark', landmarksSchema)

module.exports.db = db;
module.exports.Listing = Listing;
// module.exports.Neighborhood = Neighborhood;
module.exports.Landmark = Landmark;
// module.exports.getNextSequenceValue = getNextSequenceValue;

