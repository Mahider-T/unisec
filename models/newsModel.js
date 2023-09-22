const mongoose = require('mongoose');
const Author = require('./authorModel')

//create the schema for news
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 80
    },
    imageName: {
        //required: true,
        type: String,
    },
    body: {
        type: String,
        required: true,
        // minLength: 200,
        maxLength: 10000
    },
    tags: {
        type: String, 
        enum: ['Astronomy', 'Geolocation']
    },
    author:{       
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Author'
    },
    publishDate : {
        type: Date,
        default: () => new Date(),
        immutable: true
    },
    updatedOn : {
        type: Date,
        default: () => new Date(),
        immutable: true
    }
})


module.exports = mongoose.model('News', newsSchema)


// update the updated on time on save 
// newsSchema.pre('save', function(next){
//     this.updatedOn = () => new Date();
//     console.log(`the date is updated`)
//     next();
// })