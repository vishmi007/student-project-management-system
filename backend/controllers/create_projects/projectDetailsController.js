const { createInitialProject } = require("../../data/Projects");
const { initializeKanban } = require("../../data/Student_Dashboard");
const { nanoid } = require("nanoid");
const {
  sendNotification,
} = require("../notification_manager/notificationsHelper");

const storeProjectDetails = async (req, res) => {
  const {
    nameOfProject,
    unitName,
    unitCode,
    totalTeams,
    teamCapacity,
    isGroupingAutomatic,
    assignedEvaluatorList,
    assignedSupervisorList,
  } = req.body;

  // Basic data validation
  if (!nameOfProject || !unitName || !unitCode)
    return res.status(400).json({ message: "Missing required fields." });
  if (totalTeams === 0 || teamCapacity === 0)
    return res
      .status(400)
      .json({ message: "Total teams and team capacity required." });

  // Generate a unique project id
  const projectId = generateProjectId();

  // Prepare object to be stored in the database
  const projectDetails = {
    projectOwner: req.uuid,
    projectId,
    nameOfProject,
    unitName,
    unitCode,
    totalTeams: parseInt(totalTeams),
    teamCapacity: parseFloat(teamCapacity),
    isGroupingAutomatic,
    assignedEvaluatorList,
    assignedSupervisorList,
    teams: await generateTeamSlots(totalTeams),
  };

  // Make the database call
  const saved = await createInitialProject(projectId, projectDetails);
  console.log("Project ID:", projectId);

  if (!saved) res.sendStaus(401);
  const supervisorMsg = `Your have been added to supervise ${unitName} ${unitCode} ${nameOfProject}`;
  const evaluatorMsg = `Your have been added to evaluate ${unitName} ${unitCode} ${nameOfProject}`;
  await sendNotification(supervisorMsg, assignedSupervisorList);
  await sendNotification(evaluatorMsg, assignedEvaluatorList);
  res.status(200).json({ projectId });
};

const generateProjectId = () => {
  const length = 10;
  const projectId = nanoid(length);
  return projectId;
};

const generateTeamSlots = async (totalTeams) => {
  let slots = {};
  for (i = 0; i < totalTeams; i++) {
    const kanbanBoard = {
      teamId: `team${i + 1}`,
      task: [],
    };
    const kandbanBoardId = await initializeKanban(kanbanBoard);
    // make kanban
    slots = {
      ...slots,
      [`team${i + 1}`]: {
        teamName: `Team ${i + 1}`,
        isMaxcapacity: false,
        members: [],
        supervisors: [],
        evaluators: [],
        kanbanBoardId: kandbanBoardId.data,
      },
    };
  }
  return slots;
};

module.exports = { storeProjectDetails };
