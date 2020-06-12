const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async function (req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.objectID = ObjectID;
  req.dbClient = client;
  req.db = client.db(process.env.DB_NAME);
  return next();
}