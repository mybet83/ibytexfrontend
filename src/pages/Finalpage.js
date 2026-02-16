// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate , Link } from "react-router-dom";
// import Footer from "../components/Footer";
// import WorldMap from "../components/WorldMap";
// import Navbar from "../components/Navbar";
// import CryptoLogos from "../components/CryptoLogos";
// import LivePrices from "../components/LivePrices";
// import Counter from "../components/Counter";

// const API = process.env.REACT_APP_API_URL;

// const Finalpage = () => {
//   const [rate, setRate] = useState(0);
//   const [usdt, setUsdt] = useState("");
//   const [news, setNews] = useState([]);

//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const fetchRate = async () => {
//     try {
//       const res = await axios.get(`${API}/admin/rate`);
//       setRate(res.data.rate || 0);
//     } catch (err) {
//       console.error("Rate fetch failed");
//     }
//   };

//   const fetchNews = async () => {
//     try {
//       const res = await axios.get(`${API}/admin/news`);
//       setNews(res.data || []);
//     } catch (err) {
//       console.error("News fetch failed");
//     }
//   };

//   useEffect(() => {
//     fetchRate();
//     fetchNews();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchRate();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const totalAmount = usdt ? (usdt * rate).toFixed(2) : "--";

//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-hidden">
//       {/* MAIN NAVBAR */}
//       <Navbar />

//       {/* HERO SECTION */}
//       {/* HERO SECTION PREMIUM */}
//       <section className="relative min-h-screen flex items-center overflow-hidden px-6 lg:px-20 z-40">
//         {/* WORLD MAP BACKGROUND */}
//         <div className="absolute inset-0 -z-10 flex justify-end max-sm:bottom-40">
//           {/* Desktop 70% Width */}
//           <div className="hidden lg:block w-[70%] h-full">
//             <WorldMap />
//           </div>

//           {/* Mobile Full Width */}
//           <div className="block lg:hidden w-full h-full relative bottom-20">
//             <WorldMap />
//           </div>
//         </div>

//         {/* LEFT CONTENT */}
//         <div className="relative z-20 max-w-2xl">
//           <h1 className="text-4xl lg:text-4xl font-bold leading-tight">
//             Welcome Back,{" "}
//             <span className="text-yellow-400">{user?.name || "Trader"}</span> 👋
//           </h1>

//           <h2 className="mt-6 text-3xl lg:text-3xl font-bold">
//             Start Trading Instantly
//           </h2>

//           <p className="mt-6 text-gray-400 max-w-lg text-base">
//             Manage your USDT transactions, monitor live prices and trade
//             securely on Ibytex Exchange.
//           </p>

//           <div
//             className="relative bg-[#0f172a]/80 backdrop-blur-xl 
//                   border border-purple-500/20 
//                   rounded-3xl 
//                   px-7 py-6 
//                   shadow-2xl 
//                   hover:border-purple-500/40 
//                   transition-all duration-300 w-[70%] mt-6 max-lg:w-[70%] max-sm:w-[90%]"
//           >
//             {/* Header */}
//             <div className="flex items-center gap-3 mb-3">
//               {/* Logo circle */}
//               <div
//                 className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 
//                       flex items-center justify-center shadow-lg"
//               >
//                 <img
//                   src="https://cryptologos.cc/logos/tether-usdt-logo.png"
//                   alt="usdt"
//                   className="w-6 h-6"
//                 />
//               </div>

//               <span className="text-sm text-gray-400 tracking-wide">
//                 Today USDT Price
//               </span>

//               {/* Price */}
//               <div
//                 className="text-3xl font-bold tracking-tight 
//                     bg-gradient-to-r from-green-400 to-emerald-500 
//                     bg-clip-text text-transparent"
//               >
//                 {rate ? `₹ ${rate}` : "Loading..."}
//               </div>
//             </div>

//             {/* Subtle underline */}
//             <div className="mt-4 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
//           </div>
//         </div>

//         {/* BOTTOM CENTER SECTION */}
//         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6">
//           {/* Live Price Card */}

//           {/* Start Trading Button */}
//           <div
//             className="flex flex-col md:flex-row gap-4 mt-6 w-full 
//                 items-end md:items-start"
//           >
//             <button
//               onClick={() => navigate("/userorder")}
//               className="w-full md:w-auto px-8 py-3 bg-yellow-400 text-black 
//                font-semibold rounded-full hover:scale-105 
//                transition shadow-lg"
//             >
//               Sell USDT Now →
//             </button>

//             <button
//               onClick={() => navigate("/myorder")}
//               className="w-full md:w-auto px-8 py-3 border border-white/20 
//                rounded-full hover:bg-white/10 transition"
//             >
//               View Orders History
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* CALCULATOR SECTION */}
//       {/* CALCULATOR + NEWS SECTION */}
//       <section className="py-20 px-6 lg:px-20 ">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
//           {/* LEFT – CALCULATOR */}
//           <div className="bg-[#181a20] rounded-2xl p-8 border border-gray-800 shadow-xl">
//             <h2 className="text-2xl font-bold mb-2 text-yellow-400">
//               Calculate Your USDT Value
//             </h2>
//             <p className="text-gray-400 mb-6 text-sm">
//               Instant & Secure Selling Calculator
//             </p>

//             <div className="space-y-5">
//               <div>
//                 <label className="text-sm text-gray-400">USDT Quantity</label>
//                 <input
//                   type="number"
//                   placeholder="Minimum 1 USDT"
//                   value={usdt}
//                   onChange={(e) => setUsdt(e.target.value)}
//                   className="mt-2 w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm text-gray-400">Today Rate</label>
//                 <div className="mt-2 px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700">
//                   ₹ {rate}
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-400">You Receive</label>
//                 <div className="mt-2 px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 font-semibold text-green-400">
//                   ₹ {totalAmount}
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button
//                   onClick={() => navigate("/userorder")}
//                   className="flex-1 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition"
//                 >
//                   Sell USDT
//                 </button>

//                 <button
//                   onClick={() => navigate("/myorder")}
//                   className="flex-1 py-3 rounded-lg border border-white/20 hover:bg-white/10 font-semibold transition"
//                 >
//                   My Orders
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT – NEWS */}
//           <div className="bg-[#181a20] rounded-2xl p-8 border border-gray-800 shadow-xl">
//             <h3 className="text-xl font-semibold mb-6 text-yellow-400">
//               Today Crypto News
//             </h3>
//             <p className="text-base  text-center text-gray-400 opacity-0 max-md:opacity-100">
//               Scroll For More News ⬇
//             </p>

//             <ul className="space-y-4 text-gray-300 text-sm max-h-[350px] overflow-y-auto pr-2">
//               {news.length === 0 && <li>No news available</li>}

//               {news.map((n, i) => (
//                 <li key={i} className="border-b border-gray-700 pb-3">
//                   🔹 {n.text}
//                 </li>
//               ))}
//             </ul>
//             <p className="text-base  text-center text-yellow-400 max-md:hidden ">
//               Scroll For More News ⬆
//             </p>
//           </div>
//         </div>
//       </section>

//       <CryptoLogos />

//         <div className="relative px-20 py-20 max-lg:px-5 " >
//             <LivePrices />
//           </div>
                  
//                     <section className="px-6 lg:px-20 py-20 max-lg:py-12 text-center">
//         <h3 className="text-3xl font-bold text-center">Trusted by Numbers</h3>
//         <p className="text-gray-400 text-center mt-2">
//           Real growth, real users, real transactions
//         </p>

//         <div className="grid md:grid-cols-3 gap-10  py-10 max-lg:p">
//           {/* Card 1 */}
//           <div className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
//             <h2 className="text-4xl lg:text-5xl font-bold text-white">
//               $<Counter end={200} suffix="M+" />
//             </h2>
//             <p className="text-gray-400 mt-2">Total Trades</p>
//           </div>

//           {/* Card 2 */}
//           <div className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
//             <h2 className="text-4xl lg:text-5xl font-bold text-white">
//               <Counter end={10} suffix="M+" />
//             </h2>
//             <p className="text-gray-400 mt-2">Our Users</p>
//           </div>

//           {/* Card 3 */}
//           <div className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
//             <h2 className="text-4xl lg:text-5xl font-bold text-white">
//               <Counter end={1.5} suffix="M+" />
//             </h2>
//             <p className="text-gray-400 mt-2">Daily EVG Exchange</p>
//           </div>
//         </div>
//       </section>

//                 <section className="px-6 lg:px-20 py-20">
//                   <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-black/20 text-center">
//                     <h3 className="text-3xl font-bold">Ready to Sell Your USDT?</h3>
//                     <p className="text-gray-300 mt-3">
//                       Join thousands of users who trust us with their crypto transactions.
//                     </p>
          
//                     <Link
//                       to="/userorder"
//                       className="inline-block mt-6 px-12 py-3 rounded-full  bg-gold-gradient text-black font-semibold"
//                     >
//                      Sell USDT Now
//                     </Link>
//                   </div>
//                 </section>

            

//       <Footer />
//     </div>
//   );
// };

// export default Finalpage;






















import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const API = process.env.REACT_APP_API_URL;

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [btcData, setBtcData] = useState([]);

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

  useEffect(() => {
    const interval = setInterval(fetchRate, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBTCChart = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
      {
        params: {
          vs_currency: "inr",
          days: 7,
        },
      }
    );

    const formatted = res.data.prices.map((item) => {
      const date = new Date(item[0]);
      return {
        time: `${date.getDate()}/${date.getMonth() + 1}`,
        price: item[1],
      };
    });

    setBtcData(formatted);
  } catch (err) {
    console.error("BTC chart fetch failed");
  }
};

useEffect(() => {
  fetchBTCChart();
}, []);


  const chartData = [
    { name: "Mon", price: rate - 1 },
    { name: "Tue", price: rate },
    { name: "Wed", price: rate + 1 },
    { name: "Thu", price: rate - 0.5 },
    { name: "Fri", price: rate + 0.8 },
    { name: "Sat", price: rate + 0.3 },
    { name: "Sun", price: rate },
  ];

 




  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex">

      {/* ================= SIDEBAR ================= */}
<div
  className={`
    fixed md:relative z-40
    bg-[#111827] border-r border-gray-800
    transition-all duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    w-64
    min-h-screen
  `}
>


    {/* ===== MOBILE HEADER ===== */}
<div className="md:hidden fixed top-0 left-0 w-full h-14 
bg-[#0f172a] border-b border-gray-800 
flex items-center justify-between px-4 z-50">

  <img
    src="/logo.png"
    alt="logo"
    className="w-8 h-8"
  />

  <button
    onClick={() => setSidebarOpen(true)}
    className="text-3xl text-white"
  >
    ☰
  </button>
</div>


  {/* ================= TOP ================= */}
  <div>
    {/* Logo + Toggle */}
    <div className="flex items-center justify-between p-4 border-b border-gray-800">

      {/* Logo Section */}
      <div className="flex items-center gap-1">
        <img
         onClick={() => setSidebarOpen(!sidebarOpen)}   
          src="/logot.png"   // 👈 apna company logo yaha daalo
          alt="logo"
          className="w-12 h-12 object-contain cursor-pointer"
        />

        {sidebarOpen && (
          <h1 className="text-xl font-bold text-yellow-400">
            iBytex
          </h1>
        )}
      </div>

      {/* Toggle Button */}
  {sidebarOpen && (
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="text-gray-400  hover:text-white text-3xl transition"
  >
    ☰
  </button>
)}

    </div>

    {/* ================= MENU ================= */}
    <nav className="p-4 space-y-3 text-sm">

      <SidebarItem
        label="Dashboard"
        icon="🏠"
        open={sidebarOpen}
        onClick={() => navigate("/dashboard")}
      />

      <SidebarItem
        label="Wallet"
        icon="💼"
        open={sidebarOpen}
        onClick={() => navigate("/wallet")}
      />

      <SidebarItem
        label="Deposit"
        icon="⬇"
        open={sidebarOpen}
        onClick={() => navigate("/deposit")}
      />

      <SidebarItem
        label="Withdraw"
        icon="⬆"
        open={sidebarOpen}
        onClick={() => navigate("/withdraw")}
      />

      <SidebarItem
        label="Payout Methods"
        icon="💳"
        open={sidebarOpen}
        onClick={() => navigate("/payout-methods")}
      />

      <SidebarItem
        label="Settings"
        icon="⚙"
        open={sidebarOpen}
        onClick={() => navigate("/settings")}
      />
    </nav>
  </div>

  {/* Mobile Overlay */}
{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/50 md:hidden z-30"
    onClick={() => setSidebarOpen(false)}
  />
)}


  {/* ================= BOTTOM PROFILE ================= */}
  <div className="p-4 border-t border-gray-800 relative">

  <button
    onClick={() => setProfileOpen(!profileOpen)}
    className="w-full flex items-center gap-3 hover:bg-[#1f2937] 
    p-2 rounded-lg transition"
  >

    <div className="w-9 h-9 rounded-full bg-yellow-400 
      flex items-center justify-center text-black font-bold">
      {user?.email?.charAt(0)?.toUpperCase()}
    </div>

    {sidebarOpen && (
      <div className="text-left">
        <p className="text-xs text-gray-400">
          Logged in as
        </p>
        <p className="text-sm font-semibold truncate">
          {user?.name}
        </p>
      </div>
    )}
  </button>


  {profileOpen && (
    <div className="absolute bottom-16 left-4 w-56 
      bg-[#111827] border border-gray-700 rounded-xl shadow-xl 
      py-2 z-50">


      <div className="px-4 py-3 border-b border-gray-700">
        <p className="text-sm font-semibold">{user?.name}</p>
        <p className="text-xs text-gray-400 truncate">
          {user?.email}
        </p>
      </div>


      <button
        onClick={() => {
          navigate("/login");
          setProfileOpen(false);
        }}
        className="w-full text-left px-4 py-2 text-sm 
        hover:bg-[#1f2937] transition"
      >
        🔄 Sign another account
      </button>


      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/home");
        }}
        className="w-full text-left px-4 py-2 text-sm 
        text-red-400 hover:bg-[#1f2937] transition"
      >
        🚪 Logout
      </button>

    </div>
  )}
</div>

</div>


      {/* ================= MAIN CONTENT ================= */}
<div className="flex-1 p-8 md:ml-64 pt-16 md:pt-8">


        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Welcome back, {user?.name || "Trader"} 👋
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-sm">
              Live USDT Rate
            </p>
            <h2 className="text-3xl font-bold text-emerald-400 mt-2">
              ₹ {rate}
            </h2>
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-sm">
              Total News
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {news.length}
            </h2>
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-sm">
              Account Status
            </p>
            <h2 className="text-2xl font-bold text-green-400 mt-2">
              Active
            </h2>
          </div>
        </div>

        {/* CHART */}
<div className="bg-gradient-to-br from-[#0f172a] to-[#0b1220] p-8 rounded-2xl border border-gray-800 shadow-xl">

  {/* HEADER */}
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-xl font-semibold text-white">
        Bitcoin (BTC)
      </h3>
      <p className="text-sm text-gray-400">
        7 Day Market Trend (INR)
      </p>
    </div>

    <div className="text-right">
      <p className="text-2xl font-bold text-yellow-400">
        ₹ {btcData.length ? btcData[btcData.length - 1].price.toLocaleString("en-IN") : "--"}
      </p>
      <p className="text-xs text-gray-500">Live Market Price</p>
    </div>
  </div>

  {/* CHART */}
  <div className="h-[340px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={btcData}>
        <defs>
          <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#facc15" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1f2937"
          vertical={false}
        />

        <XAxis
          dataKey="time"
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
        />

        <YAxis
          stroke="#6b7280"
          tickFormatter={(value) =>
            value >= 100000
              ? `${(value / 100000).toFixed(1)}L`
              : value
          }
          width={70}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#111827",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "#9ca3af" }}
          formatter={(value) =>
            [`₹ ${Number(value).toLocaleString("en-IN")}`, "Price"]
          }
        />

        <Area
          type="monotone"
          dataKey="price"
          stroke="#facc15"
          strokeWidth={3}
          fill="url(#btcGradient)"
          dot={false}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</div>



      </div>
    </div>
  );
};

const SidebarItem = ({ label, icon, open, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group flex items-center gap-3 px-3 py-2 rounded-lg 
      hover:bg-[#1f2937] cursor-pointer transition relative"
    >
      <span className="text-lg">{icon}</span>

      {open && (
        <span className="text-gray-300 group-hover:text-white">
          {label}
        </span>
      )}

      {/* Tooltip when sidebar closed */}
      {!open && (
        <span
          className="absolute left-14 bg-black text-white text-xs 
          px-2 py-1 rounded opacity-0 group-hover:opacity-100 
          transition pointer-events-none whitespace-nowrap"
        >
          {label}
        </span>
      )}
    </div>
  );
};


export default DashboardLayout;
