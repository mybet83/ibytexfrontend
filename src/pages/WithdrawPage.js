// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = process.env.REACT_APP_API_URL;

// export default function WithdrawPage({ onWithdrawSuccess }) {

//   const [amount, setAmount] = useState("");
//   const [available, setAvailable] = useState(0);
//   const [withdrawals, setWithdrawals] = useState([]);
// const [paymentMethods, setPaymentMethods] = useState([]);
// const [selectedMethod, setSelectedMethod] = useState(null);

//   const token = localStorage.getItem("token");

//   const fetchPaymentMethods = async () => {
// const res = await axios.get(`${API}/api/payout`, {
//   headers: { Authorization: `Bearer ${token}` },
// });

//   setPaymentMethods(res.data);
// };

//   const fetchWithdrawals = async () => {
//     const res = await axios.get(`${API}/api/withdrawal/my`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setWithdrawals(res.data);
//   };

//    const fetchAvailableBalance = async () => {
//   const ordersRes = await axios.get(`${API}/orders/my`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const withdrawalsRes = await axios.get(`${API}/api/withdrawal/my`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const completed = ordersRes.data.filter(o => o.status === "COMPLETED");

//  const totalSold = completed.reduce(
//   (acc, curr) =>
//     acc + (Number(curr.usdtAmount || 0) * Number(curr.rate || 0)),
//   0
// );

//   const approvedWithdrawals = withdrawalsRes.data.filter(
//     w => w.status === "APPROVED"
//   );

//   const totalWithdrawn = approvedWithdrawals.reduce(
//     (acc, curr) => acc + Number(curr.amount),
//     0
//   );

//   setAvailable(totalSold - totalWithdrawn);
// };

//   useEffect(() => {
//     fetchWithdrawals();
//     fetchAvailableBalance();
//     fetchPaymentMethods();
//   }, []);

// const handleWithdraw = async () => {
//   if (!selectedMethod)
//     return alert("Please select payment method");

//   if (Number(amount) > available)
//     return alert("Insufficient balance");

//   await axios.post(
//     `${API}/api/withdrawal/create`,
//     {
//       amount: Number(amount),
//       paymentMethod: selectedMethod.type,
//       paymentDetails: selectedMethod,
//     },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );

//   alert("Withdrawal Requested");

//   setAmount("");
//   setSelectedMethod(null);

//   fetchWithdrawals();
//   fetchAvailableBalance();

//   if (onWithdrawSuccess) {
//     onWithdrawSuccess();
//   }
// };

// return (
//   <div className="min-h-screen bg-gradient-to-br from-[#0b1220] to-[#050b18] p-10 text-white">

//     {/* HEADER */}
//     <div className="mb-10">
//       <h1 className="text-4xl font-bold tracking-tight">
//         Withdraw Funds
//       </h1>
//       <p className="text-gray-400 mt-2">
//         Securely withdraw your INR balance to your selected payout method.
//       </p>
//     </div>

//     {/* BALANCE CARD */}
//     <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/10 shadow-2xl mb-10">
//       <p className="text-gray-400 text-sm uppercase tracking-wider">
//         Available Balance
//       </p>

//       <h2 className="text-4xl font-bold text-emerald-400 mt-2">
//         ₹ {available}
//       </h2>
//     </div>

//     {/* WITHDRAW SECTION */}
//     <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/10 shadow-2xl mb-14">

//       <div className="grid md:grid-cols-2 gap-10">

//         {/* AMOUNT */}
//         <div>
//           <label className="text-sm text-gray-400 uppercase tracking-wide">
//             Withdraw Amount (INR)
//           </label>

//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//             className="w-full mt-3 bg-[#0b1220] border border-white/10 rounded-xl p-4 text-lg focus:outline-none focus:border-yellow-500 transition"
//           />
//         </div>

//         {/* PAYMENT METHODS */}
//         <div>
//           <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-3">
//             Select Payment Method
//           </h3>

//           <div className="grid gap-4">
//             {paymentMethods.map((method) => (
//               <div
//                 key={method._id}
//                 onClick={() => setSelectedMethod(method)}
//                 className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
//                   selectedMethod?._id === method._id
//                     ? "border-yellow-500 bg-yellow-500/10"
//                     : "border-white/10 bg-[#0b1220] hover:border-white/30"
//                 }`}
//               >
//                 <p className="font-semibold text-white">
//                   {method.type === "UPI" ? "UPI ID" : "Bank Account"}
//                 </p>

//                 {method.type === "UPI" ? (
//                   <p className="text-gray-400 text-sm mt-1">
//                     {method.upiId}
//                   </p>
//                 ) : (
//                   <>
//                     <p className="text-gray-400 text-sm mt-1">
//                       {method.bankName}
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       {method.accountNumber}
//                     </p>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* BUTTON */}
//       <button
//         onClick={handleWithdraw}
//         className="mt-10 w-full py-4 rounded-2xl font-bold text-black text-lg transition-all hover:scale-[1.01]"
//         style={{
//           background: "linear-gradient(135deg, #F5C56B 0%, #D4A017 100%)"
//         }}
//       >
//         Request Withdrawal
//       </button>
//     </div>

//     {/* WITHDRAWAL HISTORY */}
//     <div>
//       <h3 className="text-2xl font-semibold mb-6">
//         Withdrawal History
//       </h3>

//       <div className="space-y-4">
//         {withdrawals.map((w) => (
//           <div
//             key={w._id}
//             className="bg-[#0f172a] p-6 rounded-2xl border border-white/10 flex justify-between items-center hover:border-white/20 transition"
//           >
//             <div>
//               <p className="text-lg font-semibold">
//                 ₹ {w.amount}
//               </p>

//               <p className="text-sm text-gray-500 mt-1">
//                 {new Date(w.createdAt).toLocaleString()}
//               </p>
//             </div>

//             <div
//               className={`px-5 py-2 rounded-full text-sm font-semibold ${
//                 w.status === "APPROVED"
//                   ? "bg-green-500/20 text-green-400"
//                   : w.status === "REJECTED"
//                   ? "bg-red-500/20 text-red-400"
//                   : "bg-yellow-500/20 text-yellow-400"
//               }`}
//             >
//               {w.status}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//   </div>
// );

// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from "react-countup";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

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
        axios.get(`${API}/orders/my`, {
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
        (w) => w.status === "APPROVED",
      );

      const totalWithdrawn = approvedWithdrawals.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0,
      );

      setAvailable(totalSold - totalWithdrawn);
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
    }, 6000);

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
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-xl shadow-2xl mb-12 max-md:p-3 max-md:px-5 max-md:mb-5">
        <p className="text-gray-400 uppercase text-sm tracking-wider max-md:text-xs">
          Available Balance
        </p>

        {balanceLoading ? (
          <p className="text-yellow-400 text-2xl font-semibold mt-4">
            Loading...
          </p>
        ) : (
          <h2 className="text-5xl font-bold text-emerald-400 mt-4 max-md:text-2xl">
            ₹ <CountUp end={available} duration={1.2} separator="," />
          </h2>
        )}
      </div>

      {/* WITHDRAW SECTION */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-xl shadow-2xl mb-16 max-md:p-5 max-md:mb-5">
        <div className="grid md:grid-cols-2 gap-10 max-md:gap-5 ">
          <div>
            <label className="text-gray-400 text-sm uppercase tracking-wide max-md:text-xs">
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
                  <p className="text-xl font-semibold max-md:text-[14px]">₹ {w.amount}</p>
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
