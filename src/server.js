const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dev_vlog";

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log(`MongoDB connected: ${mongoUri}`);
        app.listen(port, () => {
            console.log(`server running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    });
