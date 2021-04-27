const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    email: {
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
    numGuests: {
        type: String,
        required: true
    }
  });

module.exports = mongoose.model('Booking', bookingSchema);