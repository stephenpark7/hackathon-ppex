const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

router.use("/profile", authentication);

router.get("/profile", async (req, res) => {

  const listings = await req.db
    .collection("listings")
    .find( { owner: { $eq: req.userId } })
    .toArray();

  res.status(200).json(listings);

});