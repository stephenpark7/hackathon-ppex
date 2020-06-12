const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

router.use("/profile", authentication);

// GET MY LISTINGS
router.get("/profile", async (req, res) => {

  const listings = await req.db
    .collection("listings")
    .find( { owner: { $eq: req.userId } })
    .toArray();

  res.status(200).json(listings);

});

// DELETE ACCOUNT
router.delete("/profile", async (req, res) => {

  const userToDelete = await req.db
    .collection("users")
    .deleteOne( { _id: new req.objectID(req.userId) } );

  if (userToDelete.deletedCount > 0) {
    // delete all listings
    await req.db
      .collection("listings")
      .deleteMany( { owner: req.userId } );

    res.status(200).json({ message: "successfully deleted account" });
  } else {
    res.status(400).json({ message: "failed to delete account" });
  }

});

module.exports = router;