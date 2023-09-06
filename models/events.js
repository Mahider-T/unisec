const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    starts_on:{
        type: Date,
        required: true,
        default: Date.now
    },
    ends_on:{
        type: Date,
    },
    imageURL:{
        type: String,
        required: true,
    },
    // status:{
    //     type: String,
    //     enum: ['Done', 'In progress', 'Not started'],
    // },
    tags:{
        type:[String],
    },
})
const events = mongoose.model("Events", eventSchema);
module.exports = events;