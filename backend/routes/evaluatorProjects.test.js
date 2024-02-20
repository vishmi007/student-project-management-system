const request = require("supertest");
const express = require("express");
const evaluatorProjectsRoute = require("../routes/evaluatorProjects");
const evaluatorProjectsController = require("../controllers/evaluatorProjectsController");

// Create an Express app for testing
const app = express();
app.use("/", evaluatorProjectsRoute);

describe("GET /evaluator-projects", () => {
  it("should respond with a status code of 200", async () => {
    // Mock the controller function to return some sample data
    const sampleData = [
      {
        projectId: "EfFCPaWgTD",
        nameOfProject: "Project 1",
       
      },
      {
        projectId: "ABC123",
        nameOfProject: "Project 2",
     
      }
    ];

    // Mock the getProjectsForEvaluatorController function
    evaluatorProjectsController.getProjectsForEvaluatorController = jest.fn(() => sampleData);

    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
  });
});
