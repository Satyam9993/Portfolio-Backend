const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
const connectToMongo =  ()=>{
    mongoose.connect(mongoURI, (req, res)=>{
        console.log("Connected to moongoose successfully");
    })
}

module.exports = connectToMongo;