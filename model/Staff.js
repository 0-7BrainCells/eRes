const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    ID: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('User', staffSchema);