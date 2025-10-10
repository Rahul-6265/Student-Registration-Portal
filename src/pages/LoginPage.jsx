import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || emailError || passwordError) {
      alert("Please fill fields correctly.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Logged in successfully!");
        if (data.name) {
          localStorage.setItem("userName", data.name);
        } else {
          localStorage.setItem("userName", email);
        }

        navigate("/home");
      } else {
        alert(data.error || "Login failed.");
      }
    } catch (error) {
      alert("Network error: " + error.message);
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
          <div className="bottom-text">
            Don't have an account?{" "}
            <Link to="/signup" className="login-link">
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
