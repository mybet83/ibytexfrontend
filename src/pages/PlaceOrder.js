import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function PlaceOrder() {
  const [usdt, setUsdt] = useState("");
  const [rate, setRate] = useState(0);
  const [receipt, setReceipt] = useState(null);
  const [processing, setProcessing] = useState(false);

  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const WALLET_ADDRESS = "TDVWXSpPog4VRM34BckxgWx1Aq7TXaaS57";
  const NETWORK = "TRC20";

  const totalINR = usdt ? (usdt * rate).toFixed(2) : "--";

  /* ================= FETCH LIVE RATE ================= */
  useEffect(() => {
    axios
      .get(`${API}/admin/rate`)
      .then((res) => setRate(res.data.rate))
      .catch(() => toast.error("Failed to load rate"));
  }, [API]);

  useEffect(() => {
    document.title = "iBytex | Real-Time USDT Trading Platform";
  },[])

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    if (!usdt) return toast.error("Enter USDT amount");
    if (!receipt) return toast.error("Upload payment screenshot");

    const formData = new FormData();
    formData.append("usdtAmount", usdt);
    formData.append("rate", rate);
    formData.append("totalINR", totalINR);
    formData.append("receipt", receipt);

try {
  setProcessing(true); // 🔥 show processing

  const res = await axios.post(`${API}/orders`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });

  toast.success(`Order Placed ✅ ID: ${res.data.orderId}`);

  setUsdt("");
  setReceipt(null);

  // 🔥 2 sec processing delay
setTimeout(() => {
  navigate("/dashboard", { state: { openOrders: true } });
}, 2000);



} catch {
  setProcessing(false);
  toast.error("Order failed ❌");
}
  };

  return (
    <>
      <div className="min-h-screen  text-white ">

        {/* HEADER */}
        <div className="flex justify-between items-center max-w-7xl mx-auto mb-10 max-md:mb-5">
          <h1 className="text-2xl font-semibold ">Sell USDT</h1>

    
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto max-md:gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* TRADE BOX */}
            <div className="bg-[#161a1e] border border-gray-800 rounded-xl p-6">

              <div className="grid md:grid-cols-3 gap-6">

                <div>
                  <p className="text-xs text-gray-400 mb-2">Amount (USDT)</p>
                  <input
                    type="number"
                    value={usdt}
                    onChange={(e) => setUsdt(e.target.value)}
                    className="w-full bg-[#0b0e11] border border-gray-700 px-4 py-3 rounded-lg focus:border-gray-400 outline-none"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2">Live Rate</p>
                  <div className="bg-[#0b0e11] border border-gray-700 px-4 py-3 rounded-lg text-white font-semibold">
                    ₹ {rate}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2">You Receive</p>
                  <div className="bg-[#0b0e11] border border-gray-700 px-4 py-3 rounded-lg text-green-400 font-semibold">
                    ₹ {totalINR}
                  </div>
                </div>

              </div>
            </div>

            {/* WALLET SECTION */}
            <div className="bg-[#161a1e] border border-gray-800 rounded-xl p-6">

              <h2 className="text-sm text-gray-400 mb-4">
                Send USDT ({NETWORK})
              </h2>

              <div className="flex justify-center mb-5">
                <div className="bg-white p-3 rounded-lg">
                  <img
                    src="/usdt-qr.png"
                    alt="QR"
                    className="w-40"
                  />
                </div>
              </div>

              <div className="bg-[#0b0e11] border border-gray-700 rounded-lg px-4 py-2 text-xs text-center break-all mb-3">
                {WALLET_ADDRESS}
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(WALLET_ADDRESS);
                  toast.success("Wallet Copied");
                }}
                className="w-full py-2.5 bg-gold-gradient text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Copy Address
              </button>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#161a1e] border border-gray-800 rounded-xl p-6 space-y-6">

            <div className="border border-dashed border-gray-700 rounded-lg p-5 text-center relative bg-[#0b0e11]">

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setReceipt(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              {!receipt ? (
                <>
                  <div className="text-3xl mb-2">📤</div>
                  <p className="text-xs text-gray-400">
                    Upload Screenshot (Required)
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={URL.createObjectURL(receipt)}
                    alt="Preview"
                    className="mx-auto w-28 rounded-lg"
                  />
                  <p className="text-green-400 text-xs mt-2">
                    {receipt.name}
                  </p>
                </>
              )}
            </div>

           {processing && (
  <div className="text-yellow-400 text-sm text-center animate-pulse">
    Your order is processing...
  </div>
)}

<button
  onClick={placeOrder}
  disabled={processing}
  className="w-full py-3 bg-gold-gradient text-black rounded-lg font-semibold hover:bg-yellow-300 transition disabled:opacity-50"
>
  {processing ? "Processing..." : "Place Order"}
</button>

          </div>
        </div>
      </div>

    
    </>
  );
}


