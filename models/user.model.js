module.exports = (mongoose) => {
  const usersSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    salt: {
      type: Buffer,
      required: true,
    },
    password_hashed: {
      type: String,
      required: true,
      minlength: 8
    }
  }, { timestamps: true })

  usersSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model('User', usersSchema);
}