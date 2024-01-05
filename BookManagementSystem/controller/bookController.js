const express = require("express");
const BookModel = require("../model/bookModel");
const bookValidator = require("../Middleware/bookValidator");

const bookRouter = express.Router();
//get request for all data and also for query
bookRouter.get("/", async (req, res) => {
  try {
    const query = req.query;
    const getAllBooks = await BookModel.find(query);
    res.status(200).send(getAllBooks);
  } catch (error) {
    console.log("ERROR in get request", error);
    res.send(error);
  }
});
//get request for get the books depend on search examples title,author

bookRouter.get("/search", async (req, res) => {
  try {
    const query = {};
    if (req.query.bookTitle) {
      query.bookTitle = new RegExp(req.query.bookTitle);
    }
    if (req.query.author) {
      query.author = new RegExp(req.query.author);
    }
    const bookData = await BookModel.find(query);
    res.status(200).json({ status: "Success", data: { bookData } });
  } catch (error) {
    console.log(error);
    res.send("ERROR", error);
  }
});

// post the data which is means add the data in database and also validate the data with the help of middleware

bookRouter.post("/add", bookValidator, async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/plain");
    const bookData = req.body;
    const addDataInDb = new BookModel(bookData);
    await addDataInDb.save();
    res
      .status(200)
      .json({ status: "The book has been added", data: { addDataInDb } });
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed" + error);
  }
});

//update the book info

bookRouter.patch("/update/:Id", async (req, res) => {
  try {
    const { Id } = req.params;
    const updatedData = req.body;
    const updatedBookInfo = await BookModel.findByIdAndUpdate(
      { _id: Id },
      updatedData
    );
    res.status(200).json("Update successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Failed", data: { error } });
  }
});

//delete the book info

bookRouter.delete("/delete/:Id", async (req, res) => {
  try {
    const Id = req.params.Id;
    const deletedData = await BookModel.findByIdAndDelete({ _id: Id });
    res
      .status(200)
      .json({ status: "Deleted Successfully", data: { deletedData } });
  } catch (error) {
    console.log("error");
    res.status(400).json("ERROR", error);
  }
});

module.exports = bookRouter;
