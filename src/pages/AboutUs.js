import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sn">
      <Navbar />

      <section className="relative px-6 lg:px-20 py-20">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 blur-3xl opacity-40"></div>

        <div className="relative max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <img src="/logot.png" alt="logo" className="w-14 h-14" />
            <h1 className="text-4xl lg:text-5xl font-bold bg-[linear-gradient(135deg,#FFD700_0%,#00BFFF_100%)] bg-clip-text text-transparent">
              About iBytex
            </h1>
          </div>

          <p className="text-gray-300 text-lg leading-8 mb-8">
            iBytex is a modern forex and cryptocurrency exchange platform dedicated to making digital and fiat currency exchange simple, secure, and fast. We specialize in buying and selling USDT, Bitcoin (BTC), USD, GBP, EUR, and AED with competitive rates and smooth global transactions.
          </p>

          {/* Mission */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 mb-10">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-7">
              To provide a safe and efficient exchange environment where individuals and businesses can trade cryptocurrencies and major currencies with confidence.
            </p>
          </div>

          {/* Why Choose */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              "Secure & reliable transactions",
              "Competitive exchange rates",
              "Fast processing times",
              "User-friendly platform",
              "Dedicated customer support"
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-6 rounded-2xl border border-white/10 hover:scale-105 transition">
                <p className="text-lg text-white">{item}</p>
              </div>
            ))}
          </div>

          {/* Vision */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-7">
              We aim to become a globally trusted forex and crypto exchange by continuously improving security standards and putting customers first.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
