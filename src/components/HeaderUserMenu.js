import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const HeaderUserMenu = ({ mobile = false }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/home");
};


  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={menuRef}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className={`${
          mobile ? "w-full justify-between" : ""
        } px-5 py-2 rounded-full bg-gold-gradient text-black font-semibold 
        shadow-lg hover:scale-105 transition-all duration-300 
        flex items-center gap-2`}
      >
        {user?.name || "User"}
        <User className="w-5 h-5 text-white" />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className={`${
            mobile
              ? "relative mt-3 w-full"
              : "absolute right-0 mt-3 w-64"
          } bg-black/95 backdrop-blur-xl border border-white/20 
          rounded-xl p-4 shadow-2xl z-50`}
        >
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">Name:</span>{" "}
            {user?.name}
          </p>

          <p className="text-sm text-gray-300 mt-2">
            <span className="font-semibold text-white">Email:</span>{" "}
            {user?.email}
          </p>

          <p className="text-sm text-gray-300 mt-2">
            <span className="font-semibold text-white">Account ID:</span>{" "}
            {user?.accountId}
          </p>

          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 
            py-2 rounded-lg text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderUserMenu;
