import React from "react";
import { Link } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {

  const token = localStorage.getItem("token"); // 👈 check login

  return (
    <footer className="relative z-10 bg-[#0b0e11] border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-12 text-gray-400">

          {/* Brand */}
          <div>
            <img src="/logot.png" alt="logo" className="w-20 mb-6" />

            <p className="text-sm leading-relaxed text-gray-400">
              Secure, fast and trusted USDT to fiat exchange platform.
              Built for speed, security and simplicity.
            </p>

            <div className="flex gap-4 mt-6 text-gray-500">
              <a
                href="https://www.facebook.com/profile.php?id=61587093147690"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <i className="ri-facebook-fill text-xl"></i>
              </a>

              <a
                href="https://www.youtube.com/@Bytex_Pay"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
          </div>

          {/* Trading */}
          <div>
            <h4 className="text-white font-semibold mb-5">Trading</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/login" className="hover:text-yellow-400 transition">
                  Sell USDT
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-yellow-400 transition">
                  Instant Payout
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-yellow-400 transition">
                  Secure Exchange
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-5">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/terms" className="hover:text-yellow-400 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-yellow-400 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold mb-5">Community</h4>
            <p className="text-sm mb-5">
              Join our private Telegram community.
            </p>

            {/* 🔐 Show Telegram only if logged in */}
            {token && (
              <a
                href="https://t.me/ibytex_PayN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 
                           rounded-lg border border-blue-500/30 
                           px-5 py-2 text-sm text-blue-400 
                           hover:bg-blue-500/10 
                           hover:border-blue-400 
                           transition-all duration-300 w-fit"
              >
                <FaTelegramPlane className="text-lg" />
                Join Telegram
              </a>
            )}

            {!token && (
              <p className="text-xs text-gray-500">
                Login to access our private Telegram group.
              </p>
            )}

          </div>

        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Ibytex. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
