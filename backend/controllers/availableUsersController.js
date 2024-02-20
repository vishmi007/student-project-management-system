// availableUsersController.js
const { getAllUserNamesWithDetails } = require("../data/Users");

const getAvailableUsers = async (req, res) => {
  try {
    const userDetails = await getAllUserNamesWithDetails();
    res.json(userDetails);
  } catch (error) {
    console.error("Error fetching available user information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAvailableUsers };
