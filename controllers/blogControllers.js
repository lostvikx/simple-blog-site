"use strict";

const Blog = require("../models/blog.js");

// the MDN naming conventions
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (_req, res) => {
  // find all blogs
  // I still can't figure out how the sort method works!
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
    .catch(err => {
      if (err) res.status(404).render("404", { "title": "Blog Not Found", "type": "Blog" });
    });
};

const blog_create_get = (_req, res) => {
  res.render("create", { "title": "Create Blog" });
};

const blog_create_post = (req, res) => {
  // console.log(req.body); 
  // { title: 'New title', body: 'This is the body.' }

  // html form action in create.ejs

  const blog = new Blog(req.body);

  blog.save()
    .then(_result => res.redirect("/blogs"))
    .catch(err => console.log("blog.save err:", err));
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  // we can't directly redirect, because we are using a AJAX req
  Blog.findByIdAndDelete(id)
    .then(_result => res.json({ "redirect": "/blogs" }))  // send a json 
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