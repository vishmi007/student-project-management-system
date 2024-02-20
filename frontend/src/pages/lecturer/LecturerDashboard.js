import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideNavBar from "../../components/navbar/SideNavBar";
import ProjectCard from "../../components/cards/ProjectCardsLecturerDashboard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NotificationHeader from "../../components/notifiction_header/NotificationHeader";
import GreetingMessage from "../../components/greeting_messages/GreetingMessage";
import ProjectCalendar from "../../components/dashboard-calendar/ProjectCalendar";
import SubmissionCardLecturerDashboard from "../../components/cards/SubmissionCardLecturerDashboard";
import Button from "../../components/btns/Button";
import "./LecturerDashboard.css";

export default function LecturerDashboard() {
  const BASE_PATH = "/lecturer";
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/lecturer-projects")
      .then(async (response) => {
        const data = response.data;
        const projectsWithLecturerInfo = await Promise.all(
          data.map(async (project) => {
            const startDate = new Date(project.startDate._seconds * 1000);
            const deadline = new Date(project.deadline._seconds * 1000);

            const formattedDeadline = format(
              new Date(project.deadline._seconds * 1000),
              "d MMMM yyyy 'at' HH:mm:ss 'UTC'xxx"
            );

            return {
              ...project,
              formattedDeadline: formattedDeadline,
              startDate: startDate,
              deadline: deadline,
            };
          })
        );

        // Apply search filtering
        const filteredProjects = projectsWithLecturerInfo.filter(
          (project) =>
            project.nameOfProject
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            project.unitCode.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setProjects(filteredProjects);
        setSelectedProject(filteredProjects[0]);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
    // eslint-disable-next-line
  }, [searchQuery]);
  useEffect(() => {
    if (selectedProject) {
      axiosPrivate
        .get(`/get-submissions/${selectedProject.nameOfProject}`)
        .then(async (response) => {
          const formattedSubmissions = await Promise.all(
            response.data.map(async (submission) => {
              const evaluatorInfoResponse = await axiosPrivate.get(
                `/get-user-info-uuid/${submission.evaluatorInCharge}`
              );
              const evaluatorInfo = evaluatorInfoResponse.data;

              const supervisorInfoResponse = await axiosPrivate.get(
                `/get-user-info-uuid/${submission.supervisorInCharge}`
              );

              const supervisorInfo = supervisorInfoResponse.data;
              console.log(supervisorInfo.firstName);

              return {
                ...submission,
                evaluatorName: `${evaluatorInfo.firstName} ${evaluatorInfo.lastName}`,
                supervisorName: `${supervisorInfo.firstName} ${supervisorInfo.lastName}`,
                formattedDate: format(
                  new Date(submission.submissionDate._seconds * 1000),
                  "d MMMM yyyy 'at' HH:mm:ss 'UTC'xxx"
                ),
              };
            })
          );

          setSubmissions(formattedSubmissions);
        })
        .catch((error) => {
          console.error("Error fetching submissions:", error);
        });
    }
    // eslint-disable-next-line
  }, [selectedProject]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={12} style={{ padding: 0 }}>
            <NotificationHeader />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "1rem",
                gap: "2rem",
              }}
            >
              {/* Create Project button */}
              <Button
                onClickHandler={() => {
                  // Handle create project button click
                }}
                labelText='Create Project'
                color='blue'
                size='small'
              />
              {/* Manage Groups button */}
              <Button
                onClickHandler={() => {
                  // Handle manage groups button click
                }}
                labelText='Manage Groups'
                color='blue'
                size='small'
                style={{ marginLeft: "10px" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px",
              }}
            >
              <GreetingMessage />

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 3, margin: "2rem" }}>
                  <h3 style={{ marginBottom: "10px" }}>Your Active Projects</h3>
                  <input
                    type='text'
                    placeholder='Search by project name or module name'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      marginBottom: "1rem",
                      padding: "0.5rem",
                      width: "500px",
                      borderRadius: "5px",
                    }}
                  />

                  <div className='project-card-container'>
                    <div className='project-card-header'>
                      <div className='headerItem'>Project Name</div>
                      <div className='headerItem'>Module Name</div>
                      <div className='headerItem'>Deadline</div>
                      <div className='headerItem'>Submission Type</div>
                    </div>
                    <div className='project-card-list'>
                      {projects.map((project) => (
                        <ProjectCard
                          key={project.projectId}
                          projectName={project.nameOfProject}
                          moduleName={project.unitCode}
                          submissionType={project.submissionType}
                          deadline={project.formattedDeadline}
                          isSelected={selectedProject === project}
                          onClick={() => setSelectedProject(project)}
                        />
                      ))}
                    </div>
                  </div>
                  {submissions.length > 0 && (
                    <div
                      style={{
                        width: "80%",
                        marginLeft: "0.5rem",
                        marginTop: "1rem",
                        flex: 1,
                      }}
                    >
                      <h3 style={{ marginBottom: "10px" }}>
                        Submissions available
                      </h3>
                      <div className='lecturer-submission-card-container'>
                        <div className='lecturer-submission-card-header'>
                          <div className='headerItem'>Group</div>
                          <div className='headerItem'>Submission Date</div>
                          <div className='headerItem'>Evaluator</div>
                          <div className='headerItem'>Supervisor</div>
                        </div>
                        <div className='lecturer-submission-card-list'>
                          {submissions.map((submission) => (
                            <SubmissionCardLecturerDashboard
                              key={submission.id}
                              groupName={submission.groupName}
                              formattedDate={submission.formattedDate}
                              evaluatorIncharge={submission.evaluatorName}
                              supervisorInCharge={submission.supervisorName}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ width: "60%", margin: "20px", flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2rem",
                      margin: "3rem",
                    }}
                  >
                    <div className='enrollment-box'>
                      <div className='icon'>
                        <img
                          src={require("../../assets/supervisor_icon.png")}
                          alt='Enrollment Icon'
                        />
                      </div>
                      <div className='enrollment-info'>
                        <h2>Total Student Groups Enrolled : 9 </h2>
                      </div>
                    </div>

                    <div className='enrollment-box'>
                      <div className='icon'>
                        <img
                          src={require("../../assets/document.png")}
                          alt='Enrollment Icon'
                        />
                      </div>
                      <div className='enrollment-info'>
                        <h2>Total Number of Submissions reveived : 3 </h2>
                      </div>
                    </div>
                  </div>
                  <ProjectCalendar
                    projects={projects}
                    selectedProject={selectedProject}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
