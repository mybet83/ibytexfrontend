import React from "react";

const AdminOrdersTable = ({ orders = [] }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">
        📊 USDT Sell Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20 text-gray-300">
              <th className="py-3 px-3">Sr.</th>
              <th className="py-3 px-3">Order ID</th>
              <th className="py-3 px-3">Date & Time</th>
              <th className="py-3 px-3">Qty</th>
              <th className="py-3 px-3">Asset</th>
              <th className="py-3 px-3">Rate</th>
              <th className="py-3 px-3">Sell Amount</th>
              <th className="py-3 px-3">Wallet Address</th>
              <th className="py-3 px-3">Payment</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">UTR / Ref</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="11" className="py-6 text-center text-gray-400">
                  No orders found
                </td>
              </tr>
            )}

            {orders.map((o, i) => (
              <tr
                key={o._id || i}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="py-2 px-3">{i + 1}</td>
                <td className="py-2 px-3">{o.orderId}</td>
                <td className="py-2 px-3">{o.date}</td>
                <td className="py-2 px-3">{o.qty}</td>
                <td className="py-2 px-3">{o.asset}</td>
                <td className="py-2 px-3">₹ {o.rate}</td>
                <td className="py-2 px-3 font-semibold">
                  ₹ {o.amount}
                </td>
                <td className="py-2 px-3 truncate max-w-[140px]">
                  {o.wallet}
                </td>
                <td className="py-2 px-3">{o.payment}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      o.status === "Completed"
                        ? "bg-green-600"
                        : o.status === "Pending"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-600"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="py-2 px-3">{o.utr || "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersTable;
