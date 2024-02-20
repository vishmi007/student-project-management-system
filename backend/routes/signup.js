/*
 * FILE: signup.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Signup route handler
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const express = require("express");
const router = express.Router();
const signupController = require("../controllers/registerController");

router.post("/", signupController.handleNewUser);

module.exports = router;
