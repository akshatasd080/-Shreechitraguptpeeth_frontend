import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import WhatsAppFloat from "../components/ui/WhatsAppFloat";
import ChatBotFloat from "../components/ui/ChatBotFloat";

export default function Layout({ type = "public" }) {
  const location = useLocation();

  // Login page hide
  const hideOnRoutes = ["/login"];
  const shouldHide = hideOnRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col overflow-x-hidden text-slate-900">
      {!shouldHide && <Navbar />}

      <main className="flex-1 min-h-[80vh]">
        <Outlet />
      </main>

      {!shouldHide && <Footer />}

      {/* ✅ Show ONLY on public routes and NOT on login */}
     {type === "public" && !shouldHide && (
  <>
    {/* <ChatBotFloat /> */}
    {/* <WhatsAppFloat /> */}
  </>
)}
    </div>
    
  );
}
