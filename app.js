const express = require('express');
const morgan = require('morgan');

const toureRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//! Middle wares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//! Routes
app.use('/api/v1/tours', toureRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    stats: 'fail',
    message: `cant find ${req.originalUrl} on this server !`,
  });
});

module.exports = app;
