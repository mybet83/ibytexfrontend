import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";

const API = process.env.REACT_APP_API_URL;

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  // ✅ NEW: loading state
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
      setLoading(true); // ✅ START LOADING

      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      setLoading(false); // ✅ STOP LOADING
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 max-sm:p-4">
        <h2 className="text-3xl font-bold text-white text-center">
          Login
        </h2>

        <p className="text-gray-300 text-center mt-2">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5 max-sm:mt-6">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              name="email"
              onChange={handleChange}
              value={loginInfo.email}
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="text-sm text-gray-300">Password</label>

            <input
              name="password"
              onChange={handleChange}
              value={loginInfo.password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
            disabled={loading}  // ✅ disable when loading
            className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 shadow-lg 
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
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Forgot password?
          </Link>
        </p>

        <p className="text-gray-300 text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Signup
          </Link>
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        style={{ marginTop: "40px" }}
      />
    </div>
  );
};

export default Login;
