const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(bodyParser.json());

const filmsRoute = require("./routes/films");
const authRoute = require("./routes/auth");

app.use("/api/film", filmsRoute);
app.use("/api/user", authRoute);

mongoose.connect(process.env.DB_CONNECTOR)

app.get("/", async(req,res) => {
    res.send("hello");
});

app.listen(3000);

module.exports = app;