const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({   
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
        type: String,
        required: true
      },
    quantity: {
      type: String,
      required: true
    }
  });
  
module.exports = mongoose.model('Order', orderSchema);