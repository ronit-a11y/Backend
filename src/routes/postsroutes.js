const express = require("express");
const postscontrollers = require("../controllers/postscontrollers");
const router = express.Router();

// Get all posts
router.get("/", postscontrollers.getpostList);

// Add new post
router.post("/", postscontrollers.addPostinDB);

// Get post by ID
router.get("/:id", postscontrollers.addPostbyID);

module.exports = router;