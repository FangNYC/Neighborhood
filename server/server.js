// require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser')
const router = require('./routes/router');
const React = require('./../node_modules/react/umd/react.production.min.js');
const ReactDOM = require('./../node_modules/react-dom/umd/react-dom-server.browser.production.min.js');
const Neighborhood = require('./../public/bundle-server.js').default;
const LOADER_CONFIG_KEY = process.env.loaderConfigKey || require('./../loader-config.js');
const {getListingPG} = require('./../database/helpers.js');

// Redis connection
var redis = require("redis"),
    client = redis.createClient({
      host: '18.225.31.250',
      port: 6379
    });
client.on("error", function (err) {
  console.log(err);
});
client.on('connect', function() {
  console.log('Redis client connected');
});
  
// ================================================================
//                      Sequelize patches: 

// const {getListingData} = require('./models/models.js');
// const {getNeighbData} = require('./models/models.js');
// const {getLandmarkData} = require('./models/models.js');
// const {calcNearestLandmarks} = require('./models/models.js');

// ================================================================

const db = require('../database/index')
const app = express();
const port = process.env.PORT || 3001;

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(parser.json());
app.use('/api', router);

app.get('/test', (req, res) => {
  res.send('test');
})

app.get(`/${LOADER_CONFIG_KEY}`, (req, res) => {
  res.send(LOADER_CONFIG_KEY)
})

// This endpoint is for serving SSR to a proxy server
app.get( "/renderNeighborhood", ( req, res ) => {
  var id = req.query.id;

  client.get(id, (err, result) => {
    if (err) {
    } else {
      if (result) {
        res.send(result)
      } else {
        var props = {};
        var begin = Date.now();

        getListingPG(id, (data) => {
          var listingAndNeighbData = data.rows[0];
          var neighbDescriptors = [];
          neighbDescriptors.push(listingAndNeighbData.feature1);
          delete listingAndNeighbData.feature1;
          neighbDescriptors.push(listingAndNeighbData.feature2);
          delete listingAndNeighbData.feature2;
          neighbDescriptors.push(listingAndNeighbData.feature3);
          delete listingAndNeighbData.feature3;
          neighbDescriptors.push(listingAndNeighbData.feature4);
          delete listingAndNeighbData.feature4;
          neighbDescriptors.push(listingAndNeighbData.feature5);
          delete listingAndNeighbData.feature5;
          neighbDescriptors.push(listingAndNeighbData.feature6);
          delete listingAndNeighbData.feature6;
          neighbDescriptors.push(listingAndNeighbData.feature7);
          delete listingAndNeighbData.feature7;

          props = Object.assign(props, listingAndNeighbData);
          props.neighbDescriptors = neighbDescriptors;

          props.nearbyLandmarks = [ 
            { id: 21,
              landmarkName: 'Natural History Museum',
              landmarkLat: 51.5283737852907,
              landmarkLong: -0.080282440076895,
              distance: 6037.3386796661 },
            { id: 14,
              landmarkName: 'Millennium Bridge',
              landmarkLat: 51.5195786486902,
              landmarkLong: -0.080930647163739,
              distance: 6037.43076902683 },
            { id: 35,
              landmarkName: 'The Science Museum',
              landmarkLat: 51.5186334072307,
              landmarkLong: -0.0849189644760769,
              distance: 6037.60819707357 },
            { id: 19,
              landmarkName: 'Victoria & Albert Museum',
              landmarkLat: 51.526429277854,
              landmarkLong: -0.0948156326725632,
              distance: 6037.97412471337 },
            { id: 32,
              landmarkName: 'Museum of London',
              landmarkLat: 51.5218806852161,
              landmarkLong: -0.113703297619352,
              distance: 6038.81488293385 } 
          ];
          
          props.dataLoaded = true;

          let component = React.createElement(Neighborhood, props);
          let App = ReactDOM.renderToString(component);
          client.set(id, [App, props]);
          res.send([App, props]);
        })

      }
    }
  })


});

// This endpoint is for serving SSR without a proxy server
app.get( "/listing", ( req, res ) => {
  var id = req.query.id;

  client.get(id, (err, result) => {
    if (err) {
    } else {
      if (result) {
        res.send(result)
      } else {
        var props = {};
        var begin = Date.now();

        getListingPG(id, (data) => {
          var listingAndNeighbData = data.rows[0];
          var neighbDescriptors = [];
          neighbDescriptors.push(listingAndNeighbData.feature1);
          delete listingAndNeighbData.feature1;
          neighbDescriptors.push(listingAndNeighbData.feature2);
          delete listingAndNeighbData.feature2;
          neighbDescriptors.push(listingAndNeighbData.feature3);
          delete listingAndNeighbData.feature3;
          neighbDescriptors.push(listingAndNeighbData.feature4);
          delete listingAndNeighbData.feature4;
          neighbDescriptors.push(listingAndNeighbData.feature5);
          delete listingAndNeighbData.feature5;
          neighbDescriptors.push(listingAndNeighbData.feature6);
          delete listingAndNeighbData.feature6;
          neighbDescriptors.push(listingAndNeighbData.feature7);
          delete listingAndNeighbData.feature7;

          props = Object.assign(props, listingAndNeighbData);
          props.neighbDescriptors = neighbDescriptors;

          props.nearbyLandmarks = [ 
            { id: 21,
              landmarkName: 'Natural History Museum',
              landmarkLat: 51.5283737852907,
              landmarkLong: -0.080282440076895,
              distance: 6037.3386796661 },
            { id: 14,
              landmarkName: 'Millennium Bridge',
              landmarkLat: 51.5195786486902,
              landmarkLong: -0.080930647163739,
              distance: 6037.43076902683 },
            { id: 35,
              landmarkName: 'The Science Museum',
              landmarkLat: 51.5186334072307,
              landmarkLong: -0.0849189644760769,
              distance: 6037.60819707357 },
            { id: 19,
              landmarkName: 'Victoria & Albert Museum',
              landmarkLat: 51.526429277854,
              landmarkLong: -0.0948156326725632,
              distance: 6037.97412471337 },
            { id: 32,
              landmarkName: 'Museum of London',
              landmarkLat: 51.5218806852161,
              landmarkLong: -0.113703297619352,
              distance: 6038.81488293385 } 
          ];
          
          props.dataLoaded = true;

          let component = React.createElement(Neighborhood, props);
          let App = ReactDOM.renderToString(component);
          client.set(id, [App, props]);
          res.send(htmlTemplate(App, props));
        })

      }
    }
  })


});

app.disable('e-tag').disable('x-powered-by')

app.listen(port, () => {
  console.log(`server running at port: ${port}`);
});

function htmlTemplate(Neighborhood, props) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Neighborhood</title>
        <link rel="stylesheet" type="text/css" href="/styles.css">
        <link rel="icon" type="image/png" href="/favicon.png">
      </head>
      <body>
        <div id="neighborhood">${Neighborhood}</div>
        <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
        <script src="/app.js"></script>
        <script>
        ReactDOM.hydrate(
          React.createElement(Neighborhood, ${JSON.stringify({listing: props})}),
          document.getElementById('neighborhood')
        );
        </script>
      </body>
      </html>
  `;
}

module.exports = app;
