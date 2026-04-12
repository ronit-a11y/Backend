require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const todoRoutes = require("./src/routes/todo.routes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// View engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "src", "public")));

// Routes
app.get("/", (req, res) => res.redirect("/todos"));
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

// 404
app.use((req, res) => res.status(404).send("Not Found"));

// Error handler (must be last)
app.use(errorHandler);

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start:", err);
    process.exit(1);
  });