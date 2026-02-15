import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sn">
      <Navbar />

      <section className="relative px-6 lg:px-24 py-20">
        
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 blur-3xl opacity-40"></div>

        <div className="relative max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <img src="/logot.png" alt="logo" className="w-14 h-14" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-[linear-gradient(135deg,#FFD700_0%,#00BFFF_100%)] bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
          </div>

          <p className="text-gray-400 mb-12">
            Last Updated: February 2026
          </p>

          {/* Introduction */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-10">
            <p className="text-gray-300 leading-8">
              These Terms & Conditions ("Terms") govern your use of the iBytex
              forex and cryptocurrency exchange platform. By accessing or using
              our services, you agree to be legally bound by these Terms.
              If you do not agree, you must not use our platform.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">

            {[
              {
                title: "1. Eligibility",
                content:
                  "You must be at least 18 years old and legally capable of entering into binding contracts. By registering, you confirm that you meet all legal requirements in your jurisdiction."
              },
              {
                title: "2. Account Registration & Security",
                content:
                  "Users must provide accurate information during registration. You are responsible for maintaining the confidentiality of your login credentials. iBytex is not liable for losses caused by unauthorized access due to your negligence."
              },
              {
                title: "3. KYC & AML Compliance",
                content:
                  "iBytex complies with international KYC (Know Your Customer) and AML (Anti-Money Laundering) regulations. We may require identity verification documents and reserve the right to suspend accounts that fail compliance checks."
              },
              {
                title: "4. Services Provided",
                content:
                  "iBytex provides digital asset exchange, forex currency exchange, and related financial services. Exchange rates may fluctuate based on market conditions."
              },
              {
                title: "5. Risk Disclosure",
                content:
                  "Cryptocurrency and forex trading involve substantial risk. Prices are volatile and may result in financial loss. You acknowledge that you trade at your own risk and iBytex is not responsible for market-related losses."
              },
              {
                title: "6. Fees & Charges",
                content:
                  "Users agree to applicable transaction fees, withdrawal fees, or service charges as displayed on the platform. Fees may change without prior notice."
              },
              {
                title: "7. Prohibited Activities",
                content:
                  "Users must not engage in illegal activities, fraud, money laundering, market manipulation, hacking, or misuse of the platform. Violations may result in permanent suspension."
              },
              {
                title: "8. Account Suspension & Termination",
                content:
                  "iBytex reserves the right to suspend or terminate accounts that violate these Terms or applicable laws. Suspicious transactions may be frozen pending investigation."
              },
              {
                title: "9. Limitation of Liability",
                content:
                  "iBytex shall not be liable for indirect, incidental, or consequential damages including loss of profits, trading losses, or system interruptions beyond our reasonable control."
              },
              {
                title: "10. Intellectual Property",
                content:
                  "All platform content including logos, trademarks, design elements, and software are the intellectual property of iBytex and may not be reproduced without permission."
              },
              {
                title: "11. Privacy",
                content:
                  "Your personal data is handled in accordance with our Privacy Policy. By using our services, you consent to data processing as described therein."
              },
              {
                title: "12. Changes to Terms",
                content:
                  "We reserve the right to update these Terms at any time. Continued use of the platform constitutes acceptance of revised Terms."
              },
              {
                title: "13. Governing Law",
                content:
                  "These Terms shall be governed by and interpreted in accordance with applicable laws and regulations in relevant jurisdictions."
              }
            ].map((section, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-yellow-400/40 transition-all duration-300"
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

          {/* Contact */}
          <div className="mt-14 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-300">
              For questions regarding these Terms & Conditions, contact us at:
            </p>
            <p className="text-blue-400 mt-2">Support@ibytex.com</p>
            <p className="text-blue-400">https://ibytex.com</p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsConditions;
