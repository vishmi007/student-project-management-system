/*
 * FILE: index.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Entry point for the application
 * REFERENCE: None
 * LAST MOD: 27/07/2023
 */

const express = require("express");
const multer = require("multer");
const app = express();
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const verifyRoles = require("./middleware/verifyRoles");
const ROLES_LIST = require("./config/rolesList");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PORT = process.env.PORT || 5050;

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(upload.array("files"));

// Authentication and authorization routes
app.use("/signup", require("./routes/signup"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// app.use(
//   "/student",
//   require("./routes/student_dashboard_routes/getUserBaseInfo")
// );

// Protect routes
app.use(verifyJWT);



// Protected routes [NOTE: ALL ROUTES SHOULD GO HERE]
app.use(
  "/lecturer",
  verifyRoles(ROLES_LIST.Lecturer),
  require("./routes/create_projects/createProjects")
);
app.use(
  "/supervisor",
  verifyRoles(ROLES_LIST.Supervisor),
  require("./routes/supervisor")
);
app.use(
  "/evaluator",
  verifyRoles(ROLES_LIST.Evaluator),
  require("./routes/evaluator")
);
// app.use("/student", verifyRoles(ROLES_LIST.Student));
app.use(
  "/utils",
  verifyRoles(
    ROLES_LIST.Student,
    ROLES_LIST.Lecturer,
    ROLES_LIST.Evaluator,
    ROLES_LIST.Supervisor
  ),
  require("./routes/utils")
);

app.use("/get-messages", require("./routes/getMessages"));
app.use("/supervisor-projects", require("./routes/supervisorProjects"));
app.use("/get-user-info", require("./routes/userinfo"));
app.use("/get-user-info-uuid", require("./routes/userinfo"));
app.use("/get-submissions", require("./routes/submissions"));
app.use("/lecturer-projects", require("./routes/lecturerProjects"));
app.use("/available-users", require("./routes/availableUsers"));
app.use("/send-message", require("./routes/sendMessage"));
app.use("/delete-message", require("./routes/deleteMessage"));
app.use("/get-conversations", require("./routes/getConversations"));

//STUDENT DASHBOARD END POINSTS

//TODO:Role veri need to be added

app.use(
  "/get-base-info",
  require("./routes/student_dashboard_routes/getUserBaseInfo")
);
app.use("/getinfo", require("./routes/projectinfo"));

app.use(
  "/get-enrolled",
  require("./routes/student_dashboard_routes/getEnrolled")
);
app.use(
  "/gettodolist",
  require("./routes/student_dashboard_routes/getToDoListRoute")
);
app.use("/lecturer-projects", require("./routes/lecturerProjects"));
app.use("/evaluator-projects", require("./routes/evaluatorProjects"));


app.use(
  "/student",
  require("./routes/student_dashboard_routes/getUserBaseInfo")
);

// Default/Invalid Route
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
