import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";

const API = process.env.REACT_APP_API_URL;


const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        return handleError(data.message);
      }

      localStorage.setItem("adminToken", data.token);
      handleSuccess("Admin login successful");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);

    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center">Admin Login</h2>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Admin email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600"
          />

          <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold">
            Login
          </button>
        </form>
      </div>

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default AdminLogin;
