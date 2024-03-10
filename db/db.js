const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/tw-db"

async function dbConnect() {
    mongoose.connection.on('connected', () => console.log('connected'));
    mongoose.connection.on('open', () => console.log('open'));
    await mongoose.connect(url);
}

module.exports = dbConnect
