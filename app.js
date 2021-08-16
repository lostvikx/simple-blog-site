"use strict";

const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes.js");
const details = require("./config.js");

const app = express();

// connect to mongodb

const uri = `mongodb+srv://${details.user}:${details.passDB}@simple-blog-tut.l76kf.mongodb.net/simple-blog-tut?retryWrites=true&w=majority`;

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

// form input data from create.ejs
app.use(express.urlencoded({ extended: true }));

// logger middleware {npm}
app.use(morgan("tiny"));

// routes

app.get("/", (_req, res) => {
  // redirct to /blogs
  res.redirect("/blogs");
});

// blog routes, using express router
app.use("/blogs", blogRoutes);

app.get("/about", (_req, res) => {
  res.render("about", { "title": "About" });
  app.set("Content-Type", "text/html");
});

app.get("/about-me", (_req, res) => {
  res.redirect("/about");
});

// 404 page
app.use( (_req, res) => {
  res.status(404).render("404", { "title": "404 Error", "type": "Page" });
  app.set("Content-Type", "text/html");
} );