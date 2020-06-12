const express = require("express");
const router = express.Router();

const moment = require("moment");
const authentication = require("../middlewares/authentication");

router.use("/listings", authentication);

// GET ALL LISTINGS
router.get("/listings", async (req, res) => {

  const listings = await req.db
    .collection("listings")
    .find()
    .toArray();

  res.status(200).json(listings);

});

// ADD A NEW LISTING
router.post("/listings/new", async (req, res) => {

  let data = req.body;
  data.owner = req.userId;
  data.date = moment.utc();

  // insert listing into collection
  const listing = await req.db
    .collection("listings")
    .insertOne(data);

  if (listing.insertedCount > 0) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "failed to submit new listing" });
  }

});

module.exports = router;