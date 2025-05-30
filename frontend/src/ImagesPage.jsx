import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import "./style.css";

function ImagesPage() {
  const storedToken = localStorage.getItem("token");
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

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
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/image", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch file names");
        }

        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching file names:", error);
        alert("File name fetching failed.");
        setFiles([]);
      }
    };

    fetchFiles();
  }, [storedToken]);

  const convertTimestampToDate = (ts) => {
    if (!ts) return "";
    const date = new Date(ts * 1000);
    return date.toLocaleString();
  };

  const downloadImage = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/image/${filename}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download image");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return url;
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error);
      return null;
    }
  };

  const fetchAndStoreImage = async (filename) => {
    const url = await downloadImage(filename);
    if (url) {
      setImageUrls((prev) => ({ ...prev, [filename]: url }));
    }
  };

  useEffect(() => {
    files.forEach((file) => {
      if (!imageUrls[file.filename]) {
        fetchAndStoreImage(file.filename);
      }
    });
  }, [files]);

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
          {files.map((file, index) => (
            <div className="gallery-item" key={index}>
              {imageUrls[file.filename] ? (
                <img
                  src={imageUrls[file.filename]}
                  alt={file.filename}
                  className="gallery-image"
                />
              ) : (
                <div className="image-placeholder">Loading...</div>
              )}
              <div className="file-info">
                <p>
                  <strong>Name:</strong> {file.filename}
                </p>
                <p>
                  <strong>Uploaded:</strong> {convertTimestampToDate(file.time)}
                </p>
              </div>

              <button
                className="download-button"
                onClick={async () => {
                  const downloadUrl = await downloadImage(file.filename);
                  if (downloadUrl) {
                    const link = document.createElement("a");
                    link.href = downloadUrl;
                    link.download = file.filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(downloadUrl);
                  }
                }}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </motion.div>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </>
  );
}

export default ImagesPage;
