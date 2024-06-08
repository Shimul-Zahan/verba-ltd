const mongoose = require('mongoose');
require('dotenv').config();

const connecting = () => {
    const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@shimulclaster1.85diumq.mongodb.net/?retryWrites=true&w=majority`;
    return uri;
}

const connectDB = async () => {
    console.log('testing.....');
    const test = connecting();
    await mongoose.connect(test, { dbName: 'VERBA_LTD' })
    console.log('connected');
}

module.exports = connectDB;