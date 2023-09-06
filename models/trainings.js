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
        default: Date.now,
   },
   ends_on:{
        type: Date,
   },
//    status:{
//      type: String,
//      enum: ['Done', 'In progress', 'Not started'],
//      get: function(){
//                const today = new Date();
//                if(this.ends_on > today){
//                    return 'Done';
//                }else if(this.starts_on <= today && this.ends_on >= today){
//                    return 'In progress';
//                }else{
//                    return 'Not started';
//                }
//           }
//      }
})

const trainings = mongoose.model('Training',trainingSchema)
module.exports = trainings;