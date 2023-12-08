const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  getUserByUsername,
  updateUserNameByUsername,
  deleteUserByUsername,
  getAllUser,
} = require("../handlers/userHandlers");

const router = express.Router();

router.route("/").get(getAllUser).post(createUser);

// router.route("/:id").get(getUserById);

router
  .route("/:username")
  .get(getUserByUsername)
  .put(updateUserNameByUsername)
  .delete(deleteUserByUsername);

module.exports = router;
