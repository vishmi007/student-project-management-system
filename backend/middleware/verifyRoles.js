/*
 * FILE: verifyRoles.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Contains midleware to verify the users access permissions based
 *          on the existing roles.
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

/**
 * Higher-order middleware function to verify if the user's role matches any of the allowed roles.
 *
 * @param {...string} allowedRoles - A list of allowed roles for accessing the protected route.
 * @returns {function} - Returns the middleware function that checks for role-based access.
 */
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const result = rolesArray.includes(req.role);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
