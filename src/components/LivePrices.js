import React, { useEffect, useState } from "react";

function LivePrices() {

  const initialMarkets = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "SOLUSDT",
   
  ];

  const [selectedMarkets, setSelectedMarkets] = useState(initialMarkets);
  const [allMarkets, setAllMarkets] = useState([]);
  const [prices, setPrices] = useState({});
  const [history, setHistory] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // 🔥 Fetch All Binance USDT Markets
useEffect(() => {
  setAllMarkets([
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "SOLUSDT",
    "XRPUSDT",
    "ADAUSDT",
    "DOGEUSDT",
    "TRXUSDT",
    "DOTUSDT",
    "MATICUSDT",
    "LTCUSDT",
    "BCHUSDT",
    "AVAXUSDT",
    "SHIBUSDT",
    "LINKUSDT",
    "ATOMUSDT",
    "ETCUSDT",
    "XLMUSDT",
    "FILUSDT",
    "APTUSDT",
    "ARBUSDT",
    "OPUSDT",
    "INJUSDT",
    "NEARUSDT",
    "ALGOUSDT",
    "FTMUSDT",
    "SANDUSDT",
    "AAVEUSDT",
    "ICPUSDT",
    "GALAUSDT"
  ]);
}, []);

  // 🔥 WebSocket Live Data
  useEffect(() => {
    if (selectedMarkets.length === 0) return;

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

      setHistory((prev) => {
        const prevArr = prev[symbol] || [];
        const newArr = [...prevArr.slice(-20), price];
        return { ...prev, [symbol]: newArr };
      });
    };

    return () => ws.close();
  }, [selectedMarkets]);

const getLogo = (symbol) => {
  const coin = symbol.replace("USDT", "").toLowerCase();
  return `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin}.png`;
};



  const renderChart = (symbol) => {
    const data = history[symbol] || [];
    if (data.length < 2) return null;

    const max = Math.max(...data);
    const min = Math.min(...data);

    const points = data
      .map((price, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 30 - ((price - min) / (max - min)) * 30;
        return `${x},${y}`;
      })
      .join(" ");

    const isUp = prices[symbol]?.percent >= 0;

    return (
      <svg width="100%" height="40" viewBox="0 0 100 30">
        <polyline
          fill="none"
          stroke={isUp ? "#22c55e" : "#ef4444"}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

 return (
<div className="px-6  relative overflow-hidden">
  
  {/* Soft Radial Background */}
  <div className="absolute inset-0  pointer-events-none"></div>


    {/* Header */}
    <div className="flex justify-between items-center mb-12 relative z-10">
      <h2 className="text-4xl font-bold tracking-wide">Live Markets</h2>

      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition shadow-lg shadow-purple-600/30"
      >
       All Markets
      </button>
    </div>

    {/* Main Cards */}
    {/* Main Cards */}

  <div className="grid lg:grid-cols-2 gap-12 items-start">

   {selectedMarkets.map((symbol) => {
  const market = prices[symbol];
  const isUp = market?.percent >= 0;

  return (
    <div
      key={symbol}
      className="bg-[#0f172a] border border-white/5 rounded-xl p-5 shadow-lg hover:border-purple-500/40 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={getLogo(symbol)}
          alt="logo"
          className="w-7 h-7"
        />
        <h3 className="text-base font-semibold">
          {symbol.replace("USDT", "")}
        </h3>
      </div>

      <div className="text-xl font-bold mb-1">
        ${market?.price?.toFixed(2) || "..."}
      </div>

      <div
        className={`text-xs font-semibold mb-3 ${
          isUp ? "text-green-400" : "text-red-400"
        }`}
      >
        {isUp ? "▲" : "▼"} {market?.percent?.toFixed(2) || "0.00"}%
      </div>

      {renderChart(symbol)}
    </div>
  );
})}

    </div>

    {/* Bottom Small Markets Row */}



      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 w-full max-w-2xl rounded-2xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">All Markets</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <input
              type="text"
              placeholder="Search market..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 outline-none"
            />

            <div className="max-h-96 overflow-y-auto space-y-2">
              {allMarkets
                .filter((symbol) =>
                  symbol.toLowerCase().includes(search.toLowerCase())
                )
                .map((symbol) => (
                  <div
                    key={symbol}
                    onClick={() => {
                      setSelectedMarkets((prev) => {
                        const updated = [symbol, ...prev.slice(0, 5)];
                        return [...new Set(updated)];
                      });
                      setShowModal(false);
                    }}
                    className="flex justify-between items-center p-3 bg-white/5 hover:bg-indigo-600 rounded-lg cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getLogo(symbol)}
                        alt="logo"
                        className="w-6 h-6"
                      />
                      <span>{symbol}</span>
                    </div>

                    <span>
                      ${prices[symbol]?.price?.toFixed(2) || "..."}
                    </span>
                  </div>
                ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default LivePrices;
