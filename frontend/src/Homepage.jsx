import { motion } from "framer-motion";
import Navbar from "./Navbar";
import "./style.css";
import MagneticButton from "./components/MagneticButton";

function Homepage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}>
        <Navbar />
        <div className="homepage-content">
          <h1>FotoMagic</h1>
          <p>Edit your photos in real time!</p>
          <div className="feature-buttons">
            <MagneticButton>Gray Scale</MagneticButton>
            <MagneticButton>Brightness</MagneticButton>
            <MagneticButton>Contrast</MagneticButton>
            <MagneticButton>Gamma</MagneticButton>
            <MagneticButton>Background Removal</MagneticButton>
            <MagneticButton>Interactive</MagneticButton>
          </div>
        </div>
        <footer className="footer">
          <p>&copy; 2025 FotoMagic. All rights reserved.</p>
        </footer>
      </motion.div>
    </>
  );
}

export default Homepage;
