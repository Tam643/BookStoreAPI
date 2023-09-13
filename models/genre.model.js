module.exports = (mongoose) => {
    const genreSchema = new mongoose.Schema({
        name: { type: String, required: true, trim: true, index: true, unique: true },
    },{ timestamps: true })

    genreSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    return mongoose.model('Genre', genreSchema)
}