import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CountUp from "react-countup";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white font-sn overflow-hidden">
      <Navbar />

      {/* BINANCE STYLE BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[150px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] bottom-[-200px] right-[-200px]" />
      </div>

      {/* HERO */}
      <section className="relative px-6 lg:px-20 pt-24 pb-10 text-center">
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
          About <span className="text-yellow-400">IBYTEX</span>
        </h1>

        <p className="text-gray-300 max-w-4xl mx-auto text-lg leading-8">
          IBYTEX is a professional crypto forex exchange platform specializing in
          secure and fast USDT buy and sell services in India. Our goal is to
          simplify cryptocurrency exchange by providing reliable, transparent,
          and efficient trading solutions for individuals, traders, and
          businesses.
        </p>
      </section>

      {/* STATS */}
      {/* <section className="px-6 lg:px-20 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">

          {[
            { label: "Active Traders", value: 1200000 },
            { label: "Daily Transactions", value: 8500 },
            { label: "USDT Volume", value: 5000000 },
            { label: "Countries Served", value: 15 },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
              <h2 className="text-3xl font-bold text-yellow-400">
                <CountUp end={item.value} duration={2} separator="," />+
              </h2>
              <p className="text-gray-400 mt-2">{item.label}</p>
            </div>
          ))}

        </div>
      </section> */}

      {/* ABOUT TEXT */}
      <section className="px-6 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 mb-12">
            <p className=" text-center leading-8 block italic font-light 
      bg-gradient-to-r from-yellow-400 to-blue-400 
      bg-clip-text text-transparent">
              We help clients convert INR to USDT and USDT to INR quickly through
              secure transaction processes supported by experienced crypto
              professionals. IBYTEX focuses on speed, transparency, and
              reliability for every client.
            </p>
          </div>

          {/* MISSION + VISION */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">

            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                Our Mission
              </h2>

              <p className="text-gray-300 leading-7">
                Our mission is to build a trusted digital asset exchange ecosystem
                where users can trade USDT safely, quickly, and confidently while
                bridging traditional forex exchange with modern cryptocurrency
                trading.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                Our Vision
              </h2>

              <p className="text-gray-300 leading-7">
                Our vision is to become one of India’s most trusted crypto forex
                exchange providers by delivering secure transactions, competitive
                pricing, and professional customer support.
              </p>
            </div>

          </div>

          {/* SERVICES */}
          <h2 className="text-3xl font-bold text-center mb-10">
            What We Do
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

            {[
              "Buy USDT in India using INR",
              "Sell USDT instantly at competitive rates",
              "OTC USDT trading for bulk transactions",
              "Secure crypto forex exchange solutions",
              "Fast settlement and verified transactions",
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:scale-105 transition">
                {item}
              </div>
            ))}

          </div>

          {/* SECURITY */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 mb-16">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">
              Security & Trust
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {[
                "Verified transaction procedures",
                "Secure payment systems",
                "Fraud prevention monitoring",
                "Confidential client handling",
              ].map((item, i) => (
                <div key={i} className="bg-[#111827] p-5 rounded-xl border border-gray-800">
                  ✔ {item}
                </div>
              ))}

            </div>
          </div>

          {/* WHY CHOOSE */}
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose IBYTEX
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">

            {[
              "Trusted Indian USDT Exchange Provider",
              "Fast INR to USDT Processing",
              "Competitive Market Rates",
              "Professional OTC Trading Desk",
              "Dedicated Customer Support",
              "Transparent Exchange Process",
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-yellow-500/10 to-blue-500/10 p-6 rounded-2xl border border-white/10 hover:scale-105 transition">
                {item}
              </div>
            ))}

          </div>

          {/* TIMELINE
          <h2 className="text-3xl font-bold text-center mb-12">
            Company Growth
          </h2>

          <div className="space-y-10 mb-20">

            {[
              { year: "2024", text: "IBYTEX platform foundation and OTC desk launched." },
              { year: "2025", text: "Expansion of USDT exchange services and trading infrastructure." },
              { year: "2026", text: "Scaling global crypto forex exchange operations." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="text-yellow-400 font-bold text-xl">{item.year}</div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                  {item.text}
                </div>
              </div>
            ))}

          </div> */}

          {/* TEAM */}
          {/* <h2 className="text-3xl font-bold text-center mb-12">
            Leadership Team
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              { name: "Crypto Operations Head", role: "Exchange Strategy" },
              { name: "Security Lead", role: "Blockchain Security" },
              { name: "OTC Trading Manager", role: "Liquidity & OTC Desk" },
            ].map((member, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 mx-auto bg-yellow-400 rounded-full mb-4"></div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}

          </div> */}

          {/* WHO WE SERVE */}
          <div className="mt-20 bg-white/5 border border-white/10 rounded-3xl p-10">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">
              Who We Serve
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {[
                "Crypto Traders",
                "Forex Traders",
                "Arbitrage Traders",
                "Investors",
                "Businesses using cryptocurrency payments",
              ].map((item, i) => (
                <div key={i} className="bg-[#111827] p-5 rounded-xl border border-gray-800">
                  {item}
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;