import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";

const API = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // STEP 1: SEND OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!email) return handleError("Please enter your email");

    try {
      const res = await fetch(`${API}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        handleSuccess(data.message);
        setStep(2);
      } else {
        handleError(data.message);
      }
    } catch (err) {
      handleError("Server error");
    }
  };

  // STEP 2: VERIFY OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) return handleError("Enter OTP");

    try {
      const res = await fetch(`${API}/api/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        handleSuccess(data.message);
        setStep(3);
      } else {
        handleError(data.message);
      }
    } catch {
      handleError("OTP verification failed");
    }
  };

  // STEP 3: RESET PASSWORD
  const resetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword) return handleError("Enter new password");

    try {
      const res = await fetch(`${API}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        handleSuccess("Password changed successfully ✅");
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
      } else {
        handleError(data.message);
      }
    } catch {
      handleError("Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

        <h2 className="text-3xl font-bold text-white text-center">
          Reset Password 🔐
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={sendOtp} className="mt-8 space-y-5">
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={verifyOtp} className="mt-8 space-y-5">
            <div>
              <label className="text-sm text-gray-300">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter 6 digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={resetPassword} className="mt-8 space-y-5">
            <div>
              <label className="text-sm text-gray-300">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Reset Password
            </button>
          </form>
        )}

        <p className="text-gray-300 text-sm text-center mt-6">
          Remembered your password?{" "}
          <Link to="/login" className="text-indigo-400">
            Login
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;
