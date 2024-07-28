const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userid: { type: Number, required: true },
  email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  contact: { type: String },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isLoggedIn: { type: Boolean, default: false },
  uuid: { type: String, default: '' },
  accesstoken: { type: String, default: '' },
  coupens: { type: Array, default: [] },
  bookingRequests: { type: Array, default: [] }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
