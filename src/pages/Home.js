"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Counter from "../components/Counter";
import LivePrices from "../components/LivePrices";
import Navbar from "../components/Navbar";
import CryptoLogos from "../components/CryptoLogos";
import HeroSequence from "../components/HeroSequence";
import WorldMapSection from "../components/WorldMapSection";




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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalAmount = usdt ? (usdt * rate).toFixed(2) : "--";

  return (
    <div className=" relative z-10 min-h-screen bg-gradient-to-br bg-black text-white">
      <Navbar />
     
      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div className="absolute inset-0 -z-10 flex justify-end max-sm:bottom-40">
          {/* Desktop 70% Width */}
          <div className="hidden lg:block w-[70%] h-full">

  <WorldMapSection />


          </div>

          {/* Mobile Full Width */}
          <div className="block lg:hidden w-full h-full relative bottom-20 ">

  <WorldMapSection />


          </div>

        </div>



        {/* Content Container */}
        <div className="relative z-10 w-full px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 items-center">
            {/* LEFT 40% CONTENT */}
            <div className="max-w-xl max-sm:max-w-lg">
              <div className="relative min-h-[180px]"> 
                <HeroSequence/>
                </div>
              {/* usdt rate section  */}
              <div className="mt-8 relative w-full max-w-md">
                {/* Glow background */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-2xl opacity-40 rounded-3xl"></div>

                <div
                  className="relative bg-[#0f172a]/80 backdrop-blur-xl 
                  border border-purple-500/20 
                  rounded-3xl 
                  px-7 py-6 
                  shadow-2xl 
                  hover:border-purple-500/40 
                  transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* Logo circle */}
                    <div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 
                      flex items-center justify-center shadow-lg"
                    >
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
                    <div
                      className="text-3xl font-bold tracking-tight 
                    bg-gradient-to-r from-green-400 to-emerald-500 
                    bg-clip-text text-transparent"
                    >
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
          <div  >
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
                <h3 className="text-lg font-semibold">Latest Updates</h3>
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

      <CryptoLogos />

      {/* Why Choose Us */}
    <section className="px-6 lg:px-20 py-20 bg-black relative overflow-hidden">
  
  {/* Background Glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 blur-3xl opacity-40"></div>

  <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

    {/* LEFT - Team Image */}
    <div className="relative group">
      <img
        src="/person.png"   // 👈 rename your uploaded image to team.jpg
        alt="iBytex Team"
        className="rounded-2xl shadow-2xl border border-white/10"
      />

      {/* Overlay Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/10 to-purple-500/10"></div>
    </div>

    {/* RIGHT - Content */}
    <div>
      <h3 className="text-4xl font-bold mb-4 bg-[linear-gradient(135deg,#FFD700_0%,#00BFFF_100%)] bg-clip-text text-transparent">
        Why Choose iBytex?
      </h3>

      <p className="text-gray-400 mb-8 leading-7">
        Backed by a professional financial team and a secure infrastructure,
        iBytex ensures fast USDT transactions with full transparency and
        reliability.
      </p>

      <div className="space-y-6">

        <div className="flex gap-4 items-start">
          <div className="text-2xl">⚡</div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Lightning Fast Processing
            </h4>
            <p className="text-gray-400 text-sm">
              Orders processed within minutes with instant confirmations.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="text-2xl">🔒</div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Bank-Grade Security
            </h4>
            <p className="text-gray-400 text-sm">
              Encrypted transactions, AML compliance & secure wallet systems.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="text-2xl">🌍</div>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Global Trusted Platform
            </h4>
            <p className="text-gray-400 text-sm">
              Serving thousands of verified users worldwide.
            </p>
          </div>
        </div>

          <div className="flex gap-4 items-start">
    <div className="text-2xl">💬</div>
    <div>
      <h4 className="text-lg font-semibold text-white">
        24/7 Dedicated Customer Support
      </h4>
      <p className="text-gray-400 text-sm">
        Our professional support team is available around the clock to assist you with transactions, verification, and queries.
      </p>
    </div>
  </div>

</div>

      </div>
    </div>

  



</section>


      <section className="px-6 lg:px-20 py-20 max-lg:py-12 text-center">
        <h3 className="text-3xl font-bold text-center">Trusted by Numbers</h3>
        <p className="text-gray-400 text-center mt-2">
          Real growth, real users, real transactions
        </p>

        <div className="grid md:grid-cols-3 gap-10  py-10 max-lg:p">
          {/* Card 1 */}
          <div className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              $<Counter end={200} suffix="M+" />
            </h2>
            <p className="text-gray-400 mt-2">Total Trades</p>
          </div>

          {/* Card 2 */}
          <div className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              <Counter end={10} suffix="M+" />
            </h2>
            <p className="text-gray-400 mt-2">Our Users</p>
          </div>

          {/* Card 3 */}
          <div className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
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
          <h3 className="text-3xl font-bold">Ready to Sell Your USDT?</h3>
          <p className="text-gray-300 mt-3">
            Join thousands of users who trust us with their crypto transactions.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-6 px-8 py-3 rounded-full bg-gold-gradient text-black font-semibold transition shadow-lg"
          >
            Create Account Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
