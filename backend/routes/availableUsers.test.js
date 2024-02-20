const request = require("supertest");
const app = require("../routes/availableUsers"); 

describe("Available Users Route", () => {
  it("should retrieve available users", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200); 
  });
});
