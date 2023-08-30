const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
    {
        title: {
            type:String, 
        },
        content:{
            type: String
        },
        author:{
            type: mongoose.Schema.ObjectId,
            require:true
        },
        comment:{

        }
    }
)
const blog = mongoose.model('Blog', blogSchema)
module.exports = blog;