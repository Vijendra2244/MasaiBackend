const express = require("express");

const userRouter = express.Router();
const { registration, login } = require("../controller/userController");

userRouter.route("/register").post(registration);
userRouter.route("/login").post(login);

module.exports = userRouter;
