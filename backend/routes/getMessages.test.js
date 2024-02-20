const request = require("supertest");
const app = require("../routes/getMessages"); // Update the path to your Express app

describe("Get Messages Route", () => {
  it("should retrieve and display chat messages", async () => {
    const response = await request(app).get("/Vishmi Bandara/Dewni Bandara");
    expect(response.status).toBe(200); 
   
  });
});
