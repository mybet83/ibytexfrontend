import React from "react";

const OrdersTable = ({ type }) => {
  const data =
    type === "pending"
      ? [
          {
            id: "ORD1001",
            qty: 100,
            asset: "USDT",
            rate: 109875,
            amount: 10987500,
            status: "Pending",
          },
        ]
      : [
          {
            id: "ORD0999",
            qty: 50,
            asset: "USDT",
            rate: 109875,
            amount: 5493750,
            status: "Completed",
          },
        ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/20 text-gray-300">
            <th className="py-2 px-2">Order ID</th>
            <th className="py-2 px-2">Qty</th>
            <th className="py-2 px-2">Asset</th>
            <th className="py-2 px-2">Rate</th>
            <th className="py-2 px-2">Amount</th>
            <th className="py-2 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <tr
              key={o.id}
              className="border-b border-white/10 hover:bg-white/5"
            >
              <td className="py-2 px-2">{o.id}</td>
              <td className="py-2 px-2">{o.qty}</td>
              <td className="py-2 px-2">{o.asset}</td>
              <td className="py-2 px-2">₹ {o.rate}</td>
              <td className="py-2 px-2 font-semibold">
                ₹ {o.amount}
              </td>
              <td className="py-2 px-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    o.status === "Completed"
                      ? "bg-green-600"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
