/*
 * FILE: auth.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Authentication route handler
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.handleLogin);

module.exports = router;
