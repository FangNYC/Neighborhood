const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser')
const router = require('./routes/router');
const React = require('react');
const ReactDOM = require('react-dom/server');
const axios = require('axios');

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
      // TODO: get server bundle
      let component = React.createElement(components.DescriptionServer, props);
      let Neighborhood = ReactDom.renderToString(component);
    });
    res.end(htmlTemplate(Neighborhood));
  })()
});

  // const app = ReactDOM.renderToString(<App />);
  // const reactDom = renderToString( jsx );

  // res.writeHead( 200, { "Content-Type": "text/html" } );
  // res.end( htmlTemplate( reactDom ) );


// app.disable('e-tag').disable('x-powered-by')

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

function htmlTemplate(Neighborhood) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${Neighborhood}</div>
          <script src="./app.bundle.js"></script>
          <script>
          ReactDOM.hydrate(
            React.createElement(Description, ${JSON.stringify(props.Neighborhood)}),
            document.getElementById('description')
          );
        </script>
      </body>
      </html>
  `;
}

module.exports = app;

// `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <title>TopBunk</title>
//       <link rel="stylesheet" type="text/css" href="/styles.css">
//       <!-- <link rel="stylesheet" type="text/css" href="http://18.216.104.91/guestBar.css"> -->
//       <!-- <link type="text/css" rel="stylesheet" href="http://18.218.27.164/style.css"> -->
//       <link rel="icon" type="image/png" href="/favicon.png">
//     </head>
//     <body>
//       <div id="description">${apps.Description}</div>
//       <div class="container-left">
//         <div id="reviews"></div>
//         <div id="neighborhood"></div>
//       </div>
//       <div class=container-right>
//         <div id="booking"></div>
//       </div>
//       <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
//       <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
//       <script src="./bundles/Description.js"></script>
//       <!-- <script src="http://52.14.238.117/bundle.js"></script> -->
//       <!-- <script src="http://18.216.104.91/bundle.js"></script> -->
//       <!-- <script src="http://18.218.27.164/bundle.js"></script> -->
//       <script>
//         ReactDOM.hydrate(
//           React.createElement(Description, ${JSON.stringify(props.Description)}),
//           document.getElementById('description')
//         );
//       </script>
//     </body>
//     </html>
//   `