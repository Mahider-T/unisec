const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
        minLength: 1,
        maxLength: 60
    },
    position:{
        type: String,
        // required: true,
        minLength: 1,
        maxLength: 60
    },
    image: {
        //required: true,
        data: Buffer,
        contentType: String
    },
    joinDate : {
        type: Date,
        default: () => new Date(),
        immutable: true
    },
    UpdatedOn : {
        type: Date,
        default: () => new Date(),
        immutable: true
    }
})

module.exports = mongoose.model("Author", authorSchema)