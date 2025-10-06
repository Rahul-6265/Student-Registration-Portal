import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ""
      : "Please enter a valid email address.";

  const validatePassword = (password) =>
    password.length >= 6 ? "" : "Password must be at least 6 characters long.";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || emailError || passwordError) {
      alert("Please fill fields correctly.");
    } else {
      alert("Logged in successfully!");
      // Add redirect or home page here if needed
    }
  };

  return (
    <div className="page-center-wrapper">
      <div className="form-container">
        <h3 className="form-title">Login</h3>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
