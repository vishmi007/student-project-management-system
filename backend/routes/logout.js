/*
 * FILE: logout.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Logout route handler
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");

router.get("/", logoutController.handleLogout);

module.exports = router;
