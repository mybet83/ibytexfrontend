// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../utiles";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const API = process.env.REACT_APP_API_URL;

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   // ✅ NEW: loading state
//   const [loading, setLoading] = useState(false);

//   const [signupInfo, setSignupInfo] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     telegramId: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSignupInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const { name, email, password, phone } = signupInfo;

//     if (!name || !email || !password || !phone) {
//       return handleError("Please fill all required fields");
//     }

//     try {
//       setLoading(true); // ✅ START LOADING

//       const response = await fetch(`${API}/auth/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(signupInfo),
//       });

//       const result = await response.json();
//       const { success, message, error } = result;

//       if (success) {
//         handleSuccess(message || "Signup successful");

//         setTimeout(() => {
//           navigate("/login");
//         }, 1000);

//       } else if (error) {
//         const details = error?.details?.[0]?.message;
//         handleError(details || message);

//       } else {
//         handleError(message);
//       }

//     } catch (err) {
//       handleError(err.message);
//     } finally {
//       setLoading(false); // ✅ STOP LOADING
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black px-4">

//       <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

//         <h2 className="text-3xl font-bold text-white text-center">
//           Create Account 🚀
//         </h2>

//         <p className="text-gray-300 text-center mt-2">
//           Sign up to get started
//         </p>

//         <form onSubmit={handleSignup} className="mt-8 space-y-5">

//           {/* Name */}
//           <div>
//             <label className="text-sm text-gray-300">Full Name</label>
//             <input
//               name="name"
//               value={signupInfo.name}
//               onChange={handleChange}
//               type="text"
//               placeholder="Enter your name"
//               className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm text-gray-300">Email</label>
//             <input
//               name="email"
//               value={signupInfo.email}
//               onChange={handleChange}
//               type="email"
//               placeholder="Enter your email"
//               className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
//             />
//           </div>

//           {/* Phone */}
//          <div>
//   <label className="text-sm text-gray-300">Mobile Number</label>

// <PhoneInput
//   country={"in"}
//   enableSearch={true}
//   disableCountryCode={false}
//   disableDropdown={false}
//   countryCodeEditable={false}
//   enableLongNumbers={true}
//   value={signupInfo.phone}
//   onChange={(phone) =>
//     setSignupInfo((prev) => ({
//       ...prev,
//       phone: "+" + phone,
//     }))
//   }
//   inputProps={{
//     name: "phone",
//     required: true,
//     autoFocus: false,
//     pattern: ".*"   // 🔥 THIS FIXES THE ERROR
//   }}
//   containerClass="w-full mt-1"
//   inputClass="!w-full !bg-black/40 !text-white !border !border-gray-600 !rounded-lg"
//   buttonClass="!bg-black/40 !border !border-gray-600"
//   dropdownClass="!bg-slate-900 !text-white"
//   searchClass="!bg-black !text-white"
// />
// </div>

//           {/* Telegram */}
//           <div>
//             <label className="text-sm text-gray-300">
//               Telegram ID (Optional)
//             </label>
//             <input
//               name="telegramId"
//               value={signupInfo.telegramId}
//               onChange={handleChange}
//               type="text"
//               placeholder="@yourtelegram"
//               className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="text-sm text-gray-300">Password</label>

//             <input
//               name="password"
//               value={signupInfo.password}
//               onChange={handleChange}
//               type={showPassword ? "text" : "password"}
//               placeholder="Create your password"
//               className="mt-1 w-full px-4 py-3 pr-12 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-[42px] text-gray-400 hover:text-white text-sm"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-lg text-white font-semibold transition shadow-lg
//             ${loading
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/50"
//             }`}
//           >
//             {loading ? (
//               <div className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin h-5 w-5 mr-2"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="white"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="white"
//                     d="M4 12a8 8 0 018-8v8H4z"
//                   ></path>
//                 </svg>
//                 Creating Account...
//               </div>
//             ) : (
//               "Create Account"
//             )}
//           </button>

//         </form>

//         <p className="text-gray-300 text-sm text-center mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-400 hover:text-indigo-300 font-medium"
//           >
//             Login
//           </Link>
//         </p>

//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />

//     </div>
//   );
// };

// export default Signup;















import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const API = process.env.REACT_APP_API_URL;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    telegramId: "",
  });
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    if (!isValidEmail(signupInfo.email)) {
      return handleError("Enter valid email first");
    }

    try {
      setSendingOtp(true);

      const res = await fetch(`${API}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupInfo.email }),
      });

      const data = await res.json();

      if (data.success) {
        handleSuccess("OTP sent to your email");
        setOtpSent(true);
      } else {
        handleError(data.message || "Failed to send OTP");
      }
    } catch {
      handleError("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return handleError("Enter OTP");

    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupInfo.email,
          otp,
        }),
      });

      const data = await res.json();

      if (data.success) {
        handleSuccess("Email verified successfully ✅");
        setOtpVerified(true);
      } else {
        handleError("Invalid OTP");
      }
    } catch {
      handleError("OTP verification failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      return handleError("Please verify your email first");
    }

    const { name, email, password, phone } = signupInfo;

    if (!name || !email || !password || !phone) {
      return handleError("Please fill all required fields");
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message || "Signup successful");
        setTimeout(() => navigate("/login"), 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white flex flex-col ">
      {/* MAIN CONTENT */}
      <div className="flex flex-1 items-center relative  px-6 py-12 justify-evenly ">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          {/* ================= LEFT SIDE ================= */}
          <div className="hidden lg:block">
            <h1 className="text-5xl font-bold leading-tight">
              Up to <span className="text-yellow-400">100 USD</span>
              <br /> Sign Up Rewards
            </h1>

            <div className="mt-">
              <img src="/signup.png" alt="reward" className="w-40" />
            </div>

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

          {/* ================= RIGHT SIDE FORM ================= */}
          <div className="flex justify-center ">
            <div className="w-full max-w-md bg-[#181a20] rounded-2xl p-8 shadow-2xl border border-gray-800 ">
              {/* Logo */}
              <div className="text-center justify-center items-center flex max-sm:flex-col ">
                <img
                  src="/logot.png"
                  alt="ibytex"
                  className="w-16   max-sm:mx-auto"
                />
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">Welcome to Ibytex</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Create your account to start trading
                  </p>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="text-sm text-gray-400">Full Name</label>
                  <input
                    name="name"
                    value={signupInfo.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your full name"
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
                  />
                </div>

                {/* Email */}
                {/* Email */}
                <div>
                  <label className="text-sm text-gray-400">Email</label>

                  <input
                    name="email"
                    value={signupInfo.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
                  />

                  {/* SEND OTP BUTTON */}
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={sendingOtp}
                      className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg"
                    >
                      {sendingOtp ? "Sending OTP..." : "Send OTP"}
                    </button>
                  )}

                  {/* OTP INPUT AFTER SENDING */}
                  {otpSent && !otpVerified && (
                    <div className="mt-3">
                      <label className="text-sm text-gray-400">Enter OTP</label>

                      <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        placeholder="Enter 6 digit OTP"
                        className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-yellow-400 outline-none"
                      />

                      <button
                        type="button"
                        onClick={verifyOtp}
                        className="mt-2 w-full bg-green-500 hover:bg-green-600 text-black py-2 rounded-lg"
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}

                  {/* VERIFIED MESSAGE */}
                  {otpVerified && (
                    <p className="text-green-400 text-sm mt-2">
                      Email Verified ✅
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm text-gray-400">Mobile Number</label>

                  <PhoneInput
                    country={"in"}
                    enableSearch={true}
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
                      pattern: ".*",
                    }}
                    containerClass="w-full mt-1"
                    inputClass="!w-full !bg-[#0b0e11] !text-white !border !border-gray-700 !rounded-lg"
                    buttonClass="!bg-[#0b0e11] !border !border-gray-700"
                    dropdownClass="!bg-[#181a20] !text-white"
                  />
                </div>

                {/* Telegram */}
                <div>
                  <label className="text-sm text-gray-400">
                    Telegram ID (Optional)
                  </label>
                  <input
                    name="telegramId"
                    value={signupInfo.telegramId}
                    onChange={handleChange}
                    type="text"
                    placeholder="@yourtelegram"
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="text-sm text-gray-400">Password</label>

                  <input
                    name="password"
                    value={signupInfo.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    className="mt-1 w-full px-4 py-3 pr-12 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[42px] text-gray-400 text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold transition
                  ${
                    loading
                      ? "bg-gray-600"
                      : "bg-yellow-400 hover:bg-yellow-500 text-black"
                  }`}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <p className="text-gray-400 text-sm text-center mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-yellow-400 hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#181a20] border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Ibytex. All rights reserved.
      </footer>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
