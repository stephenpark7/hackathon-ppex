const express = require("express");
const router = express.Router();

const moment = require("moment");
const authentication = require("../middlewares/authentication");

const axios = require("axios");
const geolocation = require("../lib/geolocation");
const distance = require("../lib/distance");

// GET LISTINGS
router.get("/listings", authentication, async (req, res) => {

  const target = req.query.target;
  const type = req.query.type;
  const sort = req.query.sort;

  // SPECIFY TYPE : donation, request
  let query = {};
  if (type) {
    query.type = type;
  }

  if (target === "self") {

    query.owner = req.userId;

    // GET MY LISTINGS
    const listings = await req.db
    .collection("listings")
    .find(query)
    .toArray();

    res.status(200).json(listings);

  } else if (target === "all") {

    // GET ALL LISTINGS
    const listings = await req.db
    .collection("listings")
    .find(query)
    .toArray();

    // FILTER : nearby
    if (sort) {
      if (sort === "nearby") {
        
        const { GEOLOCATION_URL, GEOLOCATION_APIKEY } = geolocation;
        const response = await axios.get(GEOLOCATION_URL + req.clientIp + GEOLOCATION_APIKEY)
        const data = { latitude: response.data.latitude, longitude: response.data.longitude };

        for (let i = 0; i < listings.length; i++) {
          const dist = distance(data.latitude, data.longitude, listings[i].latitude, listings[i].longitude);
          listings[i].dist = dist;
        }

      }
    }

    res.status(200).json(listings);

  } else {

    // INVALID QUERY PARAMETER
    res.status(400).json( { message: "invalid query parameter" } )

  }

});

// ADD A NEW LISTING
router.post("/listings/new", authentication, async (req, res) => {

  const { name, quantity, unit, description, image, type } = req.body; //address, city, state, postal,

  // validation
  if (!name || !quantity || !unit || !description || !image || !type) { // || !address || !city || !state || !postal
    res.status(400).json({ message: "missing fields" });
    return;
  }

  // get location
  const { GEOLOCATION_URL, GEOLOCATION_APIKEY } = geolocation;
  const response = await axios.get(GEOLOCATION_URL + req.clientIp + GEOLOCATION_APIKEY)
  const data = { latitude: response.data.latitude, longitude: response.data.longitude };

  let listingData = { name, quantity, unit, description, image, longitude: data.longitude, latitude: data.latitude, type }; // address, city, state, postal,
  listingData.owner = req.userId;
  listingData.date = moment.utc();

  // insert listing into collection
  const listing = await req.db
    .collection("listings")
    .insertOne(listingData);

  if (listing.insertedCount > 0) {
    res.status(200).json(listingData);
  } else {
    res.status(400).json({ message: "failed to submit new listing" });
  }

});

// DONATE TO A REQUEST / SEND REQUEST TO A DONATION
router.put("/listing/:id", authentication, async (req, res) => {

  const listingId = req.params.id;
  const { quantity, unit, description, image } = req.body;

  // validation
  if (!quantity || !unit || !description || !image) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const data = await req.db
    .collection("listings")
    .findOne( 
      { _id: new req.objectID(listingId) }
    );

  if (data.owner === req.userId) {
    res.status(400).json({ message: "cannot send a request to your own listing" });
    return;
  }

  let responses = { quantity, unit, description, image };
  responses.owner = req.userId;
  responses.status = "pending";

  if (data.type !== "request" && data.type !== "donation") {
    res.status(400).json({ message: "invalid type" });
    return;
  }

  const listing = await req.db
    .collection("listings")
    .updateOne( 
      { _id: new req.objectID(listingId) },
      { $push: { responses } } 
    );

  if (listing.modifiedCount > 0) {
    res.status(200).json({ message: "successfully submitted a response" });
  } else {
    res.status(400).json({ message: "failed to submit a response" });
  }

});

// ACCEPT A REQUEST / DONATION
router.put("/listing/accept/:id", authentication, async (req, res) => {

  const listingId = req.params.id;
  const { responseId } = req.body;

  const data = await req.db
    .collection("listings")
    .findOne( 
      { _id: new req.objectID(listingId) }
    );

  if (data.type !== "request" && data.type !== "donation") {
    res.status(400).json({ message: "invalid type" });
    return;
  }

  if (data.owner === req.userId) {
    res.status(400).json({ message: "cannot respond to your own listing" });
    return;
  }

  const response = data.responses[responseId];

  if (!response) {
    res.status(400).json({ message: "invalid response" });
    return;
  }

  if (response.status !== "pending") {
    res.status(400).json({ message: "response must be pending" });
    return;
  }

  const listing = await req.db
    .collection("listings")
    .updateOne( 
      { _id: new req.objectID(listingId) },
      { $set: { [`responses.${responseId}.status`]: "accepted" } } 
    );

  if (listing.modifiedCount > 0) {
    res.status(200).json({ message: "successfully submitted a response" });
  } else {
    res.status(400).json({ message: "failed to submit a response" });
  }

});

// UPDATE A LISTING
router.put("/listing/update/:id", authentication, async (req, res) => {

  const listingId = req.params.id;

  const data = await req.db
    .collection("listings")
    .findOne( 
      { _id: new req.objectID(listingId) }
    );

  if (data.owner !== req.userId) {
    res.status(400).json({ message: "unauthorized" });
    return;
  }

  const listingData = req.body;

  const listing = await req.db
    .collection("listings")
    .updateOne( 
      { _id: new req.objectID(listingId) },
      { $set: listingData } 
    );

  if (listing.modifiedCount > 0) {
    res.status(200).json({ message: "successfully updated listing" });
  } else {
    res.status(200).json({ message: "failed to update listing" });
  }

});

// DELETE A LISTING
router.delete("/listing/:id", authentication, async (req, res) => {

  const listingId = req.params.id;

  const data = await req.db
    .collection("listings")
    .findOne( 
      { _id: new req.objectID(listingId) }
    );

  if (!data) {
    res.status(400).json({ message: "listing not found" });
    return;
  }

  if (data.owner !== req.userId) {
    res.status(400).json({ message: "unauthorized" });
    return;
  }

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