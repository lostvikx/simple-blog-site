"use strict";

const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog.js");

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

// middleware
app.use(express.urlencoded({ extended: true }));


// custom logger middleware
// app.use((req, res, next) => {
//   console.log("new request was made");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   // allows us to move onto the next middleware function
//   next();
// });

// logger middleware {npm}
app.use(morgan("tiny"));

// // mongoose and mongo sandbox routes
// // save documents in db
// app.get("/add-blog", (req, res)=> {

//   const blog = new Blog({
//     title: "New Blog 2",
//     body: "This is the blog body"
//   });

//   // async task
//   blog.save()
//     .then(result => res.send(result))
//     .then(err => console.log(err));
// });

// // get all documents
// app.get("/all-blogs", (req, res) => {
//   // async task
//   Blog.find()
//     .then(result => res.send(result))
//     .catch(err => console.log(err));
// });

// // get a single blog
// app.get("/single-blog", (req, res) => {
//   // async task
//   // id of first blog
//   Blog.findById("6113ff3f48cb2d3da2ca34d1")
//     .then(result => res.send(result))
//     .catch(err => console.log(err));
// });

// rendering a view

// routes

app.get("/", (req, res) => {
  // redirct to /blogs
  res.redirect("/blogs");
  // res.render("index", { "title": "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { "title": "About" });
  app.set("Content-Type", "text/html");
});

app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// blog routes

app.get("/blogs", (req, res) => {
  // find all blogs
  // don't understand how sorting works?
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render("index", { title: "Home", blogs: result })
      app.set("Content-Type", "text/html");
    })
    .catch(err => console.log("Blog.find err:", err));
});

app.post("/blogs", (req, res) => {
  // console.log(req.body); // { title: 'New title', body: 'This is the body.' }

  const blog = new Blog(req.body);

  blog.save()
    .then(result => res.redirect("/blogs"))
    .catch(err => console.log("blog.save err:", err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { "title": "Create Blog" });
  app.set("Content-Type", "text/html");
});

// id is the route parameter
app.get("/blogs/:id", (req, res) => {
  // gets the :id 
  const id = req.params.id;

  Blog.findById(id)
    .then(result => res.render("details", { title: "Single Blog", blog: result }))
    .catch(err => console.log("blog find err:", err));
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  // we can't directly redirect, because we are using a AJAX req
  Blog.findByIdAndDelete(id)
    .then(result => res.json({ "redirect": "/blogs" }))  // send a json 
    .catch(err => console.log(err));

});

app.use( (req, res) => {
  res.status(404).render("404", { "title": "404 Error" });
  app.set("Content-Type", "text/html");
} );