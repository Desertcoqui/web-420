/*
; Title: Assignment 4.2
; Author: Professor Kumar
; Date: 25 Sept 2022
; Modified By: Ferdinand Detres Jr
; Description: node-shopper-routes.js
; Code Attribution: Instructions from weekly assignment
*/

const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers", async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    };
    Customer.create(newCustomer, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(customer);
        res.json(customer);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e}`,
    });
  }
});
/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: API creating an invoice by userName
 *     summary: Creates an invoice by userName
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: username
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/customers/:userName/invoices", async (req, res) => {
  try {
    Customer.findOne({ userName: req.params.userName }, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(customer);
        res.status(200).send({
          message: "Invoice created by userName",
        });

        const newInvoice = {
          userName: req.params.userName,
          subtotal: req.body.subtotal,
          tax: req.body.tax,
          dateCreated: req.body.dateCreated,
          dateShipped: req.body.dateShipped,
          lineItems: req.body.lineItems,
        };

        customer.invoices.push(newInvoice);
        customer.save();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e}`,
    });
  }
});
/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     name: findAllInvoicesByUserName
 *     description: API to find all invoices by userName
 *     summary: finds all invoices by userName
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/customers/:userName/invoices", async (req, res) => {
  try {
    Customer.findOne({ userName: req.params.userName }, function (err, customer) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(customer.invoices);
        res.json(customer.invoices);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e}`,
    });
  }
});

module.exports = router;
