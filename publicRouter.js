const express = require("express");

const router = express.Router();

// middlewire
router.param("userId", (req, res, next, userId) => {
  if (userId == 1) req.user = "admin";
  else req.user = "public";
  next();
});

// route

router
  .route("/dashboard")
  .get((req, res, next) => {
    console.log("first match");
    next();
  })
  .get((req, res) => {
    res.send(`Hello ${req.user} You are inside dashboard`);
  })
  .post((req, res) => {
    res.send("post dashboard");
  })
  .put((req, res) => {
    throw new Error();
  });

router.route("/dashboard/:userId").get((req, res) => {
  res.send(`Hello ${req.user} You are inside dashboard`);
});

// Error handler
router.use((err, req, res, next) => {
  console.log(req.method);
  if (req.method === "PUT") {
    res.status(403);
    res.send("method not allowed");
  } else {
    res.status(500);
    res.send("something on the serverside");
  }
});

router.use((err, req, res, next) => {
  res.status(500);
  res.end();
});

module.exports = router;
