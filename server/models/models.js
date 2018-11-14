const db = require('../../database/index');
const Sequelize = require('sequelize');
const turf = require('@turf/turf');
const distance = require('@turf/distance');

// Define Listing schema
const Listing = db.define('listing', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hostFirstName: {
    type: Sequelize.STRING(50)
  },
  neighbId: {
    type: Sequelize.INTEGER
  }, 
  listingLat: {
    type: Sequelize.FLOAT
  },
  listingLong: {
    type: Sequelize.FLOAT
  },
  neighbDesc: {
    type: Sequelize.STRING(2500)
  },
  gettingAroundDesc: {
    type: Sequelize.STRING(2500)
  }
})

// Define Neighborhood schema
const Neighborhood = db.define('neighborhood', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  cityString: {
    type: Sequelize.STRING(100)
  }, 
  regionString: {
    type: Sequelize.STRING(100)
  },
  country: {
    type: Sequelize.STRING(100)
  },
  neighbName: {
    type: Sequelize.STRING(100)
  },
  feature1: {
    type: Sequelize.STRING(50)
  },
  feature2: {
    type: Sequelize.STRING(50)
  },
  feature3: {
    type: Sequelize.STRING(50)
  },
  feature4: {
    type: Sequelize.STRING(50)
  },
  feature5: {
    type: Sequelize.STRING(50)
  },
  feature6: {
    type: Sequelize.STRING(50)
  },
  feature7: {
    type: Sequelize.STRING(50)
  }
})

// Define Landmarks schema
const Landmark = db.define('landmark', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  landmarkName: {
    type: Sequelize.STRING(100)
  },
  landmarkLat: {
    type: Sequelize.FLOAT
  },
  landmarkLong: {
    type: Sequelize.FLOAT
  },
  distance: {
    type: Sequelize.FLOAT
  }
});

//////// DATABASE METHODS ////////////

const postListingData = (obj) => {
  
}

const getListingData = (id) => {
  return Listing.findAll({
    where: {
      id: id
    }
  })
}

const getNeighbData = (id) => {
  return Neighborhood.findAll({
    where: {id}
  })
}

const calcNearestLandmarks = async (lat, long) => {
  return await Landmark.findAll()
  .then((landmarks) => {
    return Promise.all(landmarks.map((landmark) => {
      // from the current listing
      let from = turf.point([long, lat]);
      // to this landmark
      let to = turf.point([landmark.landmarkLong, landmark.landmarkLat]);
      let options = {units: 'miles'};

      return Landmark.update(
        {distance: turf.distance(from, to, options)},
        {where: {id: landmark.id}}
      )
    }))
  })
}

const getLandmarkData = () => {
  return Landmark.findAll({
    order: Sequelize.literal('distance ASC'),
    limit: 5
  })
}

exports.getListingData = getListingData;
exports.getNeighbData = getNeighbData;
exports.calcNearestLandmarks = calcNearestLandmarks;
exports.getLandmarkData = getLandmarkData;

exports.listingSchema = Listing;
exports.neighborhoodSchema = Neighborhood;
exports.landmarkSchema = Landmark;

