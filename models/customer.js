/*
; Title: Assignment 7.2
; Author: Professor Kumar
; Date: 28 Sept 2022
; Modified By: Ferdinand Detres Jr
; Description: customer.js
; Code Attribution: Instructions from weekly assignment
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schemas
let lineItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

let invoiceSchema = new Schema({
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  dateCreated: { type: String, required: true },
  dateShipped: { type: String, required: true },
  lineItems: [lineItemSchema],
});

let customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  invoices: [invoiceSchema],
});

// exports User model
module.exports = mongoose.model("Customer", customerSchema);
