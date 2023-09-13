module.exports = (mongoose) => {
  const usersSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    address:{
      recipientname:{type: String,trim: true,lowercase: true,index: true},
      houseNumber: {
        type: String,
        trim: true,
      },
      village: {
        type: String,
        trim: true,
      },
      lane: {
        type: String,
        trim: true,
      },
      road: {
        type: String,
        trim: true,
      },
      subdistrict: {
        type: String,
        trim: true,
        index: true
      },
      district: {
        type: String,
        trim: true,
        index: true
      },
      province: {
        type: String,
        trim: true,
        index: true
      },
      postalCode: {
        type: String,
        trim: true,
        index: true
      },
    },
    salt: {
      type: Buffer,
      required: true,
    },
    role: {
      type: String,
      enum: ['manager', 'employee', 'customer'],
      default: 'customer',
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