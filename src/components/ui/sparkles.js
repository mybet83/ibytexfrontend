"use client";

import React from "react";
import { motion } from "framer-motion";

export const SparklesCore = ({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 120,
  className = "",
}) => {
  const particles = Array.from({ length: particleDensity });

   const randomX = (Math.random() - 0.5) * window.innerWidth;
  const randomY = (Math.random() - 0.5) * window.innerHeight;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background }}
    >
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -50],
x: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            width: `${Math.random() * maxSize + minSize}px`,
            height: `${Math.random() * maxSize + minSize}px`,
            left: `${Math.random() * 100}%`,
           top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

