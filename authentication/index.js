const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./db");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const nodemailer = require('nodemailer')

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

// //for practice purpose email sending 
// if we are using gmail so we need to more configuration
// const transporter = nodemailer.createTransport({
  //    service:"gmail"
//   host: 'smtp.gmail.com',
//   port: 587,
//   auth: {
//       user: 'dawson9@ethereal.email', //real my own mail
//       pass: '3fNUmQGJbaFW5VMzyV' //real password of my mail
//   }
// });
// transporter.sendMail({
//   to:"dawson9@ethereal.email",
//   from:"vs230267@gmail.com",
//   subject:"First email from my own application",
//   text:"Hy how are and where are you ?",
//   html:"<h1>First mail</h1>"
// }).then(()=>{
//   console.log("mail send successfully")
// })
// .catch((err)=>{
//   console.log(err)
// })

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
