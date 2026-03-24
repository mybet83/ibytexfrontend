// import {
//   AreaChart,
//   Area,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { useEffect, useState } from "react";

// export default function UsdtGraph({ liveRate }) {
//   const [chartData, setChartData] = useState([]);
//   const [realPrice, setRealPrice] = useState(0);

//   /* ================= INIT ================= */
//   useEffect(() => {
//     if (!liveRate) return;

//     const base = Number(liveRate);

// const initial = [];
// let tempPrice = base;

// // 🔥 fake past market generate karo
// for (let i = 0; i < 40; i++) {
//   // small realistic movement
//   let change = (Math.random() - 0.5) * 1.2;

//   // kabhi kabhi spike
//   if (Math.random() < 0.2) {
//     change += (Math.random() - 0.5) * 3;
//   }

//   tempPrice += change;

//   // soft clamp
//   if (tempPrice > base + 2) tempPrice = base + 2;
//   if (tempPrice < base - 2) tempPrice = base - 2;

//   // 🔥 amplify for graph
//   const multiplier = 40;
//   const visual =
//     base + (tempPrice - base) * multiplier;

//   initial.push({
//     time: i,
//     price: Number(visual.toFixed(2)),
//   });
// }

//     setChartData(initial);
//     setRealPrice(base);
//   }, [liveRate]);

//   /* ================= REAL LOGIC + AMPLIFICATION ================= */
//   useEffect(() => {
//     if (!liveRate) return;

//     const base = Number(liveRate);

//     let trend = Math.random() > 0.5 ? 1 : -1;

// const interval = setInterval(() => {
//   setChartData((prev) => {
//     if (!prev.length) return prev;

//     let lastReal = realPrice || base;

//     // REAL SMALL CHANGE
//     let realChange = (Math.random() - 0.5) * 0.8;

//     let newReal = lastReal + realChange;

//     if (newReal > base + 2) newReal = base + 2;
//     if (newReal < base - 2) newReal = base - 2;

//     const multiplier = 40;

//     const visualPrice =
//       base + (newReal - base) * multiplier;

//     setRealPrice(newReal);

//     // 🔥 COPY OLD DATA
//     const updated = [...prev];

//     // 🔥 ONLY LAST POINT CHANGE (snake head 🐍)
//     updated[updated.length - 1] = {
//       ...updated[updated.length - 1],
//       price: Number(visualPrice.toFixed(2)),
//     };

//     return updated;
//   });
// }, 600);

//     return () => clearInterval(interval);
//   }, [liveRate, realPrice]);

//   return (
//     <div className="mt-6 w-full max-w-[500px]">
//       <div className="bg-[#191D23] border border-white/10 rounded-2xl p-5">

//         {/* HEADER */}
//         <div className="flex justify-between mb-3">
//           <h2 className="text-white text-sm">Live USDT Trend</h2>
//           <span className="text-xs text-gray-400">Real Time</span>
//         </div>

//         {/* CHART */}
//         <ResponsiveContainer width="100%" height={200}>
//    <AreaChart
//   data={[
//     ...chartData,
//     ...Array(10).fill({ price: null }) // 👈 empty future space
//   ]}
// >

//             <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

//             <defs>
//               <linearGradient id="figmaGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6} />
//                 <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
//               </linearGradient>
//             </defs>

//             <XAxis hide />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#020617",
//                 border: "1px solid #1f2937",
//                 borderRadius: "10px",
//               }}
//               formatter={(value) => [`₹ ${value}`, "Visual"]}
//             />

//             <Area
//               type="monotone" // 🔥 figma smooth curve
//               dataKey="price"
//               stroke="#22c55e"
//               strokeWidth={3}
//               fill="url(#figmaGradient)"
//               dot={false} // figma style clean
//             />
//           </AreaChart>
//         </ResponsiveContainer>

//         {/* REAL PRICE */}
//         <div className="mt-3 flex justify-between">
//           <span className="text-xs text-gray-400">Current Price</span>
//           <span className="text-xl font-bold text-emerald-400">
//             ₹ {realPrice.toFixed(2)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
























import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";

export default function UsdtGraph({ liveRate , theme }) {
  const [chartData, setChartData] = useState([]);
  const [realPrice, setRealPrice] = useState(0);

  /* ================= INIT ================= */
  useEffect(() => {
    if (!liveRate) return;

    const base = Number(liveRate);

    let tempPrice = base;
    const initial = [];

    // 🔥 realistic past data
    for (let i = 0; i < 40; i++) {
      let change = (Math.random() - 0.5) * 1.2;

      if (Math.random() < 0.2) {
        change += (Math.random() - 0.5) * 3;
      }

      tempPrice += change;

      if (tempPrice > base + 2) tempPrice = base + 2;
      if (tempPrice < base - 2) tempPrice = base - 2;

      const multiplier = 40;
      const visual = base + (tempPrice - base) * multiplier;

      initial.push({
        time: i,
        price: Number(visual.toFixed(2)),
      });
    }

    setChartData(initial);
    setRealPrice(base);
  }, [liveRate]);

  /* ================= LIVE ENGINE ================= */
  useEffect(() => {
    if (!liveRate) return;

    const base = Number(liveRate);

    const interval = setInterval(() => {
      setChartData((prev) => {
        if (!prev.length) return prev;

        let lastReal = realPrice || base;

        let change = (Math.random() - 0.5) * 0.8;
        let newReal = lastReal + change;

        if (newReal > base + 2) newReal = base + 2;
        if (newReal < base - 2) newReal = base - 2;

        const multiplier = 40;
        const visual =
          base + (newReal - base) * multiplier;

        setRealPrice(newReal);

        // 🐍 only head moves
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          price: Number(visual.toFixed(2)),
        };

        return updated;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [liveRate, realPrice]);

  /* ================= TREND ================= */
  const isUp =
    chartData.length > 1 &&
    chartData[chartData.length - 1]?.price >
      chartData[chartData.length - 2]?.price;

  return (
 <div className=" max-w-full">
  <div
    className={`border rounded-2xl p-5 transition-all duration-300
    ${
      theme === "dark"
        ? "bg-[#191D23] border-white/10 text-white"
        : "bg-white border-gray-200 text-black"
    }`}
  >

        {/* HEADER */}
        <div className="flex justify-between mb-3">
      <h2 className={`${theme === "dark" ? "text-white" : "text-black"} text-sm`}>
  Live USDT Price
</h2>

<span className="text-xs text-gray-400">Real Time</span>
        </div>

        {/* CHART */}
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={[
              ...chartData,
              ...Array(10).fill({ price: null }) // 👉 right space
            ]}
          >
       <CartesianGrid
  strokeDasharray="3 3"
  stroke={theme === "dark" ? "#1f2937" : "#e5e7eb"}
/>

            {/* GRADIENTS */}
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis hide />

            <Tooltip
            contentStyle={{
    backgroundColor: theme === "dark" ? "#020617" : "#ffffff",
    border: theme === "dark" ? "1px solid #1f2937" : "1px solid #e5e7eb",
    borderRadius: "10px",
    color: theme === "dark" ? "#fff" : "#000",
  }}
              formatter={(value) => [`₹ ${value}`, "Price"]}
            />

            {/* 🔥 SINGLE SMOOTH AREA */}
            <Area
              type="monotone"
              dataKey="price"
              stroke={isUp ? "#22c55e" : "#ef4444"}
              strokeWidth={3}
              fill={isUp ? "url(#greenGradient)" : "url(#redGradient)"}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* PRICE */}
        <div className="mt-3 flex justify-between">
          <span className="text-xs text-gray-400">Current Price</span>

          <span
            className={`text-xl font-bold ${
              isUp ? "text-emerald-400" : "text-red-400"
            }`}
          >
            ₹ {realPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}