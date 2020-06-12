const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

router.use("/profile", authentication);

// GET PROFILE
router.get("/profile", async (req, res) => {

  let userData = await req.db
    .collection("users")
    .findOne( { _id: new req.objectID(req.userId) } );

  if (userData) {
    delete userData.password; // we don't want to send the password back, hashed or not.
    res.status(200).json(userData);
  } else {
    res.status(200).json({ message: "failed to retrieve account" });
  }

});

// UPDATE PROFILE
router.put("/profile", async (req, res) => {

  const newData = req.body;

  const user = await req.db
    .collection("users")
    .updateOne( 
      { _id: new req.objectID(req.userId) },
      { $set: newData } 
    );

  if (user.modifiedCount > 0) {
    res.status(200).json({ message: "successfully updated account" });
  } else {
    res.status(200).json({ message: "failed to update account" });
  }

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
    // delete all requests
    await req.db
      .collection("requests")
      .deleteMany( { owner: req.userId } );

    res.status(200).json({ message: "successfully deleted account" });
  } else {
    res.status(400).json({ message: "failed to delete account" });
  }

});

module.exports = router;