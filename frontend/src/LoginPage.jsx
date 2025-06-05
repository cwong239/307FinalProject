import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import api from "./api";
import useAuth from "./hooks/useAuth";
import MagneticButton from "./components/MagneticButton";
import "./style.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        username,
        password
      });

      if (response.data.token) {
        const user = { username };
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));

        login(user, response.data.token);

        navigate("/");
      } else if (response.status === 400) {
        setError("Username and password must be at least 4 characters");
      } else if (response.status === 401) {
        setError("Invalid password");
      } else {
        setError("An unexpected error occured");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
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
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
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
          <MagneticButton data-cy="login-button" type="submit">
            Login
          </MagneticButton>
        </form>
        {error && (
          <p style={{ color: "red", marginTop: "1rem" }}>
            {error}
          </p>
        )}
        <p className="auth-switch">
          Don&#39;t have an account?{" "}
          <a href="/signup">Sign Up</a>
        </p>
      </motion.div>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default LoginPage;
