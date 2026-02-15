import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import WorldMap from "../components/WorldMap";
import Navbar from "../components/Navbar";

const API = process.env.REACT_APP_API_URL;

const Finalpage = () => {
  const [rate, setRate] = useState(0);
  const [usdt, setUsdt] = useState("");
  const [news, setNews] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchRate = async () => {
    try {
      const res = await axios.get(`${API}/admin/rate`);
      setRate(res.data.rate || 0);
    } catch (err) {
      console.error("Rate fetch failed");
    }
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRate();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalAmount = usdt ? (usdt * rate).toFixed(2) : "--";

  return (
  <div className="min-h-screen bg-black text-white relative overflow-hidden">

  {/* MAIN NAVBAR */}
  <Navbar />


  {/* HERO SECTION */}
{/* HERO SECTION PREMIUM */}
<section className="relative min-h-screen flex items-center overflow-hidden px-6 lg:px-20 z-40">

  {/* WORLD MAP BACKGROUND */}
  <div className="absolute inset-0 -z-10 flex justify-end max-sm:bottom-40">

    {/* Desktop 70% Width */}
    <div className="hidden lg:block w-[70%] h-full">
      <WorldMap />
    </div>

    {/* Mobile Full Width */}
    <div className="block lg:hidden w-full h-full relative bottom-20">
      <WorldMap />
    </div>

  </div>

  {/* LEFT CONTENT */}
  <div className="relative z-20 max-w-2xl">

    <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
      Welcome Back,{" "}
      <span className="text-yellow-400">
        {user?.name || "Trader"}
      </span>{" "}
      👋
    </h1>

    <h2 className="mt-6 text-3xl lg:text-5xl font-bold">
      Start Trading Instantly
    </h2>

    <p className="mt-6 text-gray-400 max-w-lg">
      Manage your USDT transactions, monitor live prices and trade securely
      on Ibytex Exchange.
    </p>
      
   <div className="mt-8 w-fit bg-[#181a20]/90 backdrop-blur-xl px-8 py-5 rounded-2xl border border-white/10 shadow-xl">
    <p className="text-gray-400 text-sm">Today USDT Price</p>
    <p className="text-3xl font-bold text-green-400">
      ₹ {rate || "Loading..."}
    </p>
  </div>
  </div>
      
      {/* BOTTOM CENTER SECTION */}
<div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6">

  {/* Live Price Card */}


  {/* Start Trading Button */}
  <div className="flex gap-4"> 
  <button
    onClick={() => navigate("/userorder")}
    className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:scale-105 transition shadow-lg"
  >
    Start Trading →
  </button>

  {/* View Orders Button */}
  <button
    onClick={() => navigate("/myorder")}
    className="px-8 py-3 border border-white/20 rounded-full hover:bg-white/10 transition"
  >
    View Orders
  </button>
  </div>

</div>

</section>
  



      {/* CALCULATOR SECTION */}
      <section className="py-20 px-6 lg:px-20 bg-gradient-to-b from-black to-[#111827]">
        <div className="max-w-6xl mx-auto">

          <div className="bg-[#181a20] rounded-2xl p-10 border border-gray-800 shadow-xl">

            <h2 className="text-3xl font-bold mb-2">
              Calculate Your USDT Value
            </h2>
            <p className="text-gray-400 mb-8">
              Instant & Secure Selling Calculator
            </p>

            <div className="grid md:grid-cols-3 gap-6">

              <div>
                <label className="text-sm text-gray-400">USDT Quantity</label>
                <input
                  type="number"
                  value={usdt}
                  onChange={(e) => setUsdt(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Today Rate
                </label>
                <div className="mt-2 px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700">
                  ₹ {rate}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  You Receive
                </label>
                <div className="mt-2 px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 font-semibold text-green-400">
                  ₹ {totalAmount}
                </div>
              </div>

            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigate("/userorder")}
                className="flex-1 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition"
              >
                Sell USDT
              </button>

              <button
                onClick={() => navigate("/myorder")}
                className="flex-1 py-3 rounded-lg border border-white/20 hover:bg-white/10 font-semibold transition"
              >
                My Orders
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="py-16 px-6 lg:px-20 bg-black">
        <div className="max-w-5xl mx-auto bg-[#181a20] rounded-2xl p-8 border border-gray-800">

          <h3 className="text-xl font-semibold mb-6 text-yellow-400">
            Latest Crypto News
          </h3>

          <ul className="space-y-4 text-gray-300 text-sm max-h-[300px] overflow-y-auto">
            {news.length === 0 && <li>No news available</li>}

            {news.map((n, i) => (
              <li key={i} className="border-b border-gray-700 pb-2">
                🔹 {n.text}
              </li>
            ))}
          </ul>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Finalpage;
