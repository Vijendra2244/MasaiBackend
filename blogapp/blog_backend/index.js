const express = require("express");
const dotenv = require("dotenv");
const connection = require("./db");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: [
    "http://127.0.0.1:5173/",
    "https://impossible-tuna-top-coat.cyclic.app",
  ],
  credential: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

app.get("/", (req, res) => {
  try {
    res.status(200).send({ msg: "Homepage" });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${PORT}`);
    console.log(`DB is connected`);
  } catch (error) {
    console.log(error);
  }
});
