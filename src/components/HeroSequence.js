import React, { useEffect, useState } from "react";

const slides = [
  {
    h1: "Forex & Crypto Exchange Platform",
    h2: "Instant Bank Transfers",
    p: "Convert your USDT to fiat currency with ease. Fast transactions and bank-grade security."
  },
  {
    h1: "Buy & Sell USDT Securely",
    h2: "Trusted by 10M+ Users",
    p: "Trade digital and fiat currencies with competitive exchange rates."
  },
  {
    h1: "Trade Bitcoin & Global Currencies",
    h2: "24/7 Customer Support",
    p: "Secure, verified platform with smooth trading experience."
  }
];

const typingSpeed = 40;

const HeroSequence = React.memo(() => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [displayH1, setDisplayH1] = useState("");
  const [displayH2, setDisplayH2] = useState("");
  const [displayP, setDisplayP] = useState("");
  const [phase, setPhase] = useState("typingH1");

  useEffect(() => {
    const current = slides[slideIndex];
    let timer;

    if (phase === "typingH1") {
      if (displayH1.length < current.h1.length) {
        timer = setTimeout(() => {
          setDisplayH1(current.h1.slice(0, displayH1.length + 1));
        }, typingSpeed);
      } else {
        setPhase("typingH2");
      }
    }

    else if (phase === "typingH2") {
      if (displayH2.length < current.h2.length) {
        timer = setTimeout(() => {
          setDisplayH2(current.h2.slice(0, displayH2.length + 1));
        }, typingSpeed);
      } else {
        setPhase("typingP");
      }
    }

    else if (phase === "typingP") {
      if (displayP.length < current.p.length) {
        timer = setTimeout(() => {
          setDisplayP(current.p.slice(0, displayP.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setPhase("reset"), 1500);
      }
    }

    else if (phase === "reset") {
      setDisplayH1("");
      setDisplayH2("");
      setDisplayP("");
      setSlideIndex((prev) => (prev + 1) % slides.length);
      setPhase("typingH1");
    }

    return () => clearTimeout(timer);
  }, [displayH1, displayH2, displayP, phase, slideIndex]);

  return (
    <>
      <h1 className="text-3xl lg:text-[34px] max-sm:text-[18px] font-bold w-[80%] mb-4">
        <span className="bg-[linear-gradient(135deg,#F5C56B_0%,#D4A017_100%)] bg-clip-text text-transparent">
          {displayH1}
        </span>
      </h1>

      <h2 className="text-xl lg:text-[28px] font-semibold w-[80%] mb-4 bg-[linear-gradient(135deg,#0072ff_0%,#00bfff_35%,#e6f7ff_55%,#00bfff_75%,#0050ff_100%)] bg-clip-text text-transparent">
        {displayH2}
      </h2>

      <p className="text-gray-400 mt-2 font-medium w-[80%] text-[18px]">
        {displayP}
      </p>
    </>
  );
});

export default HeroSequence;
