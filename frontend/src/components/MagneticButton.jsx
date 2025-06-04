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
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const reset = () => {
    ref.current.style.transform = "translate(0px, 0px)";
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
