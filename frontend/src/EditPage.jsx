import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Slider from "./components/Slider";
import ToggleButton from "./components/ToggleButton";
import "./style.css";

const azure_api = "https://fotomagic-cudga7e2gcgvgzfv.westus-01.azurewebsites.net"

function ErrorStatusMessage({ statusMessage }) {
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
        <h1>Status Message</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem", color: "#b22222" }}>
          {statusMessage || "An error occurred."}
        </p>
      </motion.div>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

function EditPage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [errorStatusMessage, setErrorStatusMessage] = useState("");
  const fileInputRef = useRef();

  // states for image parameters
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(1);
  const [gamma, setGamma] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [grayscale, setGrayscale] = useState(false);
  const [removeBg, setRemoveBg] = useState(false);

  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    window.location.href = "/login";
    return null;
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
      setImageFile(file);
      setProcessedImage(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
      setImageFile(file);
      setProcessedImage(null);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("brightness", brightness);
    formData.append("contrast", contrast);
    formData.append("gamma", gamma);
    formData.append("opacity", opacity);
    formData.append("grayscale", grayscale);
    formData.append("remove_bg", removeBg);

    try {
      //const response = await fetch("http://localhost:5000/image", {
      const response = await fetch(`${azure_api}/image`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      switch (response.status) {
        case 201:{
          const data = await response.json();
          setProcessedImage(data.filename);
          return;
        }
        case 400:
          setErrorStatusMessage("Bad request.");
          return;
        case 401:
          window.location.href = "/login";
          return;
        case 403:
          setErrorStatusMessage("User quota exceeded (20MB).");
          return;
        default:
          setErrorStatusMessage("Failed to process image.");
          return;
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    }
  };

  const handleDownload = async () => {
    if (!processedImage) {
      alert("Please submit an image for processing first.");
      return;
    }

    try {
      //const response = await fetch(`http://localhost:5000/image/${processedImage}`, {
      const response = await fetch(`${azure_api}/image/${processedImage}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      switch (response.status) {
        case 200: {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const temp = document.createElement("a");
          temp.href = url;
          temp.download = processedImage;
          document.body.appendChild(temp);
          temp.click();
          temp.remove();
          window.URL.revokeObjectURL(url);
          return;
        }
        case 401:
          window.location.href = "/login";
          return;
        case 403:
          setErrorStatusMessage(`Access denied to image.`);
          return;
        case 404:
          setErrorStatusMessage(`Image not found.`);
          return;
        case 400:
          setErrorStatusMessage("Bad request.");
          return;
        default:
          setErrorStatusMessage("Server error occurred while downloading image.");
          return;
      }
    } catch (error) {
      console.error(error);
      alert("Download failed.");
    }
  };

  if (errorStatusMessage) {
    return <ErrorStatusMessage statusMessage={errorStatusMessage} />;
  }

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
            <Slider name="Brightness" value={brightness} min={-100} max={100} step={1} onChange={setBrightness} />
            <Slider name="Gamma" value={gamma} min={0.1} max={5} step={0.1} onChange={setGamma} />
            <Slider name="Contrast" value={contrast} min={0.1} max={5} step={0.1} onChange={setContrast} />
            <Slider name="Opacity" value={opacity} min={0} max={1} step={0.01} onChange={setOpacity} />
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
          <ToggleButton name="Gray Scale" value={grayscale} onToggle={setGrayscale} />
          <ToggleButton name="Background Removal" value={removeBg} onToggle={setRemoveBg} />
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          {imageFile && processedImage && (
            <button className="submit-button" onClick={handleDownload}>
              Download Image
            </button>
          )}
        </motion.div>
      </motion.div>

      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default EditPage;
