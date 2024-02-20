/*
 * FILE: getToDoList.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This will handle all the request from the students dashboards to load the todo lists
 * REFERENCE: None
 * LAST MOD: 09/08/2023
 */

const express = require("express");
const router = express.Router();
const getToDoListController = require("../../controllers/student_dashboard_controllers/getToDoListController");

router.post("/",getToDoListController.getProjectToDoList);

module.exports = router;