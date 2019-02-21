const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const highScoreSchema = new Schema({
  score: Number,
  name: String
});

const HighScore = mongoose.model("HighScore", highScoreSchema);
module.exports = HighScore;
