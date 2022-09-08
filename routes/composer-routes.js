// /*
//   Title: Assignment 4.2
// ; Author: Professor Kumar
// ; Date: 3 Sept 2022
// ; Modified By: Ferdinand Detres Jr
// ; Description: composer-routs.js
// ; Code Attribution: Instructions from weekly assignment

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch //(try...catch)
// */

const express = require("express");
const router = express.Router();
const Composer = require("../models/composer.js");

// findAllComposers
/**
 * @openapi
 * /composers:
 *  get:
 *    tags:
 *      - Composers
 *     operationId: endpointGet
 *     description: Retrieves all composers within database
 *     responses:
 *       '200':
 *         description: Array of composers*
 *       '500':
 *         description: Server Exception
 *       '501':
 *        description: MongoDB Exception!
 */
router.get("/composers", (req, res) => {
  try {
    Composer.find({}, function (err, composers) {
      if (err) {
        res.status(501).send("MongoDB Exception!");
      } else {
        res.json(composers);
      }
    });
  } catch (error) {
    res.status(500).send("Server Exception");
    console.log(error);
  }
});

//get request to find composers by ID
// findComposerById
/**
 * @openapi
 * /composers/{id}:
 *     get:
 *      tags:
 *        - Composers
 *      description: reads and returns a composer document
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The ID of the composer to return
 *          schema:
 *            type: string
 *      responses:
 *           '200':
 *               description: Returns  Composer with corresponding Id
 *           '500':
 *               description: Server Exception
 *           '501':
 *               description: MongoDB Exception!
 */
router.get("/composers/:id", function (req, res) {
  try {
    var id = req.params.id;
    Composer.findOne({ _id: id }, function (err, composer) {
      if (err) {
        res.status(501).send("MongoDB Exception!");
      } else {
        res.json(composer);
      }
    });
  } catch (error) {
    res.status(500).send("Server Exception");
    console.log(error);
  }
});

// a Post request to create a Composer

// createComposer
/** 
•   @openapi
•   /composers/post:
•    post:
•       tags:
•         - Composers
•      description: Adds new Composer Object to Database
•      requestBody:
•         required: true
•        content:
•           application/json:
•             schema:
•               type: object
•               description: composer object
•               required:
•                 - firstName
•                 - lastName
•               properties:
•                 firstName:
•                   description: first name of composer
•                   type: string
•                 lastName:
•                   description: last name of composer
•                   type: string
•      responses:
•         '200':
•           description: Created new composer Object
•         '500':
•           description: Server Exception
•         '501':
•           description: MongoDB Exception!
*/
router.post("/composers", function (req, res) {
  try {
    console.log(req.body);
    let composer = new Composer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    Composer.create(composer, function (err, addComposer) {
      if (err) {
        res.status(501).send("MongoDB Exception!");
      } else {
        res.json(addComposer);
      }
    });
  } catch (error) {
    res.status(500).send("Server Exception");
    console.log(error);
  }
});

module.exports = router;
