

/** @type {import("express").RequestHandler} */
async function submitFeedback(req, res) {
    try {
      // Extract data from the request body
      const { studentId, courseId, feedback } = req.body;
  
      const newFeedback = {
        studentId,
        courseId,
        feedback,
      };
  
      // Save the feedback to the database
      await saveFeedback();

      // Respond with a success message or the newly created feedback
      res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error(error);
      // Handle errors appropriately and send an error response
      res.status(500).json({ error: 'Internal Server Error' });
    }
}