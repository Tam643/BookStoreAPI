const mongoose = require("mongoose");
const db = {};
db.mongoose = mongoose;
db.book = require('./book.model')(mongoose);
db.genre = require('./genre.model')(mongoose);

module.exports =db;