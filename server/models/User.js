// models/User.js (or wherever your User model is defined)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true }, // Add phone field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
