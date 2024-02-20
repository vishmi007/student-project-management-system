const { setProjectInvite } = require("../../data/Projects");

/** @type {import("express").RequestHandler} */
const generateInvite = async (req, res) => {
  const { projectId } = req.params;
  if (!projectId)
    return res.status(400).json({ message: "project ID is required" });

  const inviteCode = generateInviteCode(6);
  const { status, response } = await setProjectInvite(projectId, inviteCode);

  if (status === 200) {
    return res.status(200).json({ inviteCode: response });
  }
  res.status(status).json({ message: response });
};

function generateInviteCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = length || 8;
  let inviteCode = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    inviteCode += characters.charAt(randomIndex);
  }

  return inviteCode;
}

module.exports = { generateInvite };
