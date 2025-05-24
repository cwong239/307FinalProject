import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import api from "./api";
import { AuthContext } from "./AuthContext";
import MagneticButton from "./components/MagneticButton";
import "./style.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { username, password });

      // Store token and user in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      login(response.data.user, response.data.token);

      // Prevent preloader after login
      sessionStorage.setItem("visitedFromLogin", "true");

      // Redirect
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <MagneticButton type="submit">Login</MagneticButton>
        </form>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        <p className="auth-switch">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </motion.div>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default LoginPage;
