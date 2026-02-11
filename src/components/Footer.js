import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gradient-to-b from-black via-[#0b0f14] to-black border-t border-white/10">
      
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4 text-gray-400">

        {/* Brand */}
        <div>
          <img src="/logot.png" alt="logo" className="w-28 mb-4" />
          <p className="text-sm leading-relaxed">
            Secure, fast and trusted USDT to fiat exchange platform.
            Built for speed, security and simplicity.
          </p>

          <div className="flex gap-4 mt-5 text-gray-500">
            <i className="ri-facebook-fill hover:text-white cursor-pointer"></i>
            <i className="ri-twitter-x-line hover:text-white cursor-pointer"></i>
            <i className="ri-telegram-fill hover:text-white cursor-pointer"></i>
            <i className="ri-youtube-fill hover:text-white cursor-pointer"></i>
          </div>
        </div>

        {/* Trading */}
        <div>
          <h4 className="text-white font-semibold mb-4">Trading</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/login" className="hover:text-white">Sell USDT</Link></li>
            <li><Link to="/login" className="hover:text-white">Instant Payout</Link></li>
            <li><Link to="/login" className="hover:text-white">Secure Exchange</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-white font-semibold mb-4">Community</h4>
          <p className="text-sm mb-4">
            Join our community & stay updated.
          </p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
            >
              Join Telegram
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
            >
              Join WhatsApp
            </button>
          </div>
        </div>

      </div>

      <div className="border-t border-white/10 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()} ByteX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
