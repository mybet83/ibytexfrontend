
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

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

// eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>
  <div className="min-h-screen bg-black text-white px-4 md:px-10 py-8 ">

    {/* ===== TOP HEADER ===== */}
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-4">
        <img src="/logot.png" alt="logo" className="w-14" />
        <h1 className="text-2xl md:text-3xl font-bold">
         Sell USDT Instantly
        </h1>
      </div>

      <div className="flex gap-4 max-md:flex-col">
      
        <button
          onClick={() => navigate("/finalpage")}
          className="px-5 py-2 rounded-lg bg-gold-gradient text-black font-semibold transition "
        >
          Back
        </button>
      </div>
    </div>
   

    {/* ===== MAIN GRID ===== */}
    <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">

      {/* ================= LEFT SIDE ================= */}
      <div className="space-y-8">

        {/* RATE CARD */}
        <div className="bg-[#181a20] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="relative justify-between flex mb-4">
          <h2 className="text-lg font-semibold mb-4">Sell Details</h2>

            <button
          onClick={() => navigate("/myorder")}
          className="px-5 py-2 rounded-lg bg-[#1e2329] hover:bg-[#2b3139] transition border border-white/10 "
        >
          📄 My Orders
        </button>
        </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400">USDT Amount</label>
              <input
                type="number"
                value={usdt}
                onChange={(e) => setUsdt(e.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-goldDark outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Live Rate</label>
              <div className="mt-2 px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700">
                ₹ {rate}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">You Receive</label>
              <div className="mt-2 px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 text-green-400 font-semibold">
                ₹ {totalINR}
              </div>
            </div>
          </div>
        </div>

        {/* WALLET CARD */}
        <div className="bg-[#181a20] border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold mb-6 text-center">
            Send USDT ( {NETWORK} )
          </h2>

          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <img
                src="/usdt-qr.png"
                alt="QR"
                className="w-52 md:w-60"
              />
            </div>
          </div>

          <div className="bg-[#0b0e11] border border-gray-700 rounded-lg px-4 py-3 text-sm text-center break-all mb-4">
            {WALLET_ADDRESS}
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(WALLET_ADDRESS);
              toast.success("Wallet Copied ✅");
            }}
            className="w-full py-3 rounded-lg bg-gold-gradient text-black font-semibold"
          >
            Copy Wallet Address
          </button>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="bg-[#181a20] border border-white/10 rounded-2xl p-8 shadow-xl space-y-6">

        <h2 className="text-xl font-semibold">Payment Details</h2>

        {/* METHOD */}
        <div className="flex gap-3">
          {["UPI", "BANK"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                method === m
                  ? "bg-gold-gradient text-black"
                  : "bg-[#0b0e11] border border-gray-700"
              }`}
            >
              {m === "UPI" ? "UPI" : "Bank Transfer"}
            </button>
          ))}
        </div>

        {/* UPI */}
        {method === "UPI" && (
          <input
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700"
          />
        )}

        {/* BANK */}
        {method === "BANK" && (
          <div className="grid gap-4">
            <input
              placeholder="Account Holder Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700"
            />
            <input
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700"
            />
            <input
              placeholder="IFSC Code"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
              className="px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700"
            />
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700"
            >
              <option>Saving</option>
              <option>Current</option>
            </select>
          </div>
        )}

        {/* UPLOAD */}
        <div className="border-2 border-dashed border-gray-700 hover:bg-slate-800 rounded-2xl p-6 text-center relative transition">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setReceipt(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          {!receipt ? (
            <div>
              <div className="text-4xl mb-2">📤</div>
              <p>Upload Transfer Screenshot</p>
              <p className="text-xs text-gray-500">PNG/JPG up to 5MB</p>
            </div>
          ) : (
            <div className="space-y-3">
              <img
                src={URL.createObjectURL(receipt)}
                alt="Preview"
                className="mx-auto w-48 rounded-xl"
              />
              <p className="text-green-400 text-sm">{receipt.name}</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={placeOrder}
          className="w-full py-4 rounded-xl bg-gold-gradient text-black  hover:opacity-90 transition font-semibold text-lg shadow-lg"
        >
          Place Order
        </button>

        <p className="text-xs text-gray-500 text-center">
          Order remains <span className="text-yellow-400 font-semibold">PENDING</span> until admin verification.
        </p>
      </div>
    </div>
  </div>

  
    
  <Footer/>
  </>
);



}