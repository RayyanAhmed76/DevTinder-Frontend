import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createsocketconnection } from "../../utils/socketio";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function Chat() {
  const { touserid } = useParams();
  const [messages, setmessages] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  const handleSend = (e) => {
    e.preventDefault();
    setmessages((messages) => [...messages, setmessages(messages)]);
  };

  useEffect(() => {
    const socket = createsocketconnection();
    socket.emit("joinchat", { Firstname: user.firstName, userId, touserid });

    return () => {
      socket.disconnect();
    };
  }, [userId, touserid]);

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
            value={messages}
            onChange={(e) => setmessages(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 pr-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            onClick={handleSend}
            type="submit"
            className="px-4 py-2 cursor-pointer bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-lg hover:opacity-90 flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
