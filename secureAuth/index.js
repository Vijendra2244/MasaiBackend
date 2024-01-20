const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();

const PORT = process.env.PORT
console.log(PORT)

const app = express()
app.use(express.json());
app.use(cors())


app.get("/", (req, res) => {
 const data = [1,2,3,4,5,6,7,8,9,10]
 console.log(req.body)
  res.status(200).send(data);

});


app.listen(PORT,  () => {
  console.log(`Server is running on ${PORT}`);
 
});
