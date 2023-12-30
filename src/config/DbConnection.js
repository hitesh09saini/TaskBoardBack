require('dotenv').config();
const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;

const DbConnect = () => {
    mongoose.connect(URL);

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error(`MongoDB Connection Error: ${err}`);
    });

    db.once('open', () => {
        console.log(`MongoDB Connected at host: ${db.host}`);
    });

    db.on('disconnected', () => {
        console.warn('MongoDB Disconnected');
    });

    process.on('SIGINT', () => {
        db.close(() => {
            console.log('MongoDB Connection Closed due to application termination');
            process.exit(0);
        });
    });
};

module.exports = DbConnect;
