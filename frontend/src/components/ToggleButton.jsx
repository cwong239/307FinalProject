import { useState } from 'react';
import "../style.css";

function ToggleButton({ name = "Toggle" }) {
  const [value, setValue] = useState(false);

  const handleToggle = () => {
    setValue((prev) => !prev);
  };

  return (
    <div className="toggle-container">
      <p className="toggle-name">{name}</p>
      <button className={`toggle-button ${value ? "true" : "false"}`} onClick={handleToggle}>
        {value ? "True" : "False"}
      </button>
    </div>
  );
}

export default ToggleButton;