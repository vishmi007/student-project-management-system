/*
 * FILE: logoutController.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Handles the logout functionality.
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const jwt = require("jsonwebtoken");
const { getUserByRefreshToken, updateUserDetails } = require("../data/Users");
require("dotenv").config();

/**
 * Handles the logout process for the client.
 *
 * @async
 * @param {Object} req - Details on incoming request from the client.
 * @param {Object} res - Object used to send the response to the client.
 * @returns {Promise<void>} - This function does not return a direct value,
 * but it handles logout and sends responses to the client.
 */
const handleLogout = async (req, res) => {
  //NOTE FOR FRONTEND DEV'S: Delete the accessToken on client after logout.

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // Successfully but no content to send back
  const refreshToken = cookies.jwt;

  // Get authenticated user from db using refresh token
  const user = await getUserByRefreshToken(refreshToken);
  if (!user) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204);
  }

  // Delete refresh token of user from db
  updateUserDetails(user.email, { refreshToken: "" });

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.sendStatus(204);
};

module.exports = { handleLogout };
