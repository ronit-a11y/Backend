const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { requireAuth } = require("../middleware/auth");
const todo = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", requireAuth, asyncHandler(todo.listTodos));
router.post("/", requireAuth, asyncHandler(todo.createTodo));
router.post("/:id/toggle", requireAuth, asyncHandler(todo.toggleTodo));
router.post("/:id/delete", requireAuth, asyncHandler(todo.deleteTodo));

module.exports = router;