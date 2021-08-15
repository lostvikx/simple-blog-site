"use strict";

const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes.js")

const app = express();

// connect to mongodb
// dbPass = HzoU1KXELSUELF6p

const uri = "mongodb+srv://vik:HzoU1KXELSUELF6p@simple-blog-tut.l76kf.mongodb.net/simple-blog-tut?retryWrites=true&w=majority";

// connect to db

// imp note: we want our server to listen on port 3000, only after the db is loaded
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000 || process.env.PORT, () => console.log("live on port 3000")))
  .catch(err => console.log("connect or listen err:", err));


// register view engine
app.set("view engine", "ejs");

// views dir is default
// app.set("views", "dirName");

// these funcs are also called middlewares

// static files {imgs, css...}
app.use(express.static("public"));

// form data from create.ejs
app.use(express.urlencoded({ extended: true }));

// logger middleware {npm}
app.use(morgan("tiny"));

// routes

app.get("/", (req, res) => {
  // redirct to /blogs
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { "title": "About" });
  app.set("Content-Type", "text/html");
});

app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// blog routes, using express router
app.use("/blogs", blogRoutes);

// 404 page
app.use( (req, res) => {
  res.status(404).render("404", { "title": "404 Error" });
  app.set("Content-Type", "text/html");
} );