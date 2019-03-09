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

// ROUTES ----------------------------------------------------------------------
app.get("/api/oneQuestion", (req, res) => {
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

app.get("/api/manyQuestions", (req, res) => {
  Question.aggregate([{ $sample: { size: 90 } }], (err, result) => {
    if (err) return err;
    res.send(result);
  });
});

// RUN SERVER ------------------------------------------------------------------
if (process.env.NODE_ENV === "production") {
  // serve static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // handle react routing, return all requests to react app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
