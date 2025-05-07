import React from "react";
import Navbar from "./Navbar";
import "./style.css";

function LoginPage() {
  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <h2>Login</h2>
        <form className="auth-form">
          <input type="text" placeholder="Username" required />
          <input
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="auth-switch">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LoginPage;
