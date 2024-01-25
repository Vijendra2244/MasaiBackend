const express = require("express");
const { getAllUser, registerUser } = require("../controller/user.controller");

const userRouter = express.Router();
const upload = require("../middleware/multer.middleware");

userRouter.route("/").get(getAllUser);
userRouter.route("/register").post(
  upload.single("avatar"),
  registerUser
);

module.exports = userRouter;
