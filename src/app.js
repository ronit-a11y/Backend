const express = require("express");
const cors = require("cors");
const path = require("path");
const postsRouter = require("./routes/postsroutes");
const commentsRouter = require("./routes/commentsroutes");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Dev Vlog API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

module.exports = app;
