const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    bookingID: {
      type: String,
      required: true
    },   
    email: {
        type: String,
        required: true
      },
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    quantity: {
        type: Number,
        required: true
      },
    isConfirmed: {
      type: Boolean,
      value: false,
      required: true
    },
    sessionID: {
      type: String,
      required: true
    }
  });
  
module.exports = mongoose.model('Order', orderSchema);