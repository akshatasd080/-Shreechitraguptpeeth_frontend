import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";

export default function ChatBotFloat() {

  const API_URL = "http://localhost:3000/api/chat";

  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [buttons, setButtons] = useState([]);
  const [step, setStep] = useState("start");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  useEffect(() => {
    if (open && chat.length === 0) {
      startChat();
    }
  }, [open]);

  const startChat = async () => {
    try {
      const res = await axios.post(API_URL, {
        message: "",
        step: "start",
      });

      setChat([{ sender: "bot", text: res.data.reply }]);
      setStep(res.data.nextStep);

    } catch {
      setChat([{ sender: "bot", text: "Unable to connect to server." }]);
    }
  };

  const sendMessage = async (customMessage = null) => {

    const userText = customMessage || message;
    if (!userText.trim()) return;

    setChat((prev) => [...prev, { sender: "user", text: userText }]);
    setMessage("");
    setButtons([]);
    setLoading(true);

    try {
      const res = await axios.post(API_URL, {
        message: userText,
        step,
      });

      setChat((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);

      if (res.data.buttons) setButtons(res.data.buttons);
      if (res.data.nextStep) setStep(res.data.nextStep);

    } catch {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Server error." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 w-16 h-16 
        bg-gradient-to-r from-blue-500 to-indigo-600 
        rounded-full flex items-center justify-center 
        shadow-2xl z-[9999] hover:scale-110 transition"
      >
        <FaRobot size={26} className="text-white" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-40 right-6 w-[360px] h-[520px] 
        bg-white rounded-2xl shadow-2xl flex flex-col z-[9999] overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 
          text-white p-4 flex justify-between items-center font-semibold">

            <div className="flex items-center gap-2">
              <FaRobot />
              AI Assistant
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-white text-lg"
            >
              ✕
            </button>

          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">

            {chat.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : ""
                }`}
              >

                {msg.sender === "bot" && (
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                    🤖
                  </div>
                )}

                <div
                  className={`px-4 py-2 rounded-xl text-sm max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>

              </div>
            ))}

            {/* Dynamic Buttons */}
            {buttons.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {buttons.map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(btn)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:scale-105 transition"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            )}

            {/* Typing */}
            {loading && (
              <div className="bg-gray-200 px-4 py-2 rounded-xl text-sm w-fit">
                Typing...
              </div>
            )}

            <div ref={bottomRef}></div>

          </div>

          {/* Input */}
          <div className="p-3 border-t flex bg-white">

            <input
              type="text"
              className="flex-1 border text-black rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />

            <button
              onClick={() => sendMessage()}
              className="ml-2 bg-blue-600 text-green-300 px-4 rounded-full hover:bg-blue-700"
            >
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}