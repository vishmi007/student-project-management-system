/*
 * FILE: authController.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Handles the login functionality.
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const {
  getUser,
  checkUserExists,
  updateUserDetails,
} = require("../data/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Handles the login process for the client.
 *
 * @async
 * @param {Object} req - Details on incoming request from the client.
 * @param {Object} res - Object used to send the response to the client.
 * @returns {Promise<void>} - This function does not return a direct value,
 * but it handles login and sends responses to the client.
 **/
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });

  if (!(await checkUserExists(email))) return res.sendStatus(401);
  const userObj = await getUser(email);
  const passwordMatch = await bcrypt.compare(password, userObj.password);

  if (passwordMatch) {
    const role = userObj.role;
    //Creating JWT access and refresh tokens
    const accessToken = jwt.sign(
      { userInfo: { uuid: userObj.uuid, email: userObj.email, role: role } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" } // Change to 30 min for prod
    );
    const refreshToken = jwt.sign(
      { email: userObj.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Save refresh token in db
    updateUserDetails(email, { refreshToken });

    // Send refresh token to client in a cookie
    // HTTP only cookies are not avaialble to javascript therefore safe
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send access token to client
    res.json({ accessToken, role });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
