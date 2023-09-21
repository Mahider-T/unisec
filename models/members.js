const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      },
    age: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['student', 'non student'],  
    },
    university: {
      type: String,
    },
    field:{
      type: String
    },
    registered_on:{
      type: Date,
      default: Date.now
    },
    is_valid: {
      type: Boolean,
      default: true
    },});

const members = mongoose.model('Members', memberSchema);
module.exports = members;