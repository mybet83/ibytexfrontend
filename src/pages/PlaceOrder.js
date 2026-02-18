import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function PlaceOrder() {
  const [usdt, setUsdt] = useState("");
  const [rate, setRate] = useState(0);
  const [payoutMethods, setPayoutMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [receipt, setReceipt] = useState(null);

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

  /* ================= FETCH PAYOUT METHODS ================= */
  useEffect(() => {
    const fetchPayout = async () => {
      try {
        const res = await axios.get(`${API}/api/payout`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setPayoutMethods(res.data);

        if (res.data.length > 0) {
          setSelectedMethod(res.data[0]);
        }
      } catch {
        toast.error("Add payout method first");
      }
    };

    fetchPayout();
  }, [API]);

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    if (!usdt) return toast.error("Enter USDT amount");
    if (!receipt) return toast.error("Upload payment screenshot");
    if (!selectedMethod)
      return toast.error("Select payout method");

    const formData = new FormData();
    formData.append("usdtAmount", usdt);
    formData.append("rate", rate);
    formData.append("totalINR", totalINR);
    formData.append("payoutMethodId", selectedMethod._id);
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
      setReceipt(null);
    } catch {
      toast.error("Order failed ❌");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white px-4 md:px-10 py-8">

        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <img src="/logot.png" alt="logo" className="w-14" />
            <h1 className="text-2xl md:text-3xl font-bold">
              Sell USDT Instantly
            </h1>
          </div>

          <button
            onClick={() => navigate("/finalpage")}
            className="px-5 py-2 rounded-lg bg-gold-gradient text-black font-semibold"
          >
            Back
          </button>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <div className="bg-[#181a20] border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold">Sell Details</h2>
                <button
                  onClick={() => navigate("/myorder")}
                  className="px-5 py-2 rounded-lg bg-[#1e2329] border border-white/10"
                >
                  📄 My Orders
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-400">
                    USDT Amount
                  </label>
                  <input
                    type="number"
                    value={usdt}
                    onChange={(e) => setUsdt(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Live Rate
                  </label>
                  <div className="mt-2 px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700">
                    ₹ {rate}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    You Receive
                  </label>
                  <div className="mt-2 px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 text-green-400 font-semibold">
                    ₹ {totalINR}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#181a20] border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-6 text-center">
                Send USDT ({NETWORK})
              </h2>

              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-2xl">
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

          {/* RIGHT SIDE */}
          <div className="bg-[#181a20] border border-white/10 rounded-2xl p-8 space-y-6">

            <h2 className="text-xl font-semibold">
              Select Payment Method
            </h2>

            {payoutMethods.length === 0 && (
              <p className="text-gray-400 text-sm border border-gray-700 border-dashed rounded-lg p-4 text-center">
                No payout methods found. Please add one from your payment method
              </p>
            )}

            <div className="space-y-3">
              {payoutMethods.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setSelectedMethod(item)}
                  className={`w-full py-3 rounded-lg transition font-medium ${
                    selectedMethod?._id === item._id
                      ? "bg-gold-gradient text-black"
                      : "bg-[#0b0e11] border border-gray-700"
                  }`}
                >
                  {item.type === "UPI"
                    ? `UPI • ${item.upiId}`
                    : `Bank • ${item.bankName}`}
                </button>
              ))}
            </div>

            <div className="border-2 border-dashed border-gray-700 rounded-2xl p-6 text-center relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setReceipt(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              {!receipt ? (
                <>
                  <div className="text-4xl mb-2">📤</div>
                  <p>Upload Transfer Screenshot</p>
                </>
              ) : (
                <>
                  <img
                    src={URL.createObjectURL(receipt)}
                    alt="Preview"
                    className="mx-auto w-48 rounded-xl"
                  />
                  <p className="text-green-400 text-sm">
                    {receipt.name}
                  </p>
                </>
              )}
            </div>

            <button
              onClick={placeOrder}
              className="w-full py-4 rounded-xl bg-gold-gradient text-black font-semibold text-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
