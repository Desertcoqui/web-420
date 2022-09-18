/*
; Title: Assignment 6.2
; Author: Professor Kumar
; Date: 18 Sept 2022
; Modified By: Ferdinand Detres Jr
; Description: session-routes.js
; Code Attribution: Instructions from weekly assignment
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for user
let userSchema = new Schema({
  userName: { type: String, required: true },
  Password: { type: String, required: true },
  emailAddress: { type: Array, required: true },
});

// export model
module.exports = mongoose.model("User", userSchema);
