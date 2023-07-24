const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{ type: String, required: true, trim: true, index: true },
})

module.exports = mongoose.model('Book',genreSchema)