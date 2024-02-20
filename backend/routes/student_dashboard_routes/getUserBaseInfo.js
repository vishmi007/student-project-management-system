/*
 * FILE: getUserBaseInfo.js
 * AUTHOR: Shamika Kumarasinghe [ID: 20470395]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: This is the route handler for the getUserBaseInfo controller
 * REFERENCE: None
 * LAST MOD: 09/18/2023
 */

const express = require("express");
const router = express.Router();
const getUserBaseInfoController = require("../../controllers/student_dashboard_controllers/getUserBaseInfo");
const getProjectsController = require("../../controllers/student_dashboard_controllers/getProjects");
const getTeamsController = require("../../controllers/student_dashboard_controllers/getTeamsController");
const addToTeamsController = require("../../controllers/student_dashboard_controllers/addToTeamController");
const addNewKanbanTaskController = require("../../controllers/student_dashboard_controllers/addNewKanbanTaskController");
const getKanbanBoardController = require("../../controllers/student_dashboard_controllers/getKanbanBoardController");
const makeNewKanbanBoardController = require("../../controllers/student_dashboard_controllers/makeNewKanbanBoardController");
const updateKanban = require("../../controllers/student_dashboard_controllers/updateKanban");
const uploadController = require("../../controllers/create_projects/uploadController");
const getSubmisionDetailsController = require("../../controllers/student_dashboard_controllers/getSubmisions");

router.get("/",getUserBaseInfoController.getUserBaseInfo);
router.get("/get-projects",getProjectsController.getProjects);
router.post("/get-teams",getTeamsController.getTeamsController);
router.post("/add-to-teams",addToTeamsController.addToTeamController);
router.post("/add-new-task",addNewKanbanTaskController.addNewKanbanTaskController);
router.post("/get-kanban",getKanbanBoardController.getKanbanBoardController);
router.post("/initialize-kanban",makeNewKanbanBoardController.makeNewKanbanBoardController);
router.post("/update-kanban",updateKanban.UpdateKanban);
router.post("/submision/upload",uploadController.handleFileUploadToStorage);
router.post("/get-submision/details",getSubmisionDetailsController.getSubmisions);

module.exports = router;