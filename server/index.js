// dependencies
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// env
require("dotenv/config");

// port && production mode
const SERVER_PORT = process.env.PORT || 5000;
const PRODUCTION_MODE = process.env.NODE_ENV === "production";

// middleware
const middleware = require("./middlewares/middleware");
app.use(middleware);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (PRODUCTION_MODE) {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// routing
app.use(require("./api/users"));
app.use(require("./api/listings"));

if (PRODUCTION_MODE) {
  app.get("/", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.listen(SERVER_PORT, () => {
  if (!PRODUCTION_MODE)
    console.log("Server started at: " + SERVER_PORT);
});