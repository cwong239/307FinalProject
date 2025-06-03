import { useState } from "react";
import "../style.css";

function ToggleButton({ name = "Toggle", value, onToggle }) {
  const handleToggle = () => {
    if (onToggle) onToggle(value === 1 ? 0 : 1);
  };

  return (
    <div className="toggle-container">
      <p className="toggle-name">{name}</p>
      <button
        className={`toggle-button ${value === 1 ? "true" : "false"}`}
        onClick={handleToggle}>
        {value === 1 ? "True" : "False"}
      </button>
    </div>
  );
}

export default ToggleButton;
