const express = require("express");
const bcrypt = require("bcryptjs");
const extractUser = require("../lib/api-helpers");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  if (await req.db.collection("users").countDocuments({ username }) > 0) {
    res.status(400).json({ message: "username already used" });
    return;
  }

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert username into collection
  const user = await req.db
    .collection("users")
    .insertOne({ username: username, password: hashedPassword })

  if (user.insertedCount > 0) {
    res.status(200).json({ message: "success" });
  }
  else {
    res.status(400).json({ message: "fail" });
  }
});

module.exports = router;