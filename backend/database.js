const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;

async function connectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

function disconnectDB() {
    mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
