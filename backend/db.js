const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/mynotes";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    console.log("Connected to mongo succesfully");
}

module.exports = connectToMongo;