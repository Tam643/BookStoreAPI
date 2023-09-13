module.exports = (mongoose) => {
  const itemsBook = new mongoose.Schema({
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book', // Reference to the Book model
      required: true,
    },
    amount: { type: Number, required: true },
    price: {
      type: { type: String, required: true },
      price: {
        type: Number,
        get: (v) => parseFloat(v).toFixed(2),
        set: (v) => parseFloat(v).toFixed(2),
        required: true
      },
    },
  });

  const billSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
      index: true
    },
    items: [itemsBook],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'canceled'],
      default: 'pending',
      index: true
    }
  }, { timestamps: true });

  return mongoose.model('Bill', billSchema);
}