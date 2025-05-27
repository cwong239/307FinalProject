import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import api from "./api";
import MagneticButton from "./components/MagneticButton";
import "./style.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", {
        name,
        email,
        username,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed. Please try again.");
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
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* <input
            type="email"
            placeholder="Cal Poly Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> */}
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
          <MagneticButton type="submit">Sign Up</MagneticButton>
        </form>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
        </p>
      </motion.div>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default SignupPage;
