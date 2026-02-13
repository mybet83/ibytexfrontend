import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // ================= STATE =================
  const [rate, setRate] = useState("");
  const [newsText, setNewsText] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [pendingCount, setPendingCount] = useState(0);
  const [summary, setSummary] = useState({
  totalUsdtReceived: 0,
  totalPendingInr: 0,
  totalSuccessfulInr: 0,
  totalOrders: 0,
});


  // ================= INIT =================
useEffect(() => {
  fetchRate();
  fetchNews();
  fetchPendingCount();
  fetchSummary();


  const interval = setInterval(() => {
    fetchPendingCount(true);
  }, 5000);

  return () => clearInterval(interval);

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  // ================= RATE =================
  const fetchRate = async () => {
    try {
      const res = await axios.get(`${API}/admin/rate`);
      setRate(res.data.rate || "");
    } catch {
      toast.error("Failed to load rate");
    }
  };

  const saveRate = async () => {
    if (!rate) return toast.error("Enter rate");

    try {
      await axios.post(
        `${API}/admin/rate`,
        { rate },
        authHeader
      );
      toast.success("USDT Rate Updated 🚀");
    } catch {
      toast.error("Rate update failed ❌");
    }
  };

  // ================= DASHBOARD SUMMARY =================

  const fetchSummary = async () => {
  try {
    const res = await axios.get(
      `${API}/orders/admin/dashboard-summary`,
      authHeader
    );
    setSummary(res.data);
  } catch (err) {
    console.error(err);
  }
};


  // ================= NEWS =================
  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API}/admin/news`);
      setNewsList(res.data || []);
    } catch {
      toast.error("Failed to load news");
    }
  };

  const addNews = async () => {
    if (!newsText) return toast.error("Enter news text");

    try {
      await axios.post(
        `${API}/admin/news`,
        { text: newsText },
        authHeader
      );
      toast.success("News Added 📰");
      setNewsText("");
      fetchNews();
    } catch {
      toast.error("News add failed ❌");
    }
  };

  const startEdit = (n) => {
    setEditingId(n._id);
    setEditText(n.text);
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `${API}/admin/news/${editingId}`,
        { text: editText },
        authHeader
      );
      toast.success("News Updated ✨");
      setEditingId(null);
      setEditText("");
      fetchNews();
    } catch {
      toast.error("Update failed ❌");
    }
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Delete this news?")) return;

    await axios.delete(`${API}/admin/news/${id}`, authHeader);

    toast.success("News Deleted 🗑️");
    fetchNews();
  };

  // ================= ORDERS =================
  const fetchPendingCount = async (notify = false) => {
    try {
      const res = await axios.get(
        `${API}/orders/admin`,
        authHeader
      );

      const pending = res.data.filter((o) => o.status === "PENDING");

      if (notify && pending.length > pendingCount) {
        toast.success("🔔 New USDT Sell Request");
      }

      setPendingCount(pending.length);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Dashbord */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
  <div className="bg-white/10 p-6 rounded-xl">
    <p className="text-gray-400">Total USDT Received</p>
    <h2 className="text-2xl font-bold text-green-400">
      {summary.totalUsdtReceived}
    </h2>
  </div>

  <div className="bg-white/10 p-6 rounded-xl">
    <p className="text-gray-400">Pending Payment</p>
    <h2 className="text-2xl font-bold text-yellow-400">
      ₹{summary.totalPendingInr}
    </h2>
  </div>

  <div className="bg-white/10 p-6 rounded-xl">
    <p className="text-gray-400">Successful Payment</p>
    <h2 className="text-2xl font-bold text-emerald-400">
      ₹{summary.totalSuccessfulInr}
    </h2>
  </div>

  <div className="bg-white/10 p-6 rounded-xl">
    <p className="text-gray-400">Total Orders</p>
    <h2 className="text-2xl font-bold text-indigo-400">
      {summary.totalOrders}
    </h2>
  </div>
</div>


      {/* ORDER DASHBOARD */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Order Dashboard
        </h2>

        <div className="flex flex-col sm:flex-row justify-evenly gap-4 sm:gap-8 w-full ">
          <button
            onClick={() => navigate("/adminorderdashboard?status=PENDING")}
            className="relative w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 
               hover:from-yellow-600 hover:to-yellow-700 
               px-6 py-3 rounded-xl font-semibold shadow-lg 
               transition duration-300 text-sm sm:text-base"
          >
            ⏳ Pending Orders
            {pendingCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 
                       text-xs px-2 py-1 rounded-full 
                       font-bold shadow-md"
              >
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/adminorderdashboard?status=COMPLETED")}
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 
               hover:from-green-700 hover:to-green-800 
               px-6 py-3 rounded-xl font-semibold shadow-lg 
               transition duration-300 text-sm sm:text-base"
          >
            ✅ Successful Orders
          </button>
          <button
  onClick={() => navigate("/admin/users")}
  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 
     hover:from-blue-700 hover:to-blue-800 
     px-6 py-3 rounded-xl font-semibold shadow-lg 
     transition duration-300 text-sm sm:text-base"
>
  👤 User List
</button>
<button
  onClick={() => navigate("/admin/history")}
  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 
     hover:from-purple-700 hover:to-purple-800 
     px-6 py-3 rounded-xl font-semibold shadow-lg"
>
  📊 History
</button>


        </div>
      </div>

      {/* RATE */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💰 Set USDT Rate</h2>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 mb-4"
        />
        <button
          onClick={saveRate}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
        >
          Save Rate
        </button>
      </div>

      {/* NEWS */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">📰 Manage News</h2>

        <textarea
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          placeholder="Enter news"
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 mb-4"
        />

        <button
          onClick={addNews}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg mb-4"
        >
          Add News
        </button>

        <div className="space-y-3 text-sm">
          {newsList.map((n) => (
            <div
              key={n._id}
              className="flex justify-between items-center bg-black/30 p-3 rounded-lg"
            >
              {editingId === n._id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 bg-black px-2 py-1 rounded"
                />
              ) : (
                <span className="flex-1">🔹 {n.text}</span>
              )}

              <div className="flex gap-2 ml-3 max-md:flex-col ">
                {editingId === n._id ? (
                  <button
                    onClick={saveEdit}
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(n)}
                    className="bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteNews(n._id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
