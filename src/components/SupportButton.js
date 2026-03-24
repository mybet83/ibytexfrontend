import { useState, useRef, useEffect } from "react";
import { Headset } from "lucide-react";

export default function SupportButton() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  // 👇 CLICK OUTSIDE LOGIC
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gold-gradient p-4 rounded-full shadow-lg hover:scale-110 transition-all"
        >
          <Headset size={22} className="text-black" />
        </button>
      </div>

      {/* Popup */}
      {open && (
        <div
          ref={popupRef} // 👈 IMPORTANT
          className="fixed bottom-20 right-6 w-72 bg-[#0B1120] border border-yellow-500/20 rounded-2xl shadow-2xl p-4 z-50"
        >
          <h3 className="text-white font-semibold text-lg mb-3">
            Customer Support
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            Contact our support team
          </p>

          <a
            href="https://t.me/iBytex_Pay"
            target="_blank"
            className="flex items-center gap-3 bg-[#1f2937] hover:bg-[#374151] p-3 rounded-xl transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
              className="w-6 h-6"
            />
            <span className="text-white font-medium">
              Telegram Support
            </span>
          </a>
        </div>
      )}
    </>
  );
}