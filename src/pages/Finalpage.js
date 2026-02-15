import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import Footer from "../components/Footer";
import WorldMap from "../components/WorldMap";
import Navbar from "../components/Navbar";
import CryptoLogos from "../components/CryptoLogos";
import LivePrices from "../components/LivePrices";
import Counter from "../components/Counter";

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
          <h1 className="text-4xl lg:text-4xl font-bold leading-tight">
            Welcome Back,{" "}
            <span className="text-yellow-400">{user?.name || "Trader"}</span> 👋
          </h1>

          <h2 className="mt-6 text-3xl lg:text-3xl font-bold">
            Start Trading Instantly
          </h2>

          <p className="mt-6 text-gray-400 max-w-lg text-base">
            Manage your USDT transactions, monitor live prices and trade
            securely on Ibytex Exchange.
          </p>

          <div
            className="relative bg-[#0f172a]/80 backdrop-blur-xl 
                  border border-purple-500/20 
                  rounded-3xl 
                  px-7 py-6 
                  shadow-2xl 
                  hover:border-purple-500/40 
                  transition-all duration-300 w-[70%] mt-6 max-lg:w-[70%] max-sm:w-[90%]"
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

        {/* BOTTOM CENTER SECTION */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6">
          {/* Live Price Card */}

          {/* Start Trading Button */}
          <div
            className="flex flex-col md:flex-row gap-4 mt-6 w-full 
                items-end md:items-start"
          >
            <button
              onClick={() => navigate("/userorder")}
              className="w-full md:w-auto px-8 py-3 bg-yellow-400 text-black 
               font-semibold rounded-full hover:scale-105 
               transition shadow-lg"
            >
              Sell USDT Now →
            </button>

            <button
              onClick={() => navigate("/myorder")}
              className="w-full md:w-auto px-8 py-3 border border-white/20 
               rounded-full hover:bg-white/10 transition"
            >
              View Orders History
            </button>
          </div>
        </div>
      </section>

      {/* CALCULATOR SECTION */}
      {/* CALCULATOR + NEWS SECTION */}
      <section className="py-20 px-6 lg:px-20 ">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* LEFT – CALCULATOR */}
          <div className="bg-[#181a20] rounded-2xl p-8 border border-gray-800 shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-yellow-400">
              Calculate Your USDT Value
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Instant & Secure Selling Calculator
            </p>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-400">USDT Quantity</label>
                <input
                  type="number"
                  placeholder="Minimum 1 USDT"
                  value={usdt}
                  onChange={(e) => setUsdt(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Today Rate</label>
                <div className="mt-2 px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700">
                  ₹ {rate}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">You Receive</label>
                <div className="mt-2 px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 font-semibold text-green-400">
                  ₹ {totalAmount}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
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

          {/* RIGHT – NEWS */}
          <div className="bg-[#181a20] rounded-2xl p-8 border border-gray-800 shadow-xl">
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">
              Today Crypto News
            </h3>
            <p className="text-base  text-center text-gray-400 opacity-0 max-md:opacity-100">
              Scroll For More News ⬇
            </p>

            <ul className="space-y-4 text-gray-300 text-sm max-h-[350px] overflow-y-auto pr-2">
              {news.length === 0 && <li>No news available</li>}

              {news.map((n, i) => (
                <li key={i} className="border-b border-gray-700 pb-3">
                  🔹 {n.text}
                </li>
              ))}
            </ul>
            <p className="text-base  text-center text-yellow-400 max-md:hidden ">
              Scroll For More News ⬆
            </p>
          </div>
        </div>
      </section>

      <CryptoLogos />

        <div className="relative px-20 py-20 max-lg:px-5 " >
            <LivePrices />
          </div>
                  
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

                <section className="px-6 lg:px-20 py-20">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-black/20 text-center">
                    <h3 className="text-3xl font-bold">Ready to Sell Your USDT?</h3>
                    <p className="text-gray-300 mt-3">
                      Join thousands of users who trust us with their crypto transactions.
                    </p>
          
                    <Link
                      to="/userorder"
                      className="inline-block mt-6 px-12 py-3 rounded-full  bg-gold-gradient text-black font-semibold"
                    >
                     Sell USDT Now
                    </Link>
                  </div>
                </section>

            

      <Footer />
    </div>
  );
};

export default Finalpage;
