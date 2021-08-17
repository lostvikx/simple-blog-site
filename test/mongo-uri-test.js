"use strict";

const details = require("../config.js");

const uri = `your mongoDB link with ${details.user} and ${details.passDB}`;

module.exports = uri;