const mongoose  = require("mongoose")
const dotenv  =require("dotenv")
dotenv.config()
  

const connectionToDb = mongoose.connect(process.env.MONGODB_URI)


module.exports  = connectionToDb