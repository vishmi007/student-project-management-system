import React, { useState } from "react";
import "./SignupPage.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import AstronautImage from "../../assets/astronaut_stars.svg";
import Button from "../../components/btns/Button";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [studentIdError, setStudentIdError] = useState("");
  const navigate = useNavigate();

  const notifySuccess = () =>
    toast.success("Account successfully created! Click here to log in.", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = () =>
    toast.error("Account could not be created. Please try again.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear existing error messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstNameError("");
    setLastNameError("");

    // Validate fields
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    }
    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      isValid = false;
    }
    if (selectedRole === "Student" && studentId.trim() === "") {
      setStudentIdError("Student ID is required");
      isValid = false;
    }

    if (!isValid) {
      return; // Don't proceed with submission if there are validation errors
    }

    const payload = {
      email,
      firstName,
      password,
      role: selectedRole,
      lastName,
      id: selectedRole === "Student" ? studentId : "NO ID",
    };
    console.log(payload);

    try {
      const response = await fetch("http://localhost:5050/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        notifyError();
        return;
      }

      notifySuccess();

      console.log("User registered successfully!");
    } catch (error) {
      notifyError();
    }
  };

  return (
    <Container fluid>
      <div className='signup-toast-container' onClick={() => navigate("/")}>
        <ToastContainer
          className='signup-custom-toast'
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme='light'
        />
      </div>
      <Row>
        <Col md={4}>
          <div className='d-flex login-form-main flex-column justify-content-center align-items-center mt-5'>
            <form>
              <div className='mb-3'>
                <h1>Hello There!</h1>
                <h1>Sign up to get started</h1>
              </div>
              <div className='d-flex flex-column mb-4 mt-5'>
                <label className='mb-2'>Your Role:</label>
                <select
                  className='login-form-input'
                  value={selectedRole}
                  onChange={handleRoleChange}
                >
                  <option value='Student'>Student</option>
                  <option value='Lecturer'>Lecturer</option>
                  <option value='Evaluator'>Evaluator</option>
                  <option value='Supervisor'>Supervisor</option>
                </select>
              </div>
              <div className='d-flex flex-column mb-3'>
                <label className='mb-2'>Email:</label>
                <input
                  className='login-form-input'
                  placeholder='yourname@email.com'
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && <p className='text-danger mt-2'>{emailError}</p>}
              </div>
              <div className='d-flex flex-column mb-3'>
                <label className='mb-2'>First Name:</label>
                <input
                  className='login-form-input'
                  placeholder='Your First Name'
                  type='text'
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
                {firstNameError && (
                  <p className='text-danger mt-2'>{firstNameError}</p>
                )}
              </div>
              <div className='d-flex flex-column mb-3'>
                <label className='mb-2'>Last Name:</label>
                <input
                  className='login-form-input'
                  placeholder='Your Last Name'
                  type='text'
                  value={lastName}
                  onChange={handleLastNameChange}
                />
                {lastNameError && (
                  <p className='text-danger mt-2'>{lastNameError}</p>
                )}
              </div>
              {selectedRole === "Student" && (
                <div className='d-flex flex-column mb-3'>
                  <label className='mb-2'>Student ID:</label>
                  <input
                    className='login-form-input'
                    placeholder='Your Student ID'
                    type='text'
                    value={studentId}
                    onChange={handleStudentIdChange}
                  />
                  {studentIdError && (
                    <p className='text-danger mt-2'>{studentIdError}</p>
                  )}
                </div>
              )}
              <div className='d-flex flex-column mb-3'>
                <label className='mb-2'>Password:</label>
                <input
                  className='login-form-input'
                  type='password'
                  placeholder='You Password'
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p className='text-danger mt-2'>{passwordError}</p>
                )}
              </div>
              <div className='d-flex flex-column mb-3'>
                <label className='mb-2'>Confirm Password:</label>
                <input
                  className='login-form-input'
                  type='password'
                  placeholder='You Password'
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {confirmPasswordError && (
                  <p className='text-danger mt-3'>{confirmPasswordError}</p>
                )}
              </div>
            </form>
            <div className='mt-3 login-form-sign-up-text'>
              <p>By signing up, I agree to the Terms & Conditions</p>
            </div>
            <div className='mt-3 d-flex justify-content-center'>
              <Button
                onClickHandler={handleSubmit}
                labelText={"Sign Up"}
                color={"blue"}
                size={"large-login"}
              ></Button>
            </div>
            <Link to={"/"} className='mb-5 mt-4 signup-form-login-text'>
              <p>Already have an account? Login</p>
            </Link>
          </div>
        </Col>
        <Col md={8} className='signup-form-mascot-section'>
          <div className='login-mascot-container d-flex flex-column justify-content-center align-items-center signup-fixed-mascot-section'>
            <div className='login-form-mascot-circle'>
              <img
                src={AstronautImage}
                alt='astronaut mascot'
                className='signup-form-astronaut-img'
              ></img>
            </div>
            <div className='login-form-welcome-text mt-5'>
              <h1>Reach for the stars!</h1>
              <h2 className='mt-3'>
                Embark on a journey of academic excellence, teamwork and growth
              </h2>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
