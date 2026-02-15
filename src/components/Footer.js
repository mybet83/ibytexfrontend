import React from "react";
import { Link } from "react-router-dom";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gradient-to-b from-black via-[#0b0f14] to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4 text-gray-400">
        {/* Brand */}
        <div>
          <img src="/logot.png" alt="logo" className="w-28 mb-4" />
          <p className="text-sm leading-relaxed">
            Secure, fast and trusted USDT to fiat exchange platform. Built for
            speed, security and simplicity.
          </p>

          <div className="flex gap-4 mt-5 text-gray-500">
            <a
              href="https://www.facebook.com/profile.php?id=61587093147690"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <i className="ri-facebook-fill text-xl cursor-pointer"></i>
            </a>

            <a href="https://wa.me/66960363405" className="hover:text-white transition">
              <i className="ri-whatsapp-fill text-xl cursor-pointer"></i>
            </a>

            <a  href="https://t.me/ibytex_PayN" className="hover:text-white transition">
              <i className="ri-telegram-fill text-xl cursor-pointer"></i>
            </a>

            <a href="https://www.youtube.com/@Bytex_Pay" className="hover:text-white transition">
              <i className="ri-youtube-fill text-xl cursor-pointer"></i>
            </a>
          </div>
        </div>

        {/* Trading */}
        <div>
          <h4 className="text-white font-semibold mb-4">Trading</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/login" className="hover:text-white">
                Sell USDT
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Instant Payout
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Secure Exchange
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-white font-semibold mb-4">Community</h4>
          <p className="text-sm mb-4">Join our community & stay updated.</p>

     

<div className="flex flex-col gap-3">

  {/* Telegram Button */}
  <a
    href="https://t.me/yourchannel"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 
               rounded-lg border border-blue-500/30 
               px-4 py-2 text-sm text-blue-400 
               hover:bg-blue-500/10 
               hover:border-blue-400 
               transition-all duration-300"
  >
    <FaTelegramPlane className="text-lg" />
    Join Telegram
  </a>

  {/* WhatsApp Button */}
  <a
    href="https://wa.me/your-number"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 
               rounded-lg border border-green-500/30 
               px-4 py-2 text-sm text-green-400 
               hover:bg-green-500/10 
               hover:border-green-400 
               transition-all duration-300"
  >
    <FaWhatsapp className="text-lg" />
    Join WhatsApp
  </a>

</div>

        </div>
      </div>

      <div className="border-t border-white/10 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()} Ibytex. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
