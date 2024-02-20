import React, { useState } from "react";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import SectionDivider from "../../../components/section_divider/SectionDivider";
import { useNavigate } from "react-router-dom";
import InputFieldReadOnly from "../../../components/input_field/InputFieldReadOnly";
import Button from "../../../components/btns/Button";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Toast from "../../../components/toast/Toast";

export default function ProjectCreationSuccessPage() {
  const navigate = useNavigate();
  const PREVIOUS_PAGE = -1;
  const INITIAL_PROJECTS_PAGE = -4;
  const axiosPrivate = useAxiosPrivate();
  const {
    data: resInviteCode,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      try {
        const projectId = localStorage.getItem("projectId");
        console.log(projectId);
        const res = await axiosPrivate.get(
          `/lecturer/projects/create-project/complete/${projectId}`
        );
        localStorage.removeItem("projectId");
        return res.data?.inviteCode;
      } catch (error) {
        throw error;
      }
    },
    queryKey: ["inviteCodes"],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Toast
        status={isError && "error"}
        feedbackMessage='Whoops, something went wrong'
      />
      <NotificationHeader />
      <SectionHeader
        title='Create New Project'
        desc='Your project is good to go! Share the provided links or code with your team members to get them onboard and start working together.'
        btnHandler={() => navigate(INITIAL_PROJECTS_PAGE)}
      />
      <SectionDivider title='Your Project is Ready' />
      <section className='mt-5 flex-grow-1 d-flex flex-column'>
        <div>
          <InputFieldReadOnly
            label={"Your project invite code"}
            value={
              isLoading
                ? "Loading..."
                : isError
                ? "Could not retrieve code"
                : resInviteCode
            }
          />
          <p className='pt-3'>
            Share the code with your students for them to join this project and
            create their teams.
          </p>
        </div>
        <div className='mt-5'>
          <InputFieldReadOnly
            label={"Your project invite link"}
            value={
              isLoading
                ? "Loading..."
                : isError
                ? "Could not retrieve link"
                : `http://localhost:3000/enroll/${resInviteCode}`
            }
            type={"link"}
          />
          <p className='pt-3'>
            Share the invite link with students to join the project and create
            their teams.
          </p>
        </div>
        <div className='mt-auto d-flex justify-content-end'>
          <div>
            <Button
              color='blue'
              size='medium'
              labelText='Done'
              onClickHandler={() => navigate(INITIAL_PROJECTS_PAGE)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
