const express = require("express");
// const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

const app = express();
// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));

// Routes

app.all("*", (req, res, next) => {
  return next(
    new AppError(
      `${req.originalUrl}, this route is not found on this server`,
      404
    )
  );
});

module.exports = app;
