const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const BlackListModel = require("../model/blacklistmodel");

const getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).json({ status: "Success", data: { user } });
  } catch (error) {
    res.status(400).json({ status: "Not getting the data" });
  }
};

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const users = new UserModel({ userName, email, password });
    await users.save();
    res.status(200).send({ msg: "New user is created ", data: { users } });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
};
const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findTheUser = await UserModel.findOne({ email });

    if (!findTheUser) {
      return res.status(401).send({ msg: "User not found" });
    }

    const passwordValidation = await findTheUser.comparePassword(password);

    if (!passwordValidation) {
      return res.status(401).send({ msg: "Password is incorrect" });
    }

  

    const access_token = await findTheUser.generateAccessToken()
    const refreshToken = await findTheUser.generateRefreshToken()

    res.cookie("access_token", access_token);
    res.cookie("refresh_token", refreshToken);

    res.status(200).send({
      msg: "User is logged in successfully",
      access_token: access_token,
      refresh_token: refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", data: { error } });
  }
};


const logout = async (req, res) => {
  const token = req.cookies["access_token"];
  const refresh_token = req.cookies["refresh_token"];
  try {
    const addedTokenInBlackList = new BlackListModel({ token, refresh_token });
    await addedTokenInBlackList.save();
    res.status(200).send("Token added successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

const aboutUser = async (req, res, next) => {
  // const token = req.headers.authorization;
  // console.log(token)
  // jwt.verify(token, "auth", (err, decode) => {
  //   if (err) {
  //     res
  //       .status(401)
  //       .send({ msg: "First login and after that you got it", error: { err } });
  //   } else {
  //     res.status(200).send("You are on about page...");
  //   }
  // });
  res.status(200).send("You are on about page...");
};

module.exports = {
  register,
  getAllUser,
  loginUsers,
  aboutUser,
  logout,
};
