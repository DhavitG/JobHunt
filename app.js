require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 5002;

const start = () => {
  try {
    app.listen(port, console.log(`Server is running at port ${port}... `));
  } catch (e) {
    console.log(e);
  }
};

start();
