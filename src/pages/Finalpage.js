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

import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import PlaceOrder from "./PlaceOrder";
import PaymentMethod from "../components/PayoutMethods";
import UserOrderStaus from "./UserOrderStaus";
import WithdrawPageComponent from "./WithdrawPage";
import WalletPage from "../components/WalletPage";
import Footer from "../components/Footer";

const API = process.env.REACT_APP_API_URL;

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [rate, setRate] = useState(0);
  const [news, setNews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [todayTrade, setTodayTrade] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [approvedWithdraw, setApprovedWithdraw] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const availableBalance = totalSold - approvedWithdraw;
  const [loading, setLoading] = useState(true);
  const [supportOpen, setSupportOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  /* ================= FETCH ================= */

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allOrders = res.data || [];

      setOrders(allOrders);

      // ✅ Only completed orders
      const completed = allOrders.filter((o) => o.status === "COMPLETED");

      // ✅ Total Sold (All time)
      const totalINR = completed.reduce(
        (acc, curr) =>
          acc + Number(curr.usdtAmount || 0) * Number(curr.rate || 0),
        0,
      );

      setTotalSold(totalINR);

      // ✅ Today Trade
      const today = new Date().toDateString();

      const todayCompleted = completed.filter(
        (o) => new Date(o.updatedAt).toDateString() === today,
      );

      const todayTotal = todayCompleted.reduce(
        (acc, curr) => acc + Number(curr.usdtAmount || 0),
        0,
      );
      const todayTotalUSDT = todayCompleted.reduce(
        (acc, curr) => acc + Number(curr.usdtAmount || 0),
        0,
      );

      setTodayTrade(todayTotal);

      setTodayTrade(todayTotalUSDT);

      // ✅ Recent 2 Orders
      const sorted = [...allOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setRecentOrders(sorted.slice(0, 2));
    } catch (err) {
      console.log("Order fetch failed");
    }
  };

  const fetchRate = async () => {
    try {
      const res = await axios.get(`${API}/admin/rate`);
      setRate(res.data.rate || 0);
    } catch {}
  };

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API}/admin/news`);
      setNews(res.data || []);
    } catch {}
  };

  const fetchApprovedWithdrawals = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/api/withdrawal/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const approved = res.data.filter((w) => w.status === "APPROVED");

    const total = approved.reduce((acc, curr) => acc + Number(curr.amount), 0);

    setApprovedWithdraw(total);
  };

  const fetchRecentActivity = async () => {
    const token = localStorage.getItem("token");

    try {
      const [ordersRes, withdrawRes] = await Promise.all([
        axios.get(`${API}/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API}/api/withdrawal/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const orders = ordersRes.data.map((o) => ({
        id: o._id,
        type: "SELL",
        amount: o.usdtAmount,
        inr: o.totalINR,
        status: o.status,
        date: o.createdAt,
      }));

      const withdrawals = withdrawRes.data.map((w) => ({
        id: w._id,
        type: "WITHDRAW",
        amount: w.amount,
        status: w.status,
        date: w.createdAt,
      }));

      const combined = [...orders, ...withdrawals];

      const sorted = combined.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );

      setRecentActivity(sorted.slice(0, 4));
    } catch (err) {
      console.log("Activity fetch failed");
    }
  };

  const refreshDashboardData = () => {
    fetchUserOrders();
    fetchApprovedWithdrawals();
    fetchRecentActivity();
  };

  const WithdrawPage = () => (
    <WithdrawPageComponent onWithdrawSuccess={refreshDashboardData} />
  );

  // First load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchRate(),
        fetchNews(),
        fetchUserOrders(),
        fetchApprovedWithdrawals(),
        fetchRecentActivity(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  // Rate live refresh
  useEffect(() => {
    const interval = setInterval(fetchRate, 5000);
    return () => clearInterval(interval);
  }, []);

  // Dashboard live refresh

  const formatNumber = (num) => {
    if (!num) return "0";

    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";

    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";

    if (num >= 1_00000) return (num / 1_00000).toFixed(1) + "K";

    return num;
  };

  /* ================= BTC ================= */

  const StatCard = ({ title, value, green, badge }) => (
    <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
      {/* TITLE + BADGE */}
      <div className="flex items-center gap-2">
        <p className="text-gray-400 text-sm">{title}</p>

        {badge && (
          <span className="text-[10px] px-2 py-0.5 bg-red-500 text-white rounded-full animate-pulse">
            {badge}
          </span>
        )}
      </div>

      {/* VALUE */}
      <h2
        className={`text-3xl font-bold mt-2 ${green ? "text-emerald-400" : ""}`}
      >
        {value}
      </h2>
    </div>
  );

  return (
    <div className="h-screen flex bg-[#0b0f19] text-white overflow-hidden">
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full h-14 bg-[#0f172a] border-b border-gray-800 flex items-center justify-between px-4 z-50">
        <img src="/logot.png" alt="logo" className="w-8 h-8" />
        <button onClick={() => setSidebarOpen(true)} className="text-3xl">
          ☰
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
        fixed md:relative z-40 bg-[#111827] border-r border-gray-800
        transition-all duration-300 flex flex-col
        ${sidebarOpen ? "w-64" : "w-20"}
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        h-screen
        `}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 group relative">
          <div
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap- cursor-pointer"
          >
            <img src="/logot.png" alt="logo" className="w-12 h-12" />
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-yellow-400">iBytex</h1>
            )}
          </div>

          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="hidden md:block text-2xl"
            >
              ☰
            </button>
          )}

          {!sidebarOpen && (
            <div className="absolute left-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              iBytex
            </div>
          )}
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-3 flex-1">
          <SidebarItem
            label="Dashboard"
            icon="🏠"
            open={sidebarOpen}
            onClick={() => setActivePage("dashboard")}
          />
          <SidebarItem
            label="Wallet"
            icon="💼"
            open={sidebarOpen}
            onClick={() => setActivePage("wallet")}
          />
          <SidebarItem
            label="Deposit"
            icon="⬇"
            open={sidebarOpen}
            onClick={() => setActivePage("deposit")}
          />
          <SidebarItem
            label="Withdraw"
            icon="⬆"
            open={sidebarOpen}
            onClick={() => setActivePage("withdraw")}
          />
          <SidebarItem
            label="Orders"
            icon="📦"
            open={sidebarOpen}
            onClick={() => setActivePage("orders")}
          />
          <SidebarItem
            label="Payment Method"
            icon="📦"
            open={sidebarOpen}
            onClick={() => setActivePage("payment-method")}
          />
          <SidebarItem
            label="Settings"
            icon="⚙"
            open={sidebarOpen}
            onClick={() => setActivePage("settings")}
          />
        </nav>

        {/* PROFILE */}
        <div className="p-4 border-t border-gray-800 relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full flex items-center gap-3 hover:bg-[#1f2937] p-2 rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">
              {user?.email?.charAt(0)?.toUpperCase()}
            </div>

            {sidebarOpen && (
              <div>
                <p className="text-sm font-semibold">{user?.name}</p>
              </div>
            )}
          </button>

          {profileOpen && (
            <div className="absolute bottom-16 left-4 w-56 bg-[#111827] border border-gray-700 rounded-xl shadow-xl py-2 z-50">
              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full text-left px-4 py-2 hover:bg-[#1f2937]"
              >
                🔄 Sign another account
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/home";
                }}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#1f2937]"
              >
                🚪 Logout
              </button>

              <div className="px-4 py-3 mt-2 border-t border-gray-700">
                <div className="bg-[#0f172a] rounded-lg p-3 space-y-2 border border-gray-800">
                  <div className="text-xs">
                    <p className="text-gray-400">Email</p>
                    <p className="text-white font-medium break-all">
                      {user?.email}
                    </p>
                  </div>
                  <div className="text-xs">
                    <p className="text-gray-400">Account ID</p>
                    <p className="text-yellow-400 font-semibold">
                      {user?.accountId || "Not Assigned"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <div
        className={`
        flex-1 overflow-y-auto transition-all duration-300
        ${sidebarOpen ? "md:ml" : "md:ml"}
        pt-16 md:pt-8 p-6
        `}
      >
        {activePage === "dashboard" && (
          <>
            <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400 mb-8">Welcome back, {user?.name} 👋</p>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Live USDT Rate"
                value={`₹ ${rate}`}
                green
                badge="LIVE"
              />

              <StatCard title="Today USDT Trade" value={`${todayTrade} USDT`} />

              <div
                onClick={() => setActivePage("orders")}
                className="cursor-pointer"
              >
                <StatCard
                  title="Available Balance"
                  value={`₹ ${formatNumber(availableBalance)}`}
                  green
                />
              </div>

              <div
                onClick={() => setActivePage("withdraw")}
                className="cursor-pointer"
              >
                <StatCard
                  title="Total Withdrawn"
                  value={`₹ ${formatNumber(approvedWithdraw)}`}
                />
              </div>
            </div>

            {/* RECENT ORDERS */}
            <div className="mt-12">
              <div className="flex justify-between items-center mt-10 mb-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>

                <button
                  onClick={() => setActivePage("orders")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm"
                >
                  View All Orders →
                </button>
              </div>

              {recentActivity.length === 0 ? (
                <p className="text-gray-400">No recent activity</p>
              ) : (
                <div className="space-y-5">
                  {recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#111827] border border-gray-800 rounded-2xl p-6 flex justify-between items-center hover:border-yellow-500/30 transition-all duration-300"
                    >
                      {/* LEFT SIDE */}
                      <div className="flex items-start gap-4">
                        {/* ICON */}
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold
          ${
            item.type === "SELL"
              ? "bg-green-500/10 text-green-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
                        >
                          {item.type === "SELL" ? "S" : "W"}
                        </div>

                        {/* TEXT CONTENT */}
                        <div>
                          <h3 className="text-lg font-semibold">
                            {item.type === "SELL"
                              ? `Sold ${item.amount} USDT`
                              : `Withdraw ₹ ${item.amount}`}
                          </h3>

                          {item.type === "SELL" && (
                            <p className="text-green-400 font-medium text-sm mt-1">
                              ₹ {item.inr}
                            </p>
                          )}

                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(item.date).toLocaleString()}
                          </p>

                          {/* STATUS BADGE */}
                          <div className="mt-3">
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-medium ${
                                item.status === "COMPLETED" ||
                                item.status === "APPROVED"
                                  ? "bg-green-500/20 text-green-400"
                                  : item.status === "REJECTED"
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE BUTTON */}
                      <button
                        onClick={() =>
                          setActivePage(
                            item.type === "SELL" ? "orders" : "withdraw",
                          )
                        }
                        className="px-6 py-2 rounded-xl font-semibold text-black transition-all duration-300 hover:scale-105"
                        style={{
                          background:
                            "linear-gradient(135deg, #F5C56B 0%, #D4A017 100%)",
                        }}
                      >
                        {item.type === "SELL" ? "View Order" : "View Withdraw"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activePage === "wallet" && (
          <WalletPage setActivePage={setActivePage} />
        )}

        {activePage === "deposit" && <DepositPage />}
        {activePage === "withdraw" && <WithdrawPage />}
        {activePage === "orders" && <OrdersPage />}
        {activePage === "payment-method" && <Payment />}
        {activePage === "settings" && <SettingsPage user={user} />}
      </div>

      {/* ================= SUPPORT ASSISTANT ================= */}

{/* FLOATING BUTTON */}
<div className="fixed bottom-6 right-6 z-50">
  <button
    onClick={() => setSupportOpen(true)}
    className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg flex items-center justify-center text-black text-2xl hover:scale-110 transition-all duration-300"
  >
    💬
  </button>
</div>

{/* POPUP MODAL */}
{supportOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-700 w-[90%] max-w-md text-center relative">

      <button
        onClick={() => setSupportOpen(false)}
        className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold mb-4 text-yellow-400">
        Customer Support
      </h2>

      <p className="text-gray-300 mb-6">
        Custom Support Msg in Telegram
      </p>

      <a
        href="https://t.me/ibytex_Pays"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:scale-105 transition-all duration-300 inline-block"
      >
        Open Telegram Support
      </a>

    </div>
    
  </div>
)} 

    </div>
    
  );
};

/* COMPONENTS */

const SidebarItem = ({ label, icon, open, onClick }) => (
  <div
    onClick={onClick}
    className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1f2937] cursor-pointer relative"
  >
    <span className="text-lg">{icon}</span>
    {open && <span>{label}</span>}
    {!open && (
      <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
        {label}
      </span>
    )}
  </div>
);

const StatCard = ({ title, value, green }) => (
  <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
    <p className="text-gray-400 text-sm">{title}</p>
    <h2
      className={`text-3xl font-bold mt-2 ${green ? "text-emerald-400" : ""}`}
    >
      {value}
    </h2>
  </div>
);

const DepositPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Deposit</h1>
    <PlaceOrder />
  </div>
);

const OrdersPage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Orders</h1>
    <UserOrderStaus />
  </div>
);
const Payment = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
    <PaymentMethod />
  </div>
);

const SettingsPage = ({ user }) => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Settings</h1>
    <p>Email: {user?.email}</p>
    <p>Account ID: {user?.accountId}</p>
  </div>
);

export default DashboardLayout;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import CountUp from "react-countup";
// import PlaceOrder from "./PlaceOrder";
// import PaymentMethod from "../components/PayoutMethods";
// import UserOrderStaus from "./UserOrderStaus";
// import WithdrawPageComponent from "./WithdrawPage";

// const API = process.env.REACT_APP_API_URL;

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [activePage, setActivePage] = useState("dashboard");
//   const [rate, setRate] = useState(0);
//   const [orders, setOrders] = useState([]);
//   const [todayTrade, setTodayTrade] = useState(0);
//   const [totalSold, setTotalSold] = useState(0);
//   const [approvedWithdraw, setApprovedWithdraw] = useState(0);
//   const [recentActivity, setRecentActivity] = useState([]);

//   const availableBalance = totalSold - approvedWithdraw;
//   const user = JSON.parse(localStorage.getItem("user"));

//   /* ================= FETCH LOGIC (UNCHANGED) ================= */

//   const fetchUserOrders = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get(`${API}/orders/my`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const allOrders = res.data || [];
//     setOrders(allOrders);

//     const completed = allOrders.filter((o) => o.status === "COMPLETED");

//     const totalINR = completed.reduce(
//       (acc, curr) =>
//         acc + Number(curr.usdtAmount || 0) * Number(curr.rate || 0),
//       0
//     );

//     setTotalSold(totalINR);

//     const today = new Date().toDateString();
//     const todayCompleted = completed.filter(
//       (o) => new Date(o.updatedAt).toDateString() === today
//     );

//     const todayTotalUSDT = todayCompleted.reduce(
//       (acc, curr) => acc + Number(curr.usdtAmount || 0),
//       0
//     );

//     setTodayTrade(todayTotalUSDT);
//   };

//   const fetchRate = async () => {
//     const res = await axios.get(`${API}/admin/rate`);
//     setRate(res.data.rate || 0);
//   };

//   const fetchApprovedWithdrawals = async () => {
//     const token = localStorage.getItem("token");

//     const res = await axios.get(`${API}/api/withdrawal/my`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const approved = res.data.filter((w) => w.status === "APPROVED");

//     const total = approved.reduce(
//       (acc, curr) => acc + Number(curr.amount),
//       0
//     );

//     setApprovedWithdraw(total);
//   };

//   const fetchRecentActivity = async () => {
//     const token = localStorage.getItem("token");

//     const [ordersRes, withdrawRes] = await Promise.all([
//       axios.get(`${API}/orders/my`, {
//         headers: { Authorization: `Bearer ${token}` },
//       }),
//       axios.get(`${API}/api/withdrawal/my`, {
//         headers: { Authorization: `Bearer ${token}` },
//       }),
//     ]);

//     const orders = ordersRes.data.map((o) => ({
//       id: o._id,
//       type: "SELL",
//       amount: o.usdtAmount,
//       inr: o.totalINR,
//       status: o.status,
//       date: o.createdAt,
//     }));

//     const withdrawals = withdrawRes.data.map((w) => ({
//       id: w._id,
//       type: "WITHDRAW",
//       amount: w.amount,
//       status: w.status,
//       date: w.createdAt,
//     }));

//     const combined = [...orders, ...withdrawals];

//     const sorted = combined.sort(
//       (a, b) => new Date(b.date) - new Date(a.date)
//     );

//     setRecentActivity(sorted.slice(0, 4));
//   };

//   const refreshDashboardData = () => {
//     fetchUserOrders();
//     fetchApprovedWithdrawals();
//     fetchRecentActivity();
//   };

//   const WithdrawPage = () => (
//     <WithdrawPageComponent onWithdrawSuccess={refreshDashboardData} />
//   );

//   /* ================= INITIAL LOAD ================= */

//   useEffect(() => {
//     fetchRate();
//     fetchUserOrders();
//     fetchApprovedWithdrawals();
//     fetchRecentActivity();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       refreshDashboardData();
//       fetchRate();
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   /* ================= UI ================= */

//   return (
//     <div className="h-screen flex bg-[#0b0f19] text-white overflow-hidden relative">

//       {/* BACKGROUND GLOW */}
//       <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-500/10 blur-[150px] rounded-full"></div>
//       <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full"></div>

//       {/* SIDEBAR */}
//       <div className="w-64 bg-[#0f172a] border-r border-white/10 backdrop-blur-xl p-5 space-y-6">
//         <h1 className="text-xl font-bold text-yellow-400">IBYTEX</h1>

//         <SidebarItem label="Dashboard" onClick={() => setActivePage("dashboard")} />
//         <SidebarItem label="Withdraw" onClick={() => setActivePage("withdraw")} />
//         <SidebarItem label="Orders" onClick={() => setActivePage("orders")} />
//         <SidebarItem label="Payment" onClick={() => setActivePage("payment-method")} />
//       </div>

//       {/* MAIN */}
//       <div className="flex-1 overflow-y-auto p-6 relative z-10">

//         {activePage === "dashboard" && (
//           <>
//             <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
//             <p className="text-gray-400 mb-6">Welcome back, {user?.name}</p>

//             {/* STATS */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

//               <StatCard title="Live USDT Rate" value={rate} green badge="LIVE" />

//               <StatCard title="Today Trade" value={todayTrade} />

//               <StatCard title="Available Balance" value={availableBalance} green />

//               <StatCard title="Total Withdrawn" value={approvedWithdraw} />

//             </div>

//             {/* RECENT ACTIVITY */}
//             <div className="mt-6">
//               <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

//               <div className="space-y-3">
//                 <AnimatePresence>
//                   {recentActivity.map((item) => (
//                     <motion.div
//                       key={item.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       whileHover={{ scale: 1.01 }}
//                       className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex justify-between items-center"
//                     >
//                       <div>
//                         <p className="font-semibold">
//                           {item.type === "SELL"
//                             ? `Sold ${item.amount} USDT`
//                             : `Withdraw ₹ ${item.amount}`}
//                         </p>

//                         <p className="text-xs text-gray-400 mt-1">
//                           {new Date(item.date).toLocaleString()}
//                         </p>
//                       </div>

//                       <button
//                         onClick={() =>
//                           setActivePage(item.type === "SELL" ? "orders" : "withdraw")
//                         }
//                         className="px-4 py-2 rounded-lg font-semibold text-black text-sm"
//                         style={{
//                           background:
//                             "linear-gradient(135deg,#F5C56B 0%,#D4A017 100%)",
//                         }}
//                       >
//                         View
//                       </button>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </>
//         )}

//         {activePage === "withdraw" && <WithdrawPage />}
//         {activePage === "orders" && <UserOrderStaus />}
//         {activePage === "payment-method" && <PaymentMethod />}
//       </div>
//     </div>
//   );
// };

// /* ================= COMPONENTS ================= */

// const SidebarItem = ({ label, onClick }) => (
//   <div
//     onClick={onClick}
//     className="cursor-pointer px-3 py-2 rounded-lg hover:bg-white/5 transition"
//   >
//     {label}
//   </div>
// );

// const StatCard = ({ title, value, green, badge }) => (
//   <motion.div
//     whileHover={{ y: -5 }}
//     className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl"
//   >
//     <div className="flex items-center gap-2">
//       <p className="text-gray-400 text-xs uppercase">{title}</p>
//       {badge && (
//         <span className="text-[9px] px-2 py-0.5 bg-red-500 rounded-full animate-pulse">
//           {badge}
//         </span>
//       )}
//     </div>

//     <h2 className={`text-2xl font-bold mt-2 ${green ? "text-emerald-400" : ""}`}>
//       ₹ <CountUp end={value} duration={1} separator="," />
//     </h2>
//   </motion.div>
// );

// export default DashboardLayout;
