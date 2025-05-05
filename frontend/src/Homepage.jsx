import React from "react";
import Navbar from "./Navbar";
import "./style.css";

function Homepage() {
  return (
    <div>
      <Navbar />
      <div className="homepage-content">
        <h1>FotoMagic</h1>
        <p>Edit your photos in real time!</p>
        <div className="feature-buttons">
          <button>Gray Scale</button>
          <button>Brightness</button>
          <button>Contrast</button>
          <button>Gamma</button>
          <button>Background Removal</button>
          <button>Interactive</button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
