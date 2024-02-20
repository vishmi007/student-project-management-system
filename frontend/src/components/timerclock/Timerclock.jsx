import React, { useContext } from "react";
import "./Timer.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { TimerContext } from "../../context/student_dashboard_contexts/TimerContext";

export default function Timerclock() {
  //CONST VARIABLES
  // const savedTime = parseInt(localStorage.getItem("savedTime"), 10) || 0;
  // const [time, setTime] = useState(new Date(savedTime));
  const { time } = useContext(TimerContext);
  const { setTime } = useContext(TimerContext);

  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

 

  //STATES AND EFFECTS

  //FUNCTIONS
  const startTimer = () => {
    const savedTime = parseInt(localStorage.getItem("pausedTime"), 10);

    if (savedTime) {
      const newStartTime = new Date().getTime() - savedTime;
      setStartTime(newStartTime);
    } else {
      const newStartTime = new Date();
      setStartTime(newStartTime);
      localStorage.setItem("startTime", newStartTime);
    }
    setRunning(true);
  };

  const pauseTimer = () => {
    if (running) {
      setRunning(false);
      localStorage.setItem("pausedTime", time.getTime());
    }
  };

  const resetTimer = () => {
    setTime(new Date(0));
    setRunning(false);
    setStartTime(null);
    localStorage.setItem("savedTime", 0);
    localStorage.removeItem("startTime");
    localStorage.removeItem("pausedTime");
  };

  const formattedTime = () => {
    const minutes = format(time, "mm");
    const seconds = format(time, "ss");
    const milliseconds = format(time, "SS");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setTime(new Date(new Date().getTime() - startTime));
      }, 10);

      // Save the current time in local storage
      localStorage.setItem("savedTime", time.getTime());

      return () => clearInterval(interval);
    }
  }, [running, startTime, time]);

  //APIS

  return (
    <div>

        <div className="time">{formattedTime()}</div>

      <div>

        <div>
          <button
            className="start-button"
            onClick={startTimer}
            disabled={running}
          >
            <FontAwesomeIcon icon={faPlay} size="2x" />
          </button>
        </div>

        <button className="pause-button" onClick={pauseTimer}>
          <FontAwesomeIcon icon={faPause} size="2x" />
        </button>

      </div>


      <div>
        <button className="stop-button" onClick={resetTimer}>
          <FontAwesomeIcon icon={faStop} size="2x" />
        </button>
      </div>


    </div>
   
  );
}
