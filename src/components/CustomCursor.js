import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./ThemeContext";

const CustomCursor = () => {
  const { dark } = useContext(ThemeContext);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = () => setHovering(true);
    const handleMouseOut = () => setHovering(false);

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("button, a").forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x - 10,
        y: position.y - 10,
        scale: hovering ? 2 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className={`
        fixed top-0 left-0 z-[9999] pointer-events-none
        w-5 h-5 rounded-full
        ${dark ? "bg-yellow-400 shadow-yellow-400/50" : "bg-purple-600 shadow-purple-600/50"}
        shadow-lg
      `}
    />
  );
};

export default CustomCursor;
