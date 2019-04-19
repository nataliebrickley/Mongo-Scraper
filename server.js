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
//Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//Connect to MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";


mongoose.connect(MONGODB_URI, { useNewUrlParser: true}, (err) => {
    if (err) throw err;
    console.log("database connected")
});

//Routes
//get articles for homepage
app.get("/", (req, res) => {
    db.Article
        .find({saved: false})
        .populate("comments")
        .then(dbArticles => {
            //console.log(dbComments)
            res.render("home", { articles: dbArticles});
        })


});
//scrape articles
app.get("/scrape", (req, res) => {
    axios.get("https://www.nytimes.com/section/science")
        .then(response => {
            const $ = cheerio.load(response.data);
            $("article").each(function (i, element) {
                let title = $(element).find("h2").find("a").text()
                let summary = $(element).find("p").first().text()
                let url = $(element).find("h2").find("a").attr("href")
                let link = "https://nytimes.com" + url;
                let image = $(element).find("a").find("img").attr("src")
                let post = {
                    title: title,
                    summary: summary,
                    link: link,
                    image: image
                }
                db.Article
                    .create(post)
                    .then(dbArticle => { 
                    })
                    .catch(err => console.log(err))
            })
        })
        .then(()=>res.redirect("/"))
        
})
//post a comment
app.post("/api/:articleId/comments", (req, res) => {
    db.Comments
        .create({ body: req.body.body })
        .then(dbComments => {
            return db.Article.findOneAndUpdate({ _id: req.params.articleId }, { $push: { comments: dbComments._id } }, { new: true })
        })
        .then(()=>res.redirect("/"))
        .catch(err => res.json(err))
})
//delete a comment
app.delete("/api/:commentsId/comments", (req, res) => {
    db.Comments
      .findOneAndDelete({_id: req.params.commentsId})
      .then(dbResult => res.json(dbResult))
})

//clear articles (saved articles should remain in the database)
app.get("/api/clear", (req, res) => {
    db.Article
      .deleteMany({saved: false}, function() {
          console.log("cleared")
      })
      .then(() => res.redirect("/"))
})
//save an article
app.post("/articles/:articleId", (req, res) => {
    db.Article
      .findOneAndUpdate({_id: req.params.articleId}, {saved: true}, {new: true})
      .then((dbArticle) => res.json(dbArticle))
    //   .then(()=>res.redirect("/"))
      })
//delete a saved article
app.delete("/articles/:articleId", (req, res) => {
    db.Article
      .findOneAndUpdate({_id: req.params.articleId}, {saved: false}, {new: true})
      .then((dbArticle) => res.json(dbArticle))
})
//show saved articles on saved page
app.get("/saved", (req, res) => {
    db.Article
      .find({saved: true})
      .populate("comments")
      .then(dbArticles => res.render("saved", {saved: dbArticles}))
})
      

//Listen to port
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});


