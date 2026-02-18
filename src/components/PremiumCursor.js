import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function LiquidCursor() {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      style={{
        translateX: springX,
        translateY: springY,
      }}
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] z-[9999]"
    >
      <div className="liquid-blob"></div>
    </motion.div>
  );
}
