import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  PhoneCall,
  MessageCircleMore,
  ChevronDown,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const navLinks = [
    { title: "Home", path: "/" },

    {
      title: "About Us",
      dropdown: [
        {
          title: "Establishment of Shree Chitragupt Peeth",
          path: "/establishment",
        },
        {
          title: "About Shree Chitragupt Peeth",
          path: "/about-peeth",
        },
        {
          title: "About Swami Ji",
          path: "/about-swami",
        },
        {
          title: "Our Mission",
          path: "/mission",
        },
        {
          title: "Our Volunteers",
          path: "/volunteers",
        },
      ],
    },

    {
      title: "Explore",
      dropdown: [
        {
          title: "Temple History",
          path: "/temple-history",
        },
        {
          title: "Spiritual Activities",
          path: "/activities",
        },
        {
          title: "Daily Events",
          path: "/daily-events",
        },
        {
          title: "Religious Programs",
          path: "/programs",
        },
      ],
    },

    {
      title: "Gallery",
      dropdown: [
        {
          title: "Photo Gallery",
          path: "/photo-gallery",
        },
        {
          title: "Video Gallery",
          path: "/video-gallery",
        },
        {
          title: "Media Gallery",
          path: "/media-gallery",
        },
      ],
    },

    { title: "Events", path: "/events" },
    // { title: "Download", path: "/download" },
    { title: "Membership", path: "/membership" },
    { title: "Contact", action: "contact" },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setContactOpen(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <header className="sticky top-0 z-[999] bg-white border-b shadow-sm">

      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">

        <div className="h-[72px] flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">

            <img
              src="/logo.png"
              alt="logo"
              className="w-12 h-12 object-contain"
            />

          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden xl:flex items-center gap-1">

            {navLinks.map((item, index) => (

              <div key={index}>

                {item.action === "contact" ? (

                  <button
                    onClick={() => {
                      setContactOpen(true);
                      setOpen(false);
                    }}
                    className="
                      px-3 py-2
                      rounded-lg
                      text-[14px]
                      font-medium
                      text-gray-700
                      hover:text-red-500
                      hover:bg-red-50
                      transition-all
                    "
                  >
                    {item.title}
                  </button>

                ) : !item.dropdown ? (

                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `
                      px-3 py-2
                      rounded-lg
                      text-[14px]
                      font-medium
                      transition-all
                      ${
                        isActive
                          ? "bg-red-500 text-white"
                          : "text-gray-700 hover:text-red-500 hover:bg-red-50"
                      }
                    `
                    }
                  >
                    {item.title}
                  </NavLink>

                ) : (

                  <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                      <button
                        className="
                          flex items-center gap-1
                          px-3 py-2
                          rounded-lg
                          text-[14px]
                          font-medium
                          text-gray-700
                          hover:text-red-500
                          hover:bg-red-50
                          transition-all
                          outline-none
                          border-none
                        "
                      >
                        {item.title}

                        <ChevronDown size={15} />
                      </button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      sideOffset={10}
                      className="
                        z-[999]
                        w-[270px]
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-2
                        shadow-2xl
                        backdrop-blur-none
                        animate-in
                        fade-in-0
                        zoom-in-95
                      "
                    >

                      {item.dropdown.map((subItem, subIndex) => (

                        <DropdownMenuItem
                          key={subIndex}
                          asChild
                          className="
                            cursor-pointer
                            rounded-lg
                            p-0
                            focus:bg-red-50
                          "
                        >

                          <Link
                            to={subItem.path}
                            className="
                              w-full
                              px-3
                              py-2.5
                              text-[13px]
                              font-medium
                              text-gray-700
                              hover:text-red-500
                              rounded-lg
                              transition-all
                            "
                          >
                            {subItem.title}
                          </Link>

                        </DropdownMenuItem>
                      ))}

                    </DropdownMenuContent>

                  </DropdownMenu>
                )}
              </div>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-2">

            <button
              className="
                w-10 h-10
                rounded-full
                bg-red-500
                text-white
                flex items-center justify-center
                hover:scale-105
                transition-all
              "
            >
              <PhoneCall size={17} />
            </button>

            <button
              className="
                w-10 h-10
                rounded-full
                border
                border-red-500
                text-red-500
                flex items-center justify-center
                hover:bg-red-50
                transition-all
              "
            >
              <MessageCircleMore size={17} />
            </button>

            <Link
              to="/donate"
              className="
                h-10
                px-5
                rounded-full
                bg-red-500
                text-white
                text-[13px]
                font-semibold
                flex items-center justify-center
                hover:bg-red-600
                transition-all
              "
            >
              DONATE NOW
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="
              xl:hidden
              w-10 h-10
              rounded-lg
              border
              border-gray-300
              flex items-center justify-center
              bg-white
            "
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (

        <div className="xl:hidden border-t bg-white shadow-lg">

          <div className="p-4 space-y-2">

            {navLinks.map((item, index) => (

              <div key={index}>

                {item.action === "contact" ? (

                  <button
                    onClick={() => {
                      setContactOpen(true);
                      setOpen(false);
                    }}
                    className="
                      w-full
                      text-left
                      px-4
                      py-3
                      rounded-lg
                      text-[14px]
                      bg-gray-50
                      text-gray-700
                      hover:bg-red-50
                      hover:text-red-500
                    "
                  >
                    {item.title}
                  </button>

                ) : !item.dropdown ? (

                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="
                      block
                      px-4
                      py-3
                      rounded-lg
                      text-[14px]
                      bg-gray-50
                      text-gray-700
                      hover:bg-red-50
                    "
                  >
                    {item.title}
                  </NavLink>

                ) : (

                  <div className="rounded-xl bg-gray-50 p-3">

                    <div className="text-[14px] font-semibold mb-2">
                      {item.title}
                    </div>

                    <div className="space-y-1">

                      {item.dropdown.map((subItem, subIndex) => (

                        <Link
                          key={subIndex}
                          to={subItem.path}
                          onClick={() => setOpen(false)}
                          className="
                            block
                            px-3
                            py-2.5
                            rounded-lg
                            bg-white
                            text-[13px]
                            text-gray-700
                            hover:bg-red-50
                            hover:text-red-500
                            transition-all
                          "
                        >
                          {subItem.title}
                        </Link>
                      ))}

                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTACT DIALOG */}
      {contactOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setContactOpen(false)}
          ></div>
          
          {/* Dialog Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#ef4444 white'
          }}>
            {/* Custom scrollbar */}
            <style>{`
              ::-webkit-scrollbar { width: 8px; }
              ::-webkit-scrollbar-track { background: white; }
              ::-webkit-scrollbar-thumb { 
                background: linear-gradient(to bottom, #ef4444, #f97316); 
                border-radius: 4px; 
              }
              ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #dc2626, #ea580c); }
            `}</style>
            
            {/* Header */}
            <div className="bg-gradient-to-br from-red-600 via-orange-500 to-pink-500 px-8 py-12 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/15 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute -bottom-10 left-1/4 w-52 h-52 bg-white/10 rounded-full"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-white/25 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-white/30">
                  <MessageSquare className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-black text-white mb-3 drop-shadow-lg">Get in Touch</h2>
                <p className="text-red-100 text-lg font-medium">Have questions? We're here to help!</p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setContactOpen(false)}
                className="absolute top-5 right-5 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-all backdrop-blur-sm border border-white/20 hover:scale-110"
              >
                <X className="w-7 h-7 text-white" />
              </button>
            </div>

            {/* Form */}
            <div className="p-10">
              <form onSubmit={handleContactSubmit} className="space-y-7">
                {/* Name */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-red-600" />
                    </div>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="
                      w-full
                      px-6
                      py-5
                      border-2 border-gray-100
                      bg-gray-50
                      rounded-2xl
                      outline-none
                      focus:border-red-500
                      focus:bg-white
                      focus:ring-4 focus:ring-red-100
                      transition-all
                      text-gray-800
                      text-base
                      font-medium
                    "
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-orange-600" />
                    </div>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="
                      w-full
                      px-6
                      py-5
                      border-2 border-gray-100
                      bg-gray-50
                      rounded-2xl
                      outline-none
                      focus:border-orange-500
                      focus:bg-white
                      focus:ring-4 focus:ring-orange-100
                      transition-all
                      text-gray-800
                      text-base
                      font-medium
                    "
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-pink-600" />
                    </div>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="
                      w-full
                      px-6
                      py-5
                      border-2 border-gray-100
                      bg-gray-50
                      rounded-2xl
                      outline-none
                      focus:border-pink-500
                      focus:bg-white
                      focus:ring-4 focus:ring-pink-100
                      transition-all
                      text-gray-800
                      text-base
                      font-medium
                    "
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-base font-bold text-gray-800">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="
                      w-full
                      px-6
                      py-5
                      border-2 border-gray-100
                      bg-gray-50
                      rounded-2xl
                      outline-none
                      focus:border-purple-500
                      focus:bg-white
                      focus:ring-4 focus:ring-purple-100
                      transition-all
                      text-gray-800
                      text-base
                      font-medium
                      resize-none
                    "
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="
                    w-full
                    bg-gradient-to-r from-red-600 via-orange-500 to-pink-500
                    hover:brightness-110
                    text-white
                    py-6
                    rounded-2xl
                    font-bold
                    text-2xl
                    transition-all
                    shadow-2xl
                    hover:shadow-3xl
                    hover:shadow-red-300
                    active:scale-97
                    mt-3
                  "
                >
                  Send Message ✨
                </button>
              </form>
            </div>
          </div>
          
        </div>
      )}
    </header>
  );
}