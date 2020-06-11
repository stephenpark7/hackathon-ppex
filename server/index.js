const express = require("express");
const path = require("path");
const app = express();
require("dotenv/config");

const SERVER_PORT = process.env.PORT || 5000;
const PRODUCTION_MODE = process.env.NODE_ENV === "production";

const middleware = require("./middlewares/middleware");
app.use(middleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (PRODUCTION_MODE) {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(require("./api/users"));

if (PRODUCTION_MODE) {
  app.get("/", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.listen(SERVER_PORT, () => {
  if (!PRODUCTION_MODE)
    console.log("Server started at: " + SERVER_PORT);
});