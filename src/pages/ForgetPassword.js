import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";

const API = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  // OTP (6 digit separate boxes)
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(0);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // ================= PASSWORD STRENGTH =================
  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/))
      return "Strong";
    return "Medium";
  };

  useEffect(() => {
    if (newPassword) {
      setPasswordStrength(checkPasswordStrength(newPassword));
    }
  }, [newPassword]);

  // ================= OTP TIMER =================
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ================= STEP 1 SEND OTP =================
  const sendOtp = async (e) => {
    if (e) e.preventDefault();
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
        setTimer(60);
      } else {
        handleError(data.message);
      }
    } catch {
      handleError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ================= OTP CHANGE =================
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // 🔥 BACKSPACE MOVE BACKWARD
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // ================= STEP 2 VERIFY OTP =================
  const verifyOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 6) return handleError("Enter complete OTP");
    if (timer === 0) return handleError("OTP expired. Please resend.");

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
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

  // ================= STEP 3 RESET PASSWORD =================
  const resetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword)
      return handleError("Please fill all fields");

    if (newPassword !== confirmPassword)
      return handleError("Passwords do not match");

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
                ${loading
                  ? "bg-gray-600"
                  : "bg-gold-gradient hover:bg-yellow-500 text-black"
                }`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={verifyOtp} className="space-y-5">
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index)
                    }
                    onKeyDown={(e) =>
                      handleOtpKeyDown(e, index)
                    }
                    className="w-12 h-12 text-center text-lg rounded-lg bg-[#0b0e11] border border-yellow-400 focus:outline-none"
                  />
                ))}
              </div>

              {timer > 0 ? (
                <p className="text-gray-400 text-sm text-center">
                  OTP valid for {timer}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="text-yellow-400 text-sm hover:underline text-center w-full"
                >
                  Resend OTP
                </button>
              )}

              <button
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition
                ${loading
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

              {/* New Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Password Strength */}
              {newPassword && (
                <div>
                  <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength === "Weak"
                          ? "w-1/3 bg-red-500"
                          : passwordStrength === "Medium"
                          ? "w-2/3 bg-yellow-400"
                          : "w-full bg-green-500"
                      }`}
                    ></div>
                  </div>
                </div>
              )}

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-3 text-gray-400 text-sm"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition
                ${loading
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
