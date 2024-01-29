const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const BlackListModel = require("../models/blacklistModel");

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
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        throw err;
      } else {
        const users = new UserModel({ userName, email, password: hash });
        await users.save();
        res.status(200).send({ msg: "New user is created ", data: { users } });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
};
const loginUsers = async (req, res) => {
  console.log(req.cookies);
  try {
    const { email, password } = req.body;
    const findTheUser = await UserModel.findOne({ email });
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = currentTime + 60 * 60;
    const expirationTime7days = currentTime + 7 * 24 * 60 * 60;

    const cookiesOptions = { httpOnly: true, secure: true, sameSite: "none" };

    if (findTheUser) {
      bcrypt.compare(password, findTheUser.password, (err, result) => {
        if (err) {
          throw err;
        } else {
          const access_token = jwt.sign({ user: "login" }, "auth", {
            expiresIn: expirationTime,
          });

          const refresh_token = jwt.sign({ user: "login" }, "auth", {
            expiresIn: expirationTime7days,
          });
          res.cookie("access_token", access_token, cookiesOptions);
          res.cookie("refresh_token", refresh_token, cookiesOptions);
          res.status(200).send({
            msg: "User is login successfully",
            access_token: access_token,
            refresh_token: refresh_token,
          });
        }
      });
    }
  } catch (error) {
    res.status(409).json({ status: "error", data: { error } });
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
