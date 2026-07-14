"use client";
import { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    setChat([...chat, { sender: "user", text: message }]);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat((prev) => [
      ...prev,
      { sender: "bot", text: data.reply },
    ]);

    setMessage("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white shadow-xl rounded-xl flex flex-col">
          <div className="p-4 bg-blue-600 text-white rounded-t-xl">
            Chat Support
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded px-2"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}