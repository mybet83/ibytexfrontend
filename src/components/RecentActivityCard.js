import React from "react";

const RecentActivityCard = ({ data, theme, onViewAll }) => {
  return (
    <div
      className={`rounded-2xl p-5 h-full flex flex-col justify-between w-[100%] relative
      border border-white/10 backdrop-blur-xl
      ${theme === "dark" ? "bg-[#191D23] text-white" : "bg-white text-black"}
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm fon">Transaction History</h2>

        <button
          onClick={onViewAll}
          className="text-xs px-3 py-1 rounded-lg bg-yellow-400 text-black font-semibold"
        >
          View All
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-">
        {data.length === 0 ? (
          <p className="text-gray-400 text-sm">No activity</p>
        ) : (
          data.map((item) => (
      <div
  key={item.id}
  className="grid grid-cols-3 gap-4 border-b border-white/5 pb-3 items-center"
>
  {/* LEFT */}
  <div>
    <p className="text-[12px] font-medium">
      {item.type === "SELL"
        ? `Exchange ${item.amount} USDT`
        : `Withdraw ₹${item.amount}`}
    </p>

    <p className="text-xs text-gray-400">
      {new Date(item.date).toLocaleString()}
    </p>
  </div>

  {/* CENTER */}
  <div className="text-xs text-gray-400 flex flex-col items-center justify-center text-center">
   
    {item.type === "WITHDRAW" && item.adminUtrNumber && (
         <>
      <p className="font-medium text-yellow-400">UTR:</p>
      <p className="font-bold">{item.adminUtrNumber}</p>
    </>
    )}
    
    <span>
  {item.status === "PENDING"
    ? "Waiting for approval..."
    : item.statu}
</span>

   
    {item.adminNotes && item.adminNotes !== "" && (
      <>
      <p className="font-medium text-yellow-400">Admin Note: </p>
      <p className="font-bold">{item.adminNotes}</p>
      </>
    )}

  </div>

  {/* RIGHT */}
  <div className="text-right">
    {item.type === "SELL" ? (
      <p className="text-emerald-400 text-sm font-semibold">
        +₹{item.inr}
      </p>
    ) : (
      <p className="text-red-400 text-sm font-semibold">
        -₹{item.amount}
      </p>
    )}

    <span
      className={`text-[10px] px-2 py-0.5 rounded-full
      ${
        item.status === "COMPLETED" || item.status === "APPROVED"
          ? "bg-emerald-500/20 text-emerald-400"
          : item.status === "FAILED"
          ? "bg-red-500/20 text-red-400"
          : "bg-yellow-500/20 text-yellow-400"
      }`}
    >
      {item.status}
    </span>
  </div>
</div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard;