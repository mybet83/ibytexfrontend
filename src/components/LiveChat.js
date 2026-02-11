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
