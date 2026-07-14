import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const phoneNumber = "9211515823"; 
  const message = "Hello, I want to discuss my project.";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] bg-green-500 hover:bg-green-600 
                 text-white w-14 h-14 rounded-full flex items-center 
                 justify-center shadow-2xl transition-all duration-300 
                 hover:scale-110"
    >
      <MessageCircle size={28} />
    </a>
  );
}
