/*
 * FILE: refresh.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Refresh route handler
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const express = require("express");
const router = express.Router();
const refreshController = require("../controllers/refreshController");

router.get("/", refreshController.handleRefreshToken);

module.exports = router;
