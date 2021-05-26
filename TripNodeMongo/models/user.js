const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number,
  sex: String,
  mail: String,
  phNo: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
