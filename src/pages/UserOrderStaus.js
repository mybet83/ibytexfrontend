import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

useEffect(() => {
  fetchOrders();

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch {
      toast.error("Failed to load orders");
    }
  };

  const statusStyle = (status) => {
    if (status === "PENDING") return "bg-yellow-500/20 text-yellow-400";
    if (status === "COMPLETED") return "bg-green-500/20 text-green-400";
    return "bg-gray-500/20 text-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-6">
        <img
          src="/logot.png"
          alt="logo"
          className="w-28 object-contain drop-shadow-xl"
        />

        <h1 className="text-3xl font-bold">My Orders</h1>

        <button
          onClick={() => navigate("/finalpage")}
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl font-semibold shadow-lg transition"
        >
          Back
        </button>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto px-4 pb-12">

        {orders.length === 0 && (
          <div className="text-gray-400 text-center mt-20">
            You have no orders yet
          </div>
        )}

        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-indigo-500/10 transition"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-300">
                Order ID:
                <span className="text-white break-all ml-2">
                  {o._id}
                </span>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                  o.status
                )}`}
              >
                {o.status}
              </span>
            </div>

            {/* AMOUNT INFO */}
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
              <div>
                <p className="text-gray-400">USDT</p>
                <p className="font-semibold text-lg">{o.usdtAmount}</p>
              </div>

              <div>
                <p className="text-gray-400">Rate</p>
                <p className="font-semibold text-lg">₹ {o.rate}</p>
              </div>

              <div>
                <p className="text-gray-400">You Receive</p>
                <p className="font-semibold text-lg text-green-400">
                  ₹ {o.totalINR}
                </p>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="text-sm mb-4">
              <p className="text-gray-400 mb-2">Your Payment Method</p>

              <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                {o.paymentMethod === "UPI" && (
                  <p>UPI ID: {o.userPaymentDetails?.upiId}</p>
                )}

                {o.paymentMethod === "BANK" && (
                  <>
                    <p>Account: {o.userPaymentDetails?.accountNumber}</p>
                    <p>IFSC: {o.userPaymentDetails?.ifsc}</p>
                  </>
                )}
              </div>
            </div>

            {/* PENDING */}
            {o.status === "PENDING" && (
              <div className="mt-4 text-yellow-400 text-sm bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg">
                ⏳ Payment under review. Please wait for admin confirmation.
              </div>
            )}

            {/* COMPLETED */}
            {o.status === "COMPLETED" && (
              <div className="mt-4 bg-green-500/10 border border-green-500/30 p-4 rounded-xl">
                <p className="text-green-400 font-semibold text-lg">
                  ✅ Payment Successful
                </p>

                <p className="text-sm mt-2">
                  <span className="text-gray-300">UTR Number:</span>{" "}
                  <b className="text-white">{o.adminUtrNumber}</b>
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Amount credited successfully to your account
                </p>
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}
