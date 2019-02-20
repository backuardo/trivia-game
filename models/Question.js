const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  a: String,
  b: String,
  c: String,
  answer: String
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
