const jwt = require("jsonwebtoken");
const BlackListModel = require("../model/blacklistmodel");

const auth = async (req, res, next) => {
  const access_token = req.cookies["access_token"];
  const refresh_token = req.cookies["refresh_token"];


  try {
    const isBlackListedToken = await BlackListModel.exists({
      token: access_token,
    });

    if (isBlackListedToken) {
      return res.status(400).send("Token is expired, please login again");
    }

    jwt.verify(access_token, "auth", (err, decoded) => {
      if (err) {
        if (err.message === "jwt expired") {
          jwt.verify(refresh_token, "auth", async (err, refreshDecoded) => {
            if (err) {
              return res
                .status(400)
                .send("Refresh token is invalid or expired");
            } else {
              
              const isRefreshTokenBlacklisted = await BlackListModel.exists({
                token: refresh_token,
              });

              if (isRefreshTokenBlacklisted) {
                return res
                  .status(400)
                  .send("Refresh token is expired, please login again");
              }

              const access_token = jwt.sign({  _id: refreshDecoded.userId }, "auth", {
                expiresIn: "1d",
              });

              res.cookie("access_token", access_token);
              res.status(200).send("user access");
              next();
            }
          });
        }
      } else {
           req.body.userId= decoded.userId
           req.body.userName = decoded.userName
        next();
      }
    });
  } catch (error) {
    res.status(400).send("Please login again>>>>>>>>>>>");
  }
};

module.exports = auth;
