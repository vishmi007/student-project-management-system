import React, { useRef, useState } from "react";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import SectionDivider from "../../../components/section_divider/SectionDivider";
import InputField from "../../../components/input_field/InputField";
import Dropdown from "../../../components/dropdown/Dropdown";
import TagInput from "../../../components/tag_input/TagInput";
import Button from "../../../components/btns/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Toast from "../../../components/toast/Toast";

export default function ProjectCreator() {
  const navigate = useNavigate();
  const [showToastError, setShowToastError] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const selectedSupervisors = useRef([]);
  const selectedEvaluators = useRef([]);
  const [projectDetails, setProjectDetails] = useState({
    nameOfProject: "",
    unitName: "",
    unitCode: "",
    totalTeams: 0,
    teamCapacity: 0,
    isGroupingAutomatic: true,
    assignedEvaluatorList: [],
    assignedSupervisorList: [],
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (isError) {
      setShowToastError(false);
    }
  }

  function getDropdownValue(value) {
    if (value === "No") {
      setProjectDetails((prev) => ({
        ...prev,
        isGroupingAutomatic: false,
      }));
    }
    if (isError) {
      setShowToastError(false);
    }
  }

  function getEvaluators(users) {
    selectedEvaluators.current = users;
    projectDetails.assignedEvaluatorList = users;
  }

  function getSupervisors(users) {
    selectedSupervisors.current = users;
    projectDetails.assignedSupervisorList = users;
  }

  // API Calls
  const {
    mutate: projectDetailsMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      try {
        const res = await axiosPrivate.post(
          "/lecturer/projects/create-project",
          projectDetails
        );
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      data?.projectId && localStorage.setItem("projectId", data.projectId);
      navigate("./templates");
    },
    onError: () => {
      setShowToastError(true);
    },
  });

  function handleCancel() {
    // Go back to the previous page
    navigate(-1);
  }

  return (
    <div>
      {showToastError && (
        <Toast
          status={isError && "error"}
          feedbackMessage='Whoops, something went wrong'
        />
      )}
      <NotificationHeader />
      <SectionHeader
        title='Create New Project'
        desc='Enter the details of your project'
        btnColor='red'
        btnLabel='Cancel'
        btnHandler={handleCancel}
      />
      <SectionDivider title='Your Project Details' />
      {/* Main content section */}
      <section className='mt-5'>
        <form onSubmit={projectDetailsMutation}>
          <div className='d-flex'>
            <div>
              <InputField
                value={projectDetails.nameOfProject}
                label='Name of Project'
                name='nameOfProject'
                placeholder='Eg: Assignment 2'
                isRequired={true}
                getInputValue={handleInput}
              />
            </div>
            <div className='ms-5'>
              <InputField
                value={projectDetails.unitName}
                label='Unit Name'
                name='unitName'
                placeholder='Eg: Capstone Computing Project 2'
                isRequired={true}
                getInputValue={handleInput}
              />
            </div>
          </div>
          <div className='my-4'>
            <InputField
              value={projectDetails.unitCode}
              label='Unit Code'
              name='unitCode'
              placeholder='Eg: ISAD3001'
              isRequired={true}
              getInputValue={handleInput}
            />
          </div>
          <div className='d-flex'>
            <div>
              <InputField
                value={projectDetails.totalTeams}
                label='Total Teams'
                name='totalTeams'
                placeholder='Eg: 10'
                isRequired={true}
                getInputValue={handleInput}
                type={"number"}
              />
            </div>
            <div className='ms-5'>
              <InputField
                value={projectDetails.teamCapacity}
                label='Team Capacity'
                name='teamCapacity'
                placeholder='Eg: 5'
                isRequired={true}
                getInputValue={handleInput}
                type={"number"}
              />
            </div>
            <div className='ms-5'>
              <Dropdown
                options={["Yes", "No"]}
                getValue={getDropdownValue}
              ></Dropdown>
            </div>
          </div>
          <div className='mt-4'>
            <TagInput
              labelText={"Add Supervisors"}
              infoText={
                "The supervisors you select will be added to this project, and you can assign any one of them to individual student groups."
              }
              userRole={"supervisor"}
              getUserList={getSupervisors}
            />
          </div>
          <div className='mt-4'>
            <TagInput
              labelText={"Add Evaluators"}
              infoText={
                "The evaluators you select will be added to this project, and you can assign any one of them to individual student groups."
              }
              userRole={"evaluator"}
              getUserList={getEvaluators}
            />
          </div>
          <div className='d-flex justify-content-end'>
            <Button
              type={"submit"}
              color='blue'
              size='medium'
              labelText='Next'
              isLoading={isLoading}
            ></Button>
          </div>
        </form>
      </section>
    </div>
  );
}
