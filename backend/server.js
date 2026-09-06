require("dotenv").config({path: "../.env"});
const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");


async function startServer() {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log("Server is runnning on http://localhost:3000");
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}

startServer();