require("dotenv").config({
    path: require("path").join(__dirname, "../.env"),
});

const fs = require("fs");
const https = require("https");
const path = require("path");

const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");

const httpsOptions = {
    key: fs.readFileSync(
        path.join(__dirname, "certificates", "localhost-key.pem")
    ),
    cert: fs.readFileSync(
        path.join(__dirname, "certificates", "localhost.pem")
    ),
};

async function startServer() {
    try {
        await connectDB();

        https.createServer(httpsOptions, app).listen(3000, () => {
            console.log("Server is running on https://localhost:3000");
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}

startServer();