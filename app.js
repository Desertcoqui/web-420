// <!--
// Title: Assignment 1
// Author: Professor Kumar
// Date: Aug 13 2022
// Modified By: Ferdinand "Papo" Detres Jr
// Description: This week's project is

// -->

const express = require("express");
// const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swagger = require("swagger-jsdoc");
const http = require("http");

// starting express
const app = express();

//app port set to connect to port 3000
app.set("port", process.env.PORT || 3000);

app.use(express.urlencoded({ extended: true }));

//express middleware to parse request
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: [".routes/*.js"],
};

const openapiSpecification = swagger(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});
