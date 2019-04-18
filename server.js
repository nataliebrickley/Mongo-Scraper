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
app.get("/scrape", (req, res) => {
    axios.get("https://www.nytimes.com/section/science")
         .then(response => {
            const $ = cheerio.load(response.data);
            $("article").each(function(i, element){
                let title = $(element).find("h2").find("a").text()
                let summary = $(element).find("p").first().text()
                let link = $(element).find("h2").find("a").attr("href")
                let post = {
                    title: title,
                    summary: summary,
                    link: link
                }
                console.log("link: " + post.link)
            })
         })
})


//Listen to port
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});
