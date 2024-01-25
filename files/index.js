const express = require("express");
const dotenv = require("dotenv");
const connectionToDb = require("./db");
const userRouter = require("./routes/user.route");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.get("/", (req, res) => {
  try {
    res.status(200).send({ mag: "Home-page" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.use("/users", userRouter);

app.listen(PORT, async () => {
  try {
    await connectionToDb;
    console.log(`Server is listening on ${PORT} and db is also connected`);
  } catch (error) {
    console.log(error);
  }
});
