const { addFiles } = require("../../data/Projects");

const handleFileUploadToStorage = async (req, res) => {
  try { 
    const projectId = req.body.projectId;
    const files = req.files;
    const callerId = req.body.callerId;
    const milestoneName = req.body.milestoneName;
    const teamNo = req.body.teamNo;


    console.log("milestone name in controller: ", milestoneName);
    if (!projectId || !files) {
    throw new Error("Invalid input data");
    }
    const uploadResult = await addFiles(projectId, files, callerId, milestoneName , teamNo);
      if (uploadResult.success) {
        return res.status(200).json({ success: true, message: 'Files uploaded successfully' });
      } else {
        return res.status(500).json({ success: false, message: 'Error uploading files' });
      }
  } catch (error) {
      console.error('Error uploading files:', error);
      return res.status(500).json({ success: false, message: 'Error uploading files' });
  }
};

module.exports = {
  handleFileUploadToStorage,
};
