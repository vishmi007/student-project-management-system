import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SideNavBar from "../../components/navbar/SideNavBar";
import { Outlet } from "react-router-dom";
export default function EvaluatorPage() {
  const BASE_PATH = "/evaluator";
  return (
    <Container fluid>
      <Row>
        <Col md='auto' className='p-0'>
          <SideNavBar baseRoutePath={BASE_PATH} />
        </Col>
        <Col className='p-0 m-3'>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
