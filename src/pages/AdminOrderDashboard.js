// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate, useLocation } from "react-router-dom";

// const API = process.env.REACT_APP_API_URL;

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [utr, setUtr] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = localStorage.getItem("adminToken");

//   const statusParam =
//     new URLSearchParams(location.search).get("status") || "PENDING";

//   const authHeader = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   // ================= FETCH ORDERS =================
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(
//         `${API}/orders/admin`,
//         authHeader
//       );

//       const filtered = res.data.filter(
//         (o) => o.status === statusParam
//       );

//       setOrders(filtered || []);
//     } catch (err) {
//       toast.error("Failed to load orders");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [statusParam]);

//   // ================= SEARCH FILTER =================
//   const filteredOrders = orders.filter((o) => {
//     const query = searchTerm.toLowerCase();

//     return (
//       o._id?.toLowerCase().includes(query) ||
//       o.userId?.accountId?.toLowerCase().includes(query) ||
//       o.userId?.name?.toLowerCase().includes(query) ||
//       o.userId?.email?.toLowerCase().includes(query) ||
//       o.userId?.phone?.toLowerCase().includes(query)
//     );
//   });

//   // ================= COMPLETE ORDER =================
//   const completeOrder = async (id) => {
//     if (!utr[id]) return toast.error("Enter UTR number");

//     try {
//       await axios.put(
//         `${API}/orders/complete/${id}`,
//         { utrNumber: utr[id] },
//         authHeader
//       );

//       toast.success("Payment marked successful ✅");
//       fetchOrders();
//     } catch {
//       toast.error("Failed to complete order");
//     }
//   };

//   // ================= DELETE ORDER =================
//   const deleteOrder = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;

//     try {
//       await axios.delete(
//         `${API}/orders/admin/${id}`,
//         authHeader
//       );

//       toast.success("Order deleted 🗑️");
//       fetchOrders();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-8">

//       {/* HEADER */}
//       <div className="flex justify-between mb-8">
//         <h1 className="text-3xl font-bold">
//           {statusParam === "PENDING"
//             ? "Pending Orders"
//             : "Successful Orders"}
//         </h1>

//         <button
//           onClick={() => navigate("/admin/dashboard")}
//           className="px-4 py-2 bg-[#09ABFF] rounded-lg"
//         >
//           Back
//         </button>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="mb-8 max-w-md">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search by Account ID, Order ID, Name, Email, Mobile..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
//           />
//           <span className="absolute left-4 top-3.5 text-gray-400 text-lg">
//             🔍
//           </span>
//         </div>
//       </div>

//       {/* EMPTY STATE */}
//       {filteredOrders.length === 0 ? (
//         <div className="flex flex-col items-center justify-center mt-24 text-gray-300">
//           <span className="text-6xl mb-4">📭</span>
//           <p className="text-xl font-semibold">
//             No matching orders found
//           </p>
//         </div>
//       ) : (
//         filteredOrders.map((o) => (
//           <div key={o._id} className="bg-slate-800 p-6 rounded-xl mb-6">

//             <p className="text-sm text-gray-400 mb-2">
//               Order ID: {o._id}
//             </p>

//             {o.receiptUrl && (
//               <img
//                 src={`${API}${o.receiptUrl}`}
//                 className="w-44 rounded-xl cursor-pointer border border-white/20 hover:scale-105 transition"
//                 onClick={() =>
//                   window.open(`${API}${o.receiptUrl}`)
//                 }
//                 alt="Receipt"
//               />
//             )}

//             {o.status === "PENDING" && (
//               <div className="flex gap-4 mt-4">
//                 <input
//                   placeholder="Enter UTR"
//                   className="p-2 rounded bg-black border border-gray-600"
//                   onChange={(e) =>
//                     setUtr({ ...utr, [o._id]: e.target.value })
//                   }
//                 />

//                 <button
//                   onClick={() => completeOrder(o._id)}
//                   className="px-4 py-2 bg-green-600 rounded"
//                 >
//                   Mark Success
//                 </button>
//               </div>
//             )}

//             <button
//               onClick={() => deleteOrder(o._id)}
//               className="mt-4 px-4 py-2 bg-red-600 rounded"
//             >
//               Delete
//             </button>

//           </div>
//         ))
//       )}
//     </div>
//   );
// }



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

      {/* SEARCH BAR */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Account ID, Order ID, Name, Email, Mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <span className="absolute left-4 top-3.5 text-gray-400 text-lg">
            🔍
          </span>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-gray-300">
          <span className="text-6xl mb-4">📭</span>
          <p className="text-xl font-semibold">
            No matching orders found
          </p>
        </div>
      ) : (
        filteredOrders.map((o) => (
  <div
  key={o._id}
  className="group relative bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] 
  p-7 rounded-2xl mb-10 border border-white/10 shadow-2xl 
  hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300"
>

  {/* ================= HEADER ================= */}
  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">

    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider">
        Order ID
      </p>
      <p className="text-sm font-medium break-all text-white">
        {o._id}
      </p>
    </div>

    {/* STATUS BADGE */}
    {o.status === "PENDING" ? (
      <span className="px-4 py-1 text-xs font-semibold rounded-full 
      bg-gradient-to-r from-yellow-500/20 to-orange-500/20 
      text-yellow-400 border border-yellow-500/30 animate-pulse">
        ⏳ Pending
      </span>
    ) : (
      <span className="px-4 py-1 text-xs font-semibold rounded-full 
      bg-gradient-to-r from-green-500/20 to-emerald-500/20 
      text-green-400 border border-green-500/30">
        ✅ Completed
      </span>
    )}
  </div>

  {/* ================= USER SECTION ================= */}
  <h3 className="text-indigo-400 font-semibold mb-4 tracking-wide">
    👤 User Information
  </h3>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

    {/* USER CARD */}
    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
      <p className="text-xs text-gray-400">Name</p>
      <p className="font-semibold text-white">{o.userId?.name}</p>
      <p className="text-xs text-gray-400">{o.userId?.email}</p>
    </div>

    {/* ACCOUNT ID */}
    <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center">
      <div>
        <p className="text-xs text-gray-400">Account ID</p>
        <p className="font-semibold text-indigo-400">
          #{o.userId?.accountId}
        </p>
      </div>

      <button
        onClick={() => {
          navigator.clipboard.writeText(o.userId?.accountId);
          toast.success("Account ID copied");
        }}
        className="text-xs px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
      >
        📋
      </button>
    </div>

    {/* MOBILE */}
    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
      <p className="text-xs text-gray-400">Mobile</p>
      <p className="font-semibold text-emerald-400">
        {o.userId?.phone}
      </p>
    </div>

    {/* TELEGRAM */}
    {o.userId?.telegramId && (
      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <p className="text-xs text-gray-400">Telegram</p>
        <p className="font-semibold text-sky-400">
          @{o.userId?.telegramId}
        </p>
      </div>
    )}
  </div>

  {/* ================= USDT SECTION ================= */}
  <h3 className="text-green-400 font-semibold mb-4 tracking-wide">
    💰 USDT Order Details
  </h3>

  <div className="grid sm:grid-cols-2 gap-5 mb-8">

    <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 
    p-5 rounded-xl border border-indigo-500/20">
      <p className="text-xs text-gray-400">USDT Amount</p>
      <p className="text-2xl font-bold text-white">
        {o.usdtAmount}
      </p>
    </div>

    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 
    p-5 rounded-xl border border-green-500/20">
      <p className="text-xs text-gray-400">Total INR</p>
      <p className="text-2xl font-bold text-green-400">
        ₹ {o.totalINR}
      </p>
    </div>
  </div>

  {/* ================= COLLAPSIBLE PAYMENT ================= */}
  <details className="mb-8 group">
    <summary className="cursor-pointer font-semibold text-indigo-300 hover:text-indigo-400 transition">
      👤 View User Payment Details
    </summary>

    <div className="mt-4 bg-black/50 p-5 rounded-xl border border-white/10 text-sm transition-all duration-300">
      {o.paymentMethod === "UPI" && (
        <p className="text-green-400 font-semibold">
          UPI ID: {o.userPaymentDetails?.upiId}
        </p>
      )}

      {o.paymentMethod === "BANK" && (
        <div className="space-y-1">
          <p>Account Name: {o.userPaymentDetails?.accountName}</p>
          <p>Account Number: {o.userPaymentDetails?.accountNumber}</p>
          <p>IFSC: {o.userPaymentDetails?.ifsc}</p>
          <p>Account Type: {o.userPaymentDetails?.accountType}</p>
        </div>
      )}
    </div>
  </details>

  {/* ================= RECEIPT ================= */}
  {o.receiptUrl && (
    <div className="mb-6">
      <img
        src={`${API}${o.receiptUrl}`}
        className="w-44 rounded-xl cursor-pointer border border-white/20 hover:scale-105 transition"
        onClick={() =>
          window.open(`${API}${o.receiptUrl}`)
        }
        alt="Receipt"
      />
    </div>
  )}

  {/* ================= ACTIONS ================= */}
  {o.status === "PENDING" && (
    <div className="flex flex-wrap gap-4 items-center">

      <input
        placeholder="Enter UTR Number"
        className="flex-1 min-w-[200px] p-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-indigo-500"
        onChange={(e) =>
          setUtr({ ...utr, [o._id]: e.target.value })
        }
      />

      <button
        onClick={() => completeOrder(o._id)}
        className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold transition shadow-lg"
      >
        Mark Success
      </button>
    </div>
  )}

  {o.status === "COMPLETED" && (
    <p className="mt-4 text-green-400 font-semibold text-sm">
      ✅ Completed | UTR: {o.adminUtrNumber}
    </p>
  )}

  <button
    onClick={() => deleteOrder(o._id)}
    className="mt-6 px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
  >
    Delete Order
  </button>

</div>

        ))
      )}
    </div>
  );
}           