const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const userData = await req.db
    .collection("users")
    .findOne({ username: username });

  if (await bcrypt.compare(password, userData.password)) {
      const token = jwt.sign({ id: userData._id }, secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      id: userData._id,
      username: username,
      accessToken: token
    });
  } else {
    res.status(400).json({ message: "invalid password" });
  }

});

module.exports = router;