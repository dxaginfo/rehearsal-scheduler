const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const morgan = require('morgan');
const config = require('./config/config');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middleware/error');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Gzip compression
app.use(compression());

// Enable cors
app.use(cors({
  origin: config.clientUrl,
  credentials: true,
}));

// Request logging
if (config.env !== 'test') {
  app.use(morgan('dev'));
}

// API routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(httpStatus.OK).send({ status: 'ok' });
});

// Send 404 for any unknown API request
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).send({ message: 'Not found' });
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle errors
app.use(errorHandler);

module.exports = app;