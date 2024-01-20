const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./db");
const userRouter = require("./routes/userRoute");

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Home-page");
});
app.use("/users", userRouter);
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is listening on port ${PORT}`);
    console.log(`DB is connected`);
  } catch (error) {
    console.log(error);
  }
});
