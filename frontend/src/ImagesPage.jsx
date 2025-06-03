import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import "./style.css";

function ImagesPage() {
  const storedToken = localStorage.getItem("token");
  const [filenames, setFilenames] = useState([]);

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

  useEffect(() => {
    const fetchFilenames = async () => {
      try {
        const response = await fetch("http://localhost:5000/image", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch filenames");
        }

        const data = await response.json();
        setFilenames(data);
      } catch (error) {
        console.error("Error fetching filenames:", error);
        setFilenames([]);
      }
    };

    fetchFilenames();
  }, [storedToken]);

  const downloadImage = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/image/${filename}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (!response.ok) throw new Error("Failed to download image");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error);
    }
  };

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
        <h1>Photo Gallery</h1>
        <div className="gallery-grid">
          {filenames.map((filename, index) => (
            <div className="gallery-item" key={index}>
              <img
                src={`http://localhost:5000/image/${filename}`}
                alt={filename}
                className="gallery-image"
              />
              <button
                onClick={() => downloadImage(filename)}
                className="download-button"
              >
                Download
              </button>
            </div>
          ))}
        </div>
        <audio controls>
          <source
            src="/placeHolderImages/VeryImportantDoNotDelete.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </motion.div>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default ImagesPage;
