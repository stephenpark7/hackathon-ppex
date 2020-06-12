const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { name, phone, email, password, address, city, state, postal, type } = req.body;

  // check if missing fields
  if (!name || !phone || !email || !password || !address || !city || !state || !postal || !type) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  // check if email already used
  if (await req.db.collection("users").countDocuments({ email }) > 0) {
    res.status(400).json({ message: "email already used" });
    return;
  }

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert username into collection
  const user = await req.db
    .collection("users")
    .insertOne({ name, phone, email, password: hashedPassword, address, city, state, postal, type });

  if (user.insertedCount > 0) {
    res.status(200).json({ message: "success" });
  }
  else {
    res.status(400).json({ message: "fail" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const userData = await req.db
    .collection("users")
    .findOne({ email });

  if (await bcrypt.compare(password, userData.password)) {
      const token = jwt.sign({ id: userData._id }, secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      id: userData._id,
      email: email,
      accessToken: token
    });
  } else {
    res.status(400).json({ message: "invalid password" });
  }

});

module.exports = router;