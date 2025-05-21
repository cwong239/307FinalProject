import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AboutPage from "./AboutPage";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import ImagesPage from "./ImagesPage";
import EditPage from "./EditPage";
import ImagesPage from "./ImagesPage";
import EditPage from "./EditPage";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route path="/images" element={<ImagesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
