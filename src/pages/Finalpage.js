import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderUserMenu from "../components/HeaderUserMenu";


const API = process.env.REACT_APP_API_URL;

const Finalpage = () => {
  const [rate, setRate] = useState(0);
  const [usdt, setUsdt] = useState("");
  const [news, setNews] = useState([]);

  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white">

      {/* NAVBAR */}
      <header className="flex justify-between items-center px-6 py-2 backdrop-blur-sm sticky top-0 z-50">
        <img src="/logot.png" alt="logo" className="w-28" />
        <HeaderUserMenu />
      </header>

      {/* HERO SECTION */}
      <section className="min-h-full w-full flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Welcome{" "}
              <span className="text-indigo-400">
                {JSON.parse(localStorage.getItem("user"))?.name || "Trader"}
              </span>
              👋
            </h1>

            <h2 className="mt-6 text-3xl md:text-4xl font-bold">
              ByteX Crypto Exchange
            </h2>

            <p className="mt-4 text-lg text-gray-300">
              Trusted USDT Seller & Buyer Platform
            </p>

            <p className="mt-3 text-gray-400 max-w-lg">
              Buy and Sell USDT instantly with secure transactions,
              real-time pricing, and manual verification for maximum safety.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/userorder")}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition shadow-lg"
              >
                Start Trading
              </button>

              <button
                onClick={() => navigate("/myorder")}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition"
              >
                View Orders
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
            <h3 className="text-xl font-semibold mb-6 text-indigo-400">
              Live Market Overview
            </h3>

            <div className="space-y-6">
              <div className="flex justify-between">
                <span className="text-gray-400">USDT Price</span>
                <span className="text-green-400 font-bold text-lg">
                  {rate ? `₹ ${rate}` : "Loading..."}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Liquidity</span>
                <span className="font-semibold">High</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Transactions</span>
                <span className="font-semibold">Instant</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Security</span>
                <span className="text-indigo-400 font-semibold">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR + NEWS */}
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-6xl mx-auto w-full space-y-12">

          {/* CALCULATOR */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
            <h2 className="text-2xl font-bold mb-2">
              Calculate How Much Price You Get
            </h2>

            <p className="text-gray-300 mb-6">
              Instant & Secure USDT Selling
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm text-gray-300">USDT Quantity</label>
                <input
                  type="number"
                  value={usdt}
                  onChange={(e) => setUsdt(e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">
                  Today Rate 1 USDT (₹)
                </label>
                <div className="mt-2 px-4 py-3 rounded-lg bg-black/40 border border-gray-600">
                  ₹ {rate}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">
                  You Receive Amount
                </label>
                <div className="mt-2 px-4 py-3 rounded-lg bg-black/40 border border-gray-600 font-semibold text-green-400">
                  ₹ {totalAmount}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigate("/userorder")}
                className="flex-1 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold transition"
              >
                Sell USDT
              </button>

              <button
                onClick={() => navigate("/myorder")}
                className="flex-1 py-3 rounded-lg bg-white/10 hover:bg-white/20 font-semibold transition"
              >
                My Orders
              </button>
            </div>
          </div>

          {/* NEWS */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 h-[400px] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              Crypto News
            </h3>

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

      <Footer />
    </div>
  );
};

export default Finalpage;
