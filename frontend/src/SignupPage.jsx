import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import api from "./api";
import useAuth from "./hooks/useAuth";
import MagneticButton from "./components/MagneticButton";
import "./style.css";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        username,
        password
      });

      const { token } = response.data;

      if (token) {
        const user = { username };
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        login(user, token);
        navigate("/");
      } else {
        setError("An unexpected error occurred");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setError(
            "Username and password must be at least 4 characters"
          );
        } else if (err.response.status === 409) {
          setError("This username is already taken");
        } else {
          setError(`Signup failed: ${err.response.statusText}`);
        }
      } else {
        console.error("Signup error:", err);
        setError("Unable to connect to the server");
      }
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
        transition={{ duration: 0.6 }}>
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <input
            data-cy="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            data-cy="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <MagneticButton data-cy="signup-button" type="submit">
            Sign Up
          </MagneticButton>
        </form>
        {error && (
          <p style={{ color: "red", marginTop: "1rem" }}>
            {error}
          </p>
        )}
        <p className="auth-switch">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </motion.div>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default SignupPage;
