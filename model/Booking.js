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
    table: {
      type: Number,
      required: true
    },
    numGuests: {
        type: Number,
        required: true
    },
    isConfirmed: {
      type: Boolean,
      value: false,
      required: true
    },
    hasExpired: {
      type: Boolean,
      value: false,
      required: true
    },
    sessionID: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('Booking', bookingSchema);