const express = require("express");
const bookRouter = require("./controller/bookController");
const connection = require("./db");

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).send("WELCOME TO BOOKSTORE MANAGEMENT SYSTEM");
  } catch (error) {
    res.status(400).send("ERROR", error);
  }
});

app.use("/books", bookRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is listening on port ${PORT}`);
    console.log(`BOOK DB is also connected`);
  } catch (error) {
    console.log("ERROR", error);
  }
});
