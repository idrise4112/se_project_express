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
<<<<<<< HEAD
    console.log("Connected to wtwr_db");

    app.listen(PORT, () => {
=======
    // eslint-disable-next-line no-console
    console.log(" Connected to wtwr_db");

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641
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

<<<<<<< HEAD
// Centralized error handler
app.use(handleError);
=======
app.use(/.*/, (req, res) => {
  res
    .status(404)
    .type("application/json")
    .json({ message: "Requested resource not found." });
});
>>>>>>> 19347f058f0c0ab281e0307cc85b15d3f3b71641

// Centralized error handler
app.use(handleError);

module.exports = app;
