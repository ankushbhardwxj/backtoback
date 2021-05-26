const mongoose = require('mongoose');
require('dotenv').config();
const usr = process.env.USERNAME;
const pwd = process.env.PASSWORD;
const user = require('./user');
const ticket = require('./ticket');
const transport = require('./transport');

/* connect to DB */
mongoose.connect(`mongodb+srv://${usr}:${pwd}@cluster0.cp0xl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to MongoDB Atlas'))
  .catch(err => console.log(`Error connecting to MongoDB Atlas: \n ${err}`))

module.exports = {
  mongoose,
  user, 
  ticket,
  transport
}

