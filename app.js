const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const handleError = require("./utils/handleError");

const app = express();
const { PORT = 3001, NODE_ENV } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to wtwr_db");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Optional: exit on DB failure
  });

app.use(cors());
app.use(express.json());

// Inject test user for endpoint testing
if (NODE_ENV === "test") {
  app.use((req, res, next) => {
    req.user = { _id: "5d8b8592978f8bd833ca8133" };
    next();
  });
}

app.use("/", mainRouter);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
