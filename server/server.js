const express = require('express');
const morgan = require('morgan');
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

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(parser.json());

app.use('/api', router);

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// })

app.get( "/*", ( req, res ) => {

  (async () => {
    await axios.get('http://localhost:3001/api/listingdata', {
      params: {
        id: req.query.id
      }
    })
    .then(({data}) => {
      let props = data;
      let component = React.createElement(Neighborhood, props);
      let App = ReactDOM.renderToString(component);
      console.log('APP', App)
      res.end(htmlTemplate(App, props));
    });
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
          React.createElement(Neighborhood, ${JSON.stringify(props)}),
          document.getElementById('neighborhood')
        );
        </script>
      </body>
      </html>
  `;
}

module.exports = app;
