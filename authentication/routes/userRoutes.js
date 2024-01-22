const express = require("express");
const userRouter = express.Router();
const {
  register,
  getAllUser,
  loginUsers,
  aboutUser,
  logout,
} = require("../controller/userController");


userRouter.route("/").get(getAllUser);
userRouter.route("/about").get( aboutUser);
userRouter.route("/register").post(register);
userRouter.route("/login").post(loginUsers);
userRouter.route("/logout").post(logout);

module.exports = userRouter;
