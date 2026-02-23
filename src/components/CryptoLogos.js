// "use client";

// export default function CryptoLogos() {
//   const logos = [
//     "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
//     "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
//     "https://cryptologos.cc/logos/tether-usdt-logo.png",
//     "https://cryptologos.cc/logos/ethereum-eth-logo.png",
//     "https://cryptologos.cc/logos/solana-sol-logo.png",
//     "https://cryptologos.cc/logos/xrp-xrp-logo.png",
//   ];

//    return (
//     <section className="relative py-20 bg-black overflow-hidden">
//       <h2 className="text-center text-3xl font-bold text-white mb-10">
//         Trusted By Global Exchanges
//       </h2>

//       <div className="relative w-full overflow-hidden">
//         {/* Glass background strip */}
//         <div className="absolute inset-0"></div>

//         <div className="flex gap-20 animate-scroll items-center">
//           {[...logos, ...logos].map((logo, index) => (
//             <div
//               key={index}
//               className="transition duration-300 hover:scale-110 hover:brightness-125"
//             >
//               <img
//                 src={logo}
//                 alt="logo"
//                 className="h-14 w-auto opacity-70 hover:opacity-100 transition"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import {motion} from 'framer-motion'

export default function CryptoMarquee() {
  const logos = [
    {
      name: "Binance",
      logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
    },
    {
      name: "Bitcoin",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    },
    {
      name: "Tether",
      logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    },
    {
      name: "Ethereum",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    {
      name: "Solana",
      logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    },
    {
      name: "XRP",
      logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    },
{
  name: "PCI DSS Compliant",
  logo: "/psi1.png",
},


  ];

  return (
 <section className="py-16 bg-black overflow-hidden max-md:py-8">
     

      <motion.div
                initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      }}
      viewport={{
        once: true,
        amount: 0.4, // 🔥 40% visible pe trigger
      }}
      className="marquee-wrapper">
         <div className="marquee-track flex items-center">

          {[...logos, ...logos].map((item, index) => (
            <div
              key={index}
             className="flex items-center gap-4 mx-12 whitespace-nowrap shrink-0"
            >
              <img
                src={item.logo}
                alt={item.name}
                className={`
                  object-contain 
                  opacity-90 
                  transition duration-300
                  ${
                    item.name === "PCI DSS Compliant"
                      ? "h-8 sm:h-12 w-auto max-w-[150px]"
                      : "h-8 w-8 sm:h-12 sm:w-12"
                  }
                `}
              />

              <span
                className="
                  text-[10px] 
                  sm:text-sm 
                  uppercase 
                  tracking-[0.15em] 
                  sm:tracking-[0.2em] 
                  font-bold 
                  bg-gradient-to-r 
                  from-yellow-600 via-orange-300 to-yellow-400 
                  bg-clip-text text-transparent
                "
              >
                {item.name}
              </span>
            </div>
          ))}

        </div>

      </motion.div>
    </section>
  );
}



