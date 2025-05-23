import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Slider from "./components/Slider";
import ToggleButton from "./components/ToggleButton";
import "./style.css";

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
    <>
      <Navbar />

      <motion.div
        className="edit-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="edit-subcontainer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="edit-slider-menu">
            <Slider name="Brightness" />
            <Slider name="Gamma" />
            <Slider name="Contrast" />
          </div>

          <motion.div
            className="edit-upload-box"
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {imageSrc ? (
              <img src={imageSrc} alt="uploaded" />
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
          </motion.div>
        </motion.div>

        <motion.div
          className="edit-subcontainer-toggle-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <ToggleButton name="Gray Scale" />
          <ToggleButton name="Background Removal" />
        </motion.div>
      </motion.div>

      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default EditPage;
