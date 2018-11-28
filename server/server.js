
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser')
const router = require('./routes/router')

// const { renderToString } = require("react-dom/server");

const app = express();
const port = process.env.PORT || 3001;

////////// UNCOMMENT DB TO USE //////////

const db = require('../database/index')
// const { db } = require('../database/mongoDB/index.js')

/////////////////////////////////////////

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(parser.json());

// app.get( "/*", ( req, res ) => {
//   const jsx = ( <Neighborhood /> );
//   const reactDom = renderToString( jsx );

//   res.writeHead( 200, { "Content-Type": "text/html" } );
//   res.end( htmlTemplate( reactDom ) );
// } );

app.use('/', router);
// app.disable('e-tag').disable('x-powered-by')

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

function htmlTemplate( reactDom ) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${ reactDom }</div>
          <script src="./app.bundle.js"></script>
      </body>
      </html>
  `;
}

module.exports = app;