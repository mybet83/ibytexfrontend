import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function AdminHistory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [historyData, setHistoryData] = useState(null);
  const [withdrawHistory, setWithdrawHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("SELL");

  const fetchHistory = async (selectedDate = date) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API}/orders/admin/history?date=${selectedDate}`,
        authHeader
      );
      setHistoryData(res.data);
    } catch {
      toast.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const fetchWithdrawHistory = async (selectedDate = date) => {
    try {
      const res = await axios.get(
        `${API}/admin/withdrawal/history?date=${selectedDate}`,
        authHeader
      );
      setWithdrawHistory(res.data);
    } catch {
      toast.error("Failed to fetch withdrawal history");
    }
  };

  useEffect(() => {
    fetchHistory(today);
    fetchWithdrawHistory(today);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📊 Transaction History</h1>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
        >
          Back
        </button>
      </div>

      {/* DATE SELECT */}
      <div className="bg-white/10 p-6 rounded-xl mb-6">
        <div className="flex gap-4 items-center">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
          />
          <button
            onClick={() => {
              fetchHistory();
              fetchWithdrawHistory();
            }}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
          >
            {loading ? "Loading..." : "Get History"}
          </button>
        </div>
      </div>

      {/* TOGGLE */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("SELL")}
          className={`px-6 py-2 rounded-xl font-semibold ${
            activeTab === "SELL"
              ? "bg-green-600"
              : "bg-white/10 text-gray-300"
          }`}
        >
          💰 Sell History
        </button>

        <button
          onClick={() => setActiveTab("WITHDRAW")}
          className={`px-6 py-2 rounded-xl font-semibold ${
            activeTab === "WITHDRAW"
              ? "bg-purple-600"
              : "bg-white/10 text-gray-300"
          }`}
        >
          💸 Withdrawal History
        </button>
      </div>

      {/* ================= SELL SECTION ================= */}
      {activeTab === "SELL" && historyData && (
        <>
          
               {/* SELL SUMMARY */}
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-xl">
        <p className="text-gray-400">Total USDT Received</p>
        <h2 className="text-2xl font-bold text-green-400">
          {historyData.totalUsdt}
        </h2>
      </div>

      <div className="bg-white/10 p-6 rounded-xl">
        <p className="text-gray-400">Total INR Paid</p>
        <h2 className="text-2xl font-bold text-emerald-400">
          ₹ {historyData.totalInrPaid}
        </h2>
      </div>
    </div>

          {historyData.orders.map((o) => (
            <div
              key={o._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
            >
              <h3 className="text-green-400 font-semibold mb-4">
                💰 Sell Transaction
              </h3>

              <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
                <div>
                  <p className="text-gray-400">Order ID</p>
                  <p>{o._id}</p>
                </div>

                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-green-400">{o.status}</p>
                </div>

                <div>
                  <p className="text-gray-400">Admin Notes</p>
                  <p>{o.adminNotes || "-"}</p>
                </div>

                <div>
                  <p className="text-gray-400">Name</p>
                  <p>{o.userId?.name}</p>
                </div>

                <div>
                  <p className="text-gray-400">Account ID</p>
                  <p>#{o.userId?.accountId}</p>
                </div>

                <div>
                  <p className="text-gray-400">Email</p>
                  <p>{o.userId?.email}</p>
                </div>

                <div>
                  <p className="text-gray-400">Mobile</p>
                  <p>{o.userId?.phone}</p>
                </div>

                <div>
                  <p className="text-gray-400">Telegram ID</p>
                  <p>{o.userId?.telegramId}</p>
                </div>

                <div>
                  <p className="text-gray-400">USDT</p>
                  <p>{o.usdtAmount}</p>
                </div>

                <div>
                  <p className="text-gray-400">INR</p>
                  <p>₹ {o.totalINR}</p>
                </div>

                <div>
                  <p className="text-gray-400">Date</p>
                  <p>{new Date(o.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {o.receiptUrl && (
                <div>
                  <p className="text-gray-400 mb-2">Screenshot</p>
                  <img
                    src={`${API}${o.receiptUrl}`}
                    alt="receipt"
                    className="w-60 rounded-lg border border-white/20"
                  />
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* ================= WITHDRAW SECTION ================= */}
{/* ================= WITHDRAW SECTION ================= */}
{activeTab === "WITHDRAW" && withdrawHistory && (
  <>
    {/* WITHDRAW SUMMARY */}
    <div className="grid md:grid-cols-1 gap-6 mb-8">
      <div className="bg-white/10 p-6 rounded-xl">
        <p className="text-gray-400">Total Withdraw Paid</p>
        <h2 className="text-2xl font-bold text-red-400">
          ₹ {withdrawHistory.totalWithdrawAmount}
        </h2>
      </div>
    </div>

    {withdrawHistory.withdrawals.map((w) => (
      <div
        key={w._id}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
      >
        <h3 className="text-purple-400 font-semibold mb-4">
          💸 Withdrawal Transaction
        </h3>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Name</p>
            <p>{w.userId?.name}</p>
          </div>

          <div>
            <p className="text-gray-400">Account ID</p>
            <p>#{w.userId?.accountId}</p>
          </div>

          <div>
            <p className="text-gray-400">Mobile</p>
            <p>{w.userId?.phone || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400">Telegram ID</p>
            <p>{w.userId?.telegramId || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400">Withdrawal ID</p>
            <p>{w._id}</p>
          </div>

          <div>
            <p className="text-gray-400">Amount</p>
            <p>₹ {w.amount}</p>
          </div>

          <div>
            <p className="text-gray-400">Requested On</p>
            <p>{new Date(w.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-gray-400">Payment Details</p>

            {w.paymentDetails ? (
              <div className="text-sm space-y-1">
                {w.paymentDetails.upiId && (
                  <p>UPI ID: {w.paymentDetails.upiId}</p>
                )}

                {w.paymentDetails.accountHolderName && (
                  <p>Account Name: {w.paymentDetails.accountHolderName}</p>
                )}

                {w.paymentDetails.accountNumber && (
                  <p>Account No: {w.paymentDetails.accountNumber}</p>
                )}

                {w.paymentDetails.ifsc && (
                  <p>IFSC: {w.paymentDetails.ifsc}</p>
                )}

                {w.paymentDetails.bankName && (
                  <p>Bank: {w.paymentDetails.bankName}</p>
                )}
              </div>
            ) : (
              <p>-</p>
            )}
          </div>

          <div>
            <p className="text-gray-400">Status</p>
            <p className="text-green-400">{w.status}</p>
          </div>
        </div>
      </div>
    ))}
  </>
)}
    </div>
  );
}