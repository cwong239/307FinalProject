import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
      <img src="/logo.png" alt="FotoMagic Logo" className="logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="#">Edit</Link></li>
          <li><Link to="#">Images</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="auth-link">Sign Up / Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
