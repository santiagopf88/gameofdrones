const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  gamesWon: { type: Number, required: false }
});

module.exports = mongoose.model("Players", TaskSchema);
