/*
 * FILE: corsOptions.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Contains CORS confgiuration object used for the express middleware to allow
 * requests only from the frontend client.
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const allowedOrigins = ["http://127.0.0.1:3000", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = { corsOptions, allowedOrigins };
