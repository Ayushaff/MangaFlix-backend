//Instance of connection to database
const mongoose = require('mongoose');
const config = require('config');


const connectDB = () => {
    const {atlas} = config.get("mongo");
    const uri = `mongodb+srv://${atlas.user}:${atlas.password}@${atlas.cluster}/${atlas.database}`;
    return mongoose.connect(uri);
};

//exports
module.exports = connectDB;