"use strict";

const mongoose = require("mongoose");

// schemas and models
// blog schema
// title (string), required
// body {string}, required

// schma will define the structure of a document {blogs} inside the collection

// Schema is a contructor function
const { Schema } = mongoose;

// takes an obj as param {ref. docs}
// the schema defiines the structure

const blogSchema = new Schema({
  // shorthand title: String
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
  }
}, { timestamps: true });


// a model provides an interface to communicate with the db
// name is imp "Blog", model will pluralize it and look for that collection it in the db
// the name should be the sigular of the collection name

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;