const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser')
const router = require('./routes/router')

const app = express();
const port = process.env.PORT || 3001;

////////// IN PROGRESS: SWTICH BETWEEN 2 DBMS //////////

const db = require('../database/index')
// const { db } = require('../database/mongoDB/index.js')

////////////////////////////////////////////////////////

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(parser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

module.exports = app;