import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Typewriter } from "react-simple-typewriter";
import Counter from "../components/Counter";



const Home = () => {
  return (
    <div className=" relative z-10 min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white">

      {/* Navbar */}
      <nav className="flex -mt-5  items-center justify-between px-6 py-5">
         <img src="/logot.png" alt="logo" className="w-28 right-6 relative" />

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </nav>

  {/* Background Image */}
<div className="absolute inset-0 -z-10 pointer-events-none">
  <img
    src="bg.png"
    alt="background"
    className="w-full h-full object-cover opacity-20 top-0"
  />
</div>


      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center text-center px-6 lg:px-20 py-24 max-lg:py-12">

{/*        
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
          <div className="h-48 flex items-center justify-center text-5xl text-indigo-400">
            <img src="/usdt.png" alt="USDT" className="w-full" />
          </div>
          <p className="text-center text-gray-300">
            Secure crypto to fiat exchange
          </p>
        </div> */}
        
        {/* Left Content */}
        <div className="">
         <h2 className="text-4xl lg:text-5xl font-bold mb-2 text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.7)]">
  Sell USDT -
   
  <span className="mt-4 text-[#09ABFF] text-4xl lg:text-5xl font-bold " >
     <Typewriter
    words={[
      " Instantly",
      "Fast • Secure • Reliable",
      "Instant Fiat Payouts",
      "Bank-Grade Security",
      "Trusted by Traders"
    ]}
    loop={0}
    cursor
    cursorStyle="~"
    typeSpeed={150}
    deleteSpeed={40}
    delaySpeed={1400}
  />
  </span>
</h2>
   

   <div className="text-white text-4xl lg:text-5xl font-bold mt-4">
         <h1>
           Explore The Best USDT Selling Experience with Us!
         </h1>
   </div>



          <p className="text-gray-300 mt-6 leading-relaxed">
            Convert your USDT to fiat currency with ease.
            Fast transactions, multiple payment methods,
            and bank-grade security.
          </p>

          <Link
            to="/signup"
            className="inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition shadow-xl"
          >
            Start Selling →
          </Link>
        </div>

      
      </section>

      {/* Why Choose Us */}
      <section className="px-6 lg:px-20 py-20 max-lg:py-12">
        <h3 className="text-3xl font-bold text-center">
          Why Choose Us
        </h3>
        <p className="text-gray-400 text-center mt-2">
          Fast, secure and reliable USDT selling platform
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          
          {/* Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-indigo-500 transition">
            <h4 className="text-xl font-semibold mb-2 text-[#09ABFF]">
              ⚡ Lightning Fast
            </h4>
            <p className="text-gray-300">
              Process your USDT sales within minutes.
              Get your money quickly and efficiently.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-indigo-500 transition">
            <h4 className="text-xl font-semibold mb-2 text-[#09ABFF]">
              🔒 100% Secure
            </h4>
            <p className="text-gray-300">
              Bank-grade security with encrypted
              transactions and secure processing.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-indigo-500 transition">
            <h4 className="text-xl font-semibold mb-2 text-[#09ABFF]">
              🕒 24/7 Support
            </h4>
            <p className="text-gray-300">
              Our admin team reviews and processes
              requests around the clock.
            </p>
          </div>

        </div>
      </section>


      <section className="px-6 lg:px-20 py-20 max-lg:py-12 text-center">

        <h3 className="text-3xl font-bold text-center">
  Trusted by Numbers
</h3>
<p className="text-gray-400 text-center mt-2">
  Real growth, real users, real transactions
</p>

  <div className="grid md:grid-cols-3 gap-10  py-10 max-lg:p">

    {/* Card 1 */}
    <div className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
      <h2 className="text-4xl lg:text-5xl font-bold text-white">
        ₹<Counter end={1537269} />
      </h2>
      <p className="text-gray-400 mt-2">Brokerage Saved</p>
    </div>

    {/* Card 2 */}
    <div  className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
      <h2 className="text-4xl lg:text-5xl font-bold text-white">
        ₹<Counter end={500000} suffix="+" />
      </h2>
      <p className="text-gray-400 mt-2">Happy Traders</p>
    </div>

    {/* Card 3 */}
    <div  className="max-md:bg-white/10 max-md:backdrop-blur-xl max-md:rounded-xl max-md:p-6 max-md:border max-md:border-white/20 max-md:hover:border-[#09ABFF] max-md:transition">
      <h2 className="text-4xl lg:text-5xl font-bold text-white">
        ₹<Counter end={8376987} />
      </h2>
      <p className="text-gray-400 mt-2">Withdrawals Processed</p>
    </div>

  </div>
</section>


      {/* CTA */}
      <section className="px-6 lg:px-20 py-20">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
          <h3 className="text-3xl font-bold">
            Ready to Sell Your USDT?
          </h3>
          <p className="text-gray-300 mt-3">
            Join thousands of users who trust us with
            their crypto transactions.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-6 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition shadow-lg"
          >
            Create Account Now
          </Link>
        </div>
      </section>
     <Footer/>
    </div>
  );
};

export default Home;
