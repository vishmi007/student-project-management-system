import React from "react";
import ErrorMascot from "../assets/error_mascot.svg";
import Container from "react-bootstrap/esm/Container";
import "./ErrorPage.css";

export default function Invalid() {
  return (
    <div className='error-page'>
      <Container className='d-flex error-content-container flex-column justify-content-center align-items-center'>
        <div className='error-text-1'>Oops!</div>
        <div className='error-text-2'>
          We can't seem to find the page you're looking for.
        </div>
        <img
          className='mt-2'
          height={500}
          src={ErrorMascot}
          alt='Confused astronaut mascot'
        />
        <div className='error-text-3'>Error code: 404</div>
      </Container>
    </div>
  );
}
