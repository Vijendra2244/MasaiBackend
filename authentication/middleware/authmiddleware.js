const jwt = require("jsonwebtoken");
const BlackListModel = require("../model/blacklistmodel");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const isBlackListedToken = await BlackListModel.exists({ token });
    if (isBlackListedToken) {
      return res.status(400).send("Token is expired please login again");
    }
    jwt.verify(token, "auth", (err, decode) => {
      if (err) {
        throw err;
      } else {
        console.log(decode);
        next();
      }
    });
  } catch (error) {
    res.status(400).send("Please login again");
  }
};

module.exports = auth;
