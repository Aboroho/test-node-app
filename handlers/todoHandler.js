const Todo = require("../models/Todo");
const User = require("../models/User");

async function addTodo(req, res, next) {
  const { title, description, status } = req.body;
  const { userId } = req;
  const newTodo = new Todo({ title, description, status, user: userId });

  try {
    const todo = await newTodo.save();
    console.log(todo._id);
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          todos: todo._id,
        },
      }
    );
    res.json(todo);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getAllTodo(req, res, next) {
  const { userId } = req;
  console.log(userId);
  try {
    const todos = await Todo.find({ user: userId })
      .populate("user", "name username -_id")
      .select("title description status -_id");
    res.json(todos);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addTodo,
  getAllTodo,
};
