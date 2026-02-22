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
import { SparklesCore } from "../components/ui/sparkles";

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
    <div className=" relative z-10 min-h-screen bg-white text-black dark:bg-black dark:text-white ">
      <Navbar />

   <section className="relative min-h-screen flex items-center justify-center overflow-hidden max-md:min-h-[auto] py-24 
max-md:pt-[10rem] max-md:pb-[6rem]
bg-white dark:bg-black transition-colors duration-500">

  {/* Background Glow Effects */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-[500px] h-[500px] 
    bg-blue-600/20 blur-[140px] rounded-full"></div>

    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] 
    bg-yellow-500/20 blur-[140px] rounded-full"></div>
  </div>

  <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

    {/* Main Heading */}
    <h1 className="text-5xl md:text-7xl font-bold 
    text-black dark:text-white leading-tight max-md:text-[2.5rem]">

      Buy & Sell USDT  

      <span className="block italic font-light 
      bg-gradient-to-r from-yellow-400 to-blue-400 
      bg-clip-text text-transparent mt-2 max-md:text-[2rem]">
        Securely & Instantly
      </span>
    </h1>

    {/* Subtitle */}
    <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto max-md:text-[1rem]">
      Trade digital assets with competitive rates and lightning-fast processing.
      Trusted by thousands of users worldwide.
    </p>

    {/* CTA Button */}
    <div className="mt-12 flex justify-center gap-5 max-md:flex-col-reverse max-md:justify-center max-md:mx-auto max-md:items-center max-md:mt-14">
    <button onClick={() => navigate("/login")} className="
      px-12 py-13 rounded-full
      bg-gold-gradient dark:bg-white
      text-white dark:text-black
      font-medium
      hover:scale-105 transition-all duration-300 shadow-xl max-md:w-[12rem] max-md:py-[1rem]">
           Sell Now →
      </button> 

<div className="flex items-center gap-4 mt-2">

  {/* Logo with Glow Ring */}
  <div className="relative">
    <div className="absolute inset-0 
    bg-gradient-to-r from-green-400 to-emerald-500 
    blur-lg opacity-40 rounded-full"></div>

    <div className="
      relative w-10 h-10 rounded-full
      bg-gradient-to-br from-green-400 to-emerald-600
      flex items-center justify-center
      shadow-md
    ">
      <img
        src="https://cryptologos.cc/logos/tether-usdt-logo.png"
        alt="usdt"
        className="w-6 h-6"
      />
    </div>
  </div>

  {/* Text Section */}
  <div className="flex flex-col">

    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400">
        Today USDT Rate
      </span>

      {/* Live Dot */}
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
    </div>

    <div className="flex items-center gap-2 mt-1 max-md:items-end justify-end">

      <span className="text-gray-400 text-4xl">₹</span>

      <span className="
        text-4xl font-bold
        bg-gradient-to-r from-green-400 to-emerald-500
        bg-clip-text text-transparent justify-end items-end text-end
      ">
        {rate ? rate : "—"}
      </span>

    </div>
  </div>

</div>
    </div>

    {/* ================= RATE CARD ================= */}


  </div>

</section>

      

      {/* Live Markets + News Section */}
      <section className="px-20 py-3 max-lg:py-4 max-lg:px-5 max-md:relative ">
        <LivePrices />
      </section>

         <div className="relative ">
         <CryptoLogos />
         </div>

      {/* Why Choose Us */}
   <section className="relative py-12 bg-black overflow-hidden">

  {/* Subtle Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full"></div>
    <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-6 lg:px-20">

    {/* Heading */}
    <div className="text-center mb-20 max-md:mb-10">
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
    </div>

    <div className="grid lg:grid-cols-2 gap-16 items-center max-md:gap-6">

      {/* LEFT SIDE – PROOF CARDS */}
      <div className="space-y-8 max-md:space-y-6">

        {/* Card 1 */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 transition">
          <h3 className="text-xl font-semibold text-white mb-2">
            🔐 Bank-Level Encryption
          </h3>
          <p className="text-gray-400 text-sm">
            All transactions are secured with AES-256 encryption and monitored
            with real-time fraud detection systems.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-green-400/40 transition">
          <h3 className="text-xl font-semibold text-white mb-2">
            📊 Real-Time Market Execution
          </h3>
          <p className="text-gray-400 text-sm">
            USDT conversions happen instantly at live rates — no hidden spreads,
            no artificial delays.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-yellow-400/40 transition">
          <h3 className="text-xl font-semibold text-white mb-2">
            🛡 Fully AML & KYC Compliant
          </h3>
          <p className="text-gray-400 text-sm">
            We follow strict Anti-Money Laundering and Know Your Customer
            guidelines to maintain platform integrity.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE – LIVE TRUST METRICS */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12">

        <h3 className="text-2xl font-semibold text-white mb-8">
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

      </div>

    </div>
  </div>
</section>


<section className="relative py-12 overflow-hidden max-md:py-8">

  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[140px] rounded-full"></div>
  </div>

  <div className="relative z-10 max-w-6xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-20">
      <h2 className="text-5xl font-bold text-white max-md:text-[2rem]">
        How iBytex Works
      </h2>
      <p className="text-gray-400 mt-4 text-xl block italic font-light 
      bg-gradient-to-r from-yellow-400 to-blue-400 
      bg-clip-text text-transparent ">
        Convert USDT to INR in 3 seamless steps
      </p>
    </div>

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
            <h3 className="text-2xl font-semibold text-white mt-4">
              Deposit USDT
            </h3>
            <p className="text-gray-400 mt-3">
              Send USDT via TRC20 securely to your wallet address.
            </p>
          </div>

          {/* Right Card */}
          <div className="relative mt-10 md:mt-0 group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:border-blue-400/40 transition duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-3xl shadow-lg">
                ⬇
              </div>
            </div>
          </div>
        </div>


        {/* STEP 02 */}
      <div className="relative flex flex-col md:grid md:grid-cols-2 md:gap-16 items-center">

          {/* Left Card */}
         <div className="relative order-2 md:order-1 group mt-10 md:mt-0 w-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:border-green-400/40 transition duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-3xl shadow-lg">
                🔄
              </div>
            </div>
          </div>

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
          <div className="relative mt-10 md:mt-0 group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:border-yellow-400/40 transition duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-3xl shadow-lg">
                💳
              </div>
            </div>
          </div>
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-6xl font-bold text-white mb-8 max-md:text-[2rem]"
    >
      Trusted by the{" "}
      <span className="">
        World
      </span>
    </motion.h2>

    <p className="text-gray-400 max-w-2xl mx-auto mb-20 text-lg block italic font-light 
      bg-gradient-to-r from-yellow-400 to-blue-400 
      bg-clip-text text-transparent mt-2 max-md:mb-10">
      Real-time growth metrics powering next-generation crypto exchange infrastructure.
    </p>

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
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
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
<section className="relative py-24 overflow-hidden max-md:py-8 max-md:mb-12">

  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full"></div>
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 blur-[140px] rounded-full"></div>
  </div>

  <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-20">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16 max-md:mb-10"
    >
      <h3 className="text-4xl md:text-5xl font-bold text-white max-md:text-[2rem]">
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
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-8 mt-20 max-md:mt-10 max-md:justify-center max-md:grid max-md:grid-cols-2"
    >

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 
      rounded-xl px-6 py-4 text-sm text-gray-300 hover:border-blue-400/40 transition max-sm:px-3">
        🛡 ISO 27001 Certified
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 
      rounded-xl px-6 py-4 text-sm text-gray-300 hover:border-green-400/40 transition max-sm:px-3">
        🔍 AML & KYC Verified
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 
      rounded-xl px-6 py-4 text-sm text-gray-300 hover:border-yellow-400/40 transition max-sm:px-3 ">
        🔐 PCI DSS Secure
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 
      rounded-xl px-6 py-4 text-sm text-gray-300 hover:border-purple-400/40 transition max-sm:px-3">
        🌍 Global Compliance Ready
      </div>

    </motion.div>

  </div>
</section>







      <Footer />
    </div>
  );
};

export default Home;
