import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import SectionDivider from "../../../components/section_divider/SectionDivider";
import InputField from "../../../components/input_field/InputField";
import Button from "../../../components/btns/Button";
import TextAreaInput from "../../../components/text_area_input/TextAreaInput";
import FileUploader from "../../../components/file_uploader/FileUploader";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function SingleSubTemplate() {
  const navigate = useNavigate();
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [submissionName, setSubmissionName] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [passMark, setPassMark] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

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

  function handleSubmissionNameChange(event) {
    setSubmissionName(event.target.value);
  }

  function handleTotalMarksChange(event) {
    setTotalMarks(event.target.value);
  }

  function handlePassMarkChange(event) {
    setPassMark(event.target.value);
  }

  function handleProjectDescriptionChange(event) {
    setProjectDescription(event.target.value);
  }

  const { mutate: deleteProject, isLoading } = useMutation({
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, "dd, MMMM yyyy HH:mm");
      setProjectDeadline(formattedDate);
    } else {
      setProjectDeadline("");
    }
  };

  const axiosPrivate = useAxiosPrivate();

  const handleNextBtnClick = async () => {
    const payload = {
      projectId: localStorage.getItem("projectId"),
      submissionName,
      projectDeadline,
      totalMarks,
      passMark,
      projectDescription,
    };
    console.log(payload);

    try {
      const endpoint =
        "lecturer/projects/create-project/templates/single-submission";
      const response = await axiosPrivate.post(endpoint, payload);

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

  const handleFileSelect = (files) => {
    const fileNames = Array.from(files).map((file) => file.name);
    setSelectedFileNames(fileNames);
  };

  return (
    <div>
      <NotificationHeader />
      <SectionHeader
        title='Create New Project'
        desc='You have chosen the Single Submission Assessment Template. Now customize its configuration according to your preferences'
        btnColor='red'
        btnLabel='Cancel'
        btnHandler={handleCancel}
      />
      <SectionDivider title='Configure Single Submission  Template ' />
      <section className='mt-5'>
        <div className='d-flex'>
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
        <div className='mt-4'>
          <FileUploader
            endpoint='lecturer/projects/create-project/templates/single-submission/upload'
            selectedFileNames={selectedFileNames}
            onFileSelect={handleFileSelect}
          />
        </div>
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
      </section>
    </div>
  );
}
