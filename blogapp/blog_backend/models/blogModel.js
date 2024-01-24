const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
    },
    blogDescription: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;
