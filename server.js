const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const Question = require("./models/Question");

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB --------------------------------------------------------------------------
const mongoUri = process.env.mongoURI || require("./config/keys").mongoURI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
    console.log("Could not connect to MongoDB");
  });

// LOAD ------------------------------------------------------------------------
// const questions = require("./questions");
// const len = questions.length;
// for (let i = 0; i < len; i++) {
//   curr = questions[i];
//   console.log(curr.answer);
//
//   const newQuestion = Question({
//     question: curr.question,
//     a: curr.a,
//     b: curr.b,
//     c: curr.c,
//     answer: curr.answer
//   });
//
//   newQuestion.save(err => {
//     if (err) throw err;
//     console.log("Question created!");
//   });
// }

// ROUTES ----------------------------------------------------------------------
app.get("/api/question", (req, res) => {
  Question.count().exec((err, count) => {
    let random = Math.floor(Math.random() * count);
    Question.findOne()
      .skip(random)
      .exec((err, result) => {
        if (err) throw err;
        res.send(result);
      });
  });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

// RUN SERVER ------------------------------------------------------------------
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
