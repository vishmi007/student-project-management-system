const request = require("supertest");
const express = require("express");
const submissionsRoute = require("../routes/submissions"); // Replace with the correct path to your route
const submissionsController = require("../controllers/getSubmissionsController"); // Replace with the correct path to your controller

// Create an Express app for testing
const app = express();
app.use("/:projectName", submissionsRoute);

describe("GET /:projectName", () => {
  it("should respond with a status code of 200 and return mock data for 'Project 1'", async () => {
    // Mock the controller function to return mock data
    const projectName = "Project 1";
    const sampleData = [
      {
        submissionId: 1,
        projectName: projectName,
       
      },
      {
        submissionId: 2,
        projectName: projectName,
       
      },
    ];

    submissionsController.getSubmissionsForProjectController = jest.fn(() => sampleData);

    const response = await request(app).get(`/${projectName}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(sampleData);
  });

  it("should respond with a status code of 200 and return mock data for 'Project 2'", async () => {
    // Mock the controller function to return mock data
    const projectName = "Project 2";
    const sampleData = [
      {
        submissionId: 3,
        projectName: projectName,
       
      },
    ];

    submissionsController.getSubmissionsForProjectController = jest.fn(() => sampleData);

    const response = await request(app).get(`/${projectName}`);

    expect(response.statusCode).toBe(200);
  
  });
});
