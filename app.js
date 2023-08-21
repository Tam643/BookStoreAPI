const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose  = require('mongoose');

const app = express();

// use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Database connection
require('./configs/db.config')(mongoose);

// Define route
require('./routes')(app);


// error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500).json({ error: err.message });
  });
// catch 404
app.use(function(req, res){
    res.status(404).json({ error: "Not Found" })
  });

module.exports = app;
