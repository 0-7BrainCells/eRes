const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dinnerMenuSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
      type: String,
      required: false
    }
  });

module.exports = mongoose.model('DinnerMenu', dinnerMenuSchema);