/*
; Title: Assignment 4.2
; Author: Professor Kumar
; Date: 11 Sept 2022
; Modified By: Ferdinand Detres Jr
; Description: person.js
; Code Attribution: Instructions from weekly assignment
Schemas for each new person
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  text: { type: String, required: true },
});

const dependantSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  roles: { type: Array, roleSchema, required: true },
  dependents: { type: Array, dependantSchema, required: true },
  birthDate: { type: String, required: true },
});

module.exports = mongoose.model("Person", personSchema);
