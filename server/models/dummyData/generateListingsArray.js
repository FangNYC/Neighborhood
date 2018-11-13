const faker = require('faker');

////////// POSTGRES ONLY //////////

const generateDummyArray = () => {
  return new Promise((resolve, reject) => {
    var scaleListingsArray = [];
    for (var j = 0; j < 10000; j++) {
      var listing = {
        "hostFirstName": faker.name.firstName(),
        "neighbId": Math.floor(Math.random() * 15) + 1,
        "neighbDesc": faker.lorem.paragraph(),
        "gettingAroundDesc": faker.lorem.paragraph(),
        "listingLat": Number((Math.random() * 100).toFixed(6)),
        "listingLong": Number((Math.random() * 100).toFixed(6))
      }
      scaleListingsArray.push(listing)
    }
    if (scaleListingsArray.length !== 10000) {
      reject();
    } else {
      resolve(scaleListingsArray);
    }
  })
}

module.exports.generateDummyArray = generateDummyArray;