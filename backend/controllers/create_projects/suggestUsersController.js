const { getUsersByRole } = require("../../data/Users");
const ROLES_LIST = require("../../config/rolesList");

const EVALUATOR = "evaluator";
const SUPERVISOR = "supervisor";

/** @type {import("express").RequestHandler} */
const suggestUsers = async (req, res) => {
  console.log("suggestUsersController: trigged");
  const searchParm = req.params.role;
  const isValidSearchParam =
    searchParm &&
    (searchParm.toLowerCase() === EVALUATOR ||
      searchParm.toLowerCase() === SUPERVISOR);

  if (!isValidSearchParam) res.sendStatus(404);

  const role = convertRoleToValue(searchParm);
  const usersList = await getUsersByRole(role);
  const transformedList = usersList.map((user) => {
    const iconText =
      user.firstName.charAt(0).toUpperCase() +
      user.lastName.charAt(0).toUpperCase();
    const email = user.email;
    return { iconText, email };
  });
  res.status(200).send(transformedList);
};

const convertRoleToValue = (searchRole) => {
  if (!searchRole) return;
  const role = searchRole.charAt(0).toUpperCase() + searchRole.slice(1);
  return ROLES_LIST[role];
};

module.exports = { suggestUsers };
