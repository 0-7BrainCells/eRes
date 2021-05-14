const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    bookingID: {
      type: String,
      required: true
    },
    totalPrice: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('Invoice', invoiceSchema);