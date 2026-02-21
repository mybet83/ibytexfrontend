import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const API = process.env.REACT_APP_API_URL;

const WalletPage = ({ setActivePage }) => {
  const [totalSold, setTotalSold] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* ================= FETCH WALLET ================= */

  const fetchWalletData = async () => {
    try {
      const [ordersRes, withdrawRes] = await Promise.all([
        axios.get(`${API}/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API}/api/withdrawal/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      /* ===== TOTAL SOLD (COMPLETED ONLY) ===== */
      const completedOrders = ordersRes.data.filter(
        (o) => o.status === "COMPLETED",
      );

      const soldINR = completedOrders.reduce(
        (acc, curr) =>
          acc + Number(curr.usdtAmount || 0) * Number(curr.rate || 0),
        0,
      );

      /* ===== TOTAL WITHDRAW (APPROVED ONLY) ===== */
      const approvedWithdrawals = withdrawRes.data.filter(
        (w) => w.status === "APPROVED",
      );

      const withdrawTotal = approvedWithdrawals.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0,
      );

      /* ===== RECENT ACTIVITY (SELL + WITHDRAW) ===== */
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

      setRecentActivity(combined);
      setTotalSold(soldINR);
      setTotalWithdraw(withdrawTotal);
      setLoading(false);
    } catch (err) {
      console.log("Wallet fetch failed");
      setLoading(false);
    }
  };

  /* ===== INITIAL LOAD ===== */
  useEffect(() => {
    fetchWalletData();
  }, []);

  /* ===== LIVE AUTO REFRESH EVERY 5s ===== */
  useEffect(() => {
    const interval = setInterval(() => {
      fetchWalletData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ===== CALCULATED VALUES ===== */
  const availableBalance = totalSold - totalWithdraw;
  const lockedBalance = totalWithdraw;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Wallet</h1>

      {/* ===== BALANCE CARDS ===== */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Total Earned */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-[#111827] p-6 rounded-2xl border border-white/10"
        >
          <p className="text-gray-400 text-sm">Total Earned</p>
          <h2 className="text-3xl font-bold mt-2">
            ₹ {loading ? "..." : <CountUp end={totalSold} duration={1} />}
          </h2>
        </motion.div>

        {/* Available */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-emerald-900/30 p-6 rounded-2xl border border-emerald-500/20"
        >
          <p className="text-emerald-300 text-sm">Available Balance</p>
          <h2 className="text-3xl font-bold mt-2 text-emerald-400">
            ₹{" "}
            {loading ? "..." : <CountUp end={availableBalance} duration={1} />}
          </h2>
        </motion.div>

        {/* Locked */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-yellow-900/30 p-6 rounded-2xl border border-yellow-500/20"
        >
          <p className="text-yellow-300 text-sm">Locked (Withdrawn)</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-400">
            ₹ {loading ? "..." : <CountUp end={lockedBalance} duration={1} />}
          </h2>
        </motion.div>
      </div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setActivePage("deposit")}
          className="px-6 py-3 rounded-xl font-semibold text-black"
          style={{
            background: "linear-gradient(135deg, #F5C56B 0%, #D4A017 100%)",
          }}
        >
          Sell USDT
        </button>

        <button
          onClick={() => setActivePage("withdraw")}
          className="px-6 py-3 rounded-xl font-semibold bg-[#1f2937]"
        >
          Withdraw
        </button>
      </div>

      {/* ===== RECENT TRANSACTIONS ===== */}
      <div className="bg-[#111827] rounded-2xl border border-white/10 p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

        {recentActivity.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-700 pb-3"
              >
                <div className="flex flex-col">
                  <div className="flex gap-3">
                  <p className="font-semibold">
                    {item.type === "SELL"
                      ? `Sold ${item.amount} USDT`
                      : `Withdraw ₹ ${item.amount}`}
                  </p>
                
                   {item.type === "SELL" && (
                    <p className="text-green-400 text-base">₹ {item.inr}</p>
                  )}
                  </div>
                    {item.type === "WITHDRAW" && item.utrNumber && (
                    <p className="text-base text-blue-400 mt-1">
                      UTR Number : {item.utrNumber}
                    </p>
                  )}

                  {item.adminNotes && (
                    <div className="mt-2 bg-yellow-500/10 border border-yellow-500/30 px-3 py-2 rounded-lg">
                      <p className="text-xs text-yellow-400 font-semibold">
                        Admin Note
                      </p>
                      <p className="text-xs text-gray-300 mt-1">
                        {item.adminNotes}
                      </p>
                    </div>
                  )}

                 

                
                </div>
                <div className=" relative flex justify-end flex-col items-end gap-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    item.status === "COMPLETED" || item.status === "APPROVED"
                      ? "bg-green-500/20 text-green-400"
                      : item.status === "REJECTED"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {item.status}
                  
                </span>
                  <p className="text-sm text-gray-400">
                    {new Date(item.date).toLocaleString()}
                  </p>
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
