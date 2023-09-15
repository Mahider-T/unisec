const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
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
    status:{
        type: String,
        enum: ['Done', 'In progress', 'Not started'],
    },
    tags:{
        type:[String],
    },
    participants:{
        type:Object,
    }
})

const projects = mongoose.model('Projects', projectsSchema);
module.exports = projects;