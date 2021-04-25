const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const discountSchema = new Schema({
    ID: {
      type: String,
      required: true
    },
    percent: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('Discount', discountSchema);