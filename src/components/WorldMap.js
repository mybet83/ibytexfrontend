"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

export default function WorldMap() {
  const svgRef = useRef(null);
  const [svgMap, setSvgMap] = useState(null);

  // ✅ Generate map AFTER first paint (non-blocking)
  useEffect(() => {
    const generateMap = () => {
      const map = new DottedMap({ height: 100, grid: "diagonal" });

      const svg = map.getSVG({
        radius: 0.28,
        color: "#8B5CF6",
        shape: "circle",
        backgroundColor: "transparent",
      });

      setSvgMap(svg);
    };

    // 🔥 Idle time pe generate karo (no freeze)
    if ("requestIdleCallback" in window) {
      requestIdleCallback(generateMap);
    } else {
      setTimeout(generateMap, 0);
    }
  }, []);

  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 90;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const routes = [
    { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 40.7128, lng: -74.006 } },
    { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 51.5074, lng: -0.1278 } },
    { start: { lat: 40.7128, lng: -74.006 }, end: { lat: -23.5505, lng: -46.6333 } },
    { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 35.6895, lng: 139.6917 } },
    { start: { lat: 35.6895, lng: 139.6917 }, end: { lat: -33.8688, lng: 151.2093 } },
  ];

  return (
    <div className="relative w-full h-full z-10">

      <div className="absolute bottom-0 left-0 w-full h-[45%] bg-gradient-to-t from-purple-700/40 via-purple-900/30 to-transparent blur-3xl"></div>

      {/* ✅ Render only when ready */}
      {svgMap && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="absolute inset-0 w-full h-full object-contain opacity-90"
          alt="map"
          draggable={false}
        />
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="goldenLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#F5C56B" />
            <stop offset="60%" stopColor="#FFD700" />
            <stop offset="80%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {routes.map((route, i) => {
          const start = projectPoint(route.start.lat, route.start.lng);
          const end = projectPoint(route.end.lat, route.end.lng);
          const path = createCurvedPath(start, end);


                

return (
  <g key={i}>
    {/* Animated Line */}
    <motion.path
      d={path}
      fill="none"
      stroke="url(#goldenLine)"
      strokeWidth="2"
      filter="url(#glow)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1, 0] }}
      transition={{
        duration: 5,
        delay: i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Start Dot */}
    <circle cx={start.x} cy={start.y} r="3" fill="#09ABFF" />

    {/* End Dot */}
    <circle cx={end.x} cy={end.y} r="3" fill="#09ABFF" />

    {/* 🔥 USDT Popup (FIXED POSITION) */}
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 4,
        delay: i * 0.5 + 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <circle cx={end.x} cy={end.y} r="10" fill="#09ABFF" />

      <text
        x={end.x}
        y={end.y + 4}
        textAnchor="middle"
        fontSize="10"
        fill="white"
        fontWeight="bold"
      >
        T
      </text>

      <circle
        cx={end.x}
        cy={end.y}
        r="16"
   
        strokeWidth="1.5"
        fill="none"
      />
    </motion.g>
  </g>
);

        })}
      </svg>
    </div>
  );
}
