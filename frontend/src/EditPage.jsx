import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import "./style.css";
import Slider from "./components/Slider";

function EditPage() {
    
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
        const imageURL = URL.createObjectURL(file);
        setImageSrc(imageURL);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
        const imageURL = URL.createObjectURL(file);
        setImageSrc(imageURL);
        }
    };


  return (
    <div>
      <Navbar />

      <div className="edit-container">
        <h2>Edit Your Image</h2>

        <div
          className="upload-area"
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {imageSrc ? (
            <img src={imageSrc} alt="Uploaded" style={getFilterStyle()} />
          ) : (
            <div className="upload-placeholder">
              <p>Click or drag an image here to upload</p>
            </div>
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

      <Slider></Slider>

      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default EditPage;
