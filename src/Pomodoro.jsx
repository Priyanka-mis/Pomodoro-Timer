import React, { useState, useRef } from "react";
import "./Pomodoro.css";

function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1 * 60);
  const [isBreak, setIsBreak] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) {
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerRef.current);
          timerRef.current = null;

          if (!isBreak) {
            setTimeout(() => {
              alert("Work session complete! Time for a break.");
              startBreak();
            }, 100);
          } else {
            setTimeout(() => {
              alert("Break over! Time to work again.");
              resetToWork();
            }, 100);
          }
          return 0;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetToWork = () => {
    stopTimer();
    setIsBreak(false);
    setTimeLeft(1 * 60);
    startTimer();
  };

  const startBreak = () => {
    stopTimer();
    setIsBreak(true);
    setTimeLeft(5 * 60);
    setTimeout(startTimer, 500); // Ensure UI updates before starting timer
  };

  const resetTimer = () => {
    stopTimer();
    setIsBreak(false);
    setTimeLeft(1 * 60);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Pomodoro Timer</h1>
        </div>

        <div className="timer">
          <h1>{formatTime(timeLeft)}</h1>
          <h3>{isBreak ? "Break Time" : "Work Time"}</h3>
        </div>

        <div className="buttons">
          <button id="start" onClick={startTimer}>Start</button>
          <button id="stop" onClick={stopTimer}>Stop</button>
          <button id="reset" onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default PomodoroTimer;
