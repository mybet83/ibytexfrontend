

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from "react-countup";
import Confetti from "react-confetti";
import { useRef } from "react";

const API = process.env.REACT_APP_API_URL;

export default function WithdrawPage({ onWithdrawSuccess }) {
  const [amount, setAmount] = useState("");
  const [available, setAvailable] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const hasAnimated = useRef(false);
const previousBalance = useRef(0);
const [pendingAmount, setPendingAmount] = useState(0);
const [lockedAmount, setLockedAmount] = useState(0);
 const [approvedWithdraw, setApprovedWithdraw] = useState(0);

  const token = localStorage.getItem("token");

  /* ================= FETCH ================= */

  const fetchPaymentMethods = async () => {
    const res = await axios.get(`${API}/api/payout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPaymentMethods(res.data);
  };

  const fetchWithdrawals = async () => {
    const res = await axios.get(`${API}/api/withdrawal/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setWithdrawals(res.data);
    setHistoryLoading(false);
  };

  const fetchAvailableBalance = async () => {
    try {
      const [ordersRes, withdrawalsRes] = await Promise.all([
        axios.get(`${API}/api/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API}/api/withdrawal/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const completed = ordersRes.data.filter((o) => o.status === "COMPLETED");

      const totalSold = completed.reduce(
        (acc, curr) =>
          acc + Number(curr.usdtAmount || 0) * Number(curr.rate || 0),
        0,
      );

const approvedWithdrawals = withdrawalsRes.data.filter(
  (w) => w.status === "APPROVED"
);

const pendingWithdrawals = withdrawalsRes.data.filter(
  (w) => w.status === "PENDING"
);

const totalWithdrawn = approvedWithdrawals.reduce(
  (acc, curr) => acc + Number(curr.amount),
  0
);

const totalPending = pendingWithdrawals.reduce(
  (acc, curr) => acc + Number(curr.amount),
  0
);
setApprovedWithdraw(totalWithdrawn);
setPendingAmount(totalPending);
setLockedAmount(totalPending);

const newBalance = Math.max(
  totalSold - totalWithdrawn - totalPending,
  0
);

setAvailable(newBalance);

if (!hasAnimated.current) {
  previousBalance.current = 0;
} else {
  previousBalance.current = available;
}

setAvailable(newBalance);
    } catch (err) {
      console.log("Balance error");
    } finally {
      setBalanceLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    fetchWithdrawals();
    fetchAvailableBalance();
    fetchPaymentMethods();
  }, []);

  /* ================= REAL TIME SYNC ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      fetchWithdrawals();
      fetchAvailableBalance();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ================= WITHDRAW ================= */

  const handleWithdraw = async () => {
    if (!selectedMethod) return toast.error("Select payment method");

    if (Number(amount) > available) return toast.error("Insufficient balance");

    await axios.post(
      `${API}/api/withdrawal/create`,
      {
        amount: Number(amount),
        paymentMethod: selectedMethod.type,
        paymentDetails: selectedMethod,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    toast.success("Withdrawal Requested 🚀");

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);

    setAmount("");
    setSelectedMethod(null);

    fetchWithdrawals();
    fetchAvailableBalance();

    if (onWithdrawSuccess) {
      onWithdrawSuccess();
    }
  };

  useEffect(() =>{
    document.title = "iBytex | Fast, Secure Payout"
  },[])

  /* ================= UI ================= */

  return (
    <div className="min-h-screen  text-white relative overflow-hidden ">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      <ToastContainer theme="dark" />

      {/* HEADER */}
      <div className="mb-12 max-md:mb-5">
        <h1 className="text-4xl font-bold max-md:text-2xl">Withdraw Funds</h1>
        <p className="text-gray-400 mt-2 max-md:text-[14px]">
          Transfer funds securely to your payout method.
        </p>
      </div>

      {/* BALANCE CARD */}
{/* BALANCE GRID */}
<div className="grid md:grid-cols-3 gap-6 mb-12 max-md:grid-cols-2 max-md:gap-4 max-md:mb-5">

  {/* AVAILABLE BALANCE */}
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg max-md:p-3">
    <p className="text-gray-400 text-sm uppercase tracking-wider max-md:text-xs">
      Available Balance
    </p>

    {balanceLoading ? (
      <p className="text-yellow-400 text-xl font-semibold mt-4  max-md:mt-2 ">
        Loading...
      </p>
    ) : (
      <h2 className="text-3xl font-bold text-emerald-400 mt-2 max-md:text-2xl">
        ₹{" "}
   {!hasAnimated.current ? (
  <CountUp
    start={0}
    end={available}
    duration={1}
    separator=","
    onEnd={() => {
      hasAnimated.current = true;
    }}
  />
) : (
  available.toLocaleString()
)}
      </h2>
    )}
  </div>

  {/* PENDING WITHDRAWALS */}
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg max-md:p-3">
    <p className="text-gray-400 text-sm uppercase tracking-wider max-md:text-xs ">
      Pending Withdrawals
    </p>

    <h2 className="text-3xl font-bold text-yellow-400 mt-2 max-md:text-2xl">
      ₹ {pendingAmount.toLocaleString()}
    </h2>
  </div>

  {/* LOCKED BALANCE */}
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg max-md:p-3">
    <p className="text-gray-400 text-sm uppercase tracking-wider max-md:text-xs">
      Locked Balance
    </p>

    <h2 className="text-3xl font-bold text-red-400 mt-2 max-md:text-2xl">
        ₹ {Number(approvedWithdraw).toLocaleString()}
    </h2>
  </div>

</div>
      {/* WITHDRAW SECTION */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-xl shadow-2xl mb-16 max-md:p-5 max-md:mb-5">
        <div className="grid md:grid-cols-2 gap-10 max-md:gap-5 ">
          <div>
            <label className="text-gray-400 text-sm uppercase tracking-wide max-md:text-xs ">
              Withdraw Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full mt-3 bg-[#111827] border border-white/10 rounded-xl p-4 text-lg focus:outline-none focus:border-yellow-500 transition max-md:text-[14px]"
            />
          </div>

          <div>
            <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-3 max-md:text-xs">
              Select Payment Method
            </h3>

            <div className="grid gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method._id}
                  onClick={() => setSelectedMethod(method)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                    selectedMethod?._id === method._id
                      ? "border-yellow-500 bg-yellow-500/10"
                      : "border-white/10 bg-[#111827]"
                  }`}
                >
                  <p className="font-semibold text-lg max-md:text-xs">
                    {method.type === "UPI" ? "UPI ID" : "Bank Account"}
                  </p>

                  {method.type === "UPI" ? (
                    <p className="text-gray-400 mt-1 max-md:text-[14px]">
                      {method.upiId}
                    </p>
                  ) : (
                    <>
                      <p className="text-gray-400 mt-1 max-md:text-[14px]">
                        {method.bankName}
                      </p>
                      <p className="text-gray-400 max-md:text-[14px]">
                        {method.accountNumber}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleWithdraw}
          className="mt-12 w-full py-4 rounded-xl font-bold text-black text-lg max-md:text-[16px] max-md:mt-5"
          style={{
            background: "linear-gradient(135deg, #F5C56B 0%, #D4A017 100%)",
          }}
        >
          Request Withdrawal
        </button>
      </div>










      {/* HISTORY */}
      <div>
        <h3 className="text-2xl font-semibold mb-8 max-md:text-2xl max-md:mb-5">Withdrawal History</h3>

        {historyLoading ? (
          <p className="text-gray-400">Loading history...</p>
        ) : (
          <div className="space-y-5">
            {withdrawals.map((w) => (
              <div
                key={w._id}
                className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl flex justify-between items-center max-md:p-3"
              >
                <div>


<p className="text-xs text-yellow-400 mt-1 break-all max-md:w-[90%]">
  Withdrawal ID: {w._id}
</p>
              <p className="text-xl font-semibold max-md:text-[14px]">
  Amount - ₹ {w.amount}
</p>

<p className="text-sm text-gray-400 mt-1 max-md:text-[12px]">
  {new Date(w.createdAt).toLocaleString()}
</p>

                  {w.status === "APPROVED" && w.adminUtrNumber && (
                    <p className="text-blue-400 text-sm mt-1 max-md:text-[12px]">
                      UTR Number: {w.adminUtrNumber}
                    </p>
                  )}
                </div>

                <div
                  className={`px-6 py-2 rounded-full text-sm font-semibold max-md:text-[10px] max-md:px-3 max-md:py-1 ${
                    w.status === "APPROVED"
                      ? "bg-green-500/20 text-green-400"
                      : w.status === "REJECTED"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {w.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
