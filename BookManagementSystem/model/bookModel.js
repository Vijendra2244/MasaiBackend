const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
