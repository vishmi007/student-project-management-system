import React from "react";
import SectionHeader from "../../../components/section_header/SectionHeader";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function Teams() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const url = window.location;
  const pathname = url.pathname;
  const parts = pathname.split("/");
  const projectId = parts[3];

  const { data, isSuccess } = useQuery({
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get(
          `lecturer/projects/${projectId}/teams`
        );
        return res.data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ["getProjects"],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  function card(team, totalToSubmit, totalToGrade, teamSize, submissionType) {
    return (
      <div
        key={team.teamId}
        onClick={() => {
          if (submissionType === "singleSubmission") {
            navigate(
              `/lecturer/projects/${projectId}/teams/${team.teamId}/single-sub`
            );
          } else if (submissionType === "milestoneSubmission") {
            navigate(
              `/lecturer/projects/${projectId}/teams/${team.teamId}/milestone`
            );
          }
        }}
        className='card mb-2'
        style={{
          cursor: "pointer",
          width: "80rem",
          height: "3.5rem",
          justifyContent: "center",
          backgroundColor: "white",
          border: "1px solid lightgrey",
        }}
      >
        <div className='card-body text-center'>
          <div className='row mb-0 '>
            <div className='col'>{team.teamName}</div>
            <div className='col'>
              {team.totalEnrolled} / {teamSize}
            </div>
            <div className='col'>
              {team.totalSubmitted} / {totalToSubmit}
            </div>
            <div className='col'>
              {team.totalToGraded} / {totalToGrade}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NotificationHeader />
      <SectionHeader
        title='Teams'
        btnColor='blue'
        btnLabel='Previous'
        btnHandler={() => {
          navigate(-1);
        }}
      />
      <div className='row m-5'>
        <div
          className='card mb-2'
          style={{
            width: "80rem",
            height: "3.5rem",
            justifyContent: "center",
            backgroundColor: "lightgrey",
            border: "1px solid grey",
          }}
        >
          <div className='card-body text-center'>
            <div className='row mb-0 '>
              <div className='col' style={{}}>
                Team Name
              </div>
              <div className='col'>Total Enrolled</div>
              <div className='col'>Total Submitted</div>
              <div className='col'>Total Graded</div>
            </div>
          </div>
        </div>
        {/* Team cards */}
        {isSuccess &&
          data?.teams?.map((team) => {
            return card(
              team,
              data.totalToSubmit,
              data.totalToGrade,
              data.teamSize,
              data.submissionType
            );
          })}
      </div>
    </div>
  );
}
