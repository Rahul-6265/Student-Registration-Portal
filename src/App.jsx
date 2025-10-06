import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
