const mongoose = require('mongoose');
require('dotenv').config()

const connectionParams = {
    useNewUrlParser : true,
    useUnifiedTopology : true
    // useCreateIndex : true,
}
// console.log(process.env.MONGO_USER)
// console.log(process.env.MONGO_PASSWORD)
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@unisec.tgi7iee.mongodb.net/?retryWrites=true&w=majority`
 
const connection = mongoose.connect(uri, connectionParams).then(()=>{console.log("Connected to the MongoDB cluster successfully")}).catch((err)=>{console.error(err)})
 
module.exports = connection;
