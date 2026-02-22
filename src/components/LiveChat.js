import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { MessageCircle } from "lucide-react";

const socket = io(process.env.REACT_APP_API_URL);

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", message);
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-cyan-500 p-4 rounded-full shadow-lg hover:bg-cyan-600 transition"
      >
        <MessageCircle size={22} />
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-black/80 backdrop-blur-xl p-4 rounded-2xl border border-cyan-500/20">
          <div className="h-60 overflow-y-auto mb-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className="mb-1 text-white">
                {m}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 bg-black/40 rounded-lg"
            />
            <button
              onClick={sendMessage}
              className="bg-cyan-500 px-3 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}











   <section
        className="
  px-6 lg:px-20 py-20 max-lg:py-10
  bg-gray-50 dark:bg-black
  relative overflow-hidden
  transition-colors duration-300 flex items-center justify-center min-h-screen
"
      >
        {/* Sparkles - Bottom */}
        <div className="absolute inset-0 z-0">
          <SparklesCore particleDensity={300} className="w-full h-full" />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="big-circle"></div>
          <div className="small-circle"></div>
        </div>

        {/* <div className="relative z-10 w-full px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 items-center">
           
            <div className="max-w-xl max-sm:max-w-lg">
              <div className="relative min-h-[180px]">
                <HeroSequence />
              </div>
   
              <div className="mt-8 relative w-full max-w-md">
               
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-2xl opacity-40 rounded-3xl"></div>

                <div
                  className="relative bg-[#0f172a]/80 backdrop-blur-xl 
                  border border-purple-500/20 
                  rounded-3xl 
                  px-7 py-6 
                  shadow-2xl 
                  hover:border-purple-500/40 
                  transition-all duration-300"
                >
                 
                  <div className="flex items-center gap-3 mb-3">
                  
                    <div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 
    flex items-center justify-center shadow-lg relative"
                    >
                      <img
                        src="https://cryptologos.cc/logos/tether-usdt-logo.png"
                        alt="usdt"
                        className="w-6 h-6"
                      />

                
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 tracking-wide">
                          Today USDT Price
                        </span>

                      
                        <span className="text-[10px] px-2 py-0.5 bg-red-500 text-white rounded-full animate-pulse">
                          LIVE
                        </span>
                      </div>

                      
                      <div
                        className="text-3xl font-bold tracking-tight relative items-end
      bg-gradient-to-r from-green-400 to-emerald-500 
      bg-clip-text text-transparent"
                      >
                        {rate ? `₹ ${rate}` : "Loading..."}
                      </div>
                    </div>
                  </div>

                
                  <div className="mt-4 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
                </div>
              </div>

              <Link
                to="/signup"
                className="inline-block mt-10 px-8 py-3 rounded-full 
             bg-gold-gradient text-black font-semibold
             shadow-lg hover:scale-105 transition-all duration-300"
              >
                Start Selling →
              </Link>
            </div>
          </div>
        </div> */}

        <div className="relative z-10 w-full px-6 lg:px-20 flex flex-col items-center justify-center text-center">
          <div className="w-full  mx-auto flex flex-col items-center">
            {/* Hero Section */}
            <div className="relative flex justify-center flex-col">
              <HeroSequence />
            </div>

            {/* USDT Rate Section */}
            <div className="mt-10 relative w-full  mx-auto">
              {/* Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 blur-3xl opacity-40 rounded-3xl"></div>

              {/* Card */}
              <div
                className="
    relative z-10
    bg-white/70 dark:bg-[#0f172a]/80
    backdrop-blur-2xl
    border border-gray-200 dark:border-white/10
    rounded-3xl
    px-8 py-6
    shadow-2xl
    transition-all duration-300
    hover:shadow-purple-500/20
    flex items-center justify-center
  "
              >
                {/* Left Side */}
                <div className="flex items-center gap-5">
                    <span className=" absolute top-2  text-[11px] px-3 py-1 bg-red-500/90 text-white rounded-full animate-pulse shadow-md">
                        LIVE
                      </span>
                  {/* Logo Circle */}
                  <div
                    className="
                              w-14 h-14 rounded-full
                              bg-gradient-to-br from-green-400 to-emerald-600
                              flex items-center justify-center
                              shadow-lg
                            "
                  >
                    <img
                      src="https://cryptologos.cc/logos/tether-usdt-logo.png"
                      alt="usdt"
                      className="w-8 h-8"
                    />
                  </div>

                  {/* Text Content */}
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400 tracking-wide">
                        Today USDT Price
                      </span>

                    
                    </div>

                    <div
                      className="
          text-4xl font-bold mt-2
          bg-gradient-to-r from-green-400 to-emerald-500
          bg-clip-text text-transparent
        "
                    >
                      {rate ? `₹ ${rate}` : "Loading..."}
                    </div>
                  </div>
                </div>

              
              </div>
            </div>











            {/* Button */}
            <Link
              to="/signup"
              className="inline-block mt-5 px-8 py-3 rounded-full 
      bg-gold-gradient text-black font-semibold
      shadow-lg hover:scale-105 transition-all duration-300"
            >
              Start Selling →
            </Link>
          </div>
        </div>
      </section>