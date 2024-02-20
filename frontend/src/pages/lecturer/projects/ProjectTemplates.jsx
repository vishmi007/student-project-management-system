import React from "react";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import SectionDivider from "../../../components/section_divider/SectionDivider";
import Button from "../../../components/btns/Button";
import { useNavigate } from "react-router-dom";
import TemplateContents from "./ProjectTemplateContent";
import Templates from "../../../components/cards/TemplateCard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export default function ProjectTemplates() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

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
      navigate(-2);
    },
    onError: () => {
      console.log("error while deleteing project");
      navigate(-2);
    },
  });

  function handleCancel() {
    deleteProject();
  }

  function handlePrevBtn() {
    navigate(-1);
  }
  return (
    <div>
      <NotificationHeader />
      <SectionHeader
        title='Create New Project'
        desc='Please select a template from the options below to proceed with setting up your project'
        btnColor='red'
        btnLabel='Cancel'
        btnHandler={handleCancel}
      />
      <SectionDivider title='Templates' />
      <section>
        {/* Put the cards here */}
        <div className='my-5'>
          {TemplateContents.map((templateContent, index) => (
            <Templates
              key={index}
              Image={templateContent.Image}
              TempName={templateContent.TempName}
              TempDescription={templateContent.TempDescription}
              TempSelection={templateContent.TempSelection}
            />
          ))}
        </div>
      </section>
      <div className='d-flex justify-content-end'>
        <Button
          color={"blue"}
          size={"medium"}
          labelText={"Previous"}
          onClickHandler={handlePrevBtn}
        />
      </div>
    </div>
  );
}
