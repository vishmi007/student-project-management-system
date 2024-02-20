/*
 * FILE: projectInfo.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This will handle all the project level infomation requested by the front end
 * REFERENCE: None
 * LAST MOD: 09/08/2023
 */

const express = require("express");
const router = express.Router();
const getProjectInfoController = require("../controllers/getTeamInfoController");

router.get("/",getProjectInfoController.getProjectInfo);

module.exports = router;