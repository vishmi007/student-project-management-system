const { db, admin } = require("../../firebase/admin");

const sendNotification = async (message, usersList) => {
  if (!usersList || usersList.length === 0) return;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isUserEmails = usersList.every((user) => emailRegex.test(user));

  if (isUserEmails) {
    for (let email of usersList) {
      await addNotificationByEmail(email, message);
    }
  } else {
    for (let uuid of usersList) {
      await addNotificationByUuid(uuid, message);
    }
  }
};

const addNotificationByEmail = async (email, message) => {
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 16).replace("T", " ");
  const notificationObject = {
    content: message,
    timestamp: formattedDate,
  };
  const userQuery = await db
    .collection("Users")
    .where("email", "==", email)
    .get();

  if (userQuery.empty) return;

  const userDocRef = userQuery.docs[0].ref;

  try {
    await userDocRef.update({
      notifications: admin.firestore.FieldValue.arrayUnion(notificationObject),
    });
  } catch (error) {
    console.error("Error adding notification:", error);
  }
};

const addNotificationByUuid = async (uuid, message) => {
  const notificationObject = {
    content: message,
    timestamp: new Date(),
  };

  const userDocRef = db.collection("Users").doc(uuid);

  try {
    await userDocRef.update({
      notifications: admin.firestore.FieldValue.arrayUnion(notificationObject),
    });
  } catch (error) {
    console.error("Error adding notification:", error);
  }
};

module.exports = { sendNotification };
