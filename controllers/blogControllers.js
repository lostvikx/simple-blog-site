"use strict";

const Blog = require("../models/blog.js");

// the MDN naming conventions
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
  // find all blogs
  // don't understand how sorting works?
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render("index", { title: "Home", blogs: result })
    })
    .catch(err => console.log("Blog.find err:", err));
};

const blog_details = (req, res) => {
  // gets the :id 
  const id = req.params.id;

  Blog.findById(id)
    .then(result => res.render("details", { title: "Single Blog", blog: result }))
    .catch(err => console.log("blog find err:", err));
};

const blog_create_get = (req, res) => {
  res.render("create", { "title": "Create Blog" });
};

const blog_create_post = (req, res) => {
  // console.log(req.body); 
  // { title: 'New title', body: 'This is the body.' }

  // html form action in create.ejs

  const blog = new Blog(req.body);

  blog.save()
    .then(result => res.redirect("/blogs"))
    .catch(err => console.log("blog.save err:", err));
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  // we can't directly redirect, because we are using a AJAX req
  Blog.findByIdAndDelete(id)
    .then(result => res.json({ "redirect": "/blogs" }))  // send a json 
    .catch(err => console.log(err));

};

// export as an obj
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
};