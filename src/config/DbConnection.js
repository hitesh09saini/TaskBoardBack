require('dotenv').config();
const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;

const DbConnect = () => {
    mongoose.connect(URL)
    .then(() => {
        console.log(`MongoDB is connected at host: ${mongoose.connection.host}`);
    })
    .catch((e) => { 
        console.error(`MongoDb ERROR: ${e}`);
    });
};

module.exports = DbConnect;
