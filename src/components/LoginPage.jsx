import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
      return;
    }
    alert(`Logged in successfully:\nEmail: ${email}\nPassword: ${password}`);
    navigate("/"); // Redirect to home or dashboard page
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
          <div className="bottom-text">
            Don't have an account?{" "}
            <a href="/signup" className="login-link">
              Sign up here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
