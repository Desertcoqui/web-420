/*
; Title: Assignment 4.2
; Author: Professor Kumar
; Date: 3 Sept 2022
; Modified By: Ferdinand Detres Jr
; Description: composer.js
; Code Attribution: Instructions from weekly assignment
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for the composer
let composerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// Exporting the composer model
module.exports = mongoose.model("Composer", composerSchema);
