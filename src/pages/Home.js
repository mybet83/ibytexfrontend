"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Typewriter } from "react-simple-typewriter";
import Counter from "../components/Counter";
import LivePrices from "../components/LivePrices";
import WorldMapSection from "../components/WorldMapSection";
import Navbar from "../components/Navbar";


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
    fetchRate();
    fetchNews();
  }, []);

  // Auto refresh rate every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRate();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalAmount = usdt ? (usdt * rate).toFixed(2) : "--";


  return (
    <div className=" relative z-10 min-h-screen bg-gradient-to-br bg-black text-white">

      <Navbar/>
      {/* <nav className="flex -mt-5  items-center justify-between px-6 py-5">
         <img src="/logot.png" alt="logo" className="w-28 right-6 relative" />

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </nav> */}

  {/* Background Image */}
{/* <div className="absolute inset-0 -z-10 pointer-events-none">
  <img
    src="bg.png"
    alt="background"
    className="w-full h-full object-cover opacity-20 top-0"
  />
</div> */}


      {/* Hero Section */}
  {/* Hero Section */}
{/* Hero Section */}
<section className="relative min-h-screen flex items-center overflow-hidden">

  {/* 🔥 Background World Map */}
{/* 🔥 Responsive Background World Map */}
{/* 🔥 Responsive Premium Background World Map */}
{/* 🔥 Desktop Right Side Map / Mobile Full */}
<div className="absolute inset-0 -z-10 flex justify-end max-sm:bottom-40">

  {/* Desktop 70% Width */}
  <div className="hidden lg:block w-[70%] h-full">
    <WorldMapSection />
  </div>

  {/* Mobile Full Width */}
  <div className="block lg:hidden w-full h-full relative bottom-20 ">
    <WorldMapSection />
  </div>
  {/* small mobile */}
 
</div>



  {/* Dark overlay for readability */}


  {/* Content Container */}
  <div className="relative z-10 w-full px-6 lg:px-20">

    <div className="grid lg:grid-cols-2 items-center">

      {/* LEFT 40% CONTENT */}
      <div className="max-w-xl max-sm:max-w-lg">

            <h1 className="text-3xl lg:text-4xl font-sn   font-medium mt-4 max-sm:text-2xl">
          Explore The Best USDT Selling Experience with Us!
        </h1>

        <h1 className="text-2xl lg:text-4xl font-sn font-regular mt-4 max-sm:text-xl">
          <span className="text-white">
            <Typewriter
              words={[
                "Instant Bank Transfers",
                "Trusted by 10M+ Users",
                "Secure & Verified Platform",
                "24/7 Customer Support",
                "Best Market Exchange Rates"
              ]}
              loop={0}
              cursor
              cursorStyle="."
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </span>
        </h1>

    

        <p className="text-gray-300 mt-6 leading-relaxed font-sn font-normal text-base">
          Convert your USDT to fiat currency with ease.
          Fast transactions, multiple payment methods,
          and bank-grade security.
        </p>
        {/* usdt rate section  */}
     <div className="mt-8 relative w-full max-w-md">

  {/* Glow background */}
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-2xl opacity-40 rounded-3xl"></div>

  <div className="relative bg-[#0f172a]/80 backdrop-blur-xl 
                  border border-purple-500/20 
                  rounded-3xl 
                  px-7 py-6 
                  shadow-2xl 
                  hover:border-purple-500/40 
                  transition-all duration-300">

    {/* Header */}
    <div className="flex items-center gap-3 mb-3">

      {/* Logo circle */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 
                      flex items-center justify-center shadow-lg">
        <img
          src="https://cryptologos.cc/logos/tether-usdt-logo.png"
          alt="usdt"
          className="w-6 h-6"
        />
      </div>

      <span className="text-sm text-gray-400 tracking-wide">
        Today USDT Price
      </span>
 

    {/* Price */}
    <div className="text-3xl font-bold tracking-tight 
                    bg-gradient-to-r from-green-400 to-emerald-500 
                    bg-clip-text text-transparent">
      {rate ? `₹ ${rate}` : "Loading..."}
    </div>
       </div>

    {/* Subtle underline */}
    <div className="mt-4 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

  </div>
</div>


       <Link
  to="/signup"
  className="inline-block mt-10 px-8 py-3 rounded-full 
             bg-gold-gradient text-black font-semibold
             shadow-lg hover:scale-105 transition-all duration-300"
>
  Start Selling →
</Link>


      </div>

    </div>
  </div>
</section>


   
   {/* Live Markets + News Section */}
<section className="px-6 lg:px-20 py-20">
  <div className="grid lg:grid-cols-2 gap-12 items-start">

    {/* LEFT 50% - Live Markets */}
    <div>
      <LivePrices />
    </div>

    {/* RIGHT 50% - New Section */}
    <div className="">

        <div className="flex justify-between items-center mb-12 relative z-10">
      <h2 className="text-4xl font-bold tracking-wide">Crypto News</h2>

    
    </div>
 <div className="bg-black rounded-2xl p-0 border border-white/10 h-[400px] overflow-hidden">

  {/* Fixed Header */}
  <div className="sticky top-0 z-10 bg-black px-6 py-4 border-b border-white/10">
    <h3 className="text-lg font-semibold">
      Latest Updates
    </h3>
  </div>

  {/* Scrollable Content */}
  <div className="px-6 py-4 overflow-y-auto h-[calc(400px-64px)]">
    <ul className="space-y-3 text-sm text-gray-300">
      {news.length === 0 && <li>No news available</li>}

      {news.map((n, i) => (
        <li key={i} className="border-b border-white/10 pb-2">
          🔹 {n.text}
        </li>
      ))}
    </ul>
  </div>

</div>
</div>

  </div>
</section>


      {/* Why Choose Us */}
      <section className="px-6 lg:px-20 py-20 max-lg:py-12">
        <h3 className="text-3xl font-bold text-center">
          Why Choose Us
        </h3>
        <p className="text-gray-400 text-center mt-2">
          Fast, secure and reliable USDT selling platform
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          
          {/* Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-indigo-500 transition">
            <h4 className="text-xl font-semibold mb-2 text-[#09ABFF]">
              ⚡ Lightning Fast
            </h4>
            <p className="text-gray-300">
              Process your USDT sales within minutes.
              Get your money quickly and efficiently.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-indigo-500 transition">
            <h4 className="text-xl font-semibold mb-2 text-[#09ABFF]">
              🔒 100% Secure
            </h4>
            <p className="text-gray-300">
              Bank-grade security with encrypted
              transactions and secure processing.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-indigo-500 transition">
            <h4 className="text-xl font-semibold mb-2 text-[#09ABFF]">
              🕒 24/7 Support
            </h4>
            <p className="text-gray-300">
              Our admin team reviews and processes
              requests around the clock.
            </p>
          </div>

        </div>
      </section>


      <section className="px-6 lg:px-20 py-20 max-lg:py-12 text-center">

        <h3 className="text-3xl font-bold text-center">
  Trusted by Numbers
</h3>
<p className="text-gray-400 text-center mt-2">
  Real growth, real users, real transactions
</p>

  <div className="grid md:grid-cols-3 gap-10  py-10 max-lg:p">

    {/* Card 1 */}
    <div className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
      <h2 className="text-4xl lg:text-5xl font-bold text-white">
        $<Counter end={200} suffix="M+"/>
      </h2>
      <p className="text-gray-400 mt-2">Total Trades</p>
    </div>

    {/* Card 2 */}
    <div  className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
      <h2 className="text-4xl lg:text-5xl font-bold text-white">
        <Counter end={10} suffix="M+" />
      </h2>
      <p className="text-gray-400 mt-2">Our Users</p>
    </div>

    {/* Card 3 */}
    <div  className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
      <h2 className="text-4xl lg:text-5xl font-bold text-white">
        <Counter end={1.5} suffix="M+" />
      </h2>
      <p className="text-gray-400 mt-2">Daily EVG Exchange</p>
    </div>

  </div>
</section>


      {/* CTA */}
      <section className="px-6 lg:px-20 py-20">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
          <h3 className="text-3xl font-bold">
            Ready to Sell Your USDT?
          </h3>
          <p className="text-gray-300 mt-3">
            Join thousands of users who trust us with
            their crypto transactions.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-6 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition shadow-lg"
          >
            Create Account Now
          </Link>
        </div>
      </section>
     <Footer/>
    </div>
  );
};

export default Home;




