// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const API = process.env.REACT_APP_API_URL;

// export default function PlaceOrder() {
//   const [usdt, setUsdt] = useState("");
//   const [rate, setRate] = useState(0);
//   const [method, setMethod] = useState("UPI");

//   const navigate = useNavigate();

//   // User payment details
//   const [upiId, setUpiId] = useState("");
//   const [accountName, setAccountName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [ifsc, setIfsc] = useState("");
//   const [accountType, setAccountType] = useState("Saving");

//   const [receipt, setReceipt] = useState(null);

//   const WALLET_ADDRESS = "TDVWXSpPog4VRM34BckxgWx1Aq7TXaaS57";
//   const NETWORK = "TRC20";

//   const totalINR = usdt ? (usdt * rate).toFixed(2) : "--";

//   // 🔥 Fetch LIVE RATE
//   useEffect(() => {
//     axios
//       .get(`${API}/admin/rate`)
//       .then((res) => setRate(res.data.rate))
//       .catch(() => toast.error("Failed to load rate"));
//   }, []);

//   const placeOrder = async () => {
//     if (!usdt) return toast.error("Enter USDT amount");
//     if (!receipt) return toast.error("Upload payment screenshot");

//     const formData = new FormData();
//     formData.append("usdtAmount", usdt);
//     formData.append("rate", rate);
//     formData.append("totalINR", totalINR);
//     formData.append("paymentMethod", method);

//     if (method === "UPI") {
//       if (!upiId) return toast.error("Enter UPI ID");
//       formData.append("upiId", upiId);
//     } else {
//       if (!accountName || !accountNumber || !ifsc)
//         return toast.error("Fill all bank details");

//       formData.append("accountName", accountName);
//       formData.append("accountNumber", accountNumber);
//       formData.append("ifsc", ifsc);
//       formData.append("accountType", accountType);
//     }

//     formData.append("receipt", receipt);

//     try {
//       const res = await axios.post(`${API}/orders`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success(`Order Placed ✅ ID: ${res.data.orderId}`);

//       setUsdt("");
//       setUpiId("");
//       setAccountName("");
//       setAccountNumber("");
//       setIfsc("");
//       setReceipt(null);

//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || "Order failed ❌"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black relative px-4">

//       {/* HEADER */}
//       <div className="top-6 left-6 flex items-center justify-between">
//         <img
//           src="/logot.png"
//           alt="logo"
//           className="w-32 object-contain drop-shadow-xl relative right-6"
//         />

//         <h1 className="text-3xl text-white font-bold">
//           Place Order
//         </h1>

//         <button
//           onClick={() => navigate("/finalpage")}
//           className="text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-semibold shadow-lg transition"
//         >
//           Back
//         </button>
//       </div>

//       <div className="flex items-center justify-center mt-10">
//         <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl text-white">

//           {/* SELL HEADER */}
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-3xl font-bold">Sell USDT</h1>
//               <p className="text-gray-300 text-sm mt-1">
//                 Secure USDT selling • Manual verification • Fast payout
//               </p>
//             </div>

//             <button
//               onClick={() => navigate("/myorder")}
//               className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-semibold shadow-lg transition"
//             >
//               📄 My Orders
//             </button>
//           </div>

//           {/* USDT DETAILS */}
//           <div className="grid md:grid-cols-3 gap-4 mb-6">
//             <div>
//               <label className="text-sm text-gray-300">USDT Amount</label>
//               <input
//                 type="number"
//                 value={usdt}
//                 onChange={(e) => setUsdt(e.target.value)}
//                 className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-300">Rate (₹)</label>
//               <div className="mt-1 px-4 py-3 rounded-lg bg-black/40 border border-gray-600">
//                 ₹ {rate}
//               </div>
//             </div>

//             <div>
//               <label className="text-sm text-gray-300">You Receive</label>
//               <div className="mt-1 px-4 py-3 rounded-lg bg-black/40 border border-gray-600">
//                 ₹ {totalINR}
//               </div>
//             </div>
//           </div>

//           {/* PAYMENT METHOD */}
//           <div className="mb-6">
//             <label className="text-sm text-gray-300 mb-2 block">
//               Receive Payment Via
//             </label>

//             <div className="flex gap-3">
//               {["UPI", "BANK"].map((m) => (
//                 <button
//                   key={m}
//                   onClick={() => setMethod(m)}
//                   className={`px-4 py-2 rounded-lg border ${
//                     method === m
//                       ? "bg-indigo-600 border-indigo-500"
//                       : "bg-black/40 border-gray-600"
//                   }`}
//                 >
//                   {m === "UPI" ? "UPI" : "Bank Transfer"}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* UPI */}
//           {method === "UPI" && (
//             <input
//               placeholder="Your UPI ID"
//               value={upiId}
//               onChange={(e) => setUpiId(e.target.value)}
//               className="mb-6 w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
//             />
//           )}

//           {/* BANK */}
//           {method === "BANK" && (
//             <div className="grid md:grid-cols-2 gap-4 mb-6">
//               <input
//                 placeholder="Account Holder Name"
//                 value={accountName}
//                 onChange={(e) => setAccountName(e.target.value)}
//                 className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
//               />
//               <input
//                 placeholder="Account Number"
//                 value={accountNumber}
//                 onChange={(e) => setAccountNumber(e.target.value)}
//                 className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
//               />
//               <input
//                 placeholder="IFSC Code"
//                 value={ifsc}
//                 onChange={(e) => setIfsc(e.target.value)}
//                 className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
//               />
//               <select
//                 value={accountType}
//                 onChange={(e) => setAccountType(e.target.value)}
//                 className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
//               >
//                 <option>Saving</option>
//                 <option>Current</option>
//               </select>
//             </div>
//           )}

//           {/* RECEIPT */}
//           <div className="mb-8">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setReceipt(e.target.files[0])}
//               className="mb-4"
//             />

//             {receipt && (
//               <img
//                 src={URL.createObjectURL(receipt)}
//                 alt="Preview"
//                 className="w-64 rounded-xl"
//               />
//             )}
//           </div>

//           <button
//             onClick={placeOrder}
//             className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold text-lg"
//           >
//             Place Order
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const [usdt, setUsdt] = useState("");
  const [rate, setRate] = useState(0);
  const [method, setMethod] = useState("UPI");
   
   const API = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  // User payment details
  const [upiId, setUpiId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountType, setAccountType] = useState("Saving");

  // Receipt
  const [receipt, setReceipt] = useState(null);

  const WALLET_ADDRESS = "TDVWXSpPog4VRM34BckxgWx1Aq7TXaaS57";
  const NETWORK = "TRC20";

  const totalINR = usdt ? (usdt * rate).toFixed(2) : "--";

  // 🔥 Fetch LIVE RATE
  useEffect(() => {
    axios
      .get(`${API}/admin/rate`)
      .then((res) => setRate(res.data.rate))
      .catch(() => toast.error("Failed to load rate"));
  }, []);

  const placeOrder = async () => {
    if (!usdt) return toast.error("Enter USDT amount");
    if (!receipt) return toast.error("Upload payment screenshot");

    const formData = new FormData();
    formData.append("usdtAmount", usdt);
    formData.append("rate", rate);
    formData.append("totalINR", totalINR);
    formData.append("paymentMethod", method);

    if (method === "UPI") {
      formData.append("upiId", upiId);
    } else {
      formData.append("accountName", accountName);
      formData.append("accountNumber", accountNumber);
      formData.append("ifsc", ifsc);
      formData.append("accountType", accountType);
    }

    formData.append("receipt", receipt);

    try {
      const res = await axios.post(`${API}/orders`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(`Order Placed ✅ ID: ${res.data.orderId}`);
      setUsdt("");
      setUpiId("");
      setAccountName("");
      setAccountNumber("");
      setIfsc("");
      setReceipt(null);
    } catch {
      toast.error("Order failed ❌");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black relative px-4 ">
{/* LOGO TOP LEFT */}
<div className="  top-6 left-6 flex items-center justify-between">
  <img src="/logot.png" alt="logo"  className="w-32  object-contain drop-shadow-xl relative right-6" />
    <h1 className="text-3xl text-white font-bold ">Place Order</h1>
  <button
    onClick={() => navigate("/finalpage")}
    className="flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-semibold shadow-lg transition"
  >
   Back
  </button>

</div>

     <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl text-white">

       <div className="flex items-center justify-between mb-8">

  {/* LEFT SIDE */}
  <div>
    <h1 className="text-3xl font-bold">Sell USDT</h1>
    <p className="text-gray-300 text-sm mt-1">
      Secure USDT selling • Manual verification • Fast payout
    </p>
  </div>

  {/* RIGHT SIDE BUTTON */}
  <button
    onClick={() => navigate("/myorder")}
    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-semibold shadow-lg transition"
  >
    📄 My Orders
  </button>

</div>


        {/* USDT DETAILS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-300">USDT Amount</label>
            <input
              type="number"
              value={usdt}
              onChange={(e) => setUsdt(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Rate (₹)</label>
            <div className="mt-1 px-4 py-3 rounded-lg bg-black/40 border border-gray-600">
              ₹ {rate}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">You Receive</label>
            <div className="mt-1 px-4 py-3 rounded-lg bg-black/40 border border-gray-600">
              ₹ {totalINR}
            </div>
          </div>
        </div>

        {/* WALLET */}
        <div className="mb-8 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
          <p className="text-xl font-semibold mb-2 text-center">
            Send USDT to this address
          </p>

          <p className="text-sm text-gray-400 text-center mb-6">
            Network:{" "}
            <span className="text-indigo-400 font-semibold">{NETWORK}</span>
          </p>

          {/* QR BIG CENTER */}
          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <img
                src="/usdt-qr.png"
                alt="USDT QR"
                className="w-56 h-56 md:w-64 md:h-64 object-contain"
              />
            </div>
          </div>

          {/* WALLET ADDRESS */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/40 border border-gray-600 rounded-xl px-5 py-4 text-sm break-all text-center mb-4">
              {WALLET_ADDRESS}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(WALLET_ADDRESS);
                toast.success("📋 Wallet Address Copied");
              }}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
            >
              Copy Wallet Address
            </button>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className="mb-6">
          <label className="text-sm text-gray-300 mb-2 block">
            Receive Payment Via
          </label>
          <div className="flex gap-3">
            {["UPI", "BANK"].map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`px-4 py-2 rounded-lg border ${
                  method === m
                    ? "bg-indigo-600 border-indigo-500"
                    : "bg-black/40 border-gray-600"
                }`}
              >
                {m === "UPI" ? "UPI" : "Bank Transfer"}
              </button>
            ))}
          </div>
        </div>

        {/* USER PAYMENT DETAILS */}
        {method === "UPI" && (
          <input
            placeholder="Your UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="mb-6 w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
          />
        )}

        {method === "BANK" && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input
              placeholder="Account Holder Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
            />
            <input
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
            />
            <input
              placeholder="IFSC Code"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
              className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
            />
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
            >
              <option>Saving</option>
              <option>Current</option>
            </select>
          </div>
        )}

        {/* RECEIPT */}
<div className="mb-8">
  <label className="text-sm text-gray-300 mb-3 block font-medium">
    Upload USDT Transfer Screenshot
  </label>

  <div className="relative border-2 border-dashed border-indigo-500/40 hover:border-indigo-500 rounded-2xl p-8 text-center transition bg-white/5 backdrop-blur-xl">

    {/* Hidden Input */}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setReceipt(e.target.files[0])}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />

    {!receipt ? (
      <div className="flex flex-col items-center space-y-3">
        <div className="text-4xl">📤</div>
        <p className="text-gray-300 font-medium">
          Click or Drag & Drop Screenshot
        </p>
        <p className="text-xs text-gray-500">
          PNG, JPG up to 5MB
        </p>
      </div>
    ) : (
      <div className="flex flex-col items-center space-y-4">

        {/* 🔍 Image Preview */}
        <div className="relative">
          <img
            src={URL.createObjectURL(receipt)}
            alt="Preview"
            className="w-64 max-h-64 object-cover rounded-xl border border-white/20 shadow-lg"
          />

          {/* ❌ Remove Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setReceipt(null);
            }}
            className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* ✅ Success Message */}
        <div className="flex flex-col items-center space-y-2">
          <div className="text-3xl text-green-400">✅</div>
          <p className="text-green-400 font-semibold text-sm break-all">
            {receipt.name}
          </p>
          <p className="text-xs text-gray-400">
            File selected successfully
          </p>
        </div>

      </div>
    )}
  </div>
</div>


        {/* CTA */}
        <button
          onClick={placeOrder}
          className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold text-lg"
        >
          Place Order
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Order will remain <b>PENDING</b> until admin confirms payment
        </p>
      </div>
      </div>
      </div>
  
  );
}