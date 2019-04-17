//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
//require all models
const db = require("./models");
const PORT = process.env.PORT || 3000;
//initialize express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//Connect to MongoDB
mongoose.connect("mongodb://localhost/mongoScraper", { useNewUrlParser: true, useCreateIndex: true });

//Routes