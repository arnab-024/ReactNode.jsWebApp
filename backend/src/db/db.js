const mongoose = require('mongoose');
require("dotenv").config({ path: "../.env" });
const dns = require('dns');

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB: ", error);
    }
}
module.exports = connectDB;