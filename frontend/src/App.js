/*
 * FILE: App.js
 * AUTHOR: Vansitha Ratnayake [ID: 20468523]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Entry point and contains all routes
 * REFERENCE: None
 * LAST MOD: 03/08/2023
 */

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import StudentPage from "./pages/student/StudentPage";
import LecturerPage from "./pages/lecturer/LecturerPage";
import SupervisorPage from "./pages/supervisor/SupervisorPage";
import EvaluatorPage from "./pages/evaluator/EvaluatorPage";
import LecturerProjects from "./pages/lecturer/projects/LecturerProjects";
import AddStudentCard from "./pages/student/addstudentcard/AddStudentCard";
import ProjectDashboard from "./pages/student/projects/ProjectDashboard";
import ErrorPage from "./pages/ErrorPage";
import ProjectCreator from "./pages/lecturer/projects/ProjectCreator";
import ProjectTemplates from "./pages/lecturer/projects/ProjectTemplates";
import MilestoneSubTemplate from "./pages/lecturer/projects/MilestoneSubTemplate";
import SingleSubTemplate from "./pages/lecturer/projects/SingleSubTemplate";
import Modal from "./components/modal/Modal";
import Teams from "./pages/lecturer/projects/Teams";
import TeamMilestone from "./pages/lecturer/projects/TeamMilestone";
import TeamSingleSub from "./pages/lecturer/projects/TeamSingleSub";
import ProjectCreationSuccessPage from "./pages/lecturer/projects/ProjectCreationSuccessPage";
import StudentEnrollment from "./pages/student/enrollment/StudentEnrollment";
import EnrollmentFailedPage from "./pages/student/enrollment/EnrollmentFailedPage";
import EnrollmentSuccessful from "./pages/student/enrollment/EnrollmentSuccessful";
import StudentDashboard from "./pages/student/studentdashboard/StudentDashboard";
import SignupPage from "./pages/login/SignupPage";
import Layout from "./pages/Layout";
import RequireAuth from "./pages/login/RequireAuth";
import ROLES_LIST from "./api/userRoles";
import PersistLogin from "./pages/login/PersistLogin";
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import TeamInfoPage from "./pages/student/enrollment/TeamInfoPage";
import LecturerDashboard from "./pages/lecturer/LecturerDashboard";
import ProjectListPage from "./pages/student/projects/ProjectListPage";
import AllTeamList from "./pages/student/enrollment/AllTeamsList";
import EvaluatorDashboard from "./pages/evaluator/EvaluatorDashboard";
//import ChatPage from "./pages/ChatPage";

import SubmimisionDashBoard from "./pages/student/submisions/Submision";

//context imports
import ChatPage from "./pages/chat/ChatPage";
import SupervisorProjects from "./pages/supervisor/projects/SupervisorProjects";
import SupervisorTeams from "./pages/supervisor/projects/SupervisorTeams";
import SupervisorSingleSub from "./pages/supervisor/projects/SupervisorSingleSub";
import SupervisorMilestoneSub from "./pages/supervisor/projects/SupervisorMilestoneSub";
import EvaluatorProjects from "./pages/evaluator/projects/EvaluatorProjects";
import EvaluatorTeams from "./pages/evaluator/projects/EvaluatorTeams";
import EvaluatorMilestoneSub from "./pages/evaluator/projects/EvaluatorMilestoneSub";
import EvaluatorSingleSub from "./pages/evaluator/projects/EvaluatorSingleSub";

const LECTURER_ROLE = ROLES_LIST.lecturer.roleVal;
const STUDENT_ROLE = ROLES_LIST.student.roleVal;
const EVALUATOR_ROLE = ROLES_LIST.evaluator.roleVal;
const SUPERVISOR_ROLE = ROLES_LIST.supervisor.roleVal;
const ENABLE_AUTH = true;

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path='/' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='unauthorized' element={<ErrorPage />} />

        {/* Private Routes */}
        <Route element={ENABLE_AUTH && <PersistLogin />}>
          <Route
            element={ENABLE_AUTH && <RequireAuth allowedRole={LECTURER_ROLE} />}
          >
            {/* All Lecturer Routes Goes Here [Protected] */}
            <Route path="/lecturer" element={<LecturerPage />}>
            <Route path="home" element={<LecturerDashboard />} /> 
              <Route path='messaging' element={<ChatPage/>} />
              <Route path="projects" element={<LecturerProjects />} />
              <Route path="projects/teams" element={<Teams />} />
              <Route
                path='projects/:projectId/teams/:teamId/milestone'
                element={<TeamMilestone />}
              />
              <Route
                path='projects/:projectId/teams/:teamId/single-sub'
                element={<TeamSingleSub />}
              />
              <Route
                path='projects/create-project'
                element={<ProjectCreator />}
              />
              <Route
                path='projects/create-project/templates'
                element={<ProjectTemplates />}
              />
              <Route
                path='projects/create-project/templates/single-submission'
                element={<SingleSubTemplate />}
              />
              <Route
                path='projects/create-project/templates/single-submission/upload'
                element={<Modal />}
              />
              <Route
                path='projects/create-project/templates/milestone-submission'
                element={<MilestoneSubTemplate />}
              />
              <Route
                path='projects/create-project/templates/milestone-submission/upload'
                element={<Modal />}
              />
              <Route
                path='projects/create-project/templates/milestone-submission'
                element={<MilestoneSubTemplate />}
              />
              <Route
                path='projects/create-project/complete'
                element={<ProjectCreationSuccessPage />}
              />
              <Route path='messaging' element={<ChatPage />} />
              <Route path='settings' element={<div>Settings</div>} />
            </Route>
          </Route>

          {/* All Student Routes Goes Here [Protected] */}
          <Route
            element={ENABLE_AUTH && <RequireAuth allowedRole={STUDENT_ROLE} />}
          >
            <Route path='/student' element={<StudentPage />}>
              <Route path='home' element={<StudentDashboard />} />

              <Route path='home/enrollment' element={<StudentEnrollment />} />
              <Route
                path='home/enrollment/enrollment-failed'
                element={<EnrollmentFailedPage />}
              />

              <Route
                path='home/enrollment/enrollment-successful/:projectID'
                element={<EnrollmentSuccessful />}
              />
              <Route
                path='home/enrollment/enrollment-successful/:projectID/allteams'
                element={<AllTeamList />}
              />
              <Route
                path='home/enrollment/enrollment-successful/:projectID/allteams/:teamname'
                element={<TeamInfoPage />}
              />
              <Route path='projects' element={<ProjectListPage />} />
              <Route
                path='projects/:projectID/:projectName/:teamID'
                element={<ProjectDashboard />}
              />
              <Route
                path='projects/:projectID/:projectName/:teamID/:submisionID'
                element={<SubmimisionDashBoard />}
              />

              <Route path='addstudent' element={<AddStudentCard />}></Route>
              {/* <Route
                path='projects'
                element={<StudentProjectDashboard />}
              ></Route> */}
              <Route
                path='removestudent'
                element={<div>removestudent</div>}
              ></Route>
              <Route path='messaging' element={<ChatPage />} />
            </Route>
          </Route>

          {/* All Evaluator Routes Goes Here [Protected] */}
          <Route
            element={
              ENABLE_AUTH && <RequireAuth allowedRole={EVALUATOR_ROLE} />
            }
          >
            <Route path='/evaluator' element={<EvaluatorPage />}>
              <Route path='home' element={<EvaluatorDashboard />} />
              <Route path='projects' element={<EvaluatorProjects />} />
              <Route
                path='projects/:projectId/teams'
                element={<EvaluatorTeams />}
              />
              <Route
                path='projects/:projectId/teams/:teamId/milestone'
                element={<EvaluatorMilestoneSub />}
              />
              <Route
                path='projects/:projectId/teams/:teamId/single-sub'
                element={<EvaluatorSingleSub />}
              />
              <Route path='messaging' element={<ChatPage />} />
            </Route>
          </Route>

          {/* All Supervisor Routes Goes Here [Protected] */}
          <Route
            element={
              ENABLE_AUTH && <RequireAuth allowedRole={SUPERVISOR_ROLE} />
            }
          >
            <Route path='/supervisor' element={<SupervisorPage />}>
              <Route path='home' element={<SupervisorDashboard />} />
              <Route path='projects' element={<SupervisorProjects />} />
              <Route
                path='projects/:projectId/teams'
                element={<SupervisorTeams />}
              />
              <Route
                path='projects/:projectId/teams/:teamId/milestone'
                element={<SupervisorMilestoneSub />}
              />
              <Route
                path='projects/:projectId/teams/:teamId/single-sub'
                element={<SupervisorSingleSub />}
              />
              <Route path='messaging' element={<ChatPage />} />
            </Route>
          </Route>
        </Route>

        {/* Invalid Route */}
        <Route path='*' element={<ErrorPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
