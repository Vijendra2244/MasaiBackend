const express = require("express");
const connection = require("./db");
const moviesRouter = require("./controller/moviesController");
const PORT = 8080;

const app = express();
app.use(express.json());

app.use("/movies", moviesRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is listening on port ${PORT}`);
    console.log("DB is also  connected");
  } catch (error) {
    console.log("ERROR", error);
  }
});
