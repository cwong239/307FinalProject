import { useRef } from "react";
import "./MagneticButton.css";

const MagneticButton = ({
  children,
  type = "button",
  onClick,
  ...rest
}) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const btn = ref.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `scale(1.05)`;
  };

  const reset = () => {
    ref.current.style.transform = "scale(1.0)";
  };

  return (
    <button
      ref={ref}
      className="magnetic-button"
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      {...rest}>
      {children}
    </button>
  );
};

export default MagneticButton;
