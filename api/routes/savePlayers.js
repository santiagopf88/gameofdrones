const express = require("express");
const router = express.Router();

const Players = require("../models/players");

router.get("/", async (req, res) => {
  const players = await Players.find();
});

module.exports = router;
