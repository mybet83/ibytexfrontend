import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import AccountStatement from "./AccountStatement";

const API = process.env.REACT_APP_API_URL;

const SettingsPage = ({ user , theme }) => {
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
      const res = await axios.get(`${API}/api/orders/my`, {
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
 <div className={`min-h-screen ${theme === "dark" ? "text-white" : "text-black"}`}>

      <h1 className="text-3xl font-bold mb-8 max-md:text-2xl max-md:mb-5">Account Settings</h1>

      {/* PROFILE CARD */}
      <div className={`border rounded-xl p-5 mb-5
${theme === "dark"
  ? "bg-[#191d23] border-white/10"
  : "bg-white border-gray-200"}
`}>
        <h2 className="text-lg font-semibold mb-6 text-yellow-400 max-md:text-[14px] max-md:mb-3 ">
          Profile Information
        </h2>

        <div className="grid grid-cols-2 gap-6 max-md:gap-3">

          <div>
            <p className="text-gray-400 text-sm max-md:text-[12px]">Full Name</p>
            <p className="font-semibold text-lg max-md:text-[14px]">{user?.name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm max-md:text-[12px]">Email</p>
            <p className="font-semibold text-lg max-md:text-[14px]">{user?.email}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm max-md:text-[12px]">Account ID</p>
            <p className="text-yellow-400 font-semibold max-md:text-[14px]">
              {user?.accountId}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm max-md:text-[12px]">Joined</p>
            <p className="font-semibold max-md:text-[14px]">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

        </div>
      </div>

      {/* ACCOUNT STATS */}
     <div className={`border rounded-xl p-5 mb-5
${theme === "dark"
  ? "bg-[#191d23] border-white/10"
  : "bg-white border-gray-200"}
`}>
        <h2 className="text-lg font-semibold mb-6 text-yellow-400 max-md:text-[14px] max-md:mb-3">
          Account Statistics
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-md:gap-3">

        <div className={`p-5 rounded-xl border
${theme === "dark"
  ? "bg-black/40 border-gray-800"
  : "bg-gray-100 border-gray-200"}
`}>
            <p className="text-gray-400 text-sm max-md:text-[12px]">Total Orders</p>
            <h3 className="text-2xl font-bold max-md:text-xl">
              <CountUp end={stats.totalOrders} duration={1} />
            </h3>
          </div>

          <div className={`p-5 rounded-xl border
${theme === "dark"
  ? "bg-green-500/10 border-green-500/30"
  : "bg-green-100 border-green-300"}
`}>
            <p className="text-green-300 text-sm max-md:text-[12px]">Completed</p>
            <h3 className="text-2xl font-bold text-green-400 max-md:text-xl">
              <CountUp end={stats.completed} duration={1} />
            </h3>
          </div>

        <div className={`p-5 rounded-xl border
${theme === "dark"
  ? "bg-yellow-500/10 border-yellow-500/30"
  : "bg-yellow-100 border-yellow-300"}
`}>
            <p className="text-yellow-300 text-sm max-md:text-[12px]">Pending</p>
            <h3 className="text-2xl font-bold text-yellow-400 max-md:text-xl">
              <CountUp end={stats.pending} duration={1} />
            </h3>
          </div>
           <AccountStatement user={user} />

        </div>
      </div>

      {/* SECURITY */}
    

      {/* LOGOUT */}
      <div className={`border rounded-2xl p-6
${theme === "dark"
  ? "bg-[#191d23] border-red-500/20"
  : "bg-white border-red-300"}
`}>
        <h2 className="text-lg font-semibold mb-6 text-red-400 max-md:text-[14px]">
          Danger Zone
        </h2>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/home";
          }}
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold max-md:px-3 max-md:py-2 max-md:text-[12px]"
        >
          Logout Account
        </button>
      </div>

    </div>
  );
};

export default SettingsPage;
 