const request = require("supertest");
const express = require("express");
const app = express();
const sendMessageRoute = require("../routes/sendMessage"); // Update the path to your "sendMessage" route

// Import the sendMessageController
const sendMessageController = require("../controllers/chat_system/sendMessageController");

app.use("/", sendMessageRoute);

describe("Send Message Route", () => {
  it("should send a chat message with a status code of 200", async () => {
    // Mock the controller function to handle the message send
    sendMessageController.sendMessageController = jest.fn(() => ({
      status: "Message sent successfully",
    }));

    const messageToSend = {
      sender: "Vishmi Bandara",
      receiver: "Dewni Bandara",
      message: "Hello, Dewni!",
    };

    const response = await request(app)
      .post("/")
      .send(messageToSend)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);

   
    expect(response.body).toEqual({ status: "Message sent successfully" });
  });
});
