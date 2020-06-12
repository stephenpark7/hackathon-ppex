const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const axios = require("axios");
const geolocation = require("../lib/geolocation");

router.post("/register", async (req, res) => {
  const { name, phone, email, password, type } = req.body; //address, city, state, postal,

  // check if missing fields
  if (!name || !phone || !email || !password || !type) { //!address || !city || !state || !postal ||
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

  // get location
  const { GEOLOCATION_URL, GEOLOCATION_APIKEY } = geolocation;
  const response = await axios.get(GEOLOCATION_URL + req.clientIp + GEOLOCATION_APIKEY)
  const data = { latitude: response.data.latitude, longitude: response.data.longitude };

  // insert username into collection
  const user = await req.db
    .collection("users")
    .insertOne({ name, phone, email, password: hashedPassword, type, latitude: data.latitude, longitude: data.longitude }); // address, city, state, postal,

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
    .findOne( { email } );

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