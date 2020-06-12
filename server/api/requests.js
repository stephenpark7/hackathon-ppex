const express = require("express");
const router = express.Router();

const moment = require("moment");
const authentication = require("../middlewares/authentication");

router.use("/requests", authentication);

// GET MY REQUESTS
router.get("/requests/self", async (req, res) => {

  const requests = await req.db
    .collection("requests")
    .find( { owner: req.userId })
    .toArray();

  res.status(200).json(requests);

});

// GET ALL REQUESTS
router.get("/requests/all", async (req, res) => {

  const requests = await req.db
    .collection("requests")
    .find()
    .toArray();

  res.status(200).json(requests);

});

// ADD A NEW REQUEST
router.post("/requests/new", async (req, res) => {

  let data = req.body;
  data.owner = req.userId;
  data.date = moment.utc();

  // insert request into collection
  const request = await req.db
    .collection("requests")
    .insertOne(data);

  if (request.insertedCount > 0) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "failed to submit new request" });
  }

});

// DELETE A REQUEST
router.delete("/request/:id", async (req, res) => {

  const requestId = req.params.id;

  const requestToDelete = await req.db
    .collection("requests")
    .deleteOne( { _id: new req.objectID(requestId) } );

  if (requestToDelete.deletedCount > 0) {
    res.status(200).json({ message: "successfully deleted request" });
  } else {
    res.status(400).json({ message: "failed to delete request" });
  }

});

module.exports = router;