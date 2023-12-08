const express = require("express");
const dotenv = require("dotenv");

const publicRouter = require("./publicRouter");
const adminRouter = require("./adminRouter");
const todoRouter = require("./router/todoRouter");
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");

const authorizeMiddleware = require("./middlewares/authorizeMiddleware");

const mongoose = require("mongoose");

// init
dotenv.config();

mongoose
  .connect("mongodb://localhost/todo")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const app = express();

// ======================
app.use(express.json());

app.use("/", publicRouter);
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/todo", authorizeMiddleware, todoRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen("3000", () => {
  console.log("Running on http://localhost:3000");
});
