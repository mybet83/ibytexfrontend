import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function MyOrders({ theme = "dark" }) {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch {
      toast.error("Failed to load orders");
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusStyle = (status) => {
    if (status === "PENDING") return "bg-yellow-500/20 text-yellow-400";
    if (status === "COMPLETED") return "bg-green-500/20 text-green-400";
    return "bg-red-500/60 text-gray-100";
  };

  return (
    <div
      className={`min-h-screen max-mt-5 ${
        theme === "dark"
          ? "bg-[#0D0F11] text-white"
          : "bg-[#F1F3F4] text-black"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <h1 className="text-2xl font-bold px-3">
            My Orders
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto  pb-5 mt-5 max-md:mt-5">
        {orders.length === 0 && (
          <div className="text-center text-gray-400 mt-32">
            No orders placed yet.
          </div>
        )}

        <div className="grid gap-8 max-md:gap-5">
          {orders.map((o) => (
            <div
              key={o._id}
              className={`rounded-xl p-8 shadow-xl transition max-md:p-3
              
              ${
                theme === "dark"
                  ? "bg-[#191d23] border border-gray-800 hover:border-yellow-400/30"
                  : "bg-white border border-gray-200 hover:border-yellow-500/40"
              }
              
              `}
            >
              {/* TOP ROW */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Order ID</p>

                  <p
                    className={`text-sm break-all max-md:text-[12px] ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {o._id}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {formatDateTime(o.createdAt)}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-xs font-semibold max-md:text-[8px] ${statusStyle(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
              </div>

              {/* AMOUNT SECTION */}
              <div className="grid md:grid-cols-3 gap-6 mb-8 max-md:gap-3 max-md:mb-3">
                <div
                  className={`p-5 rounded-xl max-md:p-3
                  ${
                    theme === "dark"
                      ? "bg-black/40 border border-gray-800"
                      : "bg-gray-100 border border-gray-200"
                  }`}
                >
                  <p className="text-gray-400 text-sm max-md:text-[12px]">
                    USDT
                  </p>
                  <p className="text-xl font-semibold">{o.usdtAmount}</p>
                </div>

                <div
                  className={`p-5 rounded-xl max-md:p-3
                  ${
                    theme === "dark"
                      ? "bg-black/40 border border-gray-800"
                      : "bg-gray-100 border border-gray-200"
                  }`}
                >
                  <p className="text-gray-400 text-sm max-md:text-[12px]">
                    Rate
                  </p>
                  <p className="text-xl font-semibold">
                    ₹ {o.rate}
                  </p>
                </div>

                <div
                  className={`p-5 rounded-xl max-md:p-3
                  ${
                    theme === "dark"
                      ? "bg-black/40 border border-gray-800"
                      : "bg-gray-100 border border-gray-200"
                  }`}
                >
                  <p className="text-gray-400 text-sm max-md:text-[12px]">
                    You Received
                  </p>
                  <p className="text-xl font-semibold text-green-400">
                    ₹ {o.totalINR}
                  </p>
                </div>
              </div>

              {/* STATUS MESSAGE */}
              {o.status === "PENDING" && (
                <div
                  className={`p-4 rounded-xl text-sm
                  ${
                    theme === "dark"
                      ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                      : "bg-yellow-100 border border-yellow-300 text-yellow-700"
                  }`}
                >
                  ⏳ Order is under admin verification. Please wait.
                </div>
              )}

              {o.status === "FAILED" && o.adminNotes && (
                <div
                  className={`p-4 rounded-xl
                  ${
                    theme === "dark"
                      ? "bg-red-500/10 border border-red-500/30"
                      : "bg-red-100 border border-red-300"
                  }`}
                >
                  <p className="text-red-400 font-semibold mb-2">
                    ❌ Order Failed
                  </p>

                  <p className="text-xs text-red-400 font-semibold mb-1">
                    Admin Note
                  </p>
                  <p className="text-sm text-gray-400">
                    {o.adminNotes}
                  </p>
                </div>
              )}

              {o.status === "COMPLETED" && (
                <div
                  className={`p-5 rounded-xl max-md:p-3
                  ${
                    theme === "dark"
                      ? "bg-green-500/10 border border-green-500/30"
                      : "bg-green-100 border border-green-300"
                  }`}
                >
                  <p className="text-green-400 font-semibold text-lg mb-4 max-md:text-[12px] max-md:mb-2">
                    ✅ Order Successful
                  </p>

                  {o.adminNotes && (
                    <div
                      className={`p-4 rounded-lg max-md:p-2
                      ${
                        theme === "dark"
                          ? "bg-yellow-500/10 border border-yellow-500/30"
                          : "bg-yellow-100 border border-yellow-300"
                      }`}
                    >
                      <p className="text-yellow-400 text-xs font-semibold mb-1">
                        Admin Note
                      </p>
                      <p className="text-sm text-gray-400">
                        {o.adminNotes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}