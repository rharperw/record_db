'use strict';

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: '.env-local' });

const app = express();
const PORT = process.env.PORT || '3001';

/** Middleware */
app
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  .post('/add2', (req, res) => {
    res.json(req.body);
  });

/** Routes */

app.get('/', (request, response) => {
  response
    .status(200)
    .send('To acess entries head to /table/:id where :id is the entry ID');
});

const userRouter = require('../server/routes/table');
app.use('/table', userRouter);

/** Establish listener */
app.listen(PORT, () => {
  console.log(`Listening for requests on ${PORT}`);
});
