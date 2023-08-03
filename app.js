const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const mongoose  = require('mongoose');
const { indexRoutes, authorRoutes, genreRoutes, publisherRoutes, userRoutes, bookRoutes } = require('./routes');

const app = express();

// use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Database connection
require('./configs/db.config')(mongoose);

// Define route
app.use('/', indexRoutes);
app.use('/author', authorRoutes);
app.use('/genre', genreRoutes);
app.use('/publisher', publisherRoutes);
app.use('/users', userRoutes);
app.use('/book', bookRoutes);


// error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500).json({ error: err.message });
  });
// catch 404
app.use(function(req, res){
    res.status(404).json({ error: "Not Found" })
  });

module.exports = app;
