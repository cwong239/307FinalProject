import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import "./style.css";
import Slider from "./components/Slider";
import ToggleButton from "./components/ToggleButton";

function EditPage() {
    
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
        const imageURL = URL.createObjectURL(file);
        setImageSrc(imageURL);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
        const imageURL = URL.createObjectURL(file);
        setImageSrc(imageURL);
        }
    };


  return (
    <div>

      <Navbar />

      <div className="edit-container">

        <div className="edit-subcontainer">

          <div className="edit-slider-menu">
            <Slider name="Brightness"></Slider>
            <Slider name="Gamma"></Slider>
            <Slider name="Contrast"></Slider>
          </div>

          <div className="edit-upload-box"
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            >
            {imageSrc ? (
              <img src={imageSrc} alt="uploaded"/>
            ) : (
              <p>Click or drag an image here to upload</p>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>

        </div>

        <div className="edit-subcontainer-toggle-buttons">
            <ToggleButton name="Gray Scale"></ToggleButton>
            <ToggleButton name="Background Removal"></ToggleButton>
        </div>
      

      </div>

      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default EditPage;
