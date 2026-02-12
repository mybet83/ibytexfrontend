import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const API = process.env.REACT_APP_API_URL;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ NEW: loading state
  const [loading, setLoading] = useState(false);

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    telegramId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, phone } = signupInfo;

    if (!name || !email || !password || !phone) {
      return handleError("Please fill all required fields");
    }

    try {
      setLoading(true); // ✅ START LOADING

      const response = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message || "Signup successful");

        setTimeout(() => {
          navigate("/login");
        }, 1000);

      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || message);

      } else {
        handleError(message);
      }

    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false); // ✅ STOP LOADING
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

        <h2 className="text-3xl font-bold text-white text-center">
          Create Account 🚀
        </h2>

        <p className="text-gray-300 text-center mt-2">
          Sign up to get started
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              name="name"
              value={signupInfo.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              name="email"
              value={signupInfo.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Phone */}
         <div>
  <label className="text-sm text-gray-300">Mobile Number</label>

<PhoneInput
  country={"in"}
  enableSearch={true}
  disableCountryCode={false}
  disableDropdown={false}
  countryCodeEditable={false}
  enableLongNumbers={true}
  value={signupInfo.phone}
  onChange={(phone) =>
    setSignupInfo((prev) => ({
      ...prev,
      phone: "+" + phone,
    }))
  }
  inputProps={{
    name: "phone",
    required: true,
    autoFocus: false,
    pattern: ".*"   // 🔥 THIS FIXES THE ERROR
  }}
  containerClass="w-full mt-1"
  inputClass="!w-full !bg-black/40 !text-white !border !border-gray-600 !rounded-lg"
  buttonClass="!bg-black/40 !border !border-gray-600"
  dropdownClass="!bg-slate-900 !text-white"
  searchClass="!bg-black !text-white"
/>
</div>

          {/* Telegram */}
          <div>
            <label className="text-sm text-gray-300">
              Telegram ID (Optional)
            </label>
            <input
              name="telegramId"
              value={signupInfo.telegramId}
              onChange={handleChange}
              type="text"
              placeholder="@yourtelegram"
              className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-300">Password</label>

            <input
              name="password"
              value={signupInfo.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Create your password"
              className="mt-1 w-full px-4 py-3 pr-12 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-gray-400 hover:text-white text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition shadow-lg 
            ${loading 
              ? "bg-gray-500 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/50"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        <p className="text-gray-300 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Login
          </Link>
        </p>

      </div>

      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

export default Signup;
