const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema(
  {
    token: {
      type: String,
    },
  },
  { versionKey: false }
);

const BlackListModel = new mongoose.model("BlackList", blacklistSchema);

module.exports = BlackListModel;
