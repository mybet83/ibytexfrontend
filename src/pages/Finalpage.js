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
import { messaging, getToken } from "../firebase"; // agar firebase.js src me hai
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
import UsdtGraph from "../components/UsdtGraph";
import StatsWidget from "../components/DashboardGraphs";
import RecentActivityCard from "../components/RecentActivityCard";


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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [pendingWithdraw, setPendingWithdraw] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();

  const availableBalance = Math.max(
    totalSold - approvedWithdraw - pendingWithdraw,
    0,
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const setupFCM = async () => {
      try {
        if (!("serviceWorker" in navigator)) return;

        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
        );

        const permission = await Notification.requestPermission();

        if (permission !== "granted") return;

        const fcmToken = await getToken(messaging, {
          vapidKey:
            "BKRiFrLs3dKcSKGuZ4uV7Tn5s6jg34pmRQXN2Rp7QctRq3AO94iFcCDzUbAteokJvJ__8xvzwL1yKhSQzn5xCJg",
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
    const pending = res.data.filter((w) => w.status === "PENDING");

    const approvedTotal = approved.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    );

    const pendingTotal = pending.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    );

    setApprovedWithdraw(approvedTotal);
    setPendingWithdraw(pendingTotal);
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
  return <WithdrawPageComponent theme={theme} />;
};

  useEffect(() => {
    document.title = "iBytex | Enterprise-Grade Crypto Exchange";
  }, []);

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

  const handlePageChange = (page) => {
    setActivePage(page);

    // mobile me sidebar auto close
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };


useEffect(() => {
  fetch("/api/dashboard")
    .then(res => res.json())
    .then(res => setData(res));
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

  const StatCard = ({ title, value, green, badge, icon  }) => {
    const numericValue = Number(String(value).replace(/[^0-9.-]+/g, ""));

    const hasRupee = String(value).includes("₹");
    const hasUSDT = String(value).includes("USDT");

    return (
      <div
        className={`relative bg-[#191D23] backdrop-blur-xl 
                    border border-white/10 
                    p-4 rounded-2xl 
                    transition-all duration-300 
                    hover:-translate-y-1 
                    hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] max-md:p-3 ${
                      theme === "dark"
                        ? "bg-[#0D0F11] text-white"
                        : "bg-[#Ffff] text-black"
                    }`}
      >
        {/* TITLE + BADGE */}
        <div className="flex items-center justify-between">
          <div
            className="w-8 h-8 flex items-center justify-center 
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
                           rounded-full animate-pulse absolute bottom-3 left-4      max-md:top-auto
    max-md:right-auto
    max-md:bottom-2
    max-md:left-3 "
            >
              {badge}
            </span>
          )}
        </div>

        {/* VALUE WITH COUNTUP */}
    <h2
  className={`text-xl font-bold tracking-tight max-md:text-xl text-end
  ${green ? "text-emerald-400" : theme === "dark" ? "text-white" : "text-black"}
  `}
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
    <div
      className={`h-screen flex overflow-hidden ${
        theme === "dark" ? "bg-[#0D0F11] text-white" : "bg-[#F1F3F4] text-black"
      }`}
    >
      {/* MOBILE HEADER */}
   <div
  className={`md:hidden fixed top-0 left-0 w-full h-16 flex items-center justify-between px-2 z-50
  ${
    theme === "dark"
      ? "bg-[#111827] border-b border-gray-800 text-white"
      : "bg-white border-b border-gray-200 text-black"
  }
`}
>
        <img src="/logot.png" alt="logo" className="w-14 h-14" />
        <button onClick={() => setSidebarOpen(true)} className="text-[30px]">
          ☰
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
    fixed md:relative top-0 right-0 md:right-auto
    h-screen 
    transition-all duration-300 ease-in-out
    flex flex-col z-40 

    w-52
    ${sidebarOpen ? "translate-x-0  transition-all duration-300 ease-in-out" : "translate-x-full  transition-all duration-300 ease-in-out"}

    md:translate-x-0
    ${sidebarOpen ? "md:w-52  transition-all duration-300 ease-in-out" : "md:w-20  transition-all duration-300 ease-in-out"}
    ${
      theme === "dark" ? "bg-[#191D23] text-white " : "bg-[#FFFFFF] text-black "
    }
    
  `}
      >
        {/* LOGO */}
        <div
          className={`flex items-center justify-between p-4 border-b group relative max-md:pb-0 ${
            theme === "dark"
              ? "border-gray-800 text-yellow-400"
              : "border-[#e1dcdc] "
          }
    
  `}
        >
          <div
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap- cursor-pointer"
          >
            <img src="/logot.png" alt="logo" className="w-12 h-12" />
            {sidebarOpen && <h1 className="text-xl font-bold ">iBytex</h1>}
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
        <nav className="p-4 space-y-3 flex-1 text-[12px]">
          <SidebarItem
            label="Dashboard"
            icon={<HiHome />}
            open={sidebarOpen}
            active={activePage === "dashboard"}
            onClick={() => handlePageChange("dashboard")}
            theme={theme}
          />
          <SidebarItem
            label="Wallet"
            icon={<HiCash />}
            open={sidebarOpen}
            active={activePage === "wallet"}
            onClick={() => handlePageChange("wallet")}
            theme={theme}
          />
          <SidebarItem
            label="Sell USDT"
            icon={<HiArrowDown />}
            open={sidebarOpen}
            active={activePage === "deposit"}
            onClick={() => handlePageChange("deposit")}
            theme={theme}
          />
          <SidebarItem
            label="Withdrawal"
            icon={<HiArrowUp />}
            open={sidebarOpen}
            active={activePage === "withdraw"}
            theme={theme}
            onClick={() => {
              handlePageChange((prev) =>
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
            active={activePage === "orders"}
            onClick={() => handlePageChange("orders")}
            theme={theme}
          />
          <SidebarItem
            label="Payment Method"
            icon={<HiCreditCard />}
            open={sidebarOpen}
            active={activePage === "payment-method"}
            onClick={() => handlePageChange("payment-method")}
            theme={theme}
          />
          {/* ================= CUSTOMER SUPPORT ================= */}
          {/* CUSTOMER SUPPORT DROPDOWN */}
          <div>
            <div
              onClick={() => setSupportOpen(!supportOpen)}
              active={activePage === "supportOpen"}
              className={`group flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-[12px] ${
                theme === "dark" ? "hover:bg-[#1f2937] " : "hover:bg-gray-200 "
              }`}
            >
              <span className="text-base">
                <MdSupportAgent />
              </span>

              {sidebarOpen && <span className="flex-1">Customer Support</span>}

              {sidebarOpen &&
                ((
                  <span
                    className={`transition-transform duration-300 ${
                      supportOpen ? "rotate-90" : ""
                    }`}
                  >
                    ▶
                  </span>
                ),
                (
                  <span
                    className={`transition-transform  duration-300 ${
                      supportOpen ? "-rotate-90" : ""
                    }`}
                  >
                    ◀
                  </span>
                ))}
            </div>

            {/* DROPDOWN CONTENT */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                supportOpen ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <div className="ml-4 space-y-2 ">
                {/* TELEGRAM */}
                <div
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (token) {
                      window.open("https://t.me/iBytex_Pay", "_blank");
                    } else {
                      window.location.href = "/login";
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-500/10 cursor-pointer text-blue-400 text-[12px]"
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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-500/10 cursor-pointer text-green-400 text-[12px]"
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
            active={activePage === "settings"}
            onClick={() => handlePageChange("settings")}
            theme={theme}
          />
        </nav>

        {/* PROFILE */}
    <div
  className={`p-4 md:border-t relative max-md:bottom-14 max-md:border-b
  ${
    theme === "dark"
      ? "border-gray-800 text-white"
      : "border-gray-200 text-black hover:bg-gray-200"
  }`}
>
  <button
    onClick={() => setProfileOpen(!profileOpen)}
    className={`w-full flex items-center gap-3 p-2 rounded-lg
    ${
      theme === "dark"
        ? "hover:bg-[#1f2937] max-md:hover:bg-[#1f293700]"
        : "hover:bg-gray-200 max-md:hover:bg-[#1f293700]"
    }`}
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
    <div
      className={`absolute bottom-16 left-4 w-56 rounded-xl shadow-xl py-2 z-50
      ${
        theme === "dark"
          ? "bg-[#111827] border border-gray-700 text-white"
          : "bg-white border border-gray-200 text-black"
      }`}
    >
      <button
        onClick={() => (window.location.href = "/login")}
        className={`w-full text-left px-4 py-2
        ${
          theme === "dark"
            ? "hover:bg-[#1f2937]"
            : "hover:bg-gray-100"
        }`}
      >
        🔄 Sign another account
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
        className={`w-full text-left px-4 py-2 text-red-400
        ${
          theme === "dark"
            ? "hover:bg-[#1f2937]"
            : "hover:bg-gray-100"
        }`}
      >
        🚪 Logout
      </button>

      <div
        className={`px-4 py-3 mt-2 border-t
        ${
          theme === "dark"
            ? "border-gray-700"
            : "border-gray-200"
        }`}
      >
        <div
          className={`rounded-lg p-3 space-y-2 border
          ${
            theme === "dark"
              ? "bg-[#0f172a] border-gray-800"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <div className="text-xs">
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Email
            </p>
            <p className={`font-medium break-all ${theme === "dark" ? "text-white" : "text-black"}`}>
              {user?.email}
            </p>
          </div>

          <div className="text-xs">
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Account ID
            </p>
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
  className={`md:hidden fixed bottom-0 left-0 w-full 
  flex justify-around items-center py-2 z-50
  ${
    theme === "dark"
      ? "bg-[#111827] border-t border-gray-800 text-white"
      : "bg-white border-t border-gray-200 text-black"
  }
`}
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
        pt-20 md:pt-4 p-5
        `}
      >
        {activePage === "dashboard" && (
          <>
            {/* TOP BANNER */}
<div className="flex justify-between items-start mb-5 ">

  {/* LEFT MAIN HEADER */}
  <div
    className={`relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-2xl p-3 flex justify-between px-3 items-center shadow-xl w-full ${
      theme === "dark" ? "bg-[#191D23]" : "bg-white"
    }`}
  >
    {/* LEFT TEXT */}
    <div>
      <h1 className={`text-2xl font-sn font-bold max-sm:w-[90%]  ${theme === "dark" ? "text-white" : "text-black/70"}`}>
        Welcome Back, <span className="text-yellow-500 "> {user?.name} 👋 </span>
      </h1>

      <p className="italic font-light 
        bg-gradient-to-r from-yellow-400 to-blue-400 
        bg-clip-text text-transparent text-sm mt-1">
        Trade Smart. Trade Secure.
      </p>
    </div>

    {/* RIGHT PRICE */}



  {/* 🔥 THEME BUTTON (OUTSIDE) */}
<div
  onClick={toggleTheme}
  className="relative w-[90px] h-[40px] cursor-pointer select-none 
  max-sm:w-[80px] max-sm:h-[32px]"
>
  {/* BACKGROUND */}
  <div
    className={`absolute inset-0 rounded-full backdrop-blur-xl border shadow-inner
    ${
      theme === "dark"
        ? "bg-white/10 border-white/20"
        : "bg-black/10 border-gray-300"
    }`}
  ></div>

  {/* TEXT (HIDE IN MOBILE) */}
  <div className="absolute inset-0 flex items-center justify-between px-4 text-sm font-medium max-sm:hidden">
    <span className={`${theme === "dark" ? "opacity-0 text-black" : "opacity-100 text-black"}`}>
      Dark
    </span>
    <span className={`${theme === "dark" ? "opacity-100 text-white" : "opacity-40 text-black"}`}>
      Light
    </span>
  </div>

  {/* TOGGLE CIRCLE */}
  <div
    className={`absolute bottom-[5px] rounded-full 
    backdrop-blur-2xl border flex items-center justify-center
    shadow-[0_8px_20px_rgba(0,0,0,0.3)]
    transition-all duration-500

    w-[30px] h-[30px] text-lg
    max-sm:w-[22px] max-sm:h-[22px] max-sm:text-sm

    ${
      theme === "dark"
        ? "left-[4px] bg-white/20 border-white/30"
        : "left-[54px] max-sm:left-[34px] bg-black/20 border-gray-300"
    }
    `}
  >
    {theme === "dark" ? "☀️" : "🌙"}
  </div>
</div>
</div>
</div>

            {/* MARKET TICKER */}

            {/* STAT CARDS */}
            <div className="grid grid-cols-4 gap-4  max-lg:grid-cols-2 max-md:mb-5">
              <StatCard
                title="Live USDT Rate"
                value={`₹ ${rate}`}
                green
                badge="LIVE"
                icon={<HiCurrencyRupee className="text-xl text-emerald-400" />}
              />

              <StatCard
                title="USDT Trade"
                value={`${todayTrade} USDT`}
                icon={<HiCurrencyDollar className="text-xl text-blue-400" />}
              />

              <StatCard
                title="Available Balance"
                value={`₹ ${Number(availableBalance).toLocaleString()}`}
                green
                icon={<HiCash className="text-xl text-emerald-400" />}
              />

              <StatCard
                title="Locked Withdrawn"
                value={`₹ ${Number(approvedWithdraw).toLocaleString()}`}
                icon={<HiLockClosed className="text-xl text-yellow-400" />}
              />
            </div>
<div className="grid grid-cols-1 lg:grid-cols-[40%_58%] gap-6 mt-5 items-stretch">

  {/* GRAPH */}
  <div className="h-full">
    <UsdtGraph liveRate={rate} theme={theme} />
  </div>

  {/* ACTIVITY */}
  <div className="h-full">
    <RecentActivityCard
      data={recentActivity}
      theme={theme}
      onViewAll={() => setActivePage("orders")}
    />
  </div>

</div>
     <StatsWidget
  availableBalance={availableBalance}
  lockedAmount={approvedWithdraw}
  usdtTrade={todayTrade}
  theme={theme}
/>







   

            {/* RECENT ACTIVITY */}
            {/* <div className="mt-8 max-md:mt-5">
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
                      className="group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-[#191D23] border border-white/10 transition-all duration-500 hover:-translate-y-2  "
                    >
             
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
  
                        <div
                          className="
flex gap-6 flex-1 
max-md:flex-col 
max-md:gap-3
"
                        >

                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold max-md:w-12 max-md:h-9  max-md:text-[12px]  ${
                              item.type === "SELL"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            {item.type === "SELL" ? "S" : "W"}
                          </div>

                 
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
                          
                              <h3 className="text-lg font-semibold tracking-wide flex">
                                {item.type === "SELL"
                                  ? `Sell ${item.amount} USDT`
                                  : `Withdraw ₹ ${item.amount}`}
                              </h3>
                              <p className="text-xs text-gray-400">
                                {new Date(item.date).toLocaleString()}
                              </p>

                          
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

                    
                          </div>
                        </div>

                    
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
            </div> */}
          </>
        )}


     {activePage === "wallet" && (
  <WalletPage setActivePage={setActivePage} theme={theme} />
)}

 
        {activePage === "deposit" && <DepositPage theme={theme} />}
        {activePage === "withdraw" && <WithdrawPage theme={theme}/>}
        {activePage === "orders" && <OrdersPage theme={theme} />}
        {activePage === "payment-method" && <Payment theme={theme}/>}
        {activePage === "settings" && <SettingsPage user={user}  theme={theme}/>}
      </div>

      {/* ================= SUPPORT ASSISTANT ================= */}

      {/* POPUP MODAL */}
    </div>
  );
};

/* COMPONENTS */
const SidebarItem = ({ label, icon, open, onClick, active, theme }) => (
  <div
    onClick={onClick}
    className={`group flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer relative transition-all duration-200

    ${
      theme === "dark"
        ? "text-gray-300 hover:bg-[#1f2937] hover:text-white"
        : "text-gray-700 hover:bg-gray-200 hover:text-black"
    }

    ${
      active
        ? "bg-yellow-400/20 text-yellow-500 font-semibold hover:translate-x-0"
        : ""
    }
    `}
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







const StatCard = ({ title, value, green, badge, icon , theme}) => {
  return (
    <div
      className={`relative 
      bg-gradient-to-br from-[#0f172a] to-[#020617]
      border border-white/10 
      px-4 py-3 rounded-xl
      transition-all duration-300 
      hover:scale-[1.02]
      ${
        theme === "dark"
          ? "text-white"
          : "bg-white text-black border-gray-200"
      }`}
    >
      {/* TOP */}
      <div className="flex items-center justify-between mb-2">
        
        {/* ICON */}
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-sm">
          {icon}
        </div>

        {/* TITLE */}
        <p className="text-gray-400 text-xs tracking-wide text-right">
          {title}
        </p>

        {badge && (
          <span className="text-[8px] px-2 py-1 bg-red-500 text-white rounded-full absolute top-2 right-2">
            {badge}
          </span>
        )}
      </div>

      {/* VALUE */}
      <h2
        className={`text-xl font-semibold tracking-tight text-right ${
          green ? "text-emerald-400" : ""
        }`}
      >
        {value}
      </h2>
    </div>
  );
};


const DepositPage = ({ theme }) => <PlaceOrder theme={theme} />;

const OrdersPage = ({ theme }) => <UserOrderStaus theme={theme} />;
const Payment = ({theme }) => <PaymentMethod theme={theme}/>;

export default DashboardLayout;
