const mongoose = require("mongoose");
const BlogModel = require("../model/blogModel");
const jwt = require("jsonwebtoken");

const getAllBlog = async (req, res) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "auth", async (err, decode) => {
      if (err) {
        res.status(401).send("Please login first");
      } else {
        const blog = await BlogModel.find();
        res.status(201).send(blog);
      }
    });
  } catch (error) {
    res.status(401).send("Please login first");
  }
};
const createdBlog = async (req, res) => {
  try {
    const blogDetails = req.body;
    const creatingBlog = new BlogModel(blogDetails);
    await creatingBlog.save();
    res
      .status(201)
      .send({ msg: "Successfully added a blog", data: { creatingBlog } });
  } catch (error) {
    res.status(401).send("please login first");
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updating = await BlogModel.findByIdAndUpdate(
      {
        _id: id,
      },
      updatedData
    );
    res
      .status(200)
      .send({ msg: "Successfully updated a blog", data: { updating } });
  } catch (error) {
    res.status(401).send("Please login first");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlog = await BlogModel.findByIdAndDelete({ _id: id });
    res.status(201).send({ msg: "Deleted blog", data: { deleteBlog } });
  } catch (error) {
    res.status(401).send({ msg: "Please login first", error });
  }
};

module.exports = {
  getAllBlog,
  createdBlog,
  updateBlog,
  deleteBlog,
};
