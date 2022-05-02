'use strict';

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

dotenv.config({ path: '.env-local' });

const app = express();
const PORT = process.env.PORT || '3001';

/** Middleware */
app
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: false }));

/** Routes */

app.get('/', (request, response) => {
  response
    .status(200)
    .send('To acess entries head to /table/:id where :id is the entry ID');
});

const userRouter = require('./routes/table');
app.use('/table', userRouter);

/** Establish listener */
app.listen(PORT, () => {
  console.log(`Listening for requests on ${PORT}`);
});
