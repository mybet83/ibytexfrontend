

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from "react-countup";
import Confetti from "react-confetti";
import { useRef } from "react";
import { Wallet, Clock, Lock } from "lucide-react";


const API = process.env.REACT_APP_API_URL;

export default function WithdrawPage({ onWithdrawSuccess , theme = "dark" }){
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
 const isStep1Done = Number(amount) > 0;
const isStep2Done = selectedMethod && selectedMethod._id;
const isStep3Done = isStep1Done && isStep2Done;

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


 const StatCard = ({ title, value, icon, green, yellow, red, theme }) => {
  return (
    <div
      className={`p-4 rounded-2xl border border-white/10 flex justify-between items-center max-md:p-2
    ${theme === "dark" 
  ? "bg-[#191d23] backdrop-blur-xl" 
  : "bg-white shadow-sm"}
      `}
    >
      {/* LEFT SIDE (ICON) */}
      <div className="flex items-center gap-5">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 max-md:h-8 max-md:w-8">
          {icon}
        </div>
      </div>

      {/* RIGHT SIDE (TEXT) */}
      <div>
        <p className="text-xs text-gray-400 text-end mb-1 uppercase tracking-wider max-md:text-[10px]">
          {title}
        </p>

        <h2
          className={`text-xl font-semibold text-end
            ${green && "text-emerald-400"}
            ${yellow && "text-yellow-400"}
            ${red && "text-red-400"}
          `}
        >
          {value}
        </h2>
      </div>
    </div>
  );
};

  /* ================= UI ================= */

  return (
  <div
  className={`min-h-screen relative overflow-hidden 
  ${theme === "dark" ? "bg-[#0B0F14] text-white" : "bg-gray-100 text-black"}
`}
>
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      <ToastContainer theme="dark" />

      {/* HEADER */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold max-md:text-2xl">Withdraw Funds</h1>
        <p className="text-gray-400 mt-2 max-md:text-[14px]">
          Transfer funds securely to your payout method.
        </p>
      </div>

      {/* BALANCE CARD */}
{/* BALANCE GRID */}
<div className="grid md:grid-cols-3 max-md:grid-cols-2 gap-4 mb-5">

  {/* AVAILABLE BALANCE */}
  <StatCard
    title="Available Balance"
    theme={theme}
    green
    icon={<Wallet className="text-emerald-400 w-[20px] h-[20px] max-md:w-[16px] max-md:h-[16px]" />}
    value={
      balanceLoading ? (
        <span className="text-yellow-400">Loading...</span>
      ) : (
        <>
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
        </>
      )
    }
  />

  {/* PENDING WITHDRAWALS */}
  <StatCard
    title="Pending Withdrawals"
    theme={theme}
    yellow
    icon={<Clock  className="text-yellow-400 w-[20px] h-[20px] max-md:w-[16px] max-md:h-[16px]"  />}
    value={`₹ ${pendingAmount.toLocaleString()}`}
  />

  {/* LOCKED BALANCE */}
  <StatCard
    title="Locked Balance"
    theme={theme}
    red
    icon={<Lock className="text-red-400 w-[20px] h-[20px] max-md:w-[16px] max-md:h-[16px]"  />}
    value={`₹ ${Number(approvedWithdraw).toLocaleString()}`}
  />

</div>
      {/* WITHDRAW SECTION */}
<div className="grid lg:grid-cols-[60%_40%] gap-6">

  {/* ================= LEFT SIDE ================= */}
<div
  className={`rounded-2xl p-6 border max-md:p-3
  ${theme === "dark" 
    ? "bg-[#191d23] border-white/10" 
    : "bg-white border-gray-200"}
`}
>
  <div className="flex gap-6">

    {/* ================= STEPPER ================= */}
    <div className="flex flex-col items-center pt-4">

      {[1, 2, 3].map((step, i) => {
        const done =
          step === 1
            ? isStep1Done
            : step === 2
            ? isStep2Done
            : isStep3Done;

        return (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
              ${
                done
                  ? "bg-green-500 text-white scale-110"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              {done ? "✓" : step}
            </div>

            {step !== 3 && (
              <div className="w-[2px] h-16 bg-white/10"></div>
            )}
          </div>
        );
      })}
    </div>

    {/* ================= CONTENT ================= */}
    <div className="flex-1">

      {/* STEP 1 */}
      <div className="mb-6">
        <h2 className="text-sm text-gray-400 mb-2">Withdraw Amount</h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className={`w-full p-4 rounded-xl border placeholder:text-[12px]
          ${theme === "dark"
            ? " bg-[#0b0e11] border-white/10 text-white"
            : "bg-gray-100 border-gray-300 text-black"}
          `}
        />
      </div>

      {/* STEP 2 */}
      <div className="mb-6">
        <h2 className="text-sm text-gray-400 mb-4">Withdraw To</h2>

        {/* TABS */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setSelectedMethod({ type: "UPI" })}
            className={`px-4 py-2 rounded-lg text-sm
            ${
              selectedMethod?.type === "UPI"
                ? "bg-yellow-500 text-black"
                : "bg-white/5 text-gray-400"
            }`}
          >
            UPI ID
          </button>

          <button
            onClick={() => setSelectedMethod({ type: "BANK" })}
            className={`px-4 py-2 rounded-lg text-sm
            ${
              selectedMethod?.type === "BANK"
                ? "bg-yellow-500 text-black"
                : "bg-white/5 text-gray-400"
            }`}
          >
            Bank Account
          </button>
        </div>

        {/* UPI */}
        {selectedMethod?.type === "UPI" && (
          <div className="space-y-3">
            {paymentMethods
              .filter((m) => m.type === "UPI")
              .map((method) => (
                <div
                  key={method._id}
                  onClick={() => setSelectedMethod(method)}
                  className={`p-4 rounded-xl border cursor-pointer
                  ${
                    selectedMethod?._id === method._id
                      ? "border-yellow-400 ring-2 ring-yellow-400 bg-yellow-400/10"
                      : "border-white/10 bg-[#0b0e11]"
                  }
                `}
                >
                  {method.upiId}
                </div>
              ))}
          </div>
        )}

        {/* BANK */}
        {selectedMethod?.type === "BANK" && (
          <div className="space-y-3">
            {paymentMethods
              .filter((m) => m.type !== "UPI")
              .map((method) => (
                <div
                  key={method._id}
                  onClick={() => setSelectedMethod(method)}
                  className={`p-4 rounded-xl border cursor-pointer
                  ${
                    selectedMethod?._id === method._id
                      ? "border-yellow-400 ring-2 ring-yellow-400 bg-yellow-400/10"
                      : "border-white/10 bg-[#0b0e11]"
                  }
                `}
                >
                  <p>{method.bankName}</p>
                  <p className="text-sm text-gray-400">
                    {method.accountNumber}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* STEP 3 */}
      <button
        onClick={handleWithdraw}
        className="w-full py-4 rounded-xl font-bold text-black max-md:text-[12px]"
        style={{
          background: "linear-gradient(135deg, #F5C56B 0%, #D4A017 100%)",
        }}
      >
        Request Withdrawal
      </button>

    </div>
  </div>
</div>

  {/* ================= RIGHT SIDE ================= */}
<div
  className={`rounded-2xl p-6 border h-fit
  ${theme === "dark"
    ? "bg-[#191d23] border-white/10"
    : "bg-white border-gray-200"}
`}
>
  <h2 className="text-lg font-semibold mb-5">
    Process to Withdraw INR
  </h2>

  <div className="space-y-5">

    {/* STEP 1 */}
    <div className="flex items-start gap-4">
      <div className="w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm font-bold">
        1
      </div>
      <p className="text-gray-300 text-sm">
        Enter your withdrawal amount
      </p>
    </div>

    {/* STEP 2 */}
    <div className="flex items-start gap-4">
      <div className="w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400  flex items-center justify-center text-sm font-bold">
        2
      </div>
      <p className="text-gray-300 text-sm">
        Select UPI ID or Bank Account
      </p>
    </div>

    {/* STEP 3 */}
    <div className="flex items-start gap-4">
      <div className="w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400  flex items-center justify-center text-sm font-bold">
        3
      </div>
      <p className="text-gray-300 text-sm">
        Choose your payment method details
      </p>
    </div>

    {/* STEP 4 */}
    <div className="flex items-start gap-4">
      <div className="w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400  flex items-center justify-center text-sm font-bold">
        4
      </div>
      <p className="text-gray-300 text-sm">
        Click on Request Withdrawal button
      </p>
    </div>

    {/* STEP 5 */}
    <div className="flex items-start gap-4">
      <div className="w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm font-bold">
        5
      </div>
      <p className="text-gray-300 text-sm">
        Our team will verify and transfer INR to your account
      </p>
    </div>

  </div>

  {/* FOOTER */}
  <div className="mt-6 pt-4 border-t border-gray-500 text-xs text-gray-500 text-center">
    iBytex - Fast & Secure Withdrawal
  </div>
</div>
</div>










      {/* HISTORY */}
<div>
  <h3 className="text-2xl font-semibold mt-5 px-3 mb-5">
    Withdrawal History
  </h3>

  {historyLoading ? (
    <p className="text-gray-400 px-3">Loading history...</p>
  ) : (
    <div
      className={`rounded-2xl border overflow-hidden
      ${theme === "dark"
        ? "bg-[#191d23] border-white/10"
        : "bg-white border-gray-200"}
      `}
    >
      {withdrawals.map((w, index) => (
        <div
          key={w._id}
          className={`grid grid-cols-3 items-center px-6 py-5 transition-all max-md:px-3 max-md:py-2
          ${theme === "dark"
            ? ""
            : ""}
          ${index !== withdrawals.length - 1 ? "border-b border-white/10" : ""}
          `}
        >
          {/* LEFT */}
          <div>
            <p className="text-sm font-medium">
              Withdraw ₹ {w.amount}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(w.createdAt).toLocaleString()}
            </p>
          </div>

          {/* CENTER (IMPORTANT FIX) */}
          <div className="text-center">
            {w.status === "APPROVED" && w.adminUtrNumber ? (
              <>
              <p className="text-yellow-400 text-sm max-md:text-[10px]">
                UTR: <span className="text-white"></span>
              </p>
              <p className="text-gray-200 max-md:text-[12px]">
                  {w.adminUtrNumber}
              </p>
              </>
            ) : (
              <p className="text-gray-400 text-sm max-md:text-[10px]">
                Waiting for approval...
              </p>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-end gap-2 flex-right">
            
            {/* AMOUNT */}
            <div className="flex flex-col text-end  justify-end">
            <p className="text-red-400 font-semibold px-3">
              -₹{w.amount}
            </p>

            {/* STATUS */}
            <span
              className={`px-3 py-1 rounded-full text-xs max-md:text-[8px] font-semibold max-md:px-2 text-center
              ${
                w.status === "APPROVED"
                  ? "bg-green-500/20 text-green-400"
                  : w.status === "REJECTED"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }
            `}
            >
              {w.status}
            </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}
