const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
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
    type: {
      type: String,
      required: true,
      enum: ['student', 'non student'],  },
    is_valid: {
      type: Boolean,
      default: true
    },});

const members = mongoose.model('Members', memberSchema);
module.exports = members;