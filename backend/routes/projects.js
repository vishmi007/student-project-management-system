/*
 * FILE: projects.js
 * AUTHOR: Vishmi Kalansooriya [ID: 20532279]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Projects route handler
 * REFERENCE: None
 * LAST MOD: 05/08/2023
 */
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.handleLogin);

module.exports = router;
