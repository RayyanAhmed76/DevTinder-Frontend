import { useState } from "react";
import { Send } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages([...messages, message.trim()]);
    setMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-700 p-4">
      <Navbar />
      <div className="flex flex-col w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden bg-gray-800 text-white">
        {/* Top Heading */}
        <header className="p-4 border-b border-gray-700 bg-gray-900">
          <h1 className="text-lg font-semibold">Chat</h1>
        </header>

        <div className="p-3 h-[50vh]">
          <div className="chat chat-start ">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div>
            <div className="chat-header ">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>

        {/* Input Field with Send Button */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 p-4 border-t border-gray-700 bg-gray-900 w-mx-auto"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-lg hover:opacity-90 flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
