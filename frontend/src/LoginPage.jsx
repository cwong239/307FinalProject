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
      const response = await api.post("/auth/login", { username, password });

      if (response.data.token) {
        const user = {username};
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));

        // Pass token to login so axios headers are updated
        login(user, response.data.token);


        // Redirect after login
        navigate("/");
      } else {
        console.warn("Login succeeded but no token returned.");
        setError("Login failed: no token received.");
      }
    } catch (err) {
      console.error("Login error:", err);
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
          Don&#39;t have an account? <a href="/signup">Sign Up</a>
        </p>
      </motion.div>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default LoginPage;
