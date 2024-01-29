const express = require("express");
const {
  getAllBlog,
  createdBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController.js");
const auth = require("../middleware/authMiddleware.js");

const blogRouter = express.Router();
// blogRouter.get("/",(req,res)=>{
//   res.send("hey there")
// })
blogRouter.route("/").get( getAllBlog);
blogRouter.route("/addblog").post(auth, createdBlog);
blogRouter.route("/updateblog/:id").patch(auth, updateBlog);
blogRouter.route("/deleteblog/:id").delete(auth, deleteBlog);

module.exports = blogRouter;
