require("dotenv").config();

const path = require("path");
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

const userRoutes = require("./routes/User");
const mailRoutes = require("./routes/Mail");
app.use("/user", userRoutes);
app.use("/mail", mailRoutes);

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(4000);
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log(err);
  });
