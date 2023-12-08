const express = require("express");
const { addTodo, getAllTodo } = require("../handlers/todoHandler");

const router = express.Router();

router.route("/").get(getAllTodo).post(addTodo);

// Error Handling
router.use((err, req, res, next) => {
  res.send("Something wrong on todo router");
});

module.exports = router;
