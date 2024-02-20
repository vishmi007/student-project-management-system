import React from "react";
import NotificationHeader from "../../../components/notifiction_header/NotificationHeader";
import SectionDivider from "../../../components/section_divider/SectionDivider";
import { Outlet, useNavigate } from "react-router-dom";
import Courses from "../../../components/cards/CourseCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function SupvervisorProjects() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { data: projectsList = [], isSuccess } = useQuery({
    queryFn: async () => {
      try {
        const res = await axiosPrivate.get("supervisor/projects");
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
      <SectionDivider title='Projects Under Your Supervision' />
      {/* Main content section */}
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
