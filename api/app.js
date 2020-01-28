let createError = require("http-errors");
const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
let path = require("path");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
logger = require("morgan");

const getPlayers = require("./routes/getPlayers");
const savePlayers = require("./routes/savePlayers");

let app = express();

// this is our MongoDB database
const dbRoute =
  "mongodb+srv://spineiro:0733mfODdsiHVsXo@cluster0-rvjtw.gcp.mongodb.net/test?retryWrites=true&w=majority";

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//app.use(app.route);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(getPlayers);
// app.use(savePlayers);

app.use("/getPlayers", getPlayers);
app.use("/savePlayers", savePlayers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
module.exports = app;
