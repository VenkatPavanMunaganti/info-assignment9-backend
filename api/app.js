const express = require("express");
const mongoose = require("mongoose");
const cors= require('cors');
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());

const url = process.env.MONGODB_CONNECTION

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((err) => console.log(err))

app.use("/users", require('./routes/userRoute'));

module.exports = app