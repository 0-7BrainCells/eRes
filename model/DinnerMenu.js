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
    }
  });

module.exports = mongoose.model('DinnerMenu', dinnerMenuSchema);