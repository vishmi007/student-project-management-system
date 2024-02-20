const { db } = require("../../firebase/admin");

/** @type {import("express").RequestHandler} */
const getNotificationsController = async (req, res) => {
  const uuid = req.uuid;
  try {
    const notifications = await getNotifications(uuid);
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

async function getNotifications(uuid) {
  const userDocRef = db.collection("Users").doc(uuid);
  const userDoc = await userDocRef.get();
  if (userDoc.exists) {
    return userDoc.data().notifications;
  } else {
    throw new Error("User not found");
  }
}

module.exports = { getNotificationsController };
