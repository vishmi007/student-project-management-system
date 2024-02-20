/*
 * FILE: registerController.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Handles the functionality for creating new users in the system.
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const { checkUserExists, addUser } = require("../data/Users");
const bcrypt = require("bcrypt");
const ROLES_LIST = require("../config/rolesList");
const { v4: uuidv4 } = require("uuid");

/**
 * Handles the creation of a new user and adds them to the database.
 *
 * @async
 * @param {Object} req - Details on incoming request from the client.
 * @param {Object} res - Object used to send the response to the client.
 * @returns {Promise<void>} - This function does not return a direct value,
 * but it handles new user creation and sends responses to the client.
 */
const handleNewUser = async (req, res) => {
  //TODO: Consider all the other parameters (metadata)
  const { email, firstName, password, role, lastName, id } = req.body;
  if (!email || !password || !role || !lastName || !id)
    return res.status(400).json({ message: " All field are required." });
  if (await checkUserExists(email)) return res.sendStatus(409); // Conflict status code

  try {
    // Encrypt password
    const hashedpassword = await bcrypt.hash(password, 10);
    // Store user in db
    const userRole = createRole(role);
    if (!createRole) return res.sendStatus(401);
    // TODO: Createa a UUID
    const uuid = uuidv4();
    const newUser = {
      uuid: uuid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedpassword,
      id: id,
      role: userRole,
      notifications: [],
    };
    await addUser(uuid, newUser);
    res.status(201).json({ sucess: `New user ${email} added.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Creates a role object based on the input roleString.
 *
 * @param {string} roleString - The role string to be matched with available roles.
 * @returns {Object|undefined} - Returns a role object if the roleString
 * matches any available role; otherwise, returns undefined.
 */
const createRole = (roleString) => {
  // compare the role with the avaialble roles list
  const roles = Object.keys(ROLES_LIST);
  if (roles.includes(roleString)) {
    return ROLES_LIST[roleString];
  }
};

module.exports = { handleNewUser, createRole };
