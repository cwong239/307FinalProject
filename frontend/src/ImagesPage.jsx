import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import "./style.css";

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

function ImagesPage() {
  const storedToken = localStorage.getItem("token");
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [errorStatusMessage, setErrorStatusMessage] = useState("");

  if (!storedToken) {
    window.location.href = "/login";
    return null;
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

        switch (response.status) {
          case 200:
            const data = await response.json();
            setFiles(data);
            break;
          case 401:
            window.location.href = "/login";
            break;
          default:
            setErrorStatusMessage("Failed to fetch file list.");
            setFiles([]);
            break;
        }
      } catch (error) {
        console.error("Error fetching file names:", error);
        setErrorStatusMessage("An unexpected error occurred.");
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

      switch (response.status) {
        case 200:
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        case 401:
          window.location.href = "/login";
          return null;
        case 403:
          setErrorStatusMessage(`Access denied to image: ${filename}`);
          return null;
        case 404:
          setErrorStatusMessage(`Image not found: ${filename}`);
          return null;
        case 400:
          setErrorStatusMessage("Bad request.");
          return null;
        default:
          setErrorStatusMessage("Server error occurred while downloading image.");
          return null;
      }
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error);
      setErrorStatusMessage("An unexpected error occurred while downloading.");
      return null;
    }
  };

  const fetchAndStoreImage = async (filename) => {
    const url = await downloadImage(filename);
    if (url) {
      setImageUrls((prev) => ({ ...prev, [filename]: url }));
    }
  };

  if (errorStatusMessage) {
    return <ErrorStatusMessage statusMessage={errorStatusMessage} />;
  }

  useEffect(() => {
    files.forEach((file) => {
      if (!imageUrls[file.filename]) {
        fetchAndStoreImage(file.filename);
      }
    });
  }, [files, imageUrls, errorStatusMessage]);

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
