import { useState } from "react";
import "../style.css";

function Slider({
  name = "Slider",
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange
}) {
  const handleChange = (event) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <div className="slider-container">
      <p className="slider-name">
        {name}: {value}
      </p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default Slider;
