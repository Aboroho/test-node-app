const jwt = require("jsonwebtoken");

const authorizeMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { JWT_SECRET } = process.env;
    if (!authorization) return res.status(401).send("No key provided");
    const token = authorization.split(" ")[1];

    const decoded = await jwt.verify(token, JWT_SECRET, { expiredIn: "1h" });
    const { username, userId } = decoded;

    req.username = username;
    req.userId = userId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorizeMiddleware;
