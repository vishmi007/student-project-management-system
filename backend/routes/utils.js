const express = require("express");
const router = express.Router();
const { getUserMetaData } = require("../controllers/utils.js");
const {
  getNotificationsController,
} = require("../controllers/notification_manager/notificationsController.js");

router.get("/navbar-user-metadata", getUserMetaData);

router.get("/notifications", getNotificationsController);

module.exports = router;
