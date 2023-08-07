module.exports = (mongoose) =>{
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
        publisher:{ type: String,  trim: true, index: true},
        // publication_date:{ type: Date, trim: true },
        
    },{ timestamps: true })

    booksSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    return mongoose.model('Book',booksSchema);
}