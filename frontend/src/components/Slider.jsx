import React, { useState } from 'react';

function Slider() {
  const [value, setValue] = useState(50);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={handleChange} 
      />
      <p>Value: {value}</p>
    </div>
  );
}

export default Slider;