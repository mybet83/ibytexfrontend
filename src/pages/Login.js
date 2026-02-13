import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";

const API = process.env.REACT_APP_API_URL;

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Please fill all the fields");
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, user, error } = result;

      if (success) {
        handleSuccess(message);

        localStorage.setItem("token", jwtToken);
        localStorage.setItem("user", JSON.stringify(user));

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || "Login failed");
      } else {
        handleError(message || "Login failed");
      }
    } catch (error) {
      handleError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white flex flex-col">

      {/* MAIN SECTION */}
      <div className="flex flex-1 items-center px-6 py-12 justify-evenly">

        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

          {/* ================= LEFT SIDE ================= */}
          <div className="hidden lg:block">

            <h1 className="text-5xl font-bold leading-tight">
         Welcome Back, Trader 👋
              <br />
              <span className="text-yellow-400">
           Login & Start Trading Instantly
              </span>
            </h1>

            <div className="mt-6">
              <img
                src="/signup.png"
                alt="login"
                className="w-56"
              />
            </div>

            <div className="mt-10 space-y-6 text-gray-400 text-sm">

              <div className="flex items-center gap-3">
                <span>🚀</span>
                <span>Fast & Secure Trading Platform</span>
              </div>

              <div className="flex items-center gap-3">
                <span>💰</span>
                <span>Instant USDT Buy & Sell</span>
              </div>

              <div className="flex items-center gap-3">
                <span>🔒</span>
                <span>100% Verified & Safe System</span>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE LOGIN FORM ================= */}
          <div className="flex justify-center">

            <div className="w-full max-w-md bg-[#181a20] rounded-2xl p-8 shadow-2xl border border-gray-800">

              {/* Logo + Title */}
              <div className="text-center mb-6 flex items-center justify-center  max-sm:flex-col">
                <img
                  src="/logot.png"
                  alt="ibytex"
                  className="w-16  max-sm:mx-auto "
                />
               <div className="relative flex-col">
                  <h2 className="text-2xl font-bold">
                  Login to Ibytex
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Enter your credentials to continue trading
                </p>
               </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">

                {/* EMAIL */}
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <input
                    name="email"
                    onChange={handleChange}
                    value={loginInfo.email}
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1 w-full px-4 py-3 rounded-lg bg-[#0b0e11] border border-gray-700 focus:border-yellow-400 outline-none"
                  />
                </div>

                {/* PASSWORD */}
                <div className="relative">
                  <label className="text-sm text-gray-400">Password</label>

                  <input
                    name="password"
                    onChange={handleChange}
                    value={loginInfo.password}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

                {/* BUTTON */}
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
                  {loading ? "Logging in..." : "Login"}
                </button>

              </form>

              {/* Extra Links */}
              <p className="text-sm text-center mt-4">
                <Link
                  to="/forgot-password"
                  className="text-yellow-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </p>

              <p className="text-gray-400 text-sm text-center mt-2">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-yellow-400 hover:underline"
                >
                  Sign Up
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#181a20] border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Ibytex. All rights reserved.
      </footer>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
