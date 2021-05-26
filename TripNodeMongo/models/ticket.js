const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  dest: String, 
  src: String, 
  price: Number,
  discount: Number
});

module.exports = mongoose.model('Ticket', ticketSchema);
