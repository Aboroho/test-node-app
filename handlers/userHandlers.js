const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = User.find({ _id: id });
  res.send(user);
};

const getUserByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username });

  res.send(user);
};

const deleteUserByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.deleteOne({ username: username });
  res.send(user);
};

const updateUserNameByUsername = async (req, res) => {
  const username = req.params.username;
  const { name } = req.body;
  const user = await User.updateOne({ username: username }, { name: name });
  res.send(user);
};

const createUser = async (req, res) => {
  const { username, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password.toString(), 10);
  try {
    const existUser = await User.findOne({ username: username });

    if (existUser) return res.send({ message: "username exists" });

    const user = new User({ username, name, password: hashedPassword });
    await user.save();
    res.send(user);
  } catch (err) {
    res.send(err);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().populate("todos");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  getUserByUsername,
  updateUserNameByUsername,
  deleteUserByUsername,
  getAllUser,
};
