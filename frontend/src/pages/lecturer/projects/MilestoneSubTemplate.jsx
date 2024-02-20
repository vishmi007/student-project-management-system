import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import SectionDivider from "../../../components/section_divider/SectionDivider";
import InputField from "../../../components/input_field/InputField";
import Button from "../../../components/btns/Button";
import TextAreaInput from "../../../components/text_area_input/TextAreaInput";
import FileUploader from "../../../components/file_uploader/FileUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function MilestoneSubTemplate() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [submissionName, setSubmissionName] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [passMark, setPassMark] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [submittedNames, setSubmittedNames] = useState([]);
  const [milestoneSubmissions, setMilestoneSubmissions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMilestone, setCurrentMilestone] = useState({
    submissionName: "",
    projectDeadline: "",
    totalMarks: "",
    passMark: "",
    projectDescription: "",
    files: [],
  });

  const notifySuccess = () =>
    toast.success("Submission details saved successfully!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = () =>
    toast.error("Failed to save submission details. Please try again.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, "dd, MMMM yyyy HH:mm");
      setProjectDeadline(formattedDate);
    } else {
      setProjectDeadline("");
    }
  };

  const { mutate: deleteProject } = useMutation({
    mutationFn: async (e) => {
      try {
        const projectId = localStorage.getItem("projectId");
        const res = await axiosPrivate.delete(
          `/lecturer/projects/delete/${projectId}`
        );
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      localStorage.removeItem("projectId");
      navigate(-3);
    },
    onError: () => {
      console.log("error while deleteing project");
      navigate(-3);
    },
  });

  function handleCancel() {
    deleteProject();
  }

  const handleNextBtnClick = async () => {
    console.log("Milestone Submissions:");
    milestoneSubmissions.forEach((submission, index) => {
      console.log(`Entry ${index + 1}:`);
      console.log("ProjectID:", submission.projectId);
      console.log("Submission Name:", submission.submissionName);
      console.log("Project Deadline:", submission.projectDeadline);
      console.log("Total Marks:", submission.totalMarks);
      console.log("Pass Mark:", submission.passMark);
      console.log("Project Description:", submission.projectDescription);
    });

    try {
      const endpoint =
        "lecturer/projects/create-project/templates/milestone-submission";
      const response = await axiosPrivate.post(endpoint, {
        projectId: localStorage.getItem("projectId"),
        milestoneSubmissions,
      });

      if (response.status === 200) {
        notifySuccess();
        console.log("Submission details saved successfully!");
        navigate("../projects/create-project/complete");
      } else {
        console.error("Failed to send data to the backend");
        notifyError();
      }
    } catch (error) {
      console.error("Error:", error);
      notifyError();
    }
  };

  function handlePrevBtnClick() {
    navigate(-1);
  }

  function handleSubmissionNameChange(event) {
    setSubmissionName(event.target.value);
    setCurrentMilestone((prevState) => ({
      ...prevState,
      submissionName: event.target.value,
    }));
  }

  function handleTotalMarksChange(event) {
    setTotalMarks(event.target.value);
    setCurrentMilestone((prevState) => ({
      ...prevState,
      totalMarks: event.target.value,
    }));
  }

  function handlePassMarkChange(event) {
    setPassMark(event.target.value);
    setCurrentMilestone((prevState) => ({
      ...prevState,
      passMark: event.target.value,
    }));
  }

  function handleProjectDescriptionChange(event) {
    setProjectDescription(event.target.value);
    setCurrentMilestone((prevState) => ({
      ...prevState,
      projectDescription: event.target.value,
    }));
  }

  function handleAddBtn() {
    if (submissionName.trim() !== "") {
      setSubmittedNames([...submittedNames, submissionName]); //
      setSubmissionName("");
      setTotalMarks("");
      setPassMark("");
      setProjectDescription("");
      setSelectedDate(null);
    }

    const payload = {
      submissionName,
      projectDeadline,
      totalMarks,
      passMark,
      projectDescription,
    };

    const updatedMilestoneSubmissions = [...milestoneSubmissions, payload];
    setMilestoneSubmissions(updatedMilestoneSubmissions);
  }

  function handleDeleteBtn(index) {
    const updatedNames = submittedNames.filter((name, i) => i !== index);
    setSubmittedNames(updatedNames);
  }

  const handleFileSelect = (files) => {
    const fileNames = Array.from(files).map((file) => file.name);
    setSelectedFileNames(fileNames);
    setCurrentMilestone((prevState) => ({
      ...prevState,
      files: Array.from(files),
    }));
  };

  return (
    <div>
      <NotificationHeader />
      <SectionHeader
        title='Create New Project'
        desc='You have chosen the Multiple Submission Assessment Template. Now customize its configuration according to your preferences'
        btnColor='red'
        btnLabel='Cancel'
        btnHandler={handleCancel}
      />
      <SectionDivider title='Configure Multiple Submission Template ' />
      <Container fluid>
        <Row>
          <Col>
            <section className='mt-5 d-flex flex-wrap'>
              <div className='d-flex '>
                <div className='me-5'>
                  <InputField
                    label='Submission Name'
                    placeholder='Eg: Final Assessment'
                    isRequired={true}
                    getInputValue={handleSubmissionNameChange}
                    value={submissionName}
                  />
                </div>
                <div>
                  <label>Select Project Deadline</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={15}
                    dateFormat='dd, MMMM yyyy'
                    placeholderText='Select Date and Time'
                    isRequired={true}
                  />
                </div>
              </div>
              <div className='d-flex mt-4'>
                <div className='me-5'>
                  <InputField
                    label='Total Marks'
                    placeholder='Eg: 100'
                    isRequired={true}
                    getInputValue={handleTotalMarksChange}
                    value={totalMarks}
                  />
                </div>
                <div>
                  <InputField
                    label='Pass Mark'
                    placeholder='Eg: 50'
                    isRequired={true}
                    getInputValue={handlePassMarkChange}
                    value={passMark}
                  />
                </div>
              </div>
              <div className='mt-4'>
                <TextAreaInput
                  label='Project Description'
                  placeholder='Enter your project project description here...'
                  getInputValue={handleProjectDescriptionChange}
                  value={projectDescription}
                />
              </div>
              <div className='mt-4 d-flex flex-wrap'>
                <FileUploader
                  endpoint='lecturer/projects/create-project/templates/milestone-submission/upload'
                  selectedFileNames={selectedFileNames}
                  onFileSelect={handleFileSelect}
                  currentMilestone={currentMilestone}
                />
                <Button
                  color='blue'
                  size='medium'
                  labelText='Add'
                  onClickHandler={handleAddBtn}
                  style={{ marginLeft: "100px" }}
                ></Button>
              </div>
            </section>
          </Col>
          <Col>
            <section className='mt-4 flex flex-wrap'>
              <div
                className='card float-end bg-light'
                style={{ width: "25rem" }}
              >
                <div className='card-body'>
                  <h3 className='card-title'></h3>
                  <div className='list-group justify-content-between align-items-center'>
                    {submittedNames.map((name, index) => (
                      <div
                        key={index}
                        className='list-group-item d-flex justify-content-between align-items-center'
                        style={{ width: "300px", height: "60px" }}
                      >
                        <div>{name}</div>
                        <div
                          className='btn btn-danger delete-btn'
                          style={{ width: "40px", height: "35px" }}
                          onClick={() => handleDeleteBtn(index)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ fontSize: "16px", color: "white" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
      <div className='d-flex justify-content-end mt-4'>
        <div className='me-3'>
          <Button
            color='blue'
            size='medium'
            labelText='Previous'
            onClickHandler={handlePrevBtnClick}
          ></Button>
        </div>
        <div>
          <Button
            color='blue'
            size='medium'
            labelText='Next'
            onClickHandler={handleNextBtnClick}
          ></Button>
        </div>
      </div>
    </div>
  );
}
