module.exports = (mongoose) => {
    const billSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
          },
          items: [
            {
              bookID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book', // Reference to the Book model
                required: true,
              },
              priceType: {
                  type: { type: String,required: true, trim: true },
                  price: { type: Number,required: true, trim: true },
              },
            },
          ],
          totalAmount: {
            type: Number,
            required: true,
          },
          status: {
            type: String,
            enum: ['pending', 'completed', 'canceled'],
            default: 'pending',
          }
      },{ timestamps: true });
      
    return mongoose.model('Bill', billSchema);
}