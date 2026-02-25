"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Counter from "../components/Counter";
import LivePrices from "../components/LivePrices";
import Navbar from "../components/Navbar";
import CryptoLogos from "../components/CryptoLogos";
import HeroSequence from "../components/HeroSequence";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { HiCheckCircle } from "react-icons/hi";
// import WorldMapSection from "../components/WorldMapSection";
import {
  HiShieldCheck,
  HiDocumentText,
  HiSupport,
  HiCreditCard,
} from "react-icons/hi";


const API = process.env.REACT_APP_API_URL;


const Home = () => {
  const [rate, setRate] = useState(0);
  const [usdt, setUsdt] = useState("");
  const [news, setNews] = useState([]);

  // ================= FETCH RATE =================
  const fetchRate = async () => {
    try {
      const res = await axios.get(`${API}/admin/rate`);
      setRate(res.data.rate || 0);
    } catch (err) {
      console.error("Rate fetch failed");
    }
  };

  // ================= FETCH NEWS =================
  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API}/admin/news`);
      setNews(res.data || []);
    } catch (err) {
      console.error("News fetch failed");
    }
  };
  
   const [deferredPrompt, setDeferredPrompt] = useState(null);
const [showInstallCard, setShowInstallCard] = useState(false);

useEffect(() => {
  const handler = (e) => {
    e.preventDefault();
    setDeferredPrompt(e);

    setTimeout(() => {
       setShowInstallCard(true);
    },4000);
  };

  window.addEventListener("beforeinstallprompt", handler);

  return () => window.removeEventListener("beforeinstallprompt", handler);
}, []);

const handleInstallClick = async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;

  setDeferredPrompt(null);
  setShowInstallCard(false);
};

const handleLater = () => {
  setShowInstallCard(false);
};

  useEffect(() => {
    setTimeout(() => {
      fetchRate();
      fetchNews();
    }, 0);
  }, []);

  // Auto refresh rate every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRate();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  document.title = "iBytex | Global Digital Asset Exchange";
}, []);

  const totalAmount = usdt ? (usdt * rate).toFixed(2) : "--";

  const items = [
    {
      icon: <HiShieldCheck />,
      text: "Trusted since 2008",
    },
    {
      icon: <HiDocumentText />,
      text: "Multiple regulatory licenses",
    },
    {
      icon: <HiSupport />,
      text: "24/7 customer support",
    },
    {
      icon: <HiCreditCard />,
      text: "PCI DSS certified",
    },
  ];
const navigate = useNavigate();

function AnimatedCounter({ end }) {
  const [count, setCount] = useState(0);




  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start.toFixed(1));
    }, 16);

    return () => clearInterval(timer);
  }, [end]);


  return <>{count}</>;
  
}

 const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div className=" relative z-10 min-h-screen  ">
      <Navbar />

   <section className="relative min-h-screen flex items-center justify-center overflow-hidden max-md:min-h-[auto] py-24 
max-md:pt-[10rem] max-md:pb-[6rem]
transition-colors duration-500">

  {/* Background Glow Effects */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-[500px] h-[500px] 
    bg-blue-600/20 blur-[140px] rounded-full max-md:w-[300px] max-md:h-[300px] max-md:blur-[70px]"></div>

    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] 
    bg-yellow-500/20 blur-[140px] rounded-full max-md:w-[300px] max-md:h-[300px] max-md:blur-[70px]"></div>
  </div>

  <motion.div
     initial={{ opacity: 0, y: 80 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 1, // 🔥 4 second delay
    duration: 2,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative z-10 max-w-5xl mx-auto px-6 text-center">

    {/* Main Heading */}
    <h1 className="text-3xl md:text-6xl font-bold 
     leading-tight max-md:text-[1rem]">

      Sell Your USDT Instantly

      <span className="block italic font-light 
      bg-gradient-to-r from-yellow-400 to-blue-400 
      bg-clip-text text-transparent mt-5 text-4xl  max-md:text-[2rem]">
       Fast, secure, and reliable USDT selling with competitive market rates.
      </span>
    </h1>

    {/* Subtitle */}
    <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto max-md:text-[1rem]">
      Trade digital assets with competitive rates and lightning-fast processing.
      Trusted by thousands of users worldwide.
    </p>

<div className="mt-16 flex justify-center max-md:flex-col max-md:items-center max-md:mt-10">

  {/* MAIN CTA WRAPPER */}
  <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl 
                  border border-white/10 
                  rounded-3xl px-8 py-5 
                  shadow-[0_10px_40px_rgba(0,0,0,0.4)]
                  max-md:flex-col-reverse max-md:gap-2 max-md:w-full max-md:max-w-sm ">

    {/* SELL BUTTON */}
    <button
      onClick={() => navigate("/login")}
      className="
        relative overflow-hidden
        px-10 py-3 rounded-xl
       bg-gold-gradient
        text-black font-semibold text-lg
        shadow-lg
        hover:scale-105 hover:shadow-[0_0_30px_rgba(255,200,0,0.6)]
        transition-all duration-300
        max-md:w-full
      "
    >
      <span className="relative z-10">Sell Now →</span>

      {/* Shine Effect */}
      <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-20 transition"></span>
    </button>


    {/* DIVIDER */}
    <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>

    {/* RATE CARD */}
    <div className="flex gap-2 max-md:mb-3">
     <div className="flex items-center gap-1 
                      bg-white/5 border border-white/10
                      px-3 py-1 rounded-full text-sm text-gray-400 max-md:flex">

        <span className="text-green-400">↗</span>
        <span>Rate:</span>
      </div>

      {/* PRICE */}
      <div className="flex items-baseline gap-1">

        <span className="text-gray-400 text-2xl">₹</span>

        <span className="
          text-2xl font-bold
          bg-gradient-to-r text-white
          bg-clip-text text-transparent
        ">
          {rate ? rate : "—"}
        </span>

        <span className="text-gray-500 text-xl">/USDT</span>
         <span className=" absolute right-[0.75rem] px-2 py-1 text-[8px] top-2 bg-red-500 rounded-full animate-pulse shadow-lg">
                    LIVE
                  </span>
      </div>
</div>
  </div>
</div>

    {/* ================= RATE CARD ================= */}


  </motion.div>

</section>

      

      {/* Live Markets + News Section */}
           <div className="relative ">
  <CryptoLogos />
</div>

      <section className="px-20 py-3 max-lg:py-4 max-lg:px-5 max-md:relative ">
        <LivePrices />
      </section>



      {/* Why Choose Us */}
   <section className="relative py-12 bg-black overflow-hidden">

  {/* Subtle Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full"></div>
    <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-20">

    {/* Heading */}
    <motion.div
             initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
    className="text-center mb-20 max-md:mb-10">
      <h2 className="text-5xl font-bold text-white max-md:text-[2.5rem]">
        Built on <span className="block italic font-light 
      bg-gradient-to-r from-yellow-400 to-blue-400 
      bg-clip-text text-transparent mt-2 max-md:text-[1.5rem]">
          Trust & Transparency
        </span>
      </h2>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto max-md:text-[12px]">
        We combine enterprise-grade infrastructure with regulatory compliance
        to ensure every transaction is secure, traceable and protected.
      </p>
    </motion.div>

    <div className="grid lg:grid-cols-2 gap-16 items-center max-md:gap-6">

      {/* LEFT SIDE – PROOF CARDS */}
      <div className="space-y-8 max-md:space-y-6">

        {/* Card 1 */}
        <motion.div
                  initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition max-md:p-4">
          <h3 className="text-xl font-semibold text-white mb-2 max-md:text-[16px]">
             Bank-Level Encryption
          </h3>
          <p className="text-gray-400 text-sm">
            All transactions are secured with AES-256 encryption and monitored
            with real-time fraud detection systems.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
                 initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-green-400/40 transition max-md:p-4 ">
          <h3 className="text-xl font-semibold text-white mb-2 max-md:text-[16px]">
             Real-Time Market Execution
          </h3>
          <p className="text-gray-400 text-sm">
            USDT conversions happen instantly at live rates — no hidden spreads,
            no artificial delays.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
                  initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-yellow-400/40 transition max-md:p-4">
          <h3 className="text-xl font-semibold text-white mb-2 max-md:text-[16px]">
             Fully AML & KYC Compliant
          </h3>
          <p className="text-gray-400 text-sm">
            We follow strict Anti-Money Laundering and Know Your Customer
            guidelines to maintain platform integrity.
          </p>
        </motion.div>

      </div>

      {/* RIGHT SIDE – LIVE TRUST METRICS */}
      <motion.div
                initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
      
      className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 max-md:p-6">

        <h3 className="text-2xl font-semibold text-white mb-8 max-md:text-xl">
          Platform Performance
        </h3>

        <div className="space-y-8">

          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Transaction Success Rate</span>
              <span>99.98%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-[99%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Average Processing Time</span>
              <span>2–5 Minutes</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full">
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full w-[85%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Customer Satisfaction</span>
              <span>4.9 / 5</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-[95%]"></div>
            </div>
          </div>

        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap gap-4 mt-10">

          <div className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300">
            ISO 27001 Certified
          </div>

          <div className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300">
            AML Verified
          </div>

          <div className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300">
            PCI DSS Secure
          </div>

        </div>

      </motion.div>

    </div>
  </div>
</section>


<section className="relative py-12 overflow-hidden max-md:pt-8 max-md:pb-4">

  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[140px] rounded-full"></div>
  </div>

  <div className="relative z-10 max-w-6xl mx-auto px-6">

    {/* Heading */}
    <motion.div
              initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
    className="text-center mb-20 max-md:mb-10">
      <h2 className="text-5xl font-bold text-white max-md:text-[2rem]">
        How iBytex Works
      </h2>
      <p className="text-gray-400 mt-4 text-xl block italic font-light 
      bg-gradient-to-r from-yellow-400 to-blue-400 
      bg-clip-text text-transparent ">
        Convert USDT to INR in 3 seamless steps
      </p>
    </motion.div>

    <div className="relative">

      {/* Vertical Timeline Line */}
      <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] 
      bg-gradient-to-b from-blue-500 via-green-500 to-yellow-500 opacity-40"></div>

      <div className="space-y-24 max-md:space-y-12">

        {/* STEP 01 */}
        <div className="relative md:grid md:grid-cols-2 md:gap-16 items-center">

          {/* Left Content */}
          <div className="md:text-right">
            <span className="text-6xl font-bold text-white/30">
              01
            </span>
            <h3 className="text-2xl font-semibold text-white mt-4 ">
              Deposit USDT
            </h3>
            <p className="text-gray-400 mt-3">
              Send USDT via TRC20 securely to your wallet address.
            </p>
          </div>

          {/* Right Card */}
          <motion.div
                    initial={{ opacity: 0, x: 120 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
          
          className="relative mt-10 md:mt-0 group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:border-blue-400/40 transition duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-3xl shadow-lg">
                ⬇
              </div>
            </div>
          </motion.div>
        </div>


        {/* STEP 02 */}
      <div className="relative flex flex-col md:grid md:grid-cols-2 md:gap-16 items-center">

          {/* Left Card */}
          <motion.div
                    initial={{ opacity: 0, x: -120 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
         className="relative order-2 md:order-1 group mt-10 md:mt-0 w-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:border-green-400/40 transition duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-3xl shadow-lg">
                🔄
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
   <div className="order-1 md:order-2 md:text-left w-full">
            <span className="text-6xl font-bold text-white/30">
              02
            </span>
            <h3 className="text-2xl font-semibold text-white mt-4">
              Instant Conversion
            </h3>
            <p className="text-gray-400 mt-3">
              Your USDT is converted at live market rates with zero hidden fees.
            </p>
          </div>
        </div>


        {/* STEP 03 */}
        <div className="relative md:grid md:grid-cols-2 md:gap-16 items-center">

          {/* Left Content */}
          <div className="md:text-right">
            <span className="text-6xl font-bold text-white/30">
              03
            </span>
            <h3 className="text-2xl font-semibold text-white mt-4">
              Receive INR
            </h3>
            <p className="text-gray-400 mt-3">
              Funds are transferred directly to your bank account or UPI instantly.
            </p>
          </div>

          {/* Right Card */}
          <motion.div
            
            initial={{ opacity: 0, x: 120 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
          
          className="relative mt-10 md:mt-0 group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:border-yellow-400/40 transition duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-3xl shadow-lg">
                💳
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>

  </div>
</section>
     {/* ================= TRUSTED BY NUMBERS ================= */}


{/* ================= WORLD CLASS TRUST SECTION ================= */}

{/* ================= ULTRA NEXT LEVEL TRUST SECTION ================= */}
<section className="relative py-12 overflow-hidden bg-black">

  {/* Animated Grid Background */}
  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"></div>

  {/* Particle Effect */}
 <Particles
  className="absolute inset-0"
  init={particlesInit}
  options={{
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
    
      size: { value: 2 },
      move: { speed: 0.3 },
      opacity: { value: 0.3 },
      links: { enable: false },
    },
    detectRetina: true,
  }}
/>

  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">

    {/* Heading */}
    <motion.h2
   initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
      className="text-5xl font-bold text-white mb-8 max-md:text-[2rem]"
    >
      Trusted by the{" "}
      <span className="">
        World
      </span>
    </motion.h2>

    <motion.p
      
   initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
    className="text-gray-400 max-w-2xl mx-auto mb-20 text-lg block italic font-light 
      bg-gradient-to-r from-yellow-400 to-blue-400 
      bg-clip-text text-transparent mt-2 max-md:mb-10">
      Real-time growth metrics powering next-generation crypto exchange infrastructure.
    </motion.p>

    {/* Stats Grid */}
    <div className="grid lg:grid-cols-3 gap-12 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-6">

      {[
        { prefix: "$", end: 200, suffix: "M+", label: "Total Trade", gradient: "from-yellow-400 to-orange-500" },
        { prefix: "", end: 10, suffix: "M+", label: "Active Users", gradient: "from-blue-400 to-cyan-400" },
        { prefix: "$", end: 1.5, suffix: "M+", label: "Daily Avg Exchange", gradient: "from-green-400 to-emerald-500" }
      ].map((item, index) => (
        
        <Tilt
          key={index}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareEnable={true}
          glareMaxOpacity={0.2}
          className="group"
        >
          <motion.div
           
   initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
            className="relative p-[2px] rounded-3xl"
          >

            {/* Animated Border Sweep */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent 
            bg-[length:200%_100%] animate-[borderSweep_3s_linear_infinite] opacity-0 group-hover:opacity-100"></div>

            {/* Card */}
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-14 text-center transition duration-500 group-hover:scale-[1.05]">

              {/* Floating Number */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className={`text-5xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
              >
                {item.prefix}
                <AnimatedCounter end={item.end} />
                {item.suffix}
              </motion.div>

              <div className="w-16 h-[2px] bg-white/10 mx-auto my-6"></div>

              <p className="text-gray-400 uppercase tracking-widest text-sm">
                {item.label}
              </p>

            </div>

          </motion.div>
        </Tilt>

      ))}

    </div>

  </div>
</section>

  
  
  


{/* ================= ULTRA PREMIUM TRUST SECTION ================= */}
<section className="relative py-12 overflow-hidden max-md:pb-8 max-md:mb-12 max-md:pt-[1rem] ">

  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full"></div>
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 blur-[140px] rounded-full"></div>
  </div>

  <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-20">

    {/* Heading */}
    <motion.div
     
   initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
      className="text-center mb-16 max-md:mb-10"
    >
      <h3 className=" md:text-5xl font-bold text-white max-md:text-[2rem]">
        Security & Trust
      </h3>
      <p className="text-gray-400 mt-4 block italic font-light 
      bg-gradient-to-r from-yellow-400 to-blue-400 
      bg-clip-text text-transparent">
        Built with enterprise-grade infrastructure and compliance standards
      </p>
    </motion.div>

    {/* Feature Grid */}
    <div className="grid lg:grid-cols-4 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1 max-md:gap-6">

      {items.map((item, index) => (
        <motion.div
        
   initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
          className="group relative rounded-2xl p-[1px]"
        >

          {/* Animated Gradient Border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
          from-yellow-400 via-orange-500 to-yellow-400
          bg-[length:200%_200%] animate-[gradientMove_4s_linear_infinite]
          opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>

          {/* Card */}
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 
          rounded-2xl p-6 flex items-center gap-4
          transition-all duration-300
          group-hover:scale-[1.05] max-md:p-3 max-md:gap-2 max-sm:p-5 max-sm:gap-4">

            {/* Icon Box */}
            <div className="w-12 h-12 rounded-xl max-md:w-8 max-md:h-8
            bg-gradient-to-br from-yellow-400 to-orange-500
            flex items-center justify-center text-black text-xl shadow-lg">
              {item.icon}
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition duration-300 max-md:text-[12px]  max-md:items-center max-md:justify-center max-md:text-center max-sm:text-sm">
                {item.text}
              </span>

              {/* Animated Checkmark */}
              <HiCheckCircle className="text-green-400 text-lg mt-1 
              opacity-0 translate-y-2 
              group-hover:opacity-100 group-hover:translate-y-0 
              transition duration-300" />
            </div>

          </div>
        </motion.div>
      ))}
    </div>

    {/* Trust Badges */}
    <motion.div
 
   initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
      className="flex flex-wrap justify-center gap-8 mt-20 max-md:mt-10 max-md:justify-center max-md:grid max-md:grid-cols-2"
    >

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 
      rounded-xl px-6 py-4 text-sm text-gray-300 hover:border-blue-400/40 transition max-sm:px-3">
         ISO 27001 Certified
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 
      rounded-xl px-6 py-4 text-sm text-gray-300 hover:border-green-400/40 transition max-sm:px-3">
         AML & KYC Verified
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 
      rounded-xl px-6 py-4 text-sm text-gray-300 hover:border-yellow-400/40 transition max-sm:px-3 ">
         PCI DSS Secure
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 
      rounded-xl px-6 py-4 text-sm text-gray-300 hover:border-purple-400/40 transition max-sm:px-3">
         Global Compliance Ready
      </div>

    </motion.div>

  </div>
</section>

{showInstallCard && (
  <div className="fixed bottom-6 right-6 z-50 max-md:bottom-4 max-md:right-4">

    <div className="
      relative w-[380px] max-md:w-[92vw]
      p-[1px] rounded-3xl
      bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-400
      animate-borderFlow
    ">

      <div className="
        relative bg-[#0b0f1a]/95 backdrop-blur-2xl
        rounded-3xl p-6
        shadow-[0_25px_80px_rgba(0,0,0,0.7)]
        animate-slidePremium
      ">

        {/* Close Button */}
        <button
          onClick={handleLater}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
        >
          ✕
        </button>

        {/* Logo with Glow */}
        <div className="relative w-16 h-16 rounded-2xl
        flex items-center justify-center
        bg-white/5 border border-white/10
        shadow-[0_0_30px_rgba(255,200,0,0.3)]
        overflow-hidden">

          <img
            src="/logot.png"
            alt="iBytex Logo"
            className="w-10 h-10 object-contain"
          />

          <div className="absolute inset-0 rounded-2xl
          bg-gradient-to-br from-yellow-400/20 to-blue-500/20 blur-xl opacity-60"></div>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-xl font-semibold
        bg-gradient-to-r from-yellow-400 to-blue-400
        bg-clip-text text-transparent">
          Install iBytex
        </h3>

        <p className="text-gray-400 text-sm mt-2 leading-relaxed">
          Get lightning fast access, real-time price updates,
          and a smoother trading experience.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={handleLater}
            className="px-4 py-2 rounded-xl
            bg-white/5 text-gray-300
            hover:bg-white/10 transition"
          >
            Later
          </button>

          <button
            onClick={handleInstallClick}
            className="px-6 py-2 rounded-xl
            bg-gold-gradient
            text-black font-bold
            shadow-[0_0_25px_rgba(255,200,0,0.5)]
            hover:scale-105 transition-all duration-300"
          >
            Install Now
          </button>

        </div>

      </div>
    </div>
  </div>
)}





      <Footer />
    </div>
  );
};

export default Home;
