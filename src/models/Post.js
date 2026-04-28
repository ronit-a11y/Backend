const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        location: { type: String, trim: true, default: "" },
        content: { type: String, required: true, trim: true },
        videoUrl: { type: String, trim: true, default: "" },
        imageUrl: { type: String, trim: true, default: "" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
