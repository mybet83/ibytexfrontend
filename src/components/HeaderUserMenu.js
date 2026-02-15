import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const HeaderUserMenu = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

const handleLogout = () => {
  localStorage.clear();
  navigate("/home");
};


  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="px-5 py-2 rounded-full bg-gold-gradient text-black font-semibold 
                   shadow-lg hover:scale-105 transition-all duration-300  flex items-center gap-2"
      >
        {user?.name || "User"}
       <User className="w-5 h-5 text-white" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-4 z-50">
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">Name:</span>{" "}
            {user?.name}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            <span className="font-semibold text-white">Email:</span>{" "}
            {user?.email}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            <span className="font-semibold text-white">Account ID:</span>{" "}
            {user?.accountId}
          </p>

          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderUserMenu;
