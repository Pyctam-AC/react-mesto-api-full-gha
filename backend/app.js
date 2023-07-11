/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes/index');

// const { PORT = 4000 } = process.env;
/* http://localhost:4000 */

const port = process.env.PORT || 3000;
// const port = 4000;

const app = express();

mongoose
  .connect('mongodb://0.0.0.0/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connect to db');
  });

app.use(cors({
//  origin: 'http://localhost:3000',
  origin: 'http://mesto-ru.nomoredomains.work',
  credentials: true,
}));

app.use(cookieParser());

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

/* const bodyParser = require('body-parser'); */
// app.use(cookieParser());

/* console.log(mongoose.Error); */
