const express = require('express');
const morgan = require('morgan');

const toureRouter = require('./routes/toureRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//! Middle wares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('hello from middleware !');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//! Routes
app.use('/api/v1/tours', toureRouter);
app.use('/api/v1/users', userRouter);

//! Server
module.exports = app;
