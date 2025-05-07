import React from "react";
import Navbar from "./Navbar";
import "./style.css";

function SignupPage() {
  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form className="auth-form">
          <input type="text" placeholder="Full Name" required />
          <input
            type="email"
            placeholder="Cal Poly Email"
            required
          />
          <input type="text" placeholder="Username" required />
          <input
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SignupPage;
