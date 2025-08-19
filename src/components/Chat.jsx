import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createsocketconnection } from "../../utils/socketio";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";

export default function Chat() {
  const { touserid } = useParams();
  const [messages, setmessages] = useState([]);
  const [message, setmessage] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  const chathistory = async () => {
    const chatmessage = await axios.get(
      `http://localhost:7777/chat/${touserid}?limit=50`,
      { withCredentials: true }
    );
    console.log(chatmessage.data.messages);

    const chatt = chatmessage?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        photoURL: msg?.senderId?.photoURL,
        text: msg?.text,
      };
    });

    setmessages(chatt);
  };

  useEffect(() => {
    chathistory();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    const socket = createsocketconnection();
    socket.emit("joinchat", { firstName: user?.firstName, userId, touserid });

    socket.on("messagereceived", ({ firstName, lastName, photoURL, text }) => {
      console.log(firstName + " : " + text);
      setmessages((messages) => [
        ...messages,
        { firstName, lastName, photoURL, text },
      ]);
      setmessage("");
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, touserid]);

  const handleSend = (e) => {
    e.preventDefault();
    const socket = createsocketconnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      photoURL: user?.photoURL,
      userId,
      touserid,
      text: message,
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-700 ">
      <Navbar />
      <div className="flex flex-col w-full max-w-2xl rounded-2xl overflow-x-hidden shadow-lg  bg-gray-800 text-white  h-[60vh] md:h-[60vh] lg:h-[80vh]  mt-16 mb-4 md:mt-25">
        {/* Top Heading */}
        <header className="p-4 border-b border-gray-700 bg-gray-900">
          <h1 className="text-lg font-semibold">Chat</h1>
        </header>

        <div className="h-full overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="p-3  ">
              <div
                className={
                  "chat " +
                  (user?.firstName === msg?.firstName
                    ? "chat-end"
                    : "chat-start")
                }
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={msg.photoURL}
                    />
                  </div>
                </div>
                <div className="chat-header ">
                  {`${msg.firstName} ${msg.lastName}`}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Field with Send Button */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 p-4 border-t border-gray-700 bg-gray-900 w-mx-auto"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
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
