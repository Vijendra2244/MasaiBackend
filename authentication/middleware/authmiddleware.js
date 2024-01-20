const jwt = require("jsonwebtoken");
const BlackListModel = require("../model/blacklistmodel");

const auth = async (req, res, next) => {
  const token = req.cookies["access_token"];
  const refresh_token = req.cookies["refresh_token"];

  try {
    // Check if the access token is blacklisted
    const isBlackListedToken = await BlackListModel.exists({ token });
    if (isBlackListedToken) {
      return res.status(400).send("Token is expired, please login again");
    }

    // Verify the access token
    jwt.verify(token, "auth", (err, decoded) => {
      if (err) {
        if (err.message === "jwt expired") {
          // Verify the refresh token
          jwt.verify(refresh_token, "auth", async(err, refreshDecoded) => {
            if (err) {
              // Refresh token is invalid or expired
              return res.status(400).send("Refresh token is invalid or expired");
            } else {
              // Check if the refresh token is blacklisted
              const isRefreshTokenBlacklisted = await BlackListModel.exists({ token: refresh_token });
              if (isRefreshTokenBlacklisted) {
                return res.status(400).send("Refresh token is expired, please login again");
              }

              // Generate a new access token
              const newAccessToken = jwt.sign({ users: "vijendra" }, "auth");
              res.cookie("access_token", newAccessToken, { httpOnly: true });
              next();
            }
          });
        }
      } else {
        // Access token is valid
        next();
      }
    });
  } catch (error) {
    res.status(400).send("Please login again");
  }
};

module.exports = auth;


module.exports = auth;
