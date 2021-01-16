const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();
// import routes
const usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// routes
app.get("/", (req, res) => {
  res.send("homepage");
});
// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);

// connect to the mongodb
mongoose.connect(uri, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connected");
});

// app listening
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
