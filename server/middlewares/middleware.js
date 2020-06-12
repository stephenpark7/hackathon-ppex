const connect = require("connect");
const database = require("./database");
const requestIp = require("request-ip");
const PRODUCTION_MODE = process.env.NODE_ENV === "production";
let MY_IP; if (!PRODUCTION_MODE) MY_IP = "99.224.171.173";

const app = connect();

app
  .use(database)
  .use((req, res, next) => {
    const clientIp = PRODUCTION_MODE ? requestIp.getClientIp(req) : MY_IP;
    req.clientIp = clientIp;
    next();
  });

module.exports = app;