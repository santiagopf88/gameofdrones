const express = require("express");
const router = express.Router();

const Players = require("../models/players");

router.get("/", async (req, res) => {
  const players = await Players.find();
  res.json(players);
});

router.get("/:name", async (req, res) => {
  console.log(req);
  const players = await Players.exists(req.params.name);
  res.json(players);
});

router.post("/", async (req, res) => {
  const { name, gamesWon } = req.body;

  var player = new Players({ name, gamesWon });
  await player.save();

  res.json("Player Saved");
});

router.put("/:name", async (req, res) => {
  console.log(req);
  const { name, gamesWon } = req.body;
  const newPlayer = { name, gamesWon };

  Players.findOneAndUpdate({ name: req.params.name }, newPlayer);

  res.json({ status: "Player " + newPlayer.name + " Update" });
});
module.exports = router;
