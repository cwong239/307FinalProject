import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Slider from "./components/Slider";
import ToggleButton from "./components/ToggleButton";
import "./style.css";

function EditPage() {
  const storedToken = localStorage.getItem("token");
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const fileInputRef = useRef();

  // states for image parameters
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(1);
  const [gamma, setGamma] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [grayscale, setGrayscale] = useState(false);
  const [removeBg, setRemoveBg] = useState(false);

  if (!storedToken) {
    return (
      <>
        <Navbar />
        <motion.div
          className="gallery-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Not logged in</h1>
        </motion.div>
        <footer className="footer">
          <p>&copy; 2025 FotoMagic. All rights reserved.</p>
        </footer>
      </>
    );
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
      setImageFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Please upload an image first.");
      return;
    }

    console.log("Brightness:", brightness);
    console.log("Grayscale:", grayscale);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("brightness", brightness);
    formData.append("contrast", contrast);
    formData.append("gamma", gamma);
    formData.append("opacity", opacity);
    formData.append("grayscale", grayscale);
    formData.append("remove_bg", removeBg);

    try {
      const response = await fetch("http://localhost:5000/image", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      console.log("Upload successful:", response.data);
      //alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
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
            <Slider name="Brightness" value={brightness} min={-100} max={100} step={1} onChange={setBrightness}/>
            <Slider name="Gamma" value={gamma} min={0.1} max={5} step={0.1} onChange={setGamma}/>
            <Slider name="Contrast" value={contrast} min={0.1} max={5} step={0.1} onChange={setContrast}/>
            <Slider name="Opacity" value={opacity} min={0} max={1} step={0.01} onChange={setOpacity}/>
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
          <ToggleButton name="Gray Scale" value={grayscale} onToggle={setGrayscale}/>
          <ToggleButton name="Background Removal" value={removeBg} onToggle={setRemoveBg}/>
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </motion.div>
      </motion.div>

      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default EditPage;
