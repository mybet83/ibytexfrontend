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
      logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    },
{
  name: "Tether",
  logo: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
},
    {
      name: "Ethereum",
      logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    },
 {
  name: "Solana",
  logo: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
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
 <section className="py-12 bg-black overflow-hidden max-md:py-8">
     

      <div
         
      className="marquee-wrapper">
         <div className="marquee-track flex items-center">

          {[...logos, ...logos].map((item, index) => (
            <div
              key={index}
             className="flex items-center gap-4 mx-12 whitespace-nowrap shrink-0 max-md:mx-6 max-md:gap-2"
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
                      : "h-10 w-10 sm:h-14 sm:w-14"
                  }
                `}
              />

              <span
                className="
                  text-[13px] 
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

      </div>
    </section>
  );
}



