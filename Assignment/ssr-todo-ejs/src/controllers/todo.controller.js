const Todo = require("../models/Todo");

exports.listTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.render("todos/index", { user: req.user, todos });
};

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.redirect("/todos");

  await Todo.create({ user: req.user._id, title });
  res.redirect("/todos");
};

exports.toggleTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) {
    const err = new Error("Todo not found");
    err.statusCode = 404;
    throw err;
  }

  todo.completed = !todo.completed;
  await todo.save();

  res.redirect("/todos");
};

exports.deleteTodo = async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id, user: req.user._id });
  res.redirect("/todos");
};