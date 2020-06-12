const express = require("express");
const router = express.Router();

const moment = require("moment");
const authentication = require("../middlewares/authentication");

router.use("/listings", authentication);

// GET MY LISTINGS
router.get("/listings/self", async (req, res) => {

  const listings = await req.db
    .collection("listings")
    .find( { owner: req.userId })
    .toArray();

  res.status(200).json(listings);

});

// GET ALL LISTINGS
router.get("/listings/all", async (req, res) => {

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

// UPDATE A LISTING
router.put("/listing/:id", async (req, res) => {

  const listingId = req.params.id;
  const newData = req.body;

  const listing = await req.db
    .collection("listings")
    .updateOne( 
      { _id: new req.objectID(listingId) },
      { $set: newData } 
    );

  if (listing.modifiedCount > 0) {
    res.status(200).json({ message: "successfully updated listing" });
  } else {
    res.status(200).json({ message: "failed to update listing" });
  }

});

// DELETE A LISTING
router.delete("/listing/:id", async (req, res) => {

  const listingId = req.params.id;

  const listingToDelete = await req.db
    .collection("listings")
    .deleteOne( { _id: new req.objectID(listingId) } );

  if (listingToDelete.deletedCount > 0) {
    res.status(200).json({ message: "successfully deleted listing" });
  } else {
    res.status(400).json({ message: "failed to delete listing" });
  }

});

module.exports = router;