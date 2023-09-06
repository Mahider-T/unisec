const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member', // Reference to the Member model
    },
    school: {
      type: String,
      required: true,
    },
    grade_or_year: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  });

  const students = new mongoose.model('Students', studentSchema)
  module.exports = students;