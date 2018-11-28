require('newrelic');

const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser')
const router = require('./routes/router');
const React = require('react');
const ReactDOM = require('react-dom/server');
const axios = require('axios');
const fs = require('fs');
const fetch = require('fetch');
const Neighborhood = require('./../public/bundle-server.js').default;

const app = express();
const port = process.env.PORT || 3001;

/////////////////// UNCOMMENT DB TO USE /////////////////
const db = require('../database/index')
// const { db } = require('../database/mongoDB/index.js')
/////////////////////////////////////////////////////////

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(parser.json());

app.use('/api', router);

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// })

app.get( "/*", ( req, res ) => {

  var props = {};

  (async () => {
    await axios.get('http://localhost:3001/api/listingdata', {
      params: {
        id: req.query.id
      }
    })
    .then(async({data}) => {
      props = Object.assign(props, data[0]);
      let neighbId = data[0].neighbId;
        await axios.get('http://localhost:3001/api/neighborhooddata', {params: {
          id: neighbId
        }})
        .then(async({data}) => {
          var neighbDescriptors = [];
          neighbDescriptors.push(data[0].feature1);
          neighbDescriptors.push(data[0].feature2);
          neighbDescriptors.push(data[0].feature3);
          neighbDescriptors.push(data[0].feature4);
          neighbDescriptors.push(data[0].feature5);
          neighbDescriptors.push(data[0].feature6);
          neighbDescriptors.push(data[0].feature7);
          props.neighbDescriptors = neighbDescriptors;
          props.cityString = data[0].cityString;
          props.regionString = data[0].regionString;
          props.country = data[0].country;
          props.neighbName = data[0].neighbName;

          await axios.get('http://localhost:3001/api/landmarkdata', {params: {
            listingLat: props.listingLat, 
            listingLong: props.listingLong
          }})
          .then(({data}) => {
            props.dataLoaded = true;
            props.nearbyLandmarks = data
            console.log('PROPS AFTER ALL', props);

            let component = React.createElement(Neighborhood, props);

            let App = ReactDOM.renderToString(component);

            console.log('APPPPPPP', App)
            res.send(htmlTemplate(App, props));
          })
        })
    })
  })()

});

// app.disable('e-tag').disable('x-powered-by')

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
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
