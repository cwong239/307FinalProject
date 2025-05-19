import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./style.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="FotoMagic Logo" className="logo" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="#">Edit</Link>
          </li>
          <li>
            <Link to="#">Images</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>Hello, {user.username}</span>
            <button
              onClick={logout}
              className="auth-link"
              style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="auth-link">
            Sign Up / Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
