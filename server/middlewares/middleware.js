const connect = require("connect");
const database = require("./database");

const app = connect();

app
  .use(database)

module.exports = app;