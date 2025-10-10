import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUpForm.css";

function SignUpForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [course, setCourse] = useState("");

  const graduationCourses = ["B.Tech", "BCA", "B.Sc"];
  const postGraduationCourses = ["M.Tech", "MCA", "MBA"];

  const validateName = (name) =>
    /^[A-Za-z\s]+$/.test(name)
      ? ""
      : "Name should contain only letters and spaces.";

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ""
      : "Please enter a valid email address.";

  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    )
      ? ""
      : "Password must contain at least 8 characters including letters, numbers, and special characters.";

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(validateName(e.target.value));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !education ||
      !course ||
      nameError ||
      emailError ||
      passwordError
    ) {
      alert("Please fill all the fields correctly.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          gender,
          education,
          course,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Form submitted successfully!");
        navigate("/login");
      } else {
        alert(data.error || "Error submitting form.");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  return (
    <div className="page-center-wrapper">
      <div className="form-container">
        <h3 className="form-title">Student Sign-Up Form</h3>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            placeholder="Enter Name"
            onChange={handleNameChange}
            className={`input-field ${nameError ? "input-error" : ""}`}
          />
          {nameError && <small className="error-text">{nameError}</small>}

          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={handleEmailChange}
            className={`input-field ${emailError ? "input-error" : ""}`}
          />
          {emailError && <small className="error-text">{emailError}</small>}

          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={handlePasswordChange}
            className={`input-field ${passwordError ? "input-error" : ""}`}
          />
          {passwordError && (
            <small className="error-text">{passwordError}</small>
          )}

          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Other
            </label>
          </div>

          <label>Education:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Graduation"
                checked={education === "Graduation"}
                onChange={() => {
                  setEducation("Graduation");
                  setCourse("");
                }}
              />{" "}
              Graduation
            </label>
            <label>
              <input
                type="checkbox"
                value="Postgraduation"
                checked={education === "Postgraduation"}
                onChange={() => {
                  setEducation("Postgraduation");
                  setCourse("");
                }}
              />{" "}
              Postgraduation
            </label>
          </div>

          {education === "Graduation" && (
            <>
              <label>Course:</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="select-field"
                required
              >
                <option value="">Select Course</option>
                {graduationCourses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </>
          )}

          {education === "Postgraduation" && (
            <>
              <label>Course:</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="select-field"
                required
              >
                <option value="">Select Course</option>
                {postGraduationCourses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </>
          )}

          <button type="submit" className="submit-button">
            Submit
          </button>
          <div className="bottom-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
