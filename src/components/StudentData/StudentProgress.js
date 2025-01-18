import React, { useEffect, useState } from "react";
import classes from "./StudentProgress.module.css";

const StudentProgress = ({ progress }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    setAnimatedWidth(0);
    const timeout = setTimeout(() => {
      setAnimatedWidth(progress.Marks);
    }, 200);
    return () => clearTimeout(timeout);
  }, [progress]);

  let progressColor = "";
  if (progress.Marks >= 90) {
    progressColor = "#5c940d";
  } else if (progress.Marks >= 70) {
    progressColor = "#74b816";
  } else if (progress.Marks >= 55) {
    progressColor = "#a9e34b";
  } else if (progress.Marks >= 35) {
    progressColor = "#fab005";
  } else {
    progressColor = "#f03e3e";
  }

  return (
    <div className={classes.progressContainer}>
      <h3>Students Progress Details</h3>
      <div className="row">
        <div className={`${classes.info} mb-2 col-12 col-lg-4 col-xl-6`}>
          <strong>First Name:</strong> {progress.FirstName}
        </div>
        <div className={`${classes.info} mb-2 col-12 col-lg-4 col-xl-6`}>
          <strong>last Name:</strong> {progress.LastName}
        </div>
        <div className={`${classes.info} mb-2 col-12 col-lg-4 col-xl-6`}>
          <strong>Age:</strong> {progress.Age}
        </div>
        <div className={`${classes.info} mb-2 col-12 col-lg-4 col-xl-6`}>
          <strong>Contact:</strong> {progress.Contact}
        </div>
        <div className={`${classes.info} mb-2 col-12 col-lg-4 col-xl-6`}>
          <strong>Address:</strong> {progress.Address}
        </div>
        <div className={`${classes.info} mb-2 col-12 col-lg-4 col-xl-6`}>
          <strong>Marks:</strong> {progress.Marks}
        </div>
        <div className={`${classes.info} mb-2 col-12`}>
          <strong>Progress:</strong>
        </div>
      </div>
      <div className={classes.progressBarContainer}>
        <div
          className={classes.progressBar}
          style={{
            width: `${animatedWidth}%`,
            backgroundColor: progressColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default StudentProgress;
