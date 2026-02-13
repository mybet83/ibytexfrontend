import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const API = process.env.REACT_APP_API_URL;

export default function AdminHistory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [date, setDate] = useState("");
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
    const today = new Date().toISOString().split("T")[0];


  // ================= FETCH HISTORY =================
  const fetchHistory = async () => {
    if (!date) return toast.error("Select date first");

    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/orders/admin/history?date=${date}`,
        authHeader
      );

      setHistoryData(res.data);
    } catch (err) {
      toast.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  fetchHistory(today);
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
      <div className="bg-white/10 p-6 rounded-xl mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
          />

          <button
            onClick={fetchHistory}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
          >
            {loading ? "Loading..." : "Get History"}
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      {historyData && (
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
      )}

      {/* ORDERS LIST */}
      {historyData && historyData.orders.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No transactions found for this date
        </div>
      )}

      {historyData && historyData.orders.map((o) => (
        <div
          key={o._id}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >

          {/* USER INFO */}
          <h3 className="text-indigo-400 font-semibold mb-4">
            👤 User Details
          </h3>

          <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
            <div>
              <p className="text-gray-400">Name</p>
              <p>{o.userId?.name}</p>
            </div>

            <div>
              <p className="text-gray-400">Email</p>
              <p>{o.userId?.email}</p>
            </div>

            <div>
              <p className="text-gray-400">Phone</p>
              <p>{o.userId?.phone}</p>
            </div>

            <div>
              <p className="text-gray-400">Account ID</p>
              <p>#{o.userId?.accountId}</p>
            </div>

            {o.userId?.telegramId && (
              <div>
                <p className="text-gray-400">Telegram</p>
                <p>@{o.userId?.telegramId}</p>
              </div>
            )}

            <div>
              <p className="text-gray-400">Order ID</p>
              <p className="break-all">{o._id}</p>
            </div>
          </div>

          {/* TRANSACTION INFO */}
          <h3 className="text-green-400 font-semibold mb-4">
            💰 Transaction Details
          </h3>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">USDT</p>
              <p>{o.usdtAmount}</p>
            </div>

            <div>
              <p className="text-gray-400">Rate</p>
              <p>₹ {o.rate}</p>
            </div>

            <div>
              <p className="text-gray-400">Total INR</p>
              <p>₹ {o.totalINR}</p>
            </div>

            <div>
              <p className="text-gray-400">Status</p>
              <p className={o.status === "COMPLETED" ? "text-green-400" : "text-yellow-400"}>
                {o.status}
              </p>
            </div>

            <div>
              <p className="text-gray-400">UTR</p>
              <p>{o.adminUtrNumber || "-"}</p>
            </div>

            <div>
              <p className="text-gray-400">Date</p>
              <p>{new Date(o.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
