import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react"; // 👈 arrow icon

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const scrollTimeout = useRef(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY.current;
    setAtTop(latest < 20);

    if (latest > previous && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setHidden(false);
    }, 180);

    lastY.current = latest;
  });

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 22,
      }}
      className={`fixed top-0 left-0 w-full z-50 ${
        atTop
          ? "bg-transparent"
          : "bg-[#0B0E11]/90 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      {/* 👇 Height Reduced */}
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-1">

        {/* Logo */}
        <img src="/logot.png" alt="logo" className="w-16" />

        {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-5 text-[12px] font-medium">


          {/* Buy Crypto */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("buy")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-yellow-400 transition">
              Buy Crypto
              <motion.div
                animate={{ rotate: activeDropdown === "buy" ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={
                activeDropdown === "buy"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{ duration: 0.2 }}
              className={`absolute top-7 left-0 bg-[#1E2329] border border-white/5 rounded-lg shadow-xl p-5 w-64 ${
                activeDropdown === "buy" ? "visible" : "invisible"
              }`}
            >
              <p className="text-gray-400 hover:text-white transition cursor-pointer">
                Credit / Debit Card
              </p>
              <p className="text-gray-400 hover:text-white mt-3 transition cursor-pointer">
                P2P Trading
              </p>
              <p className="text-gray-400 hover:text-white mt-3 transition cursor-pointer">
                Bank Transfer
              </p>
            </motion.div>
          </div>

          <Link to="/markets" className="hover:text-yellow-400 transition">
            Markets
          </Link>

          {/* Trade */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("trade")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-yellow-400 transition">
              Trade
              <motion.div
                animate={{ rotate: activeDropdown === "trade" ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={
                activeDropdown === "trade"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{ duration: 0.2 }}
              className={`absolute top-7 left-0 bg-[#1E2329] border border-white/5 rounded-lg shadow-xl p-5 w-72 ${
                activeDropdown === "trade" ? "visible" : "invisible"
              }`}
            >
              <p className="text-gray-400 hover:text-white transition cursor-pointer">
                Spot Trading
              </p>
              <p className="text-gray-400 hover:text-white mt-3 transition cursor-pointer">
                Futures
              </p>
              <p className="text-gray-400 hover:text-white mt-3 transition cursor-pointer">
                Margin
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white text-sm">
            Login
          </Link>

         <Link
  to="/signup"
  className="px-5 py-2 rounded-full bg-gold-gradient text-black font-semibold 
             shadow-lg hover:scale-105 transition-all duration-300"
>
  Get Started
</Link>

        </div>

        {/* Mobile Hamburger */}
        <div
          className="lg:hidden flex flex-col gap-1 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <motion.span
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
            className="h-[2px] w-6 bg-white"
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            className="h-[2px] w-6 bg-white"
          />
          <motion.span
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
            className="h-[2px] w-6 bg-white"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: mobileOpen ? "auto" : 0 }}
        transition={{ duration: 0.35 }}
        className="lg:hidden bg-[#0B0E11] overflow-hidden"
      >
        <div className="flex flex-col px-6 py-6 gap-4 text-gray-300">
          <Link to="/markets" onClick={() => setMobileOpen(false)}>Markets</Link>
          <Link to="/trade" onClick={() => setMobileOpen(false)}>Trade</Link>
          <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
          <Link
            to="/signup"
            onClick={() => setMobileOpen(false)}
            className="px-4 py-2 rounded-md bg-yellow-400 text-black text-center"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}
