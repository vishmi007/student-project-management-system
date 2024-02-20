// UserInfo.js
const express = require("express");
const router = express.Router();
const getUserInfoController = require("../controllers/getUserInfoController");

router.get("/", getUserInfoController.getUserInfo);
router.get("/:uuid", getUserInfoController.getUserInfoByUUID);

module.exports = router;