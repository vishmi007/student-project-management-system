import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SideNavBar from "../../components/navbar/SideNavBar";
import { Outlet } from "react-router-dom";
import { EnrollmentErrorContext } from "../../context/student_dashboard_contexts/EnrollmentErrorContext";

import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function StudentPage() {
  //VARIABLES AND CONSTANTS
  const BASE_PATH = "/student";
  const userAxiosForGet = useAxiosPrivate();
  const userBaseInfoEndPoint = "/get-base-info";

  //STATES AND EFFECTS
  const [errorVal, setError] = useState("");
  const [name, setName] = useState(" ");
  const [projectList, setProjectList] = useState([]);

  
  console.log("Rendering the student page");
  console.log(projectList);
  

 
  //FUNCTIONS
  const fetchUserBaseData = async () => {
    try {
      const response = await userAxiosForGet.get(userBaseInfoEndPoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  //API CALLS
  const { isSuccess, isError, error, data } = useQuery({
    queryKey: ["User base data"],
    queryFn: fetchUserBaseData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
     
     
      setName(data.name);
      setProjectList(data.joinInfo);
      
    }
  }, [isSuccess]);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container fluid>
      <Row>
        <Col md='auto' className='p-0'>
          <SideNavBar
            baseRoutePath={BASE_PATH}
            nameVal={name}
            logo='ST'
            role='Student'
          />
        </Col>
        <Col className='p-0 m-3'>
          <EnrollmentErrorContext.Provider
            value={{ errorVal, setError, name, projectList, setProjectList }}
          >
            <Outlet />
          </EnrollmentErrorContext.Provider>
        </Col>
      </Row>
    </Container>
  );
}
