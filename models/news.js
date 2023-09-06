const mongoose = require('mongoose');


const newsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },

    image:{
        type: Buffer,
        required: true,
        contentType: String,
    },
    body:{
        type:String,
        required: true,
    },
    tags:{
        type: String,
        enum:['Astronomy', 'Geolocation', 'Community']
    },
    author:{
        type: String,
        required: true,
    },
    publishDate:{
        type: Date,
        required: true,
    }
})

const news = mongoose.model("News", newsSchema);
module.exports = news;