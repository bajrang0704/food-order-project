const app = require("./app"),
  connectDatabase = require("./config/database"),
  dotenv = require("dotenv"),
  cloudinary = require("cloudinary"),
  { setDriver } = require("mongoose");

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("ERROR: " + err.stack);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// Setting up config file
dotenv.config({ path: "./config/config.env" });

// Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 10000, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT || 10000} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log("ERROR: " + err.message);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
