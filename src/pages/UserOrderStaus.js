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
    return "bg-gray-500/20 text-gray-300";
  };

  return (
    <div className="min-h-screen  text-white max-mt-5">
      {/* HEADER */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          
          <h1 className="text-3xl font-bold max-md:text-2xl">My Orders</h1>
        </div>

    
      </div>

      <div className="max-w-6xl mx-auto px pb-16 mt-10 max-md:mt-5">
        {orders.length === 0 && (
          <div className="text-center text-gray-400 mt-32">
            No orders placed yet.
          </div>
        )}

        <div className="grid gap-8 max-md:gap-5">
          {orders.map((o) => (
            <div
              key={o._id}
              className="rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-yellow-400/30 max-md:p-3"
            >
              {/* TOP ROW */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Order ID</p>
                  <p className="text-white text-sm break-all max-md:text-[12px]">{o._id}</p>
                  <p className="text-xs text-gray-500 mt-1">
  {formatDateTime(o.createdAt)}
</p>
                </div>

                

                <span
                  className={`px-4 py-1 rounded-full text-xs font-semibold max-md:text-[8px] ${
                    o.status === "PENDING"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : o.status === "COMPLETED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-300"
                  }`}
                >
                  {o.status}
                </span>
              </div>

              {/* AMOUNT SECTION */}
              <div className="grid md:grid-cols-3 gap-6 mb-8 max-md:gap-3 max-md:mb-3">
                <div className="bg-black/40 p-5 rounded-xl border border-gray-800 max-md:p-3">
                  <p className="text-gray-400 text-sm max-md:text-[12px]">USDT</p>
                  <p className="text-xl font-semibold">{o.usdtAmount}</p>
                </div>

                <div className="bg-black/40 p-5 rounded-xl border border-gray-800 max-md:p-3">
                  <p className="text-gray-400 text-sm max-md:text-[12px]">Rate</p>
                  <p className="text-xl font-semibold " >₹ {o.rate}</p>
                </div>

                <div className="bg-black/40 p-5 rounded-xl border border-gray-800 max-md:p-3">
                  <p className="text-gray-400 text-sm max-md:text-[12px]">You Received</p>
                  <p className="text-xl font-semibold text-green-400">
                    ₹ {o.totalINR}
                  </p>
                </div>
              </div>

              {/* PAYMENT METHOD */}
     

              {/* STATUS MESSAGE */}
              {o.status === "PENDING" && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl text-yellow-400 text-sm">
                  ⏳ Order is under admin verification. Please wait.
                </div>
              )}

              {o.status === "FAILED" && o.adminNotes && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
                  <p className="text-red-400 font-semibold mb-2">
                    ❌ Order Failed
                  </p>

                  <p className="text-xs text-red-300 font-semibold mb-1">
                    Admin Note
                  </p>
                  <p className="text-sm text-gray-300">{o.adminNotes}</p>
                </div>
              )}

              {o.status === "COMPLETED" && (
                <div className="bg-green-500/10 border border-green-500/30 p-5 rounded-xl max-md:p-3">
                  <p className="text-green-400 font-semibold text-lg mb-4 max-md:text-[12px] max-md:mb-2">
                    ✅ Order Successful
                  </p>

                  {/* ADMIN NOTE */}
                  {o.adminNotes && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg max-md:p-2">
                      <p className="text-yellow-400 text-xs font-semibold mb-1">
                        Admin Note
                      </p>
                      <p className="text-sm text-gray-300">{o.adminNotes}</p>
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
