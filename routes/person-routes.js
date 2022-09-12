/*
; Title: Assignment 4.2
; Author: Professor Kumar
; Date: 11 Sept 2022
; Modified By: Ferdinand Detres Jr
; Description: person-routes.js
; Code Attribution: Instructions from weekly assignment
*/

const express = require("express");
const Person = require("../models/person.js");
const router = express.Router();
/**
 * findAllPersons
 * @swagger
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: Reads, Retrieves all persons within database
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get("/persons", (req, res) => {
  try {
    Person.find({}, function (err, persons) {
      if (err) {
        res.status(501).send("MongoDB Exception");
      } else {
        res.json(persons);
      }
    });
  } catch (error) {
    res.status(500).send("Server Exception");
    console.log(error);
  }
});
/**
 * createPerson
 * @swagger
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     description: Adds new person object to database
 *     requestBody:
 *       description: Person information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 description: first name
 *                 type: string
 *               lastName:
 *                 description: last name
 *                 type: string
 *               roles:
 *                 description: Roles
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 description: Array of dependantSchema
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate:
 *                 description: Birth date
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/persons", function (req, res) {
  try {
    let addPerson = new Person({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate,
    });
    Person.create(addPerson, function (err, person) {
      if (err) {
        res.status(501).send("MongoDB Exception");
      } else {
        console.log(person);
        res.json(person);
      }
    });
  } catch (error) {
    res.status(500).send("Server Exception");
    console.log(error);
  }
});

module.exports = router;
