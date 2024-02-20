const { getUserByUUID } = require("../data/Users");

/** @type {import("express").RequestHandler} */
const getUserMetaData = async (req, res) => {
  const dbResponse = await getUserByUUID(req.uuid);
  const firstName = dbResponse?.firstName;
  const lastName = dbResponse.lastName;
  const role = dbResponse.role;
  const metadata = {
    name: `${firstName} ${lastName}`,
    logoText: `${firstName[0]}${lastName[0]}`,
    role: convertValueToRoleString(role),
  };
  res.status(200).send(metadata);
};

const convertValueToRoleString = (roleValue) => {
  if (roleValue === undefined) return;
  for (const roleName in ROLES_LIST) {
    if (ROLES_LIST[roleName] === roleValue) {
      return roleName;
    }
  }
};

module.exports = { getUserMetaData };
