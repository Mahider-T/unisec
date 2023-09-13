const mongoose = require('mongoose')

const trainingSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
   description:{
        type: String,
        required: true
   },
   starts_on:{
        type: Date,
        required: true,
        default: Date.now,
   },
   ends_on:{
        type: Date,
   },
   status:{
     type: String,
     enum: ['Done', 'Underway', 'Upcoming'],
     }
})

const trainings = mongoose.model('Training',trainingSchema)
module.exports = trainings;