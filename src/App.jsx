import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<SignUpForm />} /> {/* default route */}
      </Routes>
    </Router>
  );
}

export default App;
