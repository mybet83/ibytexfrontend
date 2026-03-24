import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { io } from "socket.io-client";
import {
  HiCash,
  HiArrowDown,
  HiCurrencyRupee,
  HiLockClosed,
} from "react-icons/hi";

const API = process.env.REACT_APP_API_URL;

const WalletPage = ({ setActivePage, theme }) => {
  const [totalSold, setTotalSold] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [pendingWithdraw, setPendingWithdraw] = useState(0);

  const previousSold = useRef(0);
  const previousWithdraw = useRef(0);

  const token = localStorage.getItem("token");

  /* ================= FETCH WALLET ================= */

  const fetchWalletData = async () => {
    try {
      const [ordersRes, withdrawRes] = await Promise.all([
        axios.get(`${API}/api/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API}/api/withdrawal/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      /* ================= ORDERS ================= */

      const completedOrders = ordersRes.data.filter(
        (o) => o.status === "COMPLETED",
      );

      const soldINR = completedOrders.reduce(
        (acc, curr) =>
          acc + Number(curr.usdtAmount || 0) * Number(curr.rate || 0),
        0,
      );

      /* ================= WITHDRAWALS ================= */

      const approvedWithdrawals = withdrawRes.data.filter(
        (w) => w.status === "APPROVED",
      );

      const pendingWithdrawals = withdrawRes.data.filter(
        (w) => w.status === "PENDING",
      );

      const approvedTotal = approvedWithdrawals.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0,
      );

      const pendingTotal = pendingWithdrawals.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0,
      );

      /* ================= RECENT ACTIVITY ================= */

      const sellActivity = ordersRes.data.map((o) => ({
        id: o._id,
        type: "SELL",
        amount: o.usdtAmount,
        inr: Number(o.usdtAmount || 0) * Number(o.rate || 0),
        status: o.status,
        date: o.createdAt,
        adminNotes: o.adminNotes || null,
      }));

      const withdrawActivity = withdrawRes.data.map((w) => ({
        id: w._id,
        type: "WITHDRAW",
        amount: w.amount,
        status: w.status,
        date: w.createdAt,
        utrNumber: w.adminUtrNumber || null,
      }));

      const combined = [...sellActivity, ...withdrawActivity]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

      /* ================= SET STATE ================= */

      previousSold.current = totalSold;
      previousWithdraw.current = totalWithdraw;

      setTotalSold(soldINR);
      setTotalWithdraw(approvedTotal);
      setPendingWithdraw(pendingTotal);

      setRecentActivity(combined);

      setLoading(false);

      if (!hasAnimated) {
        setHasAnimated(true);
      }
    } catch (err) {
      console.log("Wallet fetch failed");
    }
  };

  useEffect(() => {
    document.title = "iBytex | Fast, Secure & Transparent Trading";
  }, []);

  useEffect(() => {
    const socket = io(API);

    socket.emit("join", userId); // join room

    socket.on("wallet_update", (data) => {
      setTotalSold(data.totalSold);
      setTotalWithdraw(data.totalWithdraw);
    });

    return () => socket.disconnect();
  }, []);

  /* INITIAL LOAD */
  useEffect(() => {
    fetchWalletData();
  }, []);

  /* REAL TIME AUTO UPDATE */
  useEffect(() => {
    const interval = setInterval(fetchWalletData, 5000);
    return () => clearInterval(interval);
  }, []);

  const availableBalance = totalSold - totalWithdraw - pendingWithdraw;
  const lockedBalance = totalWithdraw;

  /* Smooth Number Render */
  const renderNumber = (value) => {
    if (loading) return "...";

    if (!hasAnimated) {
      return <CountUp end={value} duration={1.5} separator="," />;
    }

    return value.toLocaleString();
  };

  const StatCard = ({ title, value, icon, green, yellow, red, theme }) => {
  return (
    <div
      className={`p-4 rounded-2xl border border-white/10 flex justify-between items-center
      ${theme === "dark" ? "bg-[#191D23]" : "bg-white"}
      `}
    >
      {/* LEFT SIDE (ICON + TEXT) */}
      <div className="flex items-center gap-5 ">
        
        {/* ICON */}
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
          {icon}
        </div>
      </div>
        {/* TEXT */}
        <div>
          <p className="text-xs text-gray-400 text-end mb-1">{title}</p>

          <h2
            className={`text-xl font-semibold text-end
            ${green && "text-emerald-400"}
            ${yellow && "text-yellow-400"}
            ${red && "text-red-400"}
            `}
          >
            {value}
          </h2>
        </div>

    </div>
  );
};

  /* ================= UI ================= */

  return (
    <div
      className={`min-h-screen max-md:p-0 ${
        theme === "dark" ? "bg-[#0D0F11] text-white" : "bg-[#F1F3F4] text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-3 max-md:mb-4 px-3">Wallet</h1>

      {/* ===== BALANCE CARDS ===== */}
<div className="grid md:grid-cols-4 gap-5 mb-5 max-md:grid-cols-2">

  <StatCard
    title="Total Earned"
    value={`₹ ${renderNumber(totalSold)}`}
    icon={<HiCurrencyRupee className="text-xl text-emerald-400" />}
    theme={theme}
  />

  <StatCard
    title="Available Balance"
    value={`₹ ${renderNumber(availableBalance)}`}
    icon={<HiCash className="text-xl text-emerald-400" />}
    green
    theme={theme}
  />

  <StatCard
    title="Pending Withdrawal"
    value={`₹ ${renderNumber(pendingWithdraw)}`}
    icon={<HiArrowDown className="text-xl text-yellow-400" />}
    yellow
    theme={theme}
  />

  <StatCard
    title="Locked Withdrawn"
    value={`₹ ${renderNumber(lockedBalance)}`}
    icon={<HiLockClosed className="text-xl text-red-400" />}
    red
    theme={theme}
  />

</div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="flex gap-4 mb-5 px-5 justify-end max-md:mt-5 max-md:justify-between">
             <button
          onClick={() => setActivePage("withdraw")}
          className={`px-6 py-3 rounded-xl font-semibold text-[12px] ${theme === "dark" ? "bg-[#1f2937]" : "bg-white"}`}
        >
          Withdraw
        </button>

        <button
          onClick={() => setActivePage("deposit")}
          className="px-6 py-3 rounded-xl font-semibold text-black text-[12px] "
          style={{
            background: "linear-gradient(135deg, #F5C56B 0%, #D4A017 100%)",
          }}
        >
          Sell USDT
        </button>

   
      </div>

      {/* ===== RECENT TRANSACTIONS ===== */}
 <div
  className={`rounded-2xl p-6 border backdrop-blur-xl
  ${theme === "dark"
      ? "bg-[#191D23] border-white/10 text-white"
      : "bg-white border-gray-200 text-black"
  }`}
>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Recent Transactions</h2>
  </div>

  {recentActivity.length === 0 ? (
    <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm`}>
      No recent activity
    </p>
  ) : (
    <div className="space-y-4">
      {recentActivity.map((item) => (
        <div
          key={item.id}
          className={`grid grid-cols-3 items-center pb-4 border-b
          ${theme === "dark" ? "border-white/10" : "border-gray-200"}
          `}
        >
          
          {/* LEFT */}
          <div>
            <p className="font-semibold text-sm">
              {item.type === "SELL"
                ? `Sold ${item.amount} USDT`
                : `Withdraw ₹ ${item.amount}`}
            </p>

            <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {new Date(item.date).toLocaleString()}
            </p>
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center justify-center text-center text-xs">

            {item.type === "WITHDRAW" && item.utrNumber && (
              <p className="text-yellow-400 font-medium">
                UTR: <br></br> <span className="font-bold text-gray-400">{item.utrNumber}</span>
              </p>
            )}

            {item.adminNotes && (
              <p className="text-yellow-400 mt-1">
                Admin: <br></br> <span className="font-bold text-gray-400">{item.adminNotes}</span>
              </p>
            )}

            {item.status === "PENDING" && (
              <p className="text-gray-400 mt-1 text-[11px]">
                Waiting for approval...
              </p>
            )}

          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end gap-2">

            {/* AMOUNT */}
            {item.type === "SELL" ? (
              <p className="text-green-400 font-semibold">
                +₹{item.inr}
              </p>
            ) : (
              <p className="text-red-400 font-semibold">
                -₹{item.amount}
              </p>
            )}

            {/* STATUS */}
            <span
              className={`text-[10px] px-3 py-1 rounded-full font-medium
              ${
                item.status === "COMPLETED" || item.status === "APPROVED"
                  ? "bg-green-500/20 text-green-400"
                  : item.status === "REJECTED"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {item.status === "PENDING"
                ? "PENDING"
                : item.status}
            </span>

          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
};

export default WalletPage;
