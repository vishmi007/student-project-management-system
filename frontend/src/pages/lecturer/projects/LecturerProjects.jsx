import React, { useState } from "react";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import SectionHeader from "../../../components/section_header/SectionHeader";
import SectionDivider from "../../../components/section_divider/SectionDivider";
import { Outlet, useNavigate } from "react-router-dom";
import Courses from "../../../components/cards/CourseCard";
import CourseContents from "./CourseContent";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function LecturerProjects() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  // TODO: Make an api call to get the project
  const { data: projectsList, isSuccess } = useQuery({
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("lecturer/projects");
        return res.data.projectsList;
      } catch (error) {
        return error;
      }
    },
    queryKey: ["getProjects"],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return (
    <div>
      <NotificationHeader />
      <SectionHeader
        title='Projects'
        desc='Enter the details of your project'
        btnColor='blue'
        btnLabel='New Project'
        btnHandler={() => {
          navigate("./create-project");
        }}
      />
      <SectionDivider title='Current Projects' />
      <section className='d-flex mt-4 flex-wrap'>
        {isSuccess &&
          projectsList.length > 0 &&
          projectsList?.map((CourseContents, index) => (
            <Courses
              key={index}
              courseName={CourseContents.courseName}
              courseCode={CourseContents.courseCode}
              teamNum={CourseContents.teamNum}
              icon={"/images/Icon.png"}
              clickHandler={() => {
                navigate(`./${CourseContents.projectId}/teams`);
              }}
            />
          ))}
      </section>
      <Outlet />
    </div>
  );
}
