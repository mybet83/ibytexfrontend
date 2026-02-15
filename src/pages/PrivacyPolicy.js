import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


const PrivacyPolicy = () => {
 
   const navigate = useNavigate();

   

  return (
    <div className="min-h-screen bg-black text-white font-sn">
      <Navbar />

      <section className="relative px-6 lg:px-24 py-20">
        
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 blur-3xl opacity-40"></div>

        <div className="relative max-w-6xl mx-auto">

          {/* Header */}


<div className="flex items-center justify-between mb-6">

  {/* Left Side - Logo + Title */}
  <div className="flex items-center gap-4">
    <img src="/logot.png" alt="logo" className="w-14 h-14" />

    <h1 className="text-4xl lg:text-5xl font-bold 
      bg-[linear-gradient(135deg,#FFD700_0%,#00BFFF_100%)] 
      bg-clip-text text-transparent">
      Privacy Policy
    </h1>
  </div>

  {/* Right Side - Home Button */}
<button
  onClick={() => {
  if (window.history.length > 1) {
    navigate(-1);
  } else {
    navigate("/home");
  }
}}

  className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
>
  ← Back to Home
</button>

</div>


          <p className="text-gray-400 mb-12">
            Last Updated: February 2026
          </p>

          {/* Intro */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-10">
            <p className="text-gray-300 leading-8">
              At <span className="text-yellow-400 font-semibold">iBytex</span>, we value your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, store, and protect your information when you use our forex and cryptocurrency exchange services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">

            {[
              {
                title: "1. Information We Collect",
                content:
                  "We may collect personal information including your name, email address, phone number, identification documents (KYC), transaction history, and payment details. We also collect non-personal data such as device information and usage analytics."
              },
              {
                title: "2. How We Use Your Information",
                content:
                  "Your information is used to process transactions, verify identity, comply with KYC/AML regulations, prevent fraud, improve platform performance, and provide customer support."
              },
              {
                title: "3. Data Protection & Security",
                content:
                  "We implement industry-standard encryption and security measures to protect your information. While we take strong precautions, no online system is 100% secure."
              },
              {
                title: "4. Sharing of Information",
                content:
                  "We do not sell or rent your personal data. Information may be shared with regulatory authorities, legal bodies, or compliance partners when required by law."
              },
              {
                title: "5. Cookies & Tracking",
                content:
                  "We use cookies and tracking technologies to enhance user experience, analyze traffic, and improve platform functionality."
              },
              {
                title: "6. Your Rights",
                content:
                  "You may request access, correction, or deletion of your data where permitted by law. You may also withdraw consent for marketing communications."
              },
              {
                title: "7. Policy Updates",
                content:
                  "iBytex reserves the right to update this Privacy Policy at any time. Continued use of our services after changes indicates acceptance of the updated policy."
              }
            ].map((section, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-yellow-400/40 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-yellow-400 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-300 leading-7">
                  {section.content}
                </p>
              </div>
            ))}

          </div>

          {/* Contact Section */}
          <div className="mt-14 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-300 mb-2">
              If you have questions regarding this Privacy Policy, please contact:
            </p>
            <p className="text-blue-400">Support@ibytex.com</p>
            <p className="text-blue-400">https://ibytex.com</p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
