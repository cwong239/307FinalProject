import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AboutPage from "./AboutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
