require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connect DB

// importing routers
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");

// importing middlewares
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5002;

const start = () => {
  try {
    app.listen(port, console.log(`Server is running at port ${port}... `));
  } catch (e) {
    console.log(e);
  }
};

start();
