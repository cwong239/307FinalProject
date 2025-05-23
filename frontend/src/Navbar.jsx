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
            <Link to="/">
              <span className="navbar-item">
                <span className="material-icons">home</span>
                Home
              </span>
            </Link>
          </li>

          <li>
            <Link to="/edit">
              <span className="navbar-item">
                <span className="material-icons">edit</span>
                Edit
              </span>
            </Link>
          </li>

          <li>
            <Link to="/images">
              <span className="navbar-item">
                <span className="material-icons">photo_library</span>
                Images
              </span>
            </Link>
          </li>

          <li>
            <Link to="/about">
              <span className="navbar-item">
                <span className="material-icons">info</span>
                About
              </span>
            </Link>
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
            <span className="navbar-item">
              <span className="material-icons">login</span>
              Sign Up / Login
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
