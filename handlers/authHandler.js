const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createUser } = require("../handlers/userHandlers");
const loginHandler = async (req, res) => {
  const { JWT_SECRET } = process.env;
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user) {
    res.status(401).json({ message: "Authentication failed" });
  } else {
    const passMatch = await bcrypt.compare(
      password.toString(),
      user.password.toString()
    );
    if (passMatch) {
      const token = await jwt.sign({ username, userId: user._id }, JWT_SECRET);
      res.send({ token });
    } else res.status(401).json({ message: "Authentication failed" });
  }
};

const signupHandler = async (req, res) => {
  //   return res.send("signup");
  await createUser(req, res);
};

module.exports = {
  loginHandler,
  signupHandler,
};
