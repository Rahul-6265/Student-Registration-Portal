import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar({ userName, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Company Logo" className="navbar-logo" />
        <span className="navbar-company-name">Student Portal</span>
      </div>
      <div className="navbar-right">
        <span className="navbar-user">Welcome, {userName}</span>
        <button className="navbar-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
