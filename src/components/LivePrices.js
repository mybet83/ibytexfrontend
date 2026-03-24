import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LivePrices() {

  const popularMarkets = [
    "BTCUSDT","ETHUSDT","BNBUSDT",
    "SOLUSDT","XRPUSDT",
  ];

  const newMarkets = [
    "DOGEUSDT","TRXUSDT","AVAXUSDT",
    "SHIBUSDT","LINKUSDT","MATICUSDT",
  ];

  const [activeTab, setActiveTab] = useState("popular");
  const [prices, setPrices] = useState({});
  const [showModal, setShowModal] = useState(false);

  const selectedMarkets =
    activeTab === "popular" ? popularMarkets : newMarkets;

  // Binance WebSocket
  useEffect(() => {
    const streams = selectedMarkets
      .map((s) => s.toLowerCase() + "@ticker")
      .join("/");

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const data = msg.data;

      const symbol = data.s;
      const price = parseFloat(data.c);
      const percent = parseFloat(data.P);

      setPrices((prev) => ({
        ...prev,
        [symbol]: { price, percent },
      }));
    };

    return () => ws.close();
  }, [activeTab]);

  const getLogo = (symbol) => {
    const coin = symbol.replace("USDT", "").toLowerCase();
    return `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin}.png`;
  };

  return (
    <div className="w-full max-w-[420px]">

      <div className="
        backdrop-blur-2xl
        bg-white/5
        border border-white/10
        rounded-3xl
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
      ">

        {/* Header Tabs */}
        <div className="flex justify-between items-center mb-3">

          <div className="relative flex gap-6 text-sm font-medium">

            <button
              onClick={() => setActiveTab("popular")}
              className={`relative pb-2 transition ${
                activeTab === "popular"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Popular
              {activeTab === "popular" && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute left-0 right-0 -bottom-0.5 h-[3px] bg-yellow-400 rounded-full"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("new")}
              className={`relative pb-2 transition ${
                activeTab === "new"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              New Listing
              {activeTab === "new" && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute left-0 right-0 -bottom-0.5 h-[3px] bg-yellow-400 rounded-full"
                />
              )}
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="text-yellow-400 text-sm hover:underline"
          >
            View All →
          </button>
        </div>

        {/* Market List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
        {selectedMarkets.map((symbol) => {
  const market = prices[symbol];
  const isUp = market?.percent >= 0;

  return (
    <div
      key={symbol}
      className="
        grid grid-cols-3 items-center
        py-3 px-2
      
        hover:bg-white/5
        rounded-lg
        transition
      "
    >

      {/* LEFT - Coin */}
      <div className="flex items-center gap-3">
        <img
          src={getLogo(symbol)}
          alt=""
          className="w-8 h-8"
        />
        <div>
          <p className="text-white font-semibold text-sm">
            {symbol.replace("USDT", "")}
          </p>
          <p className="text-gray-400 text-xs">
            {symbol}
          </p>
        </div>
      </div>

      {/* MIDDLE - Price */}
      <div className="text-end">
        <p className="text-white font-semibold text-sm">
          ${market?.price?.toFixed(2) || "..."}
        </p>
      </div>

      {/* RIGHT - % Change */}
      <div className="text-right">
        <p
          className={`text-sm font-medium ${
            isUp ? "text-green-400" : "text-red-400"
          }`}
        >
          {isUp ? "+" : ""}
          {market?.percent?.toFixed(2) || "0.00"}%
        </p>
      </div>

    </div>
  );
})}

{showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    
    <div className="bg-black w-full max-w-2xl rounded-2xl p-6 border border-white/10 shadow-2xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">
          All Markets
        </h3>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Market List */}
      <div className="max-h-96 overflow-y-auto">

        {[
          ...popularMarkets,
          ...newMarkets
        ].map((symbol) => {
          const market = prices[symbol];
          const isUp = market?.percent >= 0;

          return (
            <div
              key={symbol}
              className="flex justify-between items-center py-3 px-2 hover:bg-white/5 rounded-lg transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={getLogo(symbol)}
                  alt=""
                  className="w-7 h-7"
                />
                <span className="text-white text-sm">
                  {symbol}
                </span>
              </div>

              <div className="text-right">
                <p className="text-white text-sm">
                  ${market?.price?.toFixed(2) || "..."}
                </p>
                <p className={`text-xs ${
                  isUp ? "text-green-400" : "text-red-400"
                }`}>
                  {isUp ? "+" : ""}
                  {market?.percent?.toFixed(2) || "0.00"}%
                </p>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  </div>
)}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

export default LivePrices;