import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";

const API = process.env.REACT_APP_API_URL;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [utr, setUtr] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("adminToken");

  const statusParam =
    new URLSearchParams(location.search).get("status") || "PENDING";

  const authHeader = useMemo(() => ({
    headers: { Authorization: `Bearer ${token}` },
  }), [token]);

  // ================= FETCH ORDERS =================
  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/orders/admin`, authHeader);

      const filtered = res.data.filter(
        (o) => o.status === statusParam
      );

      setOrders(filtered || []);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  }, [statusParam, authHeader]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ================= SEARCH FILTER =================
  const filteredOrders = orders.filter((o) => {
    const query = searchTerm.toLowerCase();

    return (
      o._id?.toLowerCase().includes(query) ||
      o.userId?.accountId?.toLowerCase().includes(query) ||
      o.userId?.name?.toLowerCase().includes(query) ||
      o.userId?.email?.toLowerCase().includes(query) ||
      o.userId?.phone?.toLowerCase().includes(query)
    );
  });

  // ================= COMPLETE ORDER =================
  const completeOrder = async (id) => {
    if (!utr[id]) return toast.error("Enter UTR number");

    try {
      await axios.put(
        `${API}/orders/complete/${id}`,
        { utrNumber: utr[id] },
        authHeader
      );

      toast.success("Payment marked successful ✅");
      fetchOrders();
    } catch {
      toast.error("Failed to complete order");
    }
  };

  // ================= DELETE ORDER =================
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(
        `${API}/orders/admin/${id}`,
        authHeader
      );

      toast.success("Order deleted 🗑️");
      fetchOrders();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {statusParam === "PENDING"
            ? "Pending Orders"
            : "Successful Orders"}
        </h1>

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="px-4 py-2 bg-[#09ABFF] rounded-lg"
        >
          Back
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <span className="absolute left-4 top-3.5 text-gray-400 text-lg">
            🔍
          </span>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-gray-300">
          <span className="text-6xl mb-4">📭</span>
          <p className="text-xl font-semibold">
            No matching orders found
          </p>
        </div>
      ) : (
        filteredOrders.map((o) => (
          <div key={o._id}
            className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120]
            p-7 rounded-2xl mb-10 border border-white/10 shadow-2xl">

            {/* ORDER ID */}
            <p className="text-xs text-gray-400">Order ID</p>
            <p className="text-sm break-all mb-6">{o._id}</p>

            {/* USER INFO */}
            <h3 className="text-indigo-400 font-semibold mb-4">
              👤 User Information
            </h3>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-xs text-gray-400">Name</p>
                <p>{o.userId?.name}</p>
                <p className="text-xs text-gray-400">{o.userId?.email}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-xs text-gray-400">Account ID</p>
                <p className="text-indigo-400">
                  #{o.userId?.accountId}
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-xs text-gray-400">Mobile</p>
                <p className="text-emerald-400">
                  {o.userId?.phone}
                </p>
              </div>
            </div>

            {/* USDT DETAILS */}
            <h3 className="text-green-400 font-semibold mb-4">
              💰 USDT Order Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 p-5 rounded-xl">
                <p className="text-xs text-gray-400">USDT Amount</p>
                <p className="text-xl">{o.usdtAmount}</p>
              </div>

              <div className="bg-white/5 p-5 rounded-xl">
                <p className="text-xs text-gray-400">Total INR</p>
                <p className="text-xl text-green-400">
                  ₹ {o.totalINR}
                </p>
              </div>
            </div>

            {/* ================= FIXED PAYMENT SECTION ================= */}
            <details className="mb-8">
              <summary className="cursor-pointer font-semibold text-indigo-300">
                👤 View User Payment Details
              </summary>

              <div className="mt-4 bg-black/50 p-5 rounded-xl border border-white/10 text-sm">

                {o.payoutMethodId ? (
                  <>
                    <p className="mb-2 font-semibold text-yellow-400">
                      Type: {o.payoutMethodId.type}
                    </p>

                    {o.payoutMethodId.type === "UPI" && (
                      <>
                        <p>UPI ID: {o.payoutMethodId.upiId}</p>
                        <p>
                          Name: {o.payoutMethodId.accountHolderName}
                        </p>
                      </>
                    )}

                    {o.payoutMethodId.type === "BANK" && (
                      <>
                        <p>
                          Account Holder: {o.payoutMethodId.accountHolderName}
                        </p>
                        <p>
                          Account Number: {o.payoutMethodId.accountNumber}
                        </p>
                        <p>
                          IFSC: {o.payoutMethodId.ifsc}
                        </p>
                        <p>
                          Bank: {o.payoutMethodId.bankName}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-red-400">
                    No payout method found
                  </p>
                )}

              </div>
            </details>

            {/* ACTIONS */}
            {o.status === "PENDING" && (
              <div className="flex gap-4">
                <input
                  placeholder="Enter UTR Number"
                  className="flex-1 p-3 rounded-xl bg-black/40 border border-white/10"
                  onChange={(e) =>
                    setUtr({ ...utr, [o._id]: e.target.value })
                  }
                />

                <button
                  onClick={() => completeOrder(o._id)}
                  className="px-6 py-3 rounded-xl bg-green-600"
                >
                  Mark Success
                </button>
              </div>
            )}

            <button
              onClick={() => deleteOrder(o._id)}
              className="mt-6 px-6 py-2 rounded-xl bg-red-600"
            >
              Delete Order
            </button>

          </div>
        ))
      )}
    </div>
  );
}
