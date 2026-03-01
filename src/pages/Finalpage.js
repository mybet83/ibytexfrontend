import React, { useState } from "react";
import CountUp from "react-countup";
import { useEffect } from "react";
import axios from "axios";
import PlaceOrder from "./PlaceOrder";
import PaymentMethod from "../components/PayoutMethods";
import UserOrderStaus from "./UserOrderStaus";
import WithdrawPageComponent from "./WithdrawPage";
import WalletPage from "../components/WalletPage";
import SettingsPage from "../components/SettingsPage";
import { useLocation } from "react-router-dom";
import { messaging, getToken } from "../firebase";  // agar firebase.js src me hai
import {
  HiHome,
  HiCash,
  HiArrowDown,
  HiCurrencyDollar,
  HiCube,
  HiCreditCard,
  HiCog,
  HiCurrencyRupee,
  HiArrowUp,
  HiLockClosed,

} from "react-icons/hi";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";


const API = process.env.REACT_APP_API_URL;

const DashboardLayout = () => {
const [sidebarOpen, setSidebarOpen] = useState(false);
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
  const [hasAnimated, setHasAnimated] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();


useEffect(() => {
  const setupFCM = async () => {
    try {
      if (!("serviceWorker" in navigator)) return;

      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

      const permission = await Notification.requestPermission();

      if (permission !== "granted") return;

      const fcmToken = await getToken(messaging, {
        vapidKey: "BKRiFrLs3dKcSKGuZ4uV7Tn5s6jg34pmRQXN2Rp7QctRq3AO94iFcCDzUbAteokJvJ__8xvzwL1yKhSQzn5xCJg",
        serviceWorkerRegistration: registration,
      });

      if (!fcmToken) return;

      const jwt = localStorage.getItem("token");

      await fetch(`${API}/api/auth/save-fcm-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ fcmToken }),
      });

      console.log("FCM Saved Successfully");
     
    } catch (err) {
      console.log("FCM setup failed:", err);
    }
  };

  setupFCM();
}, []);


  /* ================= FETCH ================= */
   useEffect(() => {
  if (window.innerWidth >= 768) {
    setSidebarOpen(true);
  }
}, []);

useEffect(() => {
  if (location.state?.openOrders) {
    setActivePage("orders");
  }
}, [location.state]);


  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/api/orders/my`, {
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
        axios.get(`${API}/api/orders/my`, {
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
        adminNotes: o.adminNotes || "",
      }));

      const withdrawals = withdrawRes.data.map((w) => ({
        id: w._id,
        type: "WITHDRAW",
        amount: w.amount,
        status: w.status,
        date: w.createdAt,
        adminUtrNumber: w.adminUtrNumber,
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

  const WithdrawPage = () => {
    return <WithdrawPageComponent />;
  };

  useEffect(() => {
    document.title = "iBytex | Enterprise-Grade Crypto Exchange";
  },[])

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

      // ✅ sirf first load pe animate
      setHasAnimated(true);
    };

    loadData();
  }, []);

  // master refresh

  // Rate live refresh
  useEffect(() => {
    const interval = setInterval(fetchRate, 5000);
    return () => clearInterval(interval);
  }, []);

  const BottomItem = ({ icon, label, onClick, active }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-xs 
    transition-all duration-200
    ${active ? "text-yellow-400" : "text-gray-400"}`}
    >
      <span className="text-xl">{icon}</span>
      <span className="mt-1">{label}</span>

      {active && (
        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1"></div>
      )}
    </button>
  );

  // ✅ Dashboard auto refresh (ONLY when dashboard active)
  useEffect(() => {
    if (activePage !== "dashboard") return;

    const interval = setInterval(() => {
      fetchUserOrders();
      fetchApprovedWithdrawals();
      fetchRecentActivity();
    }, 5000);

    return () => clearInterval(interval);
  }, [activePage]);



  // Dashboard live refresh

  const formatNumber = (num) => {
    if (!num) return "0";

    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";

    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";

    if (num >= 1_00000) return (num / 1_00000).toFixed(1) + "K";

    return num;
  };

  /* ================= BTC ================= */

  const StatCard = ({ title, value, green, badge, icon }) => {
    const numericValue = Number(String(value).replace(/[^0-9.-]+/g, ""));

    const hasRupee = String(value).includes("₹");
    const hasUSDT = String(value).includes("USDT");

    return (
      <div
        className="relative bg-white/5 backdrop-blur-xl 
                    border border-white/10 
                    p-4 rounded-2xl 
                    transition-all duration-300 
                    hover:-translate-y-1 
                    hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] max-md:p-3"
      >
        {/* TITLE + BADGE */}
        <div className="flex items-center justify-between">
          <div
            className="w-14 h-14 flex items-center justify-center 
        rounded-xl bg-white/5 border border-white/10 max-md:w-8 max-md:h-8 "
          >
            {icon}
          </div>

          <p className="text-gray-400 text-sm tracking-wide max-md:text-[12px] text-end">
            {title}
          </p>

          {badge && (
            <span
              className="  text-[8px] px-2 py-1 
                           bg-red-500 text-white 
                           rounded-full animate-pulse absolute top-2 right-2      max-md:top-auto
    max-md:right-auto
    max-md:bottom-2
    max-md:left-3"
            >
              {badge}
            </span>
          )}
        </div>

        {/* VALUE WITH COUNTUP */}
        <h2
          className={`text-3xl font-bold  tracking-tight max-md:text-xl justify-end items-end text-end
        ${green ? "text-emerald-400" : "text-white"}`}
        >
          {hasRupee && "₹ "}

          {!hasAnimated ? (
            <CountUp end={numericValue} duration={1.8} separator="," />
          ) : (
            numericValue.toLocaleString()
          )}

          {hasUSDT && " USDT"}
        </h2>
      </div>
    );
  };

  return (
    <div className="h-screen flex bg-[#0b0f19] text-white overflow-hidden">
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#0b0f19] border-b border-gray-800 flex items-center justify-between px-2 z-50">
        <img src="/logot.png" alt="logo" className="w-14 h-14" />
        <button onClick={() => setSidebarOpen(true)} className="text-[30px]">
          ☰
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
    fixed md:relative top-0 right-0 md:right-auto
    h-screen bg-[#111827] border-l md:border-r border-gray-800
    transition-all duration-300 ease-in-out
    flex flex-col z-40

    w-64
    ${sidebarOpen ? "translate-x-0  transition-all duration-300 ease-in-out" : "translate-x-full  transition-all duration-300 ease-in-out"}

    md:translate-x-0
    ${sidebarOpen ? "md:w-64  transition-all duration-300 ease-in-out" : "md:w-20  transition-all duration-300 ease-in-out"}
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
            icon={<HiHome />}
            open={sidebarOpen}
            onClick={() => setActivePage("dashboard")}
          />
          <SidebarItem
            label="Wallet"
            icon={<HiCash />}
            open={sidebarOpen}
            onClick={() => setActivePage("wallet")}
          />
          <SidebarItem
            label="Sell USDT"
            icon={<HiArrowDown />}
            open={sidebarOpen}
            onClick={() => setActivePage("deposit")}
          />
          <SidebarItem
            label="Withdrawal"
            icon={<HiArrowUp />}
            open={sidebarOpen}
            onClick={() => {
              setActivePage((prev) =>
                prev === "withdraw" ? prev : "withdraw",
              );
              setTimeout(() => {
                fetchApprovedWithdrawals();
              }, 100);
            }}
          />
          <SidebarItem
            label="Orders"
            icon={<HiCube />}
            open={sidebarOpen}
            onClick={() => setActivePage("orders")}
          />
          <SidebarItem
            label="Payment Method"
            icon={<HiCreditCard />}
            open={sidebarOpen}
            onClick={() => setActivePage("payment-method")}
          />
          {/* ================= CUSTOMER SUPPORT ================= */}
{/* CUSTOMER SUPPORT DROPDOWN */}
<div>
  <div
    onClick={() => setSupportOpen(!supportOpen)}
    className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1f2937] cursor-pointer"
  >
    <span className="text-lg">
      <MdSupportAgent />
    </span>

    {sidebarOpen && (
      <span className="flex-1">Customer Support</span>
    )}

    {sidebarOpen && (
      <span
        className={`transition-transform duration-300 ${
          supportOpen ? "rotate-90" : ""
        }`}
      >
        ▶
      </span>
    )}
  </div>

  {/* DROPDOWN CONTENT */}
  <div
    className={`overflow-hidden transition-all duration-300 ${
      supportOpen ? "max-h-40 mt-2" : "max-h-0"
    }`}
  >
    <div className="ml-8 space-y-2">

      {/* TELEGRAM */}
      <div
        onClick={() => {
          const token = localStorage.getItem("token");
          if (token) {
            window.open("https://t.me/iBytex_PayCh", "_blank");
          } else {
            window.location.href = "/login";
          }
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-500/10 cursor-pointer text-blue-400 text-sm"
      >
        <FaTelegramPlane />
        {sidebarOpen && "Telegram Support"}
      </div>

      {/* WHATSAPP */}
      <div
        onClick={() => {
          const token = localStorage.getItem("token");
          if (token) {
         window.open("https://wa.me/918057678348", "_blank");
          } else {
            window.location.href = "/login";
          }
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-500/10 cursor-pointer text-green-400 text-sm"
      >
        <FaWhatsapp />
        {sidebarOpen && "WhatsApp Support"}
      </div>

    </div>
  </div>
</div>
          <SidebarItem
            label="Settings"
            icon={<HiCog />}
            open={sidebarOpen}
            onClick={() => setActivePage("settings")}
          />
        </nav>

        {/* PROFILE */}
        <div className="p-4 md:border-t border-gray-800 relative max-md:bottom-14 max-md:border-b">
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

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div
        className="md:hidden fixed bottom-0 left-0 w-full 
bg-[#111827] border-t border-gray-800 
flex justify-around items-center 
py-2 z-50"
      >
        <BottomItem
          icon={<HiHome />}
          label="Home"
          active={activePage === "dashboard"}
          onClick={() => setActivePage("dashboard")}
        />

        <BottomItem
          icon={<HiCash />}
          label="Wallet"
          active={activePage === "wallet"}
          onClick={() => setActivePage("wallet")}
        />

        <BottomItem
          icon={<HiArrowUp />}
          label="Sell USDT"
          active={activePage === "deposit"}
          onClick={() => setActivePage("deposit")}
        />

        <BottomItem
          icon={<HiArrowDown />}
          label="Withdrawal"
          active={activePage === "withdraw"}
          onClick={() => {
            setActivePage((prev) => (prev === "withdraw" ? prev : "withdraw"));
            setTimeout(() => {
              fetchApprovedWithdrawals();
            }, 100);
          }}
        />
        <BottomItem
          label="Orders"
          icon={<HiCube />}
          active={activePage === "orders"}
          onClick={() => setActivePage("orders")}
        />
        <BottomItem
          label="Payout"
          icon={<HiCreditCard />}
          active={activePage === "payment-method"}
          onClick={() => setActivePage("payment-method")}
        />
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
        flex-1 overflow-y-auto transition-all duration-300  pb-24 md:pb-6
        ${sidebarOpen ? "md:ml" : "md:ml"}
        pt-20 md:pt-8 p-6
        `}
      >
        {activePage === "dashboard" && (
          <>
            {/* TOP BANNER */}
            <div className="mb-8 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 flex justify-between items-center shadow-xl max-md:flex-col max-md:p-4">
              {/* Glow Background */}

              <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-hero   blur-[120px] rounded-full"></div>

              <div className="relative z-10">
                <h1 className="text-3xl font-bold text-white font-sn bg-clip-text text-transparent max-md:text-[1.5rem]">
                  Welcome Back, {user?.name} 👋
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Trade Smart. Trade Secure.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-end max-md:hidden">
                <span className="text-xs text-gray-400 mb-1">
                  Live USDT Price
                </span>

                <div className="flex items-center gap-3">
                  <span className="  px-2 py-1 text-[8px] bg-red-500 rounded-full animate-pulse shadow-lg">
                    LIVE
                  </span>

                  <span className="text-2xl font-bold text-emerald-400 drop-shadow-lg">
                    ₹ {rate}
                  </span>
                </div>
              </div>
            </div>

            {/* MARKET TICKER */}

            <div className="mb-8"></div>

            {/* STAT CARDS */}
            <div className="grid md:grid-cols-4 gap-4 mb-10 max-md:grid-cols-2 max-md:mb-5">
              <StatCard
                title="Live USDT Rate"
                value={`₹ ${rate}`}
                green
                badge="LIVE"
                icon={<HiCurrencyRupee className="text-2xl text-emerald-400" />}
              />

              <StatCard
                title="USDT Trade"
                value={`${todayTrade} USDT`}
                icon={<HiCurrencyDollar className="text-2xl text-blue-400" />}
              />

              <StatCard
                title="Available Balance"
                value={`₹ ${Number(availableBalance).toLocaleString()}`}
                green
                icon={<HiCash className="text-2xl text-emerald-400" />}
              />

              <StatCard
                title="Locked Withdrawn"
                value={`₹ ${Number(approvedWithdraw).toLocaleString()}`}
                icon={<HiLockClosed className="text-2xl text-yellow-400" />}
              />
            </div>

            {/* RECENT ACTIVITY */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold max-md:text-[16px]">
                  Recent Activity
                </h2>

                <button
                  onClick={() => setActivePage("orders")}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:scale-105 transition-all max-md:text-[12px]"
                >
                  View All Orders →
                </button>
              </div>

              {recentActivity.length === 0 ? (
                <p className="text-gray-400">No recent activity</p>
              ) : (
                <div className="space-y-6 flex flex-col ">
                  {recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-[#111827]/80 to-[#0f172a]/80 border border-white/10 transition-all duration-500 hover:-translate-y-2  "
                    >
                      {/* LEFT COLOR STRIP */}
                      <div
                        className={`absolute left-0 top-0 h-full w-1 max-md:w-[2px] max-md:opacity-50 ${
                          item.type === "SELL"
                            ? "bg-emerald-400"
                            : "bg-yellow-400"
                        }`}
                      />

                      <div
                        className="
relative p-8 
flex justify-between items-start gap-6
max-md:p-4 
max-md:flex-col 
max-md:gap-0

"
                      >
                        {/* LEFT SECTION */}
                        <div
                          className="
flex gap-6 flex-1 
max-md:flex-col 
max-md:gap-3
"
                        >
                          {/* ICON */}
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold max-md:w-12 max-md:h-9  max-md:text-[12px]  ${
                              item.type === "SELL"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            {item.type === "SELL" ? "S" : "W"}
                          </div>

                          {/* CONTENT BLOCK */}
                          <div
                            className="
flex flex-col gap-3 
w-full max-w-xl
max-md:w-full
"
                          >
                            <div
                              className="
flex items-start gap-3 flex-col 
max-md:flex-col 
max-md:items-start 
"
                            >
                              {/* TITLE */}
                              <h3 className="text-lg font-semibold tracking-wide flex">
                                {item.type === "SELL"
                                  ? `Sell ${item.amount} USDT`
                                  : `Withdraw ₹ ${item.amount}`}
                              </h3>
                              <p className="text-xs text-gray-400">
                                {new Date(item.date).toLocaleString()}
                              </p>

                              {/* AMOUNT */}
                              {item.type === "SELL" && (
                                <div className="text-emerald-400 font-medium text-sm max-md:text-xs">
                                  How Much Amount Recived ₹ {item.inr}
                                </div>
                              )}

                              <div>
                                <span
                                  className={`absolute top-4 right-9 max-md:right-4
  px-3 py-1 text-xs rounded-full font-semibold tracking-wide whitespace-nowrap 
  ${
    item.status === "COMPLETED" || item.status === "APPROVED"
      ? "bg-emerald-500/20 text-emerald-400"
      : item.status === "REJECTED"
        ? "bg-red-500/20 text-red-400"
        : item.status === "FAILED"
          ? "bg-orange-500/20 text-orange-400"
          : "bg-yellow-500/20 text-yellow-400"
  }`}
                                >
                                  {item.status}
                                </span>
                              </div>
                            </div>
                            {/* ADMIN NOTE */}
                            {item.adminNotes && item.adminNotes !== "" && (
                              <div className="mt-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-4 py-2 max-md:mt-0 w-full md:w-fit md:min-w-[180px] max-md:px-3 max-md:py-1">
                                <p className="text-yellow-400 text-xs font-semibold mb-1">
                                  Admin Note
                                </p>
                                <p className="text-sm text-gray-300">
                                  {item.adminNotes}
                                </p>
                              </div>
                            )}

                            {/* WITHDRAW UTR NUMBER */}
                            {item.type === "WITHDRAW" &&
                              item.adminUtrNumber && (
                                <div className="mt-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-4 py-3 w-fit min-w-[180px] max-md:px-3 max-md:py-1">
                                  <p className="text-cyan-400 text-xs font-semibold mb-1">
                                    Transaction UTR
                                  </p>
                                  <p className="text-sm text-gray-300 tracking-wide w-full md:w-fit md:min-w-[220px]">
                                    No - {item.adminUtrNumber}
                                  </p>
                                </div>
                              )}

                            {/* DATE + STATUS ROW */}
                          </div>
                        </div>

                        {/* RIGHT BUTTON */}
                        <div
                          className="
ml-6 flex flex-col items-end gap-3 
max-md:ml-0 
max-md:w-full 
max-md:flex-row 
max-md:justify-between 
max-md:items-center
"
                        >
                          <div></div>
                          <button
                            onClick={() =>
                              setActivePage(
                                item.type === "SELL" ? "orders" : "withdraw",
                              )
                            }
                            className="px-6 py-2 rounded-2xl font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:scale-105 transition-all duration-300 shadow-lg max-md:px-4 max-md:py-2 max-md:text-sm mt-5 max-md:mt-0 max-md:bottom-7 max-md:absolute max-md:right-4"
                          >
                            View →
                          </button>
                        </div>
                      </div>
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



      {/* POPUP MODAL */}

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

const DepositPage = () => <PlaceOrder />;

const OrdersPage = () => <UserOrderStaus />;
const Payment = () => <PaymentMethod />;

export default DashboardLayout;
