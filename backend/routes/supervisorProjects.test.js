const request = require("supertest");
const express = require("express");
const supervisorProjectsRoute = require("../routes/supervisorProjects");
const supervisorProjectsController = require("../controllers/supervisorProjectsController");

// Create an Express app for testing
const app = express();
app.use("/", supervisorProjectsRoute);

describe("GET /", () => {
  it("should respond with a status code of 200 and sample data", async () => {
    // Mock the controller function to return some sample data
    const sampleData = [
      {
        projectId: "1",
        projectName: "Project 1",
      },
      {
        projectId: "2",
        projectName: "Project 2",
      
      },
    ];

    // Replace the controller function with the mock
    supervisorProjectsController.getProjectsForSupervisorController = jest.fn(() => sampleData);

    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
   
  });
});
