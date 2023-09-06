const mongoose = require('mongoose');


const newsSchema = new mongoose.schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },

    image:{
        required: true,
        data: Buffer,
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