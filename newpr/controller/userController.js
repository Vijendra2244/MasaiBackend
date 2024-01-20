const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");

const registration = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.status(400).send({ msg: "User is not registered", data: { err } });
      } else {
        const users = new UserModel({ name, email, password: hash });
        await users.save();
        res
          .status(200)
          .send({ msg: "Successfully added a user in DB", data: { users } });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: "User is not registered", data: { error } });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(401).send({ msg: "failed", data: { err } });
        } else {
          const token = jwt.sign({ userauth: "login" }, "auth", {
            expiresIn: "1h",
          });
          const refreshToken = jwt.sign({ userauth: "login" }, "users", {
            expiresIn: "7d",
          });
          res
            .status(200)
            .send({
              msg: "User login successfully",
              token: token,
              refreshToken: refreshToken,
            });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "please registered first", data: { error } });
  }
};

module.exports = { registration, login };
