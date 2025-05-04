import React from "react";
import "./style.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>FotoMagic</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Edit</a></li>
          <li><a href="#">Images</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        <a href="#" className="auth-link">Sign Up / Login</a>
      </div>
    </nav>
  );
}

export default Navbar;
