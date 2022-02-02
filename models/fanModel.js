const mongoose = require('mongoose');

const fanSchema = new mongoose.Schema({
  name: { type: String, require: [true, 'the fan must type his name'] },
  email: String,
  birthday: Date,
  gender: String,
  favourite_album: String,
  news: Boolean,
});

const Fan = mongoose.model('Fans', fanSchema);

module.exports = Fan;
