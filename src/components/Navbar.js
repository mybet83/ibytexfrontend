import { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeaderUserMenu from "./HeaderUserMenu";
import { ThemeContext } from "./ThemeContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [user, setUser] = useState(null);

  const { dark, setDark } = useContext(ThemeContext);

  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const scrollTimeout = useRef(null);
  const location = useLocation();

  /* ================= LOGOUT ON HOME ================= */
  useEffect(() => {
    if (location.pathname === "/home") {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [location.pathname]);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  /* ================= SCROLL NAVBAR ================= */
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
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      className={`fixed top-0 left-0 w-full z-50 ${
        atTop
          ? "bg-transparent"
          : "bg-[#0B0E11]/90 dark:bg-[#0B0E11]/90 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-2">

        {/* Logo */}
        <img src="/logot.png" alt="logo" className="w-16" />

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide">

          {/* Crypto Trading */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("crypto")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-yellow-400 transition">
              Crypto Trading
              <motion.div
                animate={{ rotate: activeDropdown === "crypto" ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={
                activeDropdown === "crypto"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{ duration: 0.2 }}
              className={`absolute top-8 left-0 bg-[#1E2329] border border-white/5 rounded-lg shadow-xl p-5 w-56 ${
                activeDropdown === "crypto" ? "visible" : "invisible"
              }`}
            >
              <Link to="/login" className="block text-gray-400 hover:text-white">
                Sell USDT
              </Link>

              <Link to="/signup" className="block text-gray-400 hover:text-white mt-3">
                Buy USDT
              </Link>
            </motion.div>
          </div>

          <Link to="/home" className="hover:text-yellow-400">
            Markets
          </Link>

          <Link to="/about" className="hover:text-yellow-400">
            About Us
          </Link>
        </div>

        {/* Right Side Desktop */}
        <div className="hidden lg:flex items-center gap-4">

          {/* THEME TOGGLE */}
        

          {user ? (
            <HeaderUserMenu />
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white text-sm">
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 rounded-full bg-gold-gradient text-black font-semibold"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: mobileOpen ? "auto" : 0 }}
        transition={{ duration: 0.35 }}
        className="lg:hidden bg-[#0B0E11] dark:bg-[#0B0E11] overflow-hidden"
      >
        <div className="flex flex-col px-6 py-6 gap-4 text-gray-300">

          <Link to="/home" onClick={() => setMobileOpen(false)}>
            Markets
          </Link>

          <Link to="/about" onClick={() => setMobileOpen(false)}>
            About Us
          </Link>

          {/* THEME TOGGLE MOBILE */}
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-2  text-left"
          >
            {dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>

          {user ? (
            <HeaderUserMenu mobile />
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-500 rounded-md text-center"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-yellow-400 text-black text-center font-semibold"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}
