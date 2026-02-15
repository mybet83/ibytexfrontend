import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";

const API = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  // STEP 1
  const sendOtp = async (e) => {
    e.preventDefault();
    if (!email) return handleError("Please enter your email");

    try {
      setLoading(true);

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
    } catch {
      handleError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2
  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return handleError("Enter OTP");

    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  // STEP 3
  const resetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return handleError("Enter new password");

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        handleSuccess("Password changed successfully ✅");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        handleError(data.message);
      }
    } catch {
      handleError("Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center px-16">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Secure Account 🔐
            <br />
            <span className="text-yellow-400">
              Reset & Continue Trading
            </span>
          </h1>

          <div className="mt-8 space-y-4 text-gray-400 text-sm">
            <p>🚀 Fast & Secure Recovery</p>
            <p>🔒 OTP Protected Reset</p>
            <p>⚡ Instant Access After Reset</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-[#181a20] rounded-2xl p-8 shadow-2xl border border-gray-800">

          <div className="text-center mb-6">
            <img src="/logot.png" alt="logo" className="w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Reset Password</h2>
            <p className="text-gray-400 text-sm mt-1">
              Step {step} of 3
            </p>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={sendOtp} className="space-y-5">
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
              />

              <button
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition
                ${
                  loading
                    ? "bg-gray-600"
                    : "bg-yellow-400 hover:bg-yellow-500 text-black"
                }`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={verifyOtp} className="space-y-5">
              <input
                type="text"
                placeholder="Enter 6 digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
              />

              <button
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition
                ${
                  loading
                    ? "bg-gray-600"
                    : "bg-yellow-400 hover:bg-yellow-500 text-black"
                }`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form onSubmit={resetPassword} className="space-y-5">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
              />

              <button
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition
                ${
                  loading
                    ? "bg-gray-600"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          )}

          <p className="text-gray-400 text-sm text-center mt-6">
            Remembered your password?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;
