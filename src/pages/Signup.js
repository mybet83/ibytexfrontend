import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const API = process.env.REACT_APP_API_URL;

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    telegramId: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(0);

  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/))
      return "Strong";
    return "Medium";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, phone } = signupInfo;

    if (!name || !email || !password || !phone) {
      return handleError("Please fill all required fields");
    }

    if (password !== confirmPassword) {
      return handleError("Passwords do not match");
    }

    try {
      setLoading(true);

      if (!otpSent) {
        const res = await fetch(`${API}/api/auth/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data.success) {
          handleSuccess("OTP sent to your email");
          setOtpSent(true);
          setTimer(60);
        } else {
          handleError(data.message);
        }

        setLoading(false);
        return;
      }

      const otpValue = otp.join("");

      if (otpValue.length !== 6) {
        setLoading(false);
        return handleError("Enter valid 6 digit OTP");
      }

      const verifyRes = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        setLoading(false);
        return handleError("Invalid OTP");
      }

      const signupRes = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const signupData = await signupRes.json();

      if (signupData.success) {
        handleSuccess("Account created successfully 🎉");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(signupData.message);
      }
    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white flex flex-col">
      <div className="flex flex-1 items-center px-6 py-12 justify-evenly">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <div className="hidden lg:block">
            <h1 className="text-5xl font-bold leading-tight">
              Up to <span className="text-yellow-400">100 USD</span>
              <br /> Sign Up Rewards
            </h1>

            <div className="mt-10 space-y-6 text-gray-400 text-sm">
              <div className="flex items-center gap-3">
                <span>🏆</span>
                <span>Trusted Crypto Exchange Platform</span>
              </div>

              <div className="flex items-center gap-3">
                <span>📈</span>
                <span>High Liquidity & Fast Transactions</span>
              </div>

              <div className="flex items-center gap-3">
                <span>🔒</span>
                <span>Secure & Verified Trading System</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md bg-[#181a20] rounded-2xl p-8 shadow-2xl border border-gray-800">
              <div className="text-center flex items-center justify-center gap-3">
                <img src="/logot.png" alt="logo" className="w-16" />
                <div>
                  <h2 className="text-2xl font-bold">Welcome to Ibytex</h2>
                  <p className="text-gray-400 text-sm">
                    Create your account to start trading
                  </p>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-5 mt-6">
                <input
                  name="name"
                  value={signupInfo.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700"
                />

                <input
                  name="email"
                  value={signupInfo.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700"
                />

                <PhoneInput
                  country={"in"}
                  value={signupInfo.phone}
                  onChange={(phone) =>
                    setSignupInfo((prev) => ({
                      ...prev,
                      phone: "+" + phone,
                    }))
                  }
                  inputProps={{ required: true }}
                  inputClass="!w-full !bg-[#0b0e11] !text-white !border !border-gray-700"
                />

                <input
                  name="telegramId"
                  value={signupInfo.telegramId}
                  onChange={handleChange}
                  placeholder="Telegram ID (Optional)"
                  className="w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700"
                />

                {/* PASSWORD WITH SHOW BUTTON */}
                <div className="relative">
                  <input
                    name="password"
                    value={signupInfo.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-[#0b0e11] border border-gray-700"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {signupInfo.password && (
                  <p className="text-sm text-yellow-400">
                    {passwordStrength} Password
                  </p>
                )}

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-[#0b0e11] border border-gray-700"
                  />

                 
                </div>

                {otpSent && (
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        className="w-12 h-12 text-center rounded-lg bg-[#0b0e11] border border-yellow-400"
                      />
                    ))}
                  </div>
                )}

                {otpSent && (
                  <div className="text-center text-sm">
                    {timer > 0 ? (
                      <p className="text-gray-400">Resend OTP in {timer}s</p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          handleSignup(new Event("submit"));
                        }}
                        className="text-yellow-400 hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-yellow-400 text-black font-semibold"
                >
                  {loading
                    ? "Processing..."
                    : otpSent
                      ? "Verify & Create Account"
                      : "Create Account"}
                </button>
              </form>

              <p className="text-gray-400 text-sm text-center mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-yellow-400">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#181a20] border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Ibytex. All rights reserved.
      </footer>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
