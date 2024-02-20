import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProjectCard from "../../components/cards/ProjectCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NotificationHeader from "../../components/notifiction_header/NotificationHeader";
import GreetingMessage from "../../components/greeting_messages/GreetingMessage";
import ProjectCalendar from "../../components/dashboard-calendar/ProjectCalendar";
import SubmissionCard from "../../components/cards/SubmissionCard";

export default function EvaluatorDashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [evaluatorEmail, setEvaluatorEmail] = useState("");

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
 
    axiosPrivate
      .get("/get-user-info")
      .then((response) => {
        const userData = response.data;
        if (userData.email) {
          setEvaluatorEmail(userData.email); 
        }
      })
      .catch((error) => {
        console.error("Error fetching evaluator info:", error);
      });
  }, []);

  useEffect(() => {
    
    if (evaluatorEmail) {
      axiosPrivate
        .get(`/evaluator-projects/${evaluatorEmail}`) 
        .then(async (response) => {
          const data = response.data;
          console.log(data);
          const projectsWithLecturerInfo = await Promise.all(
            data.map(async (project) => {
              const lecturerInfoResponse = await axiosPrivate.get(
                `/get-user-info-uuid/${project.projectOwner}`
              );
              const lecturerInfo = lecturerInfoResponse.data;
              const startDate = new Date(project.startDate?._seconds * 1000);
              const deadline = new Date(project.deadline?._seconds * 1000);
  
              const formattedDeadline = format(
                new Date(project.deadline._seconds * 1000),
                "d MMMM yyyy 'at' HH:mm:ss 'UTC'xxx"
              );

              return {
                ...project,
                lecturerName: `${lecturerInfo.firstName} ${lecturerInfo.lastName}`,
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
    }
  }, [evaluatorEmail, searchQuery]);

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

              return {
                ...submission,
                evaluatorName: `${evaluatorInfo.firstName} ${evaluatorInfo.lastName}`,
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
  }, [selectedProject]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={12} style={{ padding: 0 }}>
            <NotificationHeader />
            <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
              <GreetingMessage />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ margin: "20px", flex: 3, margin: "2rem" }}>
                  <h3 style={{ marginBottom: "10px" }}>Ongoing Projects</h3>
                  <input
                    type="text"
                    placeholder="Search by project name or module name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      marginBottom: "1rem",
                      padding: "0.5rem",
                      width: "500px",
                      borderRadius: "5px",
                    }}
                  />
                  <div className="project-card-container">
                    <div className="project-card-header">
                      <div className="headerItem">Project Name</div>
                      <div className="headerItem">Module Name</div>
                      <div className="headerItem">Lecturer in Charge</div>
                      <div className="headerItem">Deadline</div>
                      <div className="headerItem">Submission Type</div>
                    </div>
                    <div className="project-card-list">
                      {projects.map((project) => (
                        <ProjectCard
                          key={project.projectId}
                          projectName={project.nameOfProject}
                          moduleName={project.unitCode}
                          submissionType={project.submissionType}
                          deadline={project.formattedDeadline}
                          lecturer={project.lecturerName}
                          isSelected={selectedProject === project}
                          onClick={() => setSelectedProject(project)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ width: "60%", margin: "20px", flex: 1 }}>
                  <ProjectCalendar projects={projects} selectedProject={selectedProject} />
                </div>
              </div>
              {submissions.length > 0 && (
                <div style={{ width: "50%", marginLeft: "2rem", marginTop:'1rem',flex: 1 }}>
                  <h3 style={{ marginBottom: "10px" }}>Submissions available to be reviewed</h3>
                  <div className="submission-card-container">
                    <div className="submission-card-header">
                      <div className="headerItem">Group</div>
                      <div className="headerItem">Submission Date</div>
                      <div className="headerItem">Evaluator</div>
                    </div>
                    <div className="submission-card-list">
                      {submissions.map((submission) => (
                        <SubmissionCard
                          key={submission.id}
                          groupName={submission.groupName}
                          formattedDate={submission.formattedDate}
                          evaluatorIncharge={submission.evaluatorName}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
