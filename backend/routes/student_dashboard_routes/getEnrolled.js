/*
 * FILE: getEnrolled.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This is the route handler for the apis calls that involed with the enrolment procress
 * REFERENCE: None
 * LAST MOD: 09/18/2023
 */

const express = require("express");
const router = express.Router();
const getEnrollController = require("../../controllers/student_dashboard_controllers/getEnroll");

router.post('/',getEnrollController.getEnroll);

module.exports = router;