import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";

const API = process.env.REACT_APP_API_URL;

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading

    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setLoading(false);
        return handleError(data.message);
      }

      localStorage.setItem("adminToken", data.token);
      handleSuccess("Admin login successful");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);

    } catch (err) {
      setLoading(false);
      handleError(err.message);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-6">

    {/* Background Glow */}
   

    <div className="relative w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden md:block text-white space-y-6">

        <h1 className="text-5xl font-bold leading-tight">
          Control The <br />
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Crypto Empire
          </span>
        </h1>

        <p className="text-gray-400 text-lg">
          Manage users, control rates, monitor transactions and
          keep the platform secure.
        </p>

        <div className="space-y-4 mt-6">

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <p className="text-gray-300">Secure Admin Dashboard</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <p className="text-gray-300">Real-Time Rate Control</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <p className="text-gray-300">24/7 System Monitoring</p>
          </div>

        </div>
      </div>

      {/* ================= RIGHT SIDE LOGIN CARD ================= */}
      <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/10">

     <div className="flex items-center justify-center text-center mx-auto gap-4 mb-8 max-sm:flex-col">
  
  {/* Logo */}
  <img
    src="/logot.png"
    alt="logo"
    className="w-14 h-14 object-contain"
  />

  {/* Text Section */}
  <div className="flex flex-col">
    <h2 className="text-3xl font-bold text-white leading-tight">
      Admin Access
    </h2>

    <p className="text-gray-400 text-sm mt-1">
      Secure dashboard login
    </p>
  </div>

</div>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            name="email"
            type="email"
            placeholder="Admin Email"
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl bg-black/40 text-white border border-white/10 focus:border-blue-500 focus:outline-none transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-xl bg-black/40 text-white border border-white/10 focus:border-blue-500 focus:outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gold-gradient text-black font-bold 
             shadow-lg hover:scale-105 transition-all duration-300
            disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>
      </div>

    </div>

    <ToastContainer autoClose={3000} />
  </div>
);

};

export default AdminLogin;
