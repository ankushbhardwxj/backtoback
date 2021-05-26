const mongoose = require('mongoose');
const transportSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, enum: ['Bus','Train','Flight']},
  type: String, 
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  }]
});

module.exports = mongoose.model('Transport', transportSchema);
