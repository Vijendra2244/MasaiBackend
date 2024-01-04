const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movieTitle: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
},{versionKey:false});

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = MovieModel;
