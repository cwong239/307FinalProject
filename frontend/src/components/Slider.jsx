import React, { useState } from 'react';
import "../style.css";

function Slider({ name = "Slider" }) {

  // set default slider value to 50% 
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
     <div className="slider-container">
      <p className="slider-name">{name}: {value}</p>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={handleChange} 
      />
    </div>
  );
}

export default Slider;