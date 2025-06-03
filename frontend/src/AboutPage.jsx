import Navbar from "./Navbar";
import "./style.css";

function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1>About FotoMagic</h1>
        <p>
          FotoMagic is a real-time photo editing web application
          built by Cal Poly students. It allows users to upload
          or take photos and apply various filters like
          brightness, contrast, monochrome, and more — all in
          the browser.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>Upload or click a photo instantly</li>
          <li>Apply real-time filters and enhancements</li>
          <li>Download or share edited images</li>
        </ul>

        <h2>Technology Stack</h2>
        <p>React, Vite, CSS, and more.</p>

        <h2>Our Vision</h2>
        <p>
          We aim to expand FotoMagic into a full-fledged editing
          platform with AI-powered enhancements and
          collaboration tools.
        </p>
      </div>

      <footer className="footer">
        <p>&copy; 2025 FotoMagic. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutPage;
