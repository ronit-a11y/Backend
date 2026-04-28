const Post = require("../models/Post");

const getpostList = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Could not load vlogs" });
    }
};

const addPostinDB = async (req, res) => {
    try {
        const { title, author, location, content, videoUrl, imageUrl } = req.body;

        if (!title || !author || !content) {
            return res.status(400).json({ error: "Title, author, and story are required" });
        }

        const post = await Post.create({
            title,
            author,
            location,
            content,
            videoUrl,
            imageUrl,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: "Could not create vlog" });
    }
};

const addPostbyID = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Vlog not found" });
        }

        res.json(post);
    } catch (error) {
        res.status(400).json({ error: "Invalid vlog id" });
    }
};


module.exports = {
    getpostList,
    addPostinDB,
    addPostbyID,
};
