/*
 * FILE: test.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Temp route to test protected and role based access to the route.
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const express = require("express");
const { getAllUsers } = require("../data/Users");
const router = express.Router();
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(async (req, res) => {
    res.status(200).send(await getAllUsers());
  })
  .post(verifyRoles(ROLES_LIST.Lecturer), (req, res) => {
    res.status(200).send({ message: "Only lecturer can access this route" });
  });

module.exports = router;
