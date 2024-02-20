import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "../../components/btns/Button";
import Container from "react-bootstrap/esm/Container";
import AstronautImage from "../../assets/Astronaut.png";
import "./LoginPage.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { getUserRoleBaseRoute } from "../../api/userRoles";

const LOGIN_URL = "/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(""); // Clear existing error message
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordError(""); // Clear existing error message
  };

  const validateEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear existing error messages
    setEmailError("");
    setPasswordError("");

    // Validate email and password
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) {
      return; // Don't proceed with submission if there are validation errors
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setAuth({ email, password, accessToken, role });
      setEmail("");
      setPassword("");
      const from =
        location.state?.from?.pathname || `../${getUserRoleBaseRoute(role)}/home`;
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else if (err.response?.status === 400) {
        console.log("Missing Username or password");
      } else if (err.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <div className='d-flex login-form-main flex-column justify-content-center align-items-center'>
            <h1 className='login-form-title-text mb-5'>
              Unlock a world of collaborative <br /> opportunities!
            </h1>
            <div>
              <form onSubmit={handleSubmit}>
                <div className='d-flex flex-column'>
                  <label className='mb-2'>Email:</label>
                  <input
                    className='login-form-input'
                    placeholder='yourname@email.com'
                    type='email'
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError && (
                    <p className='text-danger mt-2'>{emailError}</p>
                  )}
                </div>
                <div className='d-flex flex-column mt-4'>
                  <label className='mb-2'>Password:</label>
                  <input
                    className='login-form-input'
                    type='password'
                    placeholder='Your Password'
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <p className='text-danger mt-2'>{passwordError}</p>
                  )}
                </div>
                <div className='d-flex mt-3 justify-content-end'>
                  <p className='login-form-forgot-password'>Forgot Password?</p>
                </div>
                <div className='mt-3 d-flex justify-content-center'>
                  <Button
                    onClickHandler={handleSubmit}
                    labelText={"Login"}
                    color={"blue"}
                    size={"large-login"}
                  ></Button>
                </div>
                <div className='mt-3'>
                  <Link to={"/signup"} className='login-form-sign-up-text'>
                    <p>
                      Don't have an account? <span>Sign Up</span>
                    </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Col>
        <Col md={8} className='login-form-mascot-section'>
          <div className='login-mascot-container d-flex flex-column justify-content-center align-items-center'>
            <div className='login-form-mascot-circle'>
              <img
                src={AstronautImage}
                alt='astronaut mascot'
                className='login-form-astronaut-img'
              ></img>
            </div>
            <div className='login-form-welcome-text mt-5'>
              <h1>Welcome Aboard!</h1>
              <h2 className='mt-3'>Couple of clicks away</h2>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
