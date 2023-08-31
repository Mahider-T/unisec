const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    starts_on:{
        type: Date,
    },
    ends_on:{
        type: Date,
    },
    status:{
        type: String,
        enum: ['Done', 'In progress', 'Not started'],
    },
    tags:{
        type:[String]
    }
})

const projects = mongoose.model('Projects', projectsSchema);
module.exports = projects;