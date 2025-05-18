import React from "react";
import Navbar from "./Navbar";
import "./style.css";

const images = [
  {
    src: "/placeHolderImages/placeHolder1.jpg",
    alt: "Banana",
    filename: "Banana.jpg",
  },
  {
    src: "/placeHolderImages/placeHolder2.jpg",
    alt: "Apple",
    filename: "Apple.jpg",
  },
  {
    src: "/placeHolderImages/placeHolder3.jpg",
    alt: "Orange",
    filename: "Orange.jpg",
  },
];

function ImagesPage() {
  return (
    <div>
      <Navbar />
      <div className="gallery-container">
        <h1>Photo Gallery</h1>
        <div className="gallery-grid">
          {images.map((img, index) => (
            <div className="gallery-item" key={index}>
              <img src={img.src} alt={img.alt} className="gallery-image" />
              <a href={img.src} download={img.filename} className="download-button">
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
      <audio controls>
        <source src="/placeHolderImages/VeryImportantDoNotDelete.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ImagesPage;
