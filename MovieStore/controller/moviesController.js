const express = require("express");
const moviesRouter = express.Router();
const MovieModel = require("../model/Moviesmodel");

moviesRouter.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.movieTitle) {
      query.movieTitle = new RegExp(req.query.movieTitle);
      console.log(req.query.movieTitle);
    }
    if (req.query.rating) {
      req.query.rating = { $eq: req.query.rating };
      console.log(req.query.rating);
    }
  
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const movieData = await MovieModel.find(query).skip(skip).limit(limit);
    res.send(movieData);
  } catch (error) {
    res.send({ msg: error });
  }
});

moviesRouter.post("/addMovies", async (req, res) => {
  try {
    const addMovie = req.body;
    const movies = new MovieModel(addMovie);
    await movies.save();
    res.send("movies is added");
  } catch (error) {
    res.send({ msg: error });
  }
});
moviesRouter.patch("/updatemovies/:moviesId", async (req, res) => {
  try {
    const { moviesId } = req.params;
    const data = req.body;
    await MovieModel.findByIdAndUpdate({ _id: moviesId }, data);
    res.send("movies updated");
  } catch (error) {
    res.send({ msg: error });
  }
});
moviesRouter.delete("/deleteMovies/:moviesId", async (req, res) => {
  try {
    const { moviesId } = req.params;
    await MovieModel.findByIdAndDelete({ _id: moviesId });
    res.send("movies document is deleted");
  } catch (error) {
    res.send(error);
  }
});
module.exports = moviesRouter;
