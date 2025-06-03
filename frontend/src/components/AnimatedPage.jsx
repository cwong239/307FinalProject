// src/components/AnimatedPage.jsx
import { motion } from "framer-motion";
export default function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}
