// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";


// function LivePrices() {

//   const initialMarkets = [
//     "BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT",
//     "XRPUSDT","ADAUSDT",
//   ];

//   const [selectedMarkets, setSelectedMarkets] = useState(initialMarkets);
//   const [allMarkets, setAllMarkets] = useState([]);
//   const [prices, setPrices] = useState({});
//   const [history, setHistory] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [search, setSearch] = useState("");

//   // Fetch All Markets
//   useEffect(() => {
//     setAllMarkets([
//       "BTCUSDT","ETHUSDT","BNBUSDT","SOLUSDT","XRPUSDT","ADAUSDT","DOGEUSDT","TRXUSDT",
//       "DOTUSDT","MATICUSDT","LTCUSDT","BCHUSDT","AVAXUSDT","SHIBUSDT","LINKUSDT",
//       "ATOMUSDT","ETCUSDT","XLMUSDT","FILUSDT","APTUSDT","ARBUSDT","OPUSDT",
//       "INJUSDT","NEARUSDT","ALGOUSDT","FTMUSDT","SANDUSDT","AAVEUSDT",
//       "ICPUSDT","GALAUSDT"
//     ]);
//   }, []);

//   // WebSocket Live Data
//   useEffect(() => {
//     if (selectedMarkets.length === 0) return;

//     const streams = selectedMarkets
//       .map((s) => s.toLowerCase() + "@ticker")
//       .join("/");

//     const ws = new WebSocket(
//       `wss://stream.binance.com:9443/stream?streams=${streams}`
//     );

//     ws.onmessage = (event) => {
//       const msg = JSON.parse(event.data);
//       const data = msg.data;

//       const symbol = data.s;
//       const price = parseFloat(data.c);
//       const percent = parseFloat(data.P);

//       setPrices((prev) => ({
//         ...prev,
//         [symbol]: { price, percent },
//       }));

//       setHistory((prev) => {
//         const prevArr = prev[symbol] || [];
//         const newArr = [...prevArr.slice(-20), price];
//         return { ...prev, [symbol]: newArr };
//       });
//     };

//     return () => ws.close();
//   }, [selectedMarkets]);

//   const getLogo = (symbol) => {
//     const coin = symbol.replace("USDT", "").toLowerCase();
//     return `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin}.png`;
//   };

//   const renderChart = (symbol) => {
//     const data = history[symbol] || [];
//     if (data.length < 2) return null;

//     const max = Math.max(...data);
//     const min = Math.min(...data);

//     const points = data
//       .map((price, i) => {
//         const x = (i / (data.length - 1)) * 100;
//         const y = 30 - ((price - min) / (max - min || 1)) * 30;
//         return `${x},${y}`;
//       })
//       .join(" ");

//     const isUp = prices[symbol]?.percent >= 0;

//     return (
//       <svg width="100%" height="40" viewBox="0 0 100 30">
//         <polyline
//           fill="none"
//           stroke={isUp ? "#22c55e" : "#ef4444"}
//           strokeWidth="2"
//           points={points}
//         />
//       </svg>
//     );
//   };

//   return (
//     <div className="relative px-6 py-10 overflow-hidden max-sm:px-0 max-md:py-5 ">

//       {/* Header */}
//     <motion.div
//           initial={{ opacity: 0, y: 80 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{
//         duration: 0.8,
//         ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
//       }}
//       viewport={{
//         once: true,
//         amount: 0.4, // 🔥 40% visible pe trigger
//       }}
    
//     className="relative z-10 mb-14 max-sm:mb-6 max-md:flex max-md:flex-col-reverse max-md:mb-6">

//   {/* Button Right Side */}
//   <div className="absolute right-0 top-0 max-md:relative max-md:flex max-md:justify-end max-md:items-end max-md:text-end max-md:mt-6">
//     <button
//       onClick={() => setShowModal(true)}
//       className="px-6 py-3 rounded-full bg-gold-gradient
//                  text-black font-semibold shadow-xl hover:scale-105  
//                  transition-all duration-300 max-md:px-4 max-md:py-2 max-md:text-[12px]"
//     >
//       All Markets →
//     </button>
//   </div>

//   {/* Center Content */}
//   <div className="text-center">
//     <h2 className="text-5xl font-bold tracking-tight text-white max-md:text-[2rem]">
//      Current Markets
//     </h2>

//     <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto block italic font-light 
//       bg-gradient-to-r from-yellow-400 to-blue-400 
//       bg-clip-text text-transparent max-md:text-[1rem]">
//       Track real-time cryptocurrency prices market insights.
//     </p>
//   </div>

// </motion.div>

//       {/* Cards */}
//       <motion.div
//                initial={{ opacity: 0, y: 80 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{
//         duration: 0.8,
//         ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
//       }}
//       viewport={{
//         once: true,
//         amount: 0.4, // 🔥 40% visible pe trigger
//       }}
//       className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-sm:grid-cols-2">
//         {selectedMarkets.map((symbol) => {
//           const market = prices[symbol];
//           const isUp = market?.percent >= 0;

//           return (
//             <div
//               key={symbol}
//               className="bg-[#0b1220] border border-white/10 rounded-2xl p-6 max-sm:p-3 
//                          hover:scale-[1.04] transition duration-300 shadow-xl"
//             >
//               <div className="flex justify-between items-center mb-5 max-md:mb-3">
//                 <div className="flex items-center gap-3 max-sm:gap-1">
//                   <img
//                     src={getLogo(symbol)}
//                     alt="logo"
//                     className="w-9 h-9 max-sm:w-6 max-sm:h-6"
//                   />
//                   <h3 className="text-lg max-sm:text-sm font-semibold text-white">
//                     {symbol.replace("USDT", "")}
//                   </h3>
//                 </div>

//                 <span className={`text-xs px-3 py-1 rounded-full font-semibold max-sm:text-[8px] 
//                   ${isUp 
//                     ? "bg-green-500/10 text-green-400 border border-green-500/20" 
//                     : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
//                   {isUp ? "Bullish" : "Bearish"}
//                 </span>
//               </div>

//               <div className="text-3xl font-bold text-white mb-2 max-sm:text-xl">
//                 ${market?.price?.toFixed(2) || "..."}
//               </div>

//               <div className={`text-sm font-semibold mb-4 max-sm:text-[10px] max-md:mb-2 ${
//                 isUp ? "text-green-400" : "text-red-400"
//               }`}>
//                 {isUp ? "▲" : "▼"} {market?.percent?.toFixed(2) || "0.00"}%
//               </div>

//               {renderChart(symbol)}
//             </div>
//           );
//         })}
//       </motion.div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//           <div className="bg-[#0f172a] w-full max-w-2xl rounded-2xl p-6 border border-white/10 shadow-2xl">

//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-2xl font-bold text-white">All Markets</h3>
//               <button onClick={() => setShowModal(false)}>✕</button>
//             </div>

//             <input
//               type="text"
//               placeholder="Search market..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 outline-none text-white"
//             />

//             <div className="max-h-96 overflow-y-auto space-y-2">
//               {allMarkets
//                 .filter((symbol) =>
//                   symbol.toLowerCase().includes(search.toLowerCase())
//                 )
//                 .map((symbol) => (
//                   <div
//                     key={symbol}
//                     onClick={() => {
//                       setSelectedMarkets((prev) => {
//                         const updated = [symbol, ...prev.slice(0, 7)];
//                         return [...new Set(updated)];
//                       });
//                       setShowModal(false);
//                     }}
//                     className="flex justify-between items-center p-3 bg-white/5 hover:bg-indigo-600 rounded-lg cursor-pointer transition"
//                   >
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={getLogo(symbol)}
//                         alt="logo"
//                         className="w-6 h-6"
//                       />
//                       <span className="text-white">{symbol}</span>
//                     </div>

//                     <span className="text-white">
//                       ${prices[symbol]?.price?.toFixed(2) || "..."}
//                     </span>
//                   </div>
//                 ))}
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LivePrices;
























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