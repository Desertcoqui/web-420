// *
//  Title: Assignment Final
//  Author: Professor Kumar
//  Date: 9 Oct 2022
//  Modified By: Ferdinand Detres Jr
//  Description: team-routes.js
//  Code Attribution: Instructions from weekly assignment
// */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// player schema
let playerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salary: { type: Number, required: true },
});

// team model
let teamModel = new Schema({
  name: { type: String, required: true },
  mascot: { type: String, required: true },
  players: [playerSchema],
});

// exports Team model & Player schema
module.exports = mongoose.model("Team", teamModel);
