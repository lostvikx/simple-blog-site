"use strict";

const express = require("express");
const blogController = require("../controllers/blogControllers.js");

// route behaves like a min app
const route = express.Router();

route.get("/", blogController.blog_index);

route.post("/", blogController.blog_create_post);

route.get("/create", blogController.blog_create_get);

// id is the route parameter
route.get("/:id", blogController.blog_details);

route.delete("/:id", blogController.blog_delete);

module.exports = route;