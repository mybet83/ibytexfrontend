import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/admin/users`, authHeader);
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (id) => {
    await axios.put(`${API}/admin/users/block/${id}`, {}, authHeader);
    toast.success("User status updated");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await axios.delete(`${API}/admin/users/${id}`, authHeader);
    toast.success("User deleted");
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">User List</h1>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-indigo-600 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/10">
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Account ID</th>
              <th>Mobile</th>
              <th>Telegram</th>
              <th>Total USDT</th>
              <th>Orders</th>
              <th>Registered</th>
              <th>Status</th>
              
              <th>Created IP</th>
<th>Created Device</th>
<th>Created City</th>
<th>Created Country</th>

<th>Last Active</th>
<th>Login IP</th>
<th>Login Device</th>
<th>Login City</th>
<th>Login Country</th>
<th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-white/10">
                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.accountId}</td>
                <td>{u.phone}</td>
                <td>{u.telegramId || "-"}</td>
                <td>{u.totalUsdt}</td>
                <td>{u.totalOrders}</td>
                <td>{new Date(u.registrationDate).toLocaleDateString()}</td>
                <td>
                  {u.status === "Blocked" ? (
                    <span className="text-red-400">Blocked</span>
                  ) : (
                    <span className="text-green-400">Active</span>
                  )}
                </td>
                <td>{u.ipAddress || "-"}</td>
<td>{u.deviceInfo || "-"}</td>
<td>{u.city || "-"}</td>
<td>{u.country || "-"}</td>

<td>
  {u.lastActive
    ? new Date(u.lastActive).toLocaleString()
    : "-"}
</td>

<td>{u.lastLoginIp || "-"}</td>
<td>{u.lastLoginDevice || "-"}</td>
<td>{u.lastLoginCity || "-"}</td>
<td>{u.lastLoginCountry || "-"}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => toggleBlock(u._id)}
                    className="bg-yellow-600 px-2 py-1 rounded"
                  >
                    {u.status === "Blocked" ? "Unblock" : "Block"}
                  </button>

                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-600 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}





