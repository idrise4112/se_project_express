const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mainRouter = require("./routes/index");
const handleError = require("./utils/handleError");

const app = express();
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to wtwr_db");

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(" MongoDB connection error:", err);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", mainRouter);

// Centralized error handler
app.use(handleError);

module.exports = app;
