import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function AdminActiveUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${API}/admin/active-users/today`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">🔥 Today Active Users</h1>

      {users.length === 0 && (
        <p className="text-gray-400">No active users today.</p>
      )}

      {users.map((u, i) => (
        <div
          key={i}
          className="bg-white/10 p-6 rounded-xl mb-6 border border-white/10"
        >
          <h2 className="text-xl font-semibold text-cyan-400">
            {u.user.name} ({u.user.accountId})
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              📦 Sell Orders: {u.sellCount}
            </div>
            <div>
              💰 Sell Amount: {u.sellAmount}
            </div>
            <div>
              🏦 Withdraw Requests: {u.withdrawCount}
            </div>
            <div>
              💸 Withdraw Amount: {u.withdrawAmount}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
