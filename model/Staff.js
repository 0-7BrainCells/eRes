const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    ID: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true,
      value: 'staff'
    }
  });

module.exports = mongoose.model('Staff', staffSchema);