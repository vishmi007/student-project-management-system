/*
 * FILE: Timer.js
 * AUTHOR: Hewathilaka Gaveen Hesara Jayamanna [ID: 20514853]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Contains Timer for student dashboards
 * REFERENCE: None
 * LAST MOD: 09/08/2023
 */

import React, { useState, useRef, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";
import "./Timer.css";
import { TimerContext } from "../../context/student_dashboard_contexts/TimerContext";
import DropDownMenue from "../../components/dropdown/Dropdown";
import { EnrollmentErrorContext } from "../../context/student_dashboard_contexts/EnrollmentErrorContext";
import TimerClock from "../../components/timerclock/Timerclock";

const Timer = () => {
  // const savedTime = parseInt(localStorage.getItem("savedTime"), 10) || 0;
  // const [time, setTime] = useState(new Date(savedTime));
  const [time, setTime] = useState(() => {
    const time = JSON.parse(localStorage.getItem("time"));
    console.log("this is the time value form the lcoal storage" + time);
    if (time) {
      console.log("returning time from initial state");
      return time;
    } else {
      console.log("returning 0 from the initial state");
      return 0;
    }
  });

  // const{time} = useContext(TimerContext);
  // const{setTime} = useContext(TimerContext);
  // const{selectedProjectTimer} = useContext(TimerContext);
  // const{setSelectedProjectTimer} = useContext(TimerContext);
  // const{projectList} = useContext(EnrollmentErrorContext);

  const val = ["uhuh", "huhuih", "huhuh"];

  useEffect(() => {
    const timerStatus = JSON.parse(localStorage.getItem("timeStatus"));
    if (timerStatus === "running") {
      startTimer();
    } else if (timerStatus === "paused") {
      pauseTimer();
    } else {
      stopTimer();
    }
  });

  const intervalRef = useRef();
  const startTimeRef = useRef(0);
  const isRunningRef = useRef(false);

  const displayTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  };

  const startTimer = () => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        localStorage.setItem(
          "time",
          JSON.stringify(Date.now() - startTimeRef.current)
        );
        localStorage.setItem("timeStatus", JSON.stringify("running"));
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    }
  };

  const pauseTimer = () => {
    if (isRunningRef.current) {
      clearInterval(intervalRef.current);
      isRunningRef.current = false;
      localStorage.setItem("timeStatus", JSON.stringify("paused"));
    }
  };

  const stopTimer = () => {
    if (isRunningRef.current) {
      clearInterval(intervalRef.current);
      isRunningRef.current = false;
    }
    setTime(0);
    // localStorage.removeItem("time");
    localStorage.setItem("time", JSON.stringify(0));
    localStorage.setItem("timeStatus", JSON.stringify("stopped"));
  };

  const getSelected = (val) => {
    console.log("Get selected is called");
    console.log(val);
    // setSelectedProjectTimer(val);
  };

  return (
    <div className="timer">
      <h6>Select your project</h6>
      <DropDownMenue options={val} getValue={getSelected} />
      <input
        className="titleinput"
        type="text"
        id="timerTitle"
        placeholder="I'm working on.."
      />
      <input
        className="dateinput"
        type="date"
        id="date"
        placeholder="Select Date"
      />
      <input
        className="projectnameinput"
        type="text"
        id="projectName"
        placeholder="Project Name.."
      />
      <div className="d-flex pb-3 justify-content-around">
        <div className="time">{displayTime(time)}</div>
        <div>
          <button className="start-button" onClick={startTimer}>
            <FontAwesomeIcon icon={faPlay} size="2x" />
          </button>
        </div>
        <div>
          <button className="pause-button" onClick={pauseTimer}>
            <FontAwesomeIcon icon={faPause} size="2x" />
          </button>
        </div>
        <div>
          <button className="stop-button" onClick={stopTimer}>
            <FontAwesomeIcon icon={faStop} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Timer;
