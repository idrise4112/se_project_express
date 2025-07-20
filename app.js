const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { getUsers } = require("./controllers/users");
// imagine we make a GET request to /users
const app = express();

const { PORT = 3001 } = process.env;
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to D8");
  })
  .catch(console.error);
app.use(express.json());

//app.get("/users", getUsers);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
