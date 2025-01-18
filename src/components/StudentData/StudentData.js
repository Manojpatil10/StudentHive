import { useEffect, useRef, useState } from "react";
import classes from "./StudentData.module.css";
import StudentProgress from "./StudentProgress";
import axios from "axios";

function StudentData() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(false);
  const firstName = useRef();
  const lastName = useRef();
  const age = useRef();
  const marks = useRef();
  const contact = useRef();
  const address = useRef();
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    axios
      .get("https://66efa17bf2a8bce81be3ac70.mockapi.io/StudentData")
      .then((success) => {
        setData(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [done]);

  const sendData = (event) => {
    event.preventDefault();
    axios
      .post("https://66efa17bf2a8bce81be3ac70.mockapi.io/StudentData", {
        FirstName: firstName.current.value,
        LastName: lastName.current.value,
        Age: age.current.value,
        Marks: marks.current.value,
        Contact: contact.current.value,
        Address: address.current.value,
      })
      .then((success) => {
        if (success) {
          setDone(!done);
          firstName.current.value = "";
          lastName.current.value = "";
          age.current.value = "";
          marks.current.value = "";
          contact.current.value = "";
          address.current.value = "";
        }
      })
      .catch((error) => {
        if (error) {
          setDone(!done);
        }
      });
  };

  const toggleProgress = (student) => {
    setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
  };

  return (
    <div className={classes.container}>
      {/* <h1 className={classes.heading}>Student Data Management</h1> */}
      <div class={classes.logoContainer}>
        <div class={classes.hexagon}></div>
        <span class={classes.logoText}>StudentHive</span>
      </div>

      <form className={classes.formContainer} onSubmit={sendData}>
        <div className="row">
          <div className="col-12 col-lg-4">
            <label className={classes.label}>
              First Name
              <input
                ref={firstName}
                type="text"
                placeholder="Enter your first name"
                className={classes.input}
              />
            </label>
          </div>
          <div className="col-12 col-lg-4">
            <label className={classes.label}>
              Last Name
              <input
                ref={lastName}
                type="text"
                placeholder="Enter your last name"
                className={classes.input}
              />
            </label>
          </div>
          <div className="col-12 col-lg-4">
            <label className={classes.label}>
              Age
              <input
                ref={age}
                type="number"
                placeholder="Enter your age"
                className={classes.input}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-4">
            <label className={classes.label}>
              Marks
              <input
                ref={marks}
                type="number"
                placeholder="Enter your marks"
                className={classes.input}
              />
            </label>
          </div>
          <div className="col-12 col-lg-4">
            <label className={classes.label}>
              Contact Number
              <input
                ref={contact}
                type="number"
                placeholder="Enter your contact number"
                className={classes.input}
              />
            </label>
          </div>
          <div className="col-12 col-lg-4">
            <label className={classes.label}>
              Address
              <input
                ref={address}
                type="text"
                placeholder="Enter your address"
                className={classes.input}
              />
            </label>
          </div>
        </div>
        <div className="row justify-content-lg-center">
          <div className="col-12 col-lg-4">
            <button type="submit" className={classes.submitInput}>
              Send Data
            </button>
          </div>
        </div>
      </form>
      <div className={`${classes.bottomSection} row`}>
        <div className="col-12 mb-4 col-xl-6 mb-xl-0">
          <div className={classes.left}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Age</th>
                  <th>Marks</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                {data.map((student) => (
                  <tr key={student.id}>
                    <td>{student.FirstName}</td>
                    <td>{student.LastName}</td>
                    <td>{student.Age}</td>
                    <td>{student.Marks}</td>
                    {/* <td>
                    <button
                      onClick={() => toggleProgress(student)}
                      className={classes.infoButton}
                    >
                      {selectedStudent?.id === student.id ? "Hide" : "Show"}
                    </button>
                  </td> */}
                    <td>
                      <button
                        onClick={() => toggleProgress(student)}
                        className={`${classes.infoButton} ${
                          selectedStudent?.id === student.id
                            ? classes.hideButton
                            : ""
                        }`}
                      >
                        {selectedStudent?.id === student.id ? "Hide" : "Show"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className={classes.right}>
            {selectedStudent && <StudentProgress progress={selectedStudent} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentData;
