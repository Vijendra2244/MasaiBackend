const express = require("express");
const { getAllBlog, createdBlog,updateBlog,deleteBlog } = require("../controller/blogController");
const auth = require("../middleware/authmiddleware.js")

const blogRouter = express.Router();

blogRouter.route("/").get(auth,getAllBlog);
blogRouter.route("/addblog").post(auth,createdBlog);
blogRouter.route("/updateblog/:id").patch(auth,updateBlog)
blogRouter.route("/deleteblog/:id").delete(auth,deleteBlog)

module.exports = blogRouter;
