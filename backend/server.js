// load the relevant modules for server.js
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// load env vars
dotenv.config({ path: `${__dirname}/config/config.env` });

// connect to database
connectDB();

// Router files
const auth = require("./routes/auth");


const search = require("./routes/search");
const watchlist = require("./routes/watchlist");
const priceestimator = require("./routes/priceestimator");



const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});




// Mount routers
// app.get("/homesearch", (req, res) => {
//   res.redirecrt("homsearch/auth")
// })


app.use("/homesearch/v1/auth", auth);
app.use("/homesearch/v1/watchlist", watchlist);
app.use("/homsearch/v1/search",search);
app.use("/homsearch/v1/estimator",priceestimator);



// Error Handler
app.use(errorHandler); // order matters over here

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
  console.log(`Error: ${err.message}`.red);
  // close server & exit process
  server.close(() => process.exit(1));
});
