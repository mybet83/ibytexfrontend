import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function AdminWithdrawals() {
  const [requests, setRequests] = useState([]);
  const [utrInputs, setUtrInputs] = useState({});
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const statusParam = queryParams.get("status") || "PENDING";

  const [activeTab, setActiveTab] = useState(statusParam);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${API}/api/withdrawal/admin`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchRequests();
  }, [token]);

  const approve = async (id) => {
    const utrNumber = utrInputs[id];
    if (!utrNumber) {
      alert("Enter UTR Number");
      return;
    }

    await axios.put(
      `${API}/api/withdrawal/approve/${id}`,
      { utrNumber },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchRequests();
  };

  const reject = async (id) => {
    await axios.put(
      `${API}/api/withdrawal/reject/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchRequests();
  };

  // 🔥 FILTER LOGIC
  const filteredRequests = requests
    .filter((r) => r.status === activeTab)
    .filter(
      (r) =>
        r._id.toLowerCase().includes(search.toLowerCase()) ||
        r.userId?.accountId?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] p-8 text-white">
 
    <div className="flex jus">
      <h1 className="text-3xl font-bold mb-6">Withdrawal Management</h1>
     </div>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("PENDING")}
          className={`px-6 py-2 rounded-xl font-semibold ${
            activeTab === "PENDING"
              ? "bg-yellow-500 text-black"
              : "bg-gray-700"
          }`}
        >
          ⏳ Pending Withdraw ({requests.filter(r=>r.status==="PENDING").length})
        </button>

        <button
          onClick={() => setActiveTab("APPROVED")}
          className={`px-6 py-2 rounded-xl font-semibold ${
            activeTab === "APPROVED"
              ? "bg-green-600"
              : "bg-gray-700"
          }`}
        >
          ✅ Successful Withdraw ({requests.filter(r=>r.status==="APPROVED").length})
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by Withdrawal ID or Account ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3"
        />
      </div>

      {/* LIST */}
      {filteredRequests.map((r) => (
        <div
          key={r._id}
          className="bg-[#111827] border border-gray-800 rounded-2xl p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
            <div>
              <p className="text-gray-400">Name</p>
              <p>{r.userId?.name}</p>
            </div>

            <div>
              <p className="text-gray-400">Account ID</p>
              <p className="text-yellow-400">{r.userId?.accountId}</p>
            </div>

            <div>
              <p className="text-gray-400">Withdrawal ID</p>
              <p className="text-xs break-all">{r._id}</p>
            </div>

            <div>
              <p className="text-gray-400">Amount</p>
              <p className="text-green-400 font-bold text-xl">₹ {r.amount}</p>
            </div>

            <div>
              <p className="text-gray-400">Requested On</p>
              <p>{new Date(r.createdAt).toLocaleString()}</p>
            </div>
{r.status === "APPROVED" && (
  <div>
    <p className="text-gray-400 text-sm mt-2">UTR Number</p>
    <p className="text-green-400 font-semibold">
      {r.adminUtrNumber || "Not Available"}
    </p>
  </div>
)}
          </div>

          {r.status === "PENDING" && (
            <>
              <input
                type="text"
                placeholder="Enter UTR Number"
                value={utrInputs[r._id] || ""}
                onChange={(e) =>
                  setUtrInputs({
                    ...utrInputs,
                    [r._id]: e.target.value,
                  })
                }
                className="w-full bg-[#0b1220] border border-gray-700 rounded-xl px-4 py-3 mb-4"
              />

              <div className="flex gap-4">
                <button
                  onClick={() => approve(r._id)}
                  className="flex-1 bg-green-500 px-6 py-3 rounded-xl font-semibold"
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(r._id)}
                  className="flex-1 bg-red-500 px-6 py-3 rounded-xl font-semibold"
                >
                  Reject
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
