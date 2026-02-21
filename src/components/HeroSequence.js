// import React, { useEffect, useState } from "react";

// const slides = [
//   {
//     h1: "Forex & Crypto Exchange Platform",
//     h2: "Instant Bank Transfers",
//     p: "Convert your USDT to fiat currency with ease. Fast transactions and bank-grade security."
//   },
//   {
//     h1: "Buy & Sell USDT Securely",
//     h2: "Trusted by 10M+ Users",
//     p: "Trade digital and fiat currencies with competitive exchange rates."
//   },
//   {
//     h1: "Trade Bitcoin & Global Currencies",
//     h2: "24/7 Customer Support",
//     p: "Secure, verified platform with smooth trading experience."
//   }
// ];

// const typingSpeed = 40;

// const HeroSequence = React.memo(() => {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const [displayH1, setDisplayH1] = useState("");
//   const [displayH2, setDisplayH2] = useState("");
//   const [displayP, setDisplayP] = useState("");
//   const [phase, setPhase] = useState("typingH1");

//   useEffect(() => {
//     const current = slides[slideIndex];
//     let timer;

//     if (phase === "typingH1") {
//       if (displayH1.length < current.h1.length) {
//         timer = setTimeout(() => {
//           setDisplayH1(current.h1.slice(0, displayH1.length + 1));
//         }, typingSpeed);
//       } else {
//         setPhase("typingH2");
//       }
//     }

//     else if (phase === "typingH2") {
//       if (displayH2.length < current.h2.length) {
//         timer = setTimeout(() => {
//           setDisplayH2(current.h2.slice(0, displayH2.length + 1));
//         }, typingSpeed);
//       } else {
//         setPhase("typingP");
//       }
//     }

//     else if (phase === "typingP") {
//       if (displayP.length < current.p.length) {
//         timer = setTimeout(() => {
//           setDisplayP(current.p.slice(0, displayP.length + 1));
//         }, typingSpeed);
//       } else {
//         timer = setTimeout(() => setPhase("reset"), 1500);
//       }
//     }

//     else if (phase === "reset") {
//       setDisplayH1("");
//       setDisplayH2("");
//       setDisplayP("");
//       setSlideIndex((prev) => (prev + 1) % slides.length);
//       setPhase("typingH1");
//     }

//     return () => clearTimeout(timer);
//   }, [displayH1, displayH2, displayP, phase, slideIndex]);

//   return (
//     <>
//       <h1 className="text-3xl lg:text-6xl max-sm:text-[18px] font-bold mb-8 ">
//         <span className="bg-[linear-gradient(135deg,#F5C56B_0%,#D4A017_100%)] bg-clip-text text-transparent">
//           {displayH1}
//         </span>
//       </h1>

//       <h2 className="text-xl lg:text-4xl font-semibold  mb-8 bg-[linear-gradient(135deg,#0072ff_0%,#00bfff_35%,#e6f7ff_55%,#00bfff_75%,#0050ff_100%)] bg-clip-text text-transparent">
//         {displayH2}
//       </h2>

//       <p className="text-gray-400 mt-2 font-medium  text-[18px]">
//         {displayP}
//       </p>
//     </>
//   );
// });

// export default HeroSequence;
















// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// const slides = [
//   {
//     h1: "Forex & Crypto Exchange Platform",
//     h2: "Instant Bank Transfers",
//     p: "Convert your USDT to fiat currency with ease. Fast transactions and bank-grade security."
//   },
//   {
//     h1: "Buy & Sell USDT Securely",
//     h2: "Trusted by 10M+ Users",
//     p: "Trade digital and fiat currencies with competitive exchange rates."
//   },
//   {
//     h1: "Trade Bitcoin & Global Currencies",
//     h2: "24/7 Customer Support",
//     p: "Secure, verified platform with smooth trading experience."
//   }
// ];

// const HeroSequence = () => {
//   const [index, setIndex] = useState(0);

//   // Auto slide change every 4 sec
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % slides.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   // Scroll animation
//   const { scrollY } = useScroll();
//   const yMove = useTransform(scrollY, [0, 500], [0, -150]);
//   const opacityMove = useTransform(scrollY, [0, 400], [1, 0.6]);

//   return (
//     <motion.div
//       style={{ y: yMove, opacity: opacityMove }}
//       className="relative perspective-1000"
//     >
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={index}
//           initial={{ rotateY: 90, opacity: 0 }}
//           animate={{ rotateY: 0, opacity: 1 }}
//           exit={{ rotateY: -90, opacity: 0 }}
//           transition={{ duration: 0.8, ease: "easeInOut" }}
//           className="text-center"
//         >
//           {/* H1 */}
//           <h1 className="text-3xl lg:text-6xl max-sm:text-[18px] font-bold mb-6">
//             <span className="bg-[linear-gradient(135deg,#F5C56B_0%,#D4A017_100%)] bg-clip-text text-transparent">
//               {slides[index].h1}
//             </span>
//           </h1>

//           {/* H2 */}
//           <h2 className="text-xl lg:text-4xl font-semibold mb-6 bg-[linear-gradient(135deg,#0072ff_0%,#00bfff_35%,#e6f7ff_55%,#00bfff_75%,#0050ff_100%)] bg-clip-text text-transparent">
//             {slides[index].h2}
//           </h2>

//           {/* Paragraph */}
//           <p className="text-gray-400 mt-2 font-medium text-[18px] max-w-2xl mx-auto">
//             {slides[index].p}
//           </p>
//         </motion.div>
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default HeroSequence;










import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring
} from "framer-motion";

const slides = [
  {
    h1: "Forex & Crypto Exchange Platform",
    h2: "Instant Bank Transfers",
    p: "Convert your USDT to fiat currency with ease. Fast transactions and bank-grade security."
  },
  {
    h1: "Buy & Sell USDT Securely",
    h2: "Trusted by 10M+ Users",
    p: "Trade digital and fiat currencies with competitive exchange rates."
  },
  {
    h1: "Trade Bitcoin & Global Currencies",
    h2: "24/7 Customer Support",
    p: "Secure, verified platform with smooth trading experience."
  }
];

const HeroSequence = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  // Auto Slide (No Flip)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Parallax
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -200]);
  const yBg = useTransform(scrollY, [0, 600], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0.6]);

  // Mouse Depth Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const moveX = (mouseX - width / 2) / 25;
    const moveY = (mouseY - height / 2) / 25;

    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full flex justify-center items-center overflow-hidden">

      {/* Parallax Background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 "
      />

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          y: yText,
          opacity: opacityText,
          transformPerspective: 1000
        }}
        className="relative text-center px-6 py-12"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* H1 */}
            <motion.h1
              style={{
                x: smoothX,
                y: smoothY,
                textShadow: "0px 25px 50px rgba(0,0,0,0.7)"
              }}
              className="text-3xl lg:text-6xl font-bold"
            >
              <span className="bg-[linear-gradient(135deg,#F5C56B_0%,#D4A017_100%)] bg-clip-text text-transparent">
                {slides[index].h1}
              </span>
            </motion.h1>

            {/* H2 */}
            <motion.h2
              style={{
                x: smoothX,
                y: smoothY
              }}
              className="text-xl lg:text-4xl font-semibold bg-[linear-gradient(135deg,#0072ff_0%,#00bfff_35%,#e6f7ff_55%,#00bfff_75%,#0050ff_100%)] bg-clip-text text-transparent"
            >
              {slides[index].h2}
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              style={{
                x: smoothX,
                y: smoothY
              }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              {slides[index].p}
            </motion.p>

          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default HeroSequence;