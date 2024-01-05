const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.BOOK_DB_MANAGEMENT);

module.exports = connection;
