const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  data: Date,
  city: { type: String, require: [true, 'a concert must have a city'] },
  capacity: Number,
  location: String,
  soldTickets: Number,
});

const Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert;
