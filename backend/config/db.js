// load relevant modules for db.js
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// load env vars
dotenv.config({ path: "config.env" });

mongoose.set("strictQuery", true);

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });

  console.log(
    `MongoDB Connected: ${conn.connection.host}`.orange.underline.bold
  );
};

// so that we can export functions, objects, and their references from one file
// and use them in other files by importing them by require() method.
module.exports = connectDB;
