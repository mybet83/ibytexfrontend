// import React from "react";
// import { Link } from "react-router-dom";
// import { FaTelegramPlane } from "react-icons/fa";

// const Footer = () => {

//   const token = localStorage.getItem("token"); // 👈 check login

//   return (
//     <footer className="relative z-10 bg-[#0b0e11] border-t border-gray-800">

//       <div className="max-w-7xl mx-auto px-6 py-16">

//         <div className="grid md:grid-cols-4 gap-12 text-gray-400">

//           {/* Brand */}
//           <div>
//             <img src="/logot.png" alt="logo" className="w-20 mb-6" />

//             <p className="text-sm leading-relaxed text-gray-400">
//               Secure, fast and trusted USDT to fiat exchange platform.
//               Built for speed, security and simplicity.
//             </p>

//             <div className="flex gap-4 mt-6 text-gray-500">
//               <a
//                 href="https://www.facebook.com/profile.php?id=61587093147690"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white transition"
//               >
//                 <i className="ri-facebook-fill text-xl"></i>
//               </a>

//               <a
//                 href="https://www.youtube.com/@Bytex_Pay"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white transition"
//               >
//                 <i className="ri-youtube-fill text-xl"></i>
//               </a>
//             </div>
//           </div>

//           {/* Trading */}
//           <div>
//             <h4 className="text-white font-semibold mb-5">Trading</h4>
//             <ul className="space-y-3 text-sm">
//               <li>
//                 <Link to="/login" className="hover:text-yellow-400 transition">
//                   Sell USDT
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/login" className="hover:text-yellow-400 transition">
//                   Instant Payout
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/login" className="hover:text-yellow-400 transition">
//                   Secure Exchange
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Resources */}
//           <div>
//             <h4 className="text-white font-semibold mb-5">Resources</h4>
//             <ul className="space-y-3 text-sm">
//               <li>
//                 <Link to="/terms" className="hover:text-yellow-400 transition">
//                   Terms & Conditions
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/privacy" className="hover:text-yellow-400 transition">
//                   Privacy Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Community */}
//           <div>
//             <h4 className="text-white font-semibold mb-5">Community</h4>
//             <p className="text-sm mb-5">
//               Join our private Telegram community.
//             </p>

//             {/* 🔐 Show Telegram only if logged in */}
//             {token && (
//               <a
//                 href="https://t.me/ibytex_PayN"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center gap-2 
//                            rounded-lg border border-blue-500/30 
//                            px-5 py-2 text-sm text-blue-400 
//                            hover:bg-blue-500/10 
//                            hover:border-blue-400 
//                            transition-all duration-300 w-fit"
//               >
//                 <FaTelegramPlane className="text-lg" />
//                 Join Telegram
//               </a>
//             )}

//             {!token && (
//               <p className="text-xs text-gray-500">
//                 Login to access our private Telegram group.
//               </p>
//             )}

//           </div>

//         </div>
//       </div>

//       <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-500">
//         © {new Date().getFullYear()} Ibytex. All rights reserved.
//       </div>

//     </footer>
//   );
// };

// export default Footer;






















// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaTelegramPlane } from "react-icons/fa";


// const Footer = () => {
//     const [activeModal, setActiveModal] = useState(null);

// const token = localStorage.getItem("token");
// const navigate = useNavigate();

//   const legalContent = {
//     company: {
//       title: "Company Information",
//       content: `
// iBytex Pte Ltd is a Securities Dealer registered in Seychelles with registration number 7423606-3 and authorised by the Financial Services Authority (FSA) with licence number SD7015.

// iBytex Pte Ltd is also authorized as an Over-The-Counter Derivatives Provider (ODP) by the Financial Sector Conduct Authority (FSCA).

// Certain services may be provided by affiliated entities operating under the iBytex brand.
//       `,
//     },
//     risk: {
//       title: "Risk Warning",
//       content: `
// Our services relate to complex derivative products traded outside an exchange. These products carry a high risk of losing money rapidly due to leverage and are not suitable for all investors.

// You should consider whether you understand how leveraged products work and whether you can afford to take the high risk of losing your money.

// Under no circumstances shall iBytex Pte Ltd have any liability for any loss resulting from investing activity.
//       `,
//     },
//     advice: {
//       title: "No Investment Advice",
//       content: `
// The information on this website is for general information purposes only and does not constitute:

// • Investment advice
// • A recommendation
// • A solicitation to engage in any investment activity

// Nothing on this website should be considered financial, legal, or tax advice.
//       `,
//     },
//     jurisdiction: {
//       title: "Jurisdictional Restrictions",
//       content: `
// Services are not offered to residents of certain jurisdictions including, but not limited to:

// USA, Canada, Singapore, North Korea, Europe, United Kingdom, Russia, and Belarus.

// Visitors are responsible for ensuring compliance with local laws.
//       `,
//     },
//     security: {
//       title: "Security & Data Protection",
//       content: `
// ibytex.com complies with the Payment Card Industry Data Security Standard (PCI DSS).

// We conduct regular vulnerability scans and penetration testing to ensure platform security.
//       `,
//     },
//   };

//   return (
//     <>
//       <footer className="bg-[#0b0e11] text-gray-400 border-t border-gray-800">

//         {/* MAIN FOOTER */}
//         <div className="max-w-7xl mx-auto px-6 py-14">
//           <div className="grid md:grid-cols-5 gap-12">

//             {/* BRAND */}
//             <div>
//               <img src="/logot.png" alt="logo" className="w-20 " />
//               <p className="text-sm leading-relaxed">
//                 Secure, fast and trusted USDT to fiat exchange platform.
//               </p>
//               <div className="flex gap-4 mt-6 text-gray-500">

//   <a
//     href="https://www.facebook.com/profile.php?id=61587093147690"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="hover:text-white transition"
//   >
//     <i className="ri-facebook-fill text-xl"></i>
//   </a>

//   <a
//     href="https://www.youtube.com/@Bytex_Pay"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="hover:text-white transition"
//   >
//     <i className="ri-youtube-fill text-xl"></i>
//   </a>

// </div>

//             </div>

//             {/* TRADING */}
//             <div>
//               <h4 className="text-white font-semibold mb-5">Trading</h4>
//               <ul className="space-y-3 text-sm">
//                 <li><Link to="/login" className="hover:text-yellow-400">Sell USDT</Link></li>
//                 <li><Link to="/login" className="hover:text-yellow-400">Instant Payout</Link></li>
//                 <li><Link to="/login" className="hover:text-yellow-400">Secure Exchange</Link></li>
//               </ul>
//             </div>
             
//                 <div>
//               <h4 className="text-white font-semibold mb-5">About</h4>
//               <ul className="space-y-3 text-sm">
//                 <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
//                 <li><Link to="/privacy" className="hover:text-yellow-400">Privacy Police</Link></li>
//                 <li><Link to="/terms" className="hover:text-yellow-400">Term & Conditions</Link></li>
//               </ul>
//             </div>
              
//             <div>
//               <h4 className="text-white font-semibold mb-5">Legal</h4>
//               <ul className="space-y-3 text-sm">
//                 <li onClick={() => setActiveModal("company")} className="cursor-pointer hover:text-yellow-400">Company Information</li>
//                 <li onClick={() => setActiveModal("risk")} className="cursor-pointer hover:text-yellow-400">Risk Warning</li>
//                 <li onClick={() => setActiveModal("advice")} className="cursor-pointer hover:text-yellow-400">No Investment Advice</li>
//                 <li onClick={() => setActiveModal("jurisdiction")} className="cursor-pointer hover:text-yellow-400">Jurisdictional Restrictions</li>
//                 <li onClick={() => setActiveModal("security")} className="cursor-pointer hover:text-yellow-400">Security & Data Protection</li>
//               </ul>
//             </div>

//             {/* COMMUNITY */}
//      {/* COMMUNITY */}
// <div>
//   <h4 className="text-white font-semibold mb-5">Community</h4>
//   <p className="text-sm mb-5 text-gray-400">
//     Join our private Telegram community.
//   </p>

// <button
//   onClick={() => {
//     if (token) {
//       window.open("https://t.me/ibytex_PayN", "_blank");
//     } else {
//       navigate("/login");
//     }
//   }}
//   className="inline-flex items-center justify-center gap-2 
//              rounded-lg border border-blue-500/30 
//              px-5 py-2 text-sm 
//              text-blue-400 
//              hover:bg-blue-500/10 
//              hover:border-blue-400 
//              transition-all duration-300"
// >
//   <FaTelegramPlane className="text-lg" />
//   Join Telegram
// </button>

//   {!token && (
//     <p className="text-xs text-gray-500 mt-2">
//       Login required to access this community.
//     </p>
//   )}
// </div>

//           </div>
//         </div>

//         <div className="border-t border-gray-800 text-center py-6 text-xs text-gray-500">
//           © {new Date().getFullYear()} iBytex Pte Ltd. All rights reserved.
//         </div>
//       </footer>

//       {/* ================= MODAL ================= */}
//       {activeModal && (
//         <div
//           className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
//           onClick={() => setActiveModal(null)}
//         >
//           <div
//             className="bg-[#11161c] text-gray-300 max-w-2xl w-full mx-4 p-8 rounded-xl border border-gray-700 shadow-2xl max-h-[80vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-white text-xl font-semibold mb-6">
//               {legalContent[activeModal].title}
//             </h2>

//             <p className="whitespace-pre-line text-sm leading-relaxed">
//               {legalContent[activeModal].content}
//             </p>

//             <button
//               onClick={() => setActiveModal(null)}
//               className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg text-sm"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Footer;


































import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const legalContent = {
    company: {
      title: "Company Information",
      content: `
iBytex Pte Ltd is a Securities Dealer registered in Seychelles with registration number 7423606-3 and authorised by the Financial Services Authority (FSA) with licence number SD7015.
iBytex Pte Ltd is also authorized as an Over-The-Counter Derivatives Provider (ODP) by the Financial Sector Conduct Authority (FSCA).
Certain services may be provided by affiliated entities operating under the iBytex brand:
These entities are duly authorized to operate under the iBytex brand and trademarks.
      `,
    },
    risk: {
      title: "Risk Warning",
      content: `
Our services relate to complex derivative products traded outside an exchange. These products carry a high risk of losing money rapidly due to leverage and are not suitable for all investors.
You should consider whether you understand how leveraged products work and whether you can afford to take the high risk of losing your money.
Under no circumstances shall iBytex Pte Ltd have any liability to any person or entity for any loss or damage in whole or part caused by, resulting from, or relating to any investing activity.
      `,
    },
    advice: {
      title: "No Investment Advice",
      content: `
The information on this website is for general information purposes only and does not constitute:
· Investment advice
· A recommendation
· A solicitation to engage in any investment activity
Nothing on this website should be considered financial, legal, or tax advice.
      `,
    },
    jurisdiction: {
      title: "Jurisdictional Restrictions",
      content: `
The entities listed above do not offer services to residents of certain jurisdictions including, but not limited to:
USA, Canada, Singapore  North Korea, Europe, the United Kingdom, Russia, and Belarus.
It is the responsibility of visitors to ensure that accessing and using this website complies with local laws and regulations.
      `,
    },
    website: {
      title: "Website Use",
      content: `
Any interaction with this website constitutes an individual and voluntary action by the person accessing it.
This website and its content do not constitute an invitation for the contracting and/or acquisition of financial services or products.
      `,
    },
    intellectual: {
      title: "Intellectual Property",
      content: `
All content on this website is protected by intellectual property laws.
Information may only be copied, reproduced, or distributed with the express written permission of iBytex Pte Ltd.
      `,
    },
    security: {
      title: "Security & Data Protection",
      content: `
https://ibytex.com complies with the Payment Card Industry Data Security Standard (PCI DSS) to help ensure your security and privacy.
We conduct regular vulnerability scans and penetration testing in accordance with PCI DSS requirements appropriate to our business model.
      `,
    },
  };

  return (
    <>
      <footer className="bg-black text-gray-400 border-t border-gray-800">

        {/* ================= TOP GRID ================= */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-5 gap-12">

          <div>
               <img src="/logot.png" alt="logo" className="w-20 " />
              <p className="text-sm leading-relaxed">
                 Secure, fast and trusted USDT to fiat exchange platform.
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
            <div>
              <h4 className="text-white font-semibold mb-6">Trading</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/login" className="hover:text-yellow-400">Sell USDT</Link></li>
                <li><Link to="/login" className="hover:text-yellow-400">Instant Payout</Link></li>
                <li><Link to="/login" className="hover:text-yellow-400">Secure Exchange</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
                <li><Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-yellow-400">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="space-y-3 text-sm">
                {Object.keys(legalContent).map((key) => (
                  <li
                    key={key}
                    onClick={() => setActiveModal(key)}
                    className="cursor-pointer hover:text-yellow-400"
                  >
                    {legalContent[key].title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Community</h4>
              <button
                onClick={() => {
                  if (token) {
                    window.open("https://t.me/ibytex_PayN", "_blank");
                  } else {
                    navigate("/login");
                  }
                }}
                className="flex items-center gap-2 border border-blue-500/30 px-5 py-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition"
              >
                <FaTelegramPlane />
                Join Telegram
              </button>
            </div>

          </div>
        </div>

        {/* ================= ANIMATED COMPLIANCE BADGES ================= */}
   

        {/* ================= FULL DOC LEGAL TEXT ================= */}
        <div className="border-t border-gray-800 px-6 py-12 max-w-7xl mx-auto text-xs leading-6 text-gray-500 space-y-6 whitespace-pre-line">
{`
iBytex Pte Ltd is a Securities Dealer registered in Seychelles with registration number 7423606-3 and authorised by the Financial Services Authority (FSA) with licence number SD7015.
iBytex Pte Ltd is also authorized as an Over-The-Counter Derivatives Provider (ODP) by the Financial Sector Conduct Authority (FSCA).
Certain services may be provided by affiliated entities operating under the iBytex brand:
These entities are duly authorized to operate under the iBytex brand and trademarks.

Risk Warning
Our services relate to complex derivative products traded outside an exchange. These products carry a high risk of losing money rapidly due to leverage and are not suitable for all investors.
You should consider whether you understand how leveraged products work and whether you can afford to take the high risk of losing your money.
Under no circumstances shall iBytex Pte Ltd have any liability to any person or entity for any loss or damage in whole or part caused by, resulting from, or relating to any investing activity.

No Investment Advice
The information on this website is for general information purposes only and does not constitute:
· Investment advice
· A recommendation
· A solicitation to engage in any investment activity
Nothing on this website should be considered financial, legal, or tax advice.

Jurisdictional Restrictions
The entities listed above do not offer services to residents of certain jurisdictions including, but not limited to:
USA, Canada, Singapore  North Korea, Europe, the United Kingdom, Russia, and Belarus.
It is the responsibility of visitors to ensure that accessing and using this website complies with local laws and regulations.

Website Use
Any interaction with this website constitutes an individual and voluntary action by the person accessing it.
This website and its content do not constitute an invitation for the contracting and/or acquisition of financial services or products.

Intellectual Property
All content on this website is protected by intellectual property laws.
Information may only be copied, reproduced, or distributed with the express written permission of iBytex Pte Ltd.

Security & Data Protection
https://ibytex.com complies with the Payment Card Industry Data Security Standard (PCI DSS) to help ensure your security and privacy.
We conduct regular vulnerability scans and penetration testing in accordance with PCI DSS requirements appropriate to our business model.
`}
        </div>

        <div className="border-t border-gray-800 text-center py-6 text-xs text-gray-600">
          © {new Date().getFullYear()} iBytex Pte Ltd. All rights reserved.
        </div>

      </footer>

      {activeModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-[#11161c] text-gray-300 max-w-2xl w-full mx-4 p-8 rounded-xl border border-gray-700 shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-xl font-semibold mb-6">
              {legalContent[activeModal].title}
            </h2>

            <p className="whitespace-pre-line text-sm leading-relaxed">
              {legalContent[activeModal].content}
            </p>

            <button
              onClick={() => setActiveModal(null)}
              className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;