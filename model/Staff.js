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
    }
  });

module.exports = mongoose.model('Staff', staffSchema);