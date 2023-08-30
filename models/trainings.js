const mongoose = require('mongoose')

const trainingSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
   description:{
        type: String,
        require: true
   },
   starts_on:{
    type: Date,
   },
   status:{
    type: String,
    enum: ['Done', 'In progress', 'Not started']
   }
})

const training = mongoose.model('Training',trainingSchema)
module.exports = training;