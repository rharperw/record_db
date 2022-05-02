'use strict';

const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: '.env-local' });

const PORT = process.env.PORT || '3001';

const app = express();

/** Middleware */
app
  .use(express.json())
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }));

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
