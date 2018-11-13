const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser')
const app = express();
const port = process.env.PORT || 3001;

const router = require('./routes/router')

// require db, which will initialize it even if `db` is not used anywhere else
// const db = require('../database/index')
const { db } = require('../database/mongoDB/index.js')

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(parser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
