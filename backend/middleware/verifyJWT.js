/*
 * FILE: verifyJWT.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Contains midleware to verify the the generated JWT token from the server.
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware function to verify the presence and validity of a JSON Web Token (JWT) in the request headers.
 *
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The outgoing response object.
 * @param {function} next - The next middleware function to be called if authentication is successful.
 */
const verifyJWT = (req, res, next) => {
  // Functions checks whether every subsequent request after the authentication has the generate JWT token in it.
  const authHeader = req.headers.authorization || req.headers.Authorization; // Brearer token
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    } // Invalid token
    if (!decoded) {
      return res.sendStatus(403);
    } // Invalid token
    // Transform request
    req.uuid = decoded.userInfo.uuid;
    req.user = decoded.userInfo.email;
    req.role = decoded.userInfo.role;
    next(); // Call the next function to proceed with the request
  });
};

module.exports = verifyJWT;
