// <!--
// Title: Assignment 1
// Author: Professor Kumar
// Date: 4 Sep 2022
// Modified By: Ferdinand "Papo" Detres Jr
// Description: This week's project is
// -->

const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swagger = require("swagger-jsdoc");
const http = require("http");
const mongoose = require("mongoose");
const composerAPI = require("./routes/composer-routes.js");
const personAPI = require("./routes/person-routes.js");
var customerAPI = require("./routes/node-shopper-routes");

// starting express
const app = express();

//app port set to connect to port 3000
app.set("port", process.env.PORT || 3000);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },

  apis: ["./routes/*.js"],
};

const openapiSpecification = swagger(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/api", composerAPI);
app.use("/api", personAPI);
app.use("/api", customerAPI);

//express middleware to parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoDB = "mongodb+srv://web420_user:s3cret@cluster0.xaeddc6.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
// Create database variable to hold connections.
var db = mongoose.connection;
// Add general error handling. Output results to console.
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", function () {
  console.log("Application connected to MongoDB instance");
});

http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});
