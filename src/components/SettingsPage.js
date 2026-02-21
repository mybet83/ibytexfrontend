import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import AccountStatement from "./AccountStatement";

const API = process.env.REACT_APP_API_URL;

const SettingsPage = ({ user }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    completed: 0,
    pending: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orders = res.data || [];

      setStats({
        totalOrders: orders.length,
        completed: orders.filter(o => o.status === "COMPLETED").length,
        pending: orders.filter(o => o.status === "PENDING").length,
      });
    } catch (err) {
      console.log("Stats fetch failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6">

      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {/* PROFILE CARD */}
      <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-6 text-yellow-400">
          Profile Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-400 text-sm">Full Name</p>
            <p className="font-semibold text-lg">{user?.name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="font-semibold text-lg">{user?.email}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Account ID</p>
            <p className="text-yellow-400 font-semibold">
              {user?.accountId}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Joined</p>
            <p className="font-semibold">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

        </div>
      </div>

      {/* ACCOUNT STATS */}
      <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-6 text-yellow-400">
          Account Statistics
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-black/40 p-5 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm">Total Orders</p>
            <h3 className="text-2xl font-bold">
              <CountUp end={stats.totalOrders} duration={1} />
            </h3>
          </div>

          <div className="bg-green-500/10 p-5 rounded-xl border border-green-500/30">
            <p className="text-green-300 text-sm">Completed</p>
            <h3 className="text-2xl font-bold text-green-400">
              <CountUp end={stats.completed} duration={1} />
            </h3>
          </div>

          <div className="bg-yellow-500/10 p-5 rounded-xl border border-yellow-500/30">
            <p className="text-yellow-300 text-sm">Pending</p>
            <h3 className="text-2xl font-bold text-yellow-400">
              <CountUp end={stats.pending} duration={1} />
            </h3>
          </div>
           <AccountStatement user={user} />

        </div>
      </div>

      {/* SECURITY */}
    

      {/* LOGOUT */}
      <div className="bg-[#111827] border border-red-500/20 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-6 text-red-400">
          Danger Zone
        </h2>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/home";
          }}
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
        >
          Logout Account
        </button>
      </div>

    </div>
  );
};

export default SettingsPage;
 