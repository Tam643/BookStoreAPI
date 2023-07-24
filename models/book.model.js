const mongoose = require('mongoose');
const priceSchema =  new mongoose.Schema({
    type: { type: String,required: true, trim: true },
    price: { type: Number,required: true, trim: true },
})

const booksSchema = new mongoose.Schema({
    image:{
        filename:{ type: String,required: true, trim: true },
        data:{ type: Buffer,required: true },
        type:{ type: String,required: true, trim: true }
    },
    title:{ type: String,required: true, trim: true, index: true},
    author:{ type: String,required: true, trim: true, index: true },
    genres:[
            { type: mongoose.ObjectId, ref: "Genre"}
        ],
    prices:[ priceSchema ],
    description:{ type: String,required: true, trim: true },
    publisher:{ type: String, required: true, trim: true, index: true},
    publication_date:{ type: Date,required: true, trim: true },
})

module.exports = mongoose.model('Book',booksSchema)