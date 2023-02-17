// load the relevant modules for server.js
const express = require("express");
const dotenv = require("dotenv");
const colors = require(colors);
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// load env vars
dotenv.config({ path: `${__dirname}/config/config.env` });

// connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser 
app.use(cookieParser());

// Mount routers
app.use("/homesearch/v1/auth", auth);

// Error Handler 
app.use(errorHandler) // order matters over here 

const PORT = process.env.PORT || 3000; 

// variable named "server" so that the server can be closed
// when encountering errors
const server = app.listen(
    PORT, 
    console.log(
        `Now listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);

// handle unhandled promise rejections 
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);;
    // close server & exit process
    server.close(() => process.exit(1))
})
