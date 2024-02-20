// getUserInfoController.js
const { getUserByUUID } = require("../data/Users");

const getUserInfo = async (req, res) => {
  const userUUID = req.uuid; // Extract User UUID from the token
  try {
    const userInfo = await getUserByUUID(userUUID);
    res.json(userInfo);
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserInfoByUUID = async (req, res) => {
  const userUUID = req.params.uuid; // Extract User UUID from the parameter
  try {
    const userInfo = await getUserByUUID(userUUID);
    res.json(userInfo);
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUserInfo, getUserInfoByUUID };
