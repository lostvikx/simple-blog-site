"use strict";

const express = require("express");
const Blog = require("../models/blog.js");

const route = express.Router();

route.get("/blogs", (req, res) => {
  // find all blogs
  // don't understand how sorting works?
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render("index", { title: "Home", blogs: result })
    })
    .catch(err => console.log("Blog.find err:", err));
});

route.post("/blogs", (req, res) => {
  // console.log(req.body); 
  // { title: 'New title', body: 'This is the body.' }

  // html form action

  const blog = new Blog(req.body);

  blog.save()
    .then(result => res.redirect("/blogs"))
    .catch(err => console.log("blog.save err:", err));
});

route.get("/blogs/create", (req, res) => {
  res.render("create", { "title": "Create Blog" });
});

// id is the route parameter
route.get("/blogs/:id", (req, res) => {
  // gets the :id 
  const id = req.params.id;

  Blog.findById(id)
    .then(result => res.render("details", { title: "Single Blog", blog: result }))
    .catch(err => console.log("blog find err:", err));
});

route.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  // we can't directly redirect, because we are using a AJAX req
  Blog.findByIdAndDelete(id)
    .then(result => res.json({ "redirect": "/blogs" }))  // send a json 
    .catch(err => console.log(err));

});

module.exports = route;