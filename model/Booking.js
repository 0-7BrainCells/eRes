const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    fname: {
      type: String,
      required: true
    },
    lname: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
      type: Date,
      required: true
    },
    numguests: {
        type: String,
        required: true
    }
  });

module.exports = mongoose.model('Booking', bookingSchema);