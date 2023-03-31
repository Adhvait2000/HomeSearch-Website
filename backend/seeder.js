const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const User = require("./models/User");
const MainData = require("./models/MainData");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const maindata = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/trial.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    // await MainData.create(maindata);
    await User.create(users);
    await MainData.create(maindata);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data
const deleteData = async () => {
  try {
    // await Bootcamp.deleteMany();
    // await MainData.deleteMany();
    await User.deleteMany();
    await MainData.deleteMany();
    console.log("Data Deleted...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
