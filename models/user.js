import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  phone: {
    type: String,

    min: 10,
    max: 13,
  },
  email: {
    type: String,

    min: 2,
    max: 255,
  },
  name: {
    type: String,

    min: 6,
    max: 1024,
  },
  dp: {
    type: String,
  },
  type: {
    type: String,
    default: 'customer',
  },
  password: {
    type: String,
    min: 6,
    max: 1024,
  },
  isemailVerified: {
    type: Boolean,
    default: false,
    min: 2,
    max: 255,
  },
  isphoneVerified: {
    type: Boolean,
    default: false,
    min: 2,
    max: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
  }],
  listings:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
  }],
  lands:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Land',
  }],
});

export default mongoose.model('User', userSchema);
