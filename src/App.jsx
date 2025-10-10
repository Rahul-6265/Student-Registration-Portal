import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
