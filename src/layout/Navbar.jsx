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
  Heart,
  Building2,
  Send,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CONTACT_SERVICES = [
  "General Inquiry",
  "Pooja Booking",
  "Membership",
  "Donation",
  "Volunteer",
  "Other",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasUpcomingEvents, setHasUpcomingEvents] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when contact modal is open
  useEffect(() => {
    if (contactOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [contactOpen]);

  useEffect(() => {
    let cancelled = false;

    const fetchUpcomingEvents = async () => {
      try {
        const res = await api.get("/events?active=true&type=upcoming");
        if (!cancelled) {
          setHasUpcomingEvents((res.data?.events || []).length > 0);
        }
      } catch {
        if (!cancelled) setHasUpcomingEvents(false);
      }
    };

    fetchUpcomingEvents();
    return () => {
      cancelled = true;
    };
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },

    {
      title: "About ",
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
       
        
      ],
    },

    { title: "Events", path: "/events", showUpcomingIndicator: true },
    {
      title: "News",
      dropdown: [
        {
          title: "News Images",
          path: "/news-images",
        },
        {
          title: "News Videos",
          path: "/news-videos",
        },
        {
          title: "News Links",
          path: "/news-links",
        },
      ],
    },
    { title: "Membership", path: "/membership" },
    { title: "Contact", action: "contact" },
  ];

  const resetContactForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      company: "",
      service: "",
      message: "",
    });
  };

  const renderEventsIndicator = (isActive = false, compact = false) => {
    if (!hasUpcomingEvents) return null;

    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
        </span>
        {!compact && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              isActive
                ? "bg-white/20 text-white"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            <Calendar className="h-3 w-3" />
            Upcoming
          </motion.span>
        )}
      </span>
    );
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const phone = String(formData.phone || "").replace(/\D/g, "");
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    if (!formData.service) {
      toast.error("Please select a service");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/contacts", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile_number: phone,
        company: formData.company.trim() || null,
        service: formData.service,
        message: formData.message.trim() || null,
      });
      toast.success("Thank you! We will get back to you soon.");
      setContactOpen(false);
      resetContactForm();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const contactModal =
    contactOpen &&
    createPortal(
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          onClick={() => !submitting && setContactOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="relative z-10 w-full max-w-lg max-h-[min(90vh,720px)] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-dialog-title"
        >
          {/* Compact header */}
          <div className="relative shrink-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-500 px-5 py-4 text-white">
            <div className="flex items-center gap-3 pr-10">
              <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/25 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2
                  id="contact-dialog-title"
                  className="text-xl font-black leading-tight"
                >
                  Contact Us
                </h2>
                <p className="text-white/85 text-xs font-medium">
                  We usually reply within 24 hours
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => !submitting && setContactOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable form body */}
          <form
            onSubmit={handleContactSubmit}
            className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <span className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your full name"
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                    })
                  }
                  placeholder="10-digit mobile"
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <span className="w-7 h-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Building2 className="w-3.5 h-3.5" />
                  </span>
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Optional"
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <span className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5" />
                </span>
                Service *
              </label>
              <select
                required
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100 text-sm"
              >
                <option value="">Select a service</option>
                {CONTACT_SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-800">
                Message
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="How can we help you?"
                className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 disabled:opacity-70 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-200 transition"
            >
              {submitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>,
      document.body
    );

  return (
    <header 
      className={`sticky top-0 z-[999] transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100" 
          : "bg-gradient-to-r from-orange-50 via-white to-red-50 border-b border-orange-100/50"
      }`}
    >

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8">

        <div className="h-[88px] flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img
                src="/logo.png"
                alt="logo"
                className="relative w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                Shree Chitragupt
              </h1>
              <p className="text-xs md:text-sm font-semibold text-gray-600 tracking-wider mt-0.5">PEETH</p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden xl:flex items-center gap-1">

            {navLinks.map((item, index) => (

              <div key={index}>

                {item.action === "contact" ? (

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setContactOpen(true);
                      setOpen(false);
                    }}
                    className="
                      px-4 py-2.5
                      rounded-xl
                      text-[15px]
                      font-semibold
                      text-gray-700
                      hover:text-red-600
                      hover:bg-gradient-to-r from-red-50 to-orange-50
                      transition-all
                      relative
                      overflow-hidden
                    "
                  >
                    <span className="relative z-10">{item.title}</span>
                  </motion.button>

                ) : !item.dropdown ? (

                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `
                      px-4 py-2.5
                      rounded-xl
                      text-[15px]
                      font-semibold
                      transition-all
                      relative
                      overflow-hidden
                      ${
                        isActive
                          ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-200"
                          : "text-gray-700 hover:text-red-600 hover:bg-gradient-to-r from-red-50 to-orange-50"
                      }
                      ${
                        item.showUpcomingIndicator &&
                        hasUpcomingEvents &&
                        !isActive
                          ? "ring-2 ring-orange-300/60 ring-offset-1 shadow-sm shadow-orange-100"
                          : ""
                      }
                    `
                    }
                  >
                    {({ isActive }) => (
                      <motion.span
                        initial={false}
                        animate={{ y: isActive ? 0 : 0 }}
                        className="relative z-10 inline-flex items-center gap-2"
                      >
                        {item.title}
                        {item.showUpcomingIndicator &&
                          renderEventsIndicator(isActive)}
                      </motion.span>
                    )}
                  </NavLink>

                ) : (

                  <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="
                          flex items-center gap-2
                          px-4 py-2.5
                          rounded-xl
                          text-[15px]
                          font-semibold
                          text-gray-700
                          hover:text-red-600
                          hover:bg-gradient-to-r from-red-50 to-orange-50
                          transition-all
                          outline-none
                          border-none
                        "
                      >
                        <span>{item.title}</span>
                        <ChevronDown size={16} className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </motion.button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      sideOffset={12}
                      className="
                        z-[999]
                        w-[300px]
                        rounded-2xl
                        border
                        border-orange-100
                        bg-white
                        backdrop-blur-xl
                        p-3
                        shadow-2xl
                        shadow-orange-100/50
                        animate-in
                        fade-in-0
                        zoom-in-95
                        data-[side=bottom]:slide-in-from-top-2
                      "
                    >

                      {item.dropdown.map((subItem, subIndex) => (

                        <DropdownMenuItem
                          key={subIndex}
                          asChild
                          className="
                            cursor-pointer
                            rounded-xl
                            p-0
                            mb-1
                            last:mb-0
                            focus:bg-transparent
                            hover:bg-transparent
                            data-[highlighted]:bg-transparent
                            text-gray-700
                          "
                        >

                          <Link
                            to={subItem.path}
                            className="
                              w-full
                              px-4
                              py-3
                              text-[14px]
                              font-semibold
                              text-gray-700
                              hover:text-red-600
                              hover:bg-gradient-to-r from-red-50 to-orange-50
                              rounded-xl
                              transition-all
                              group
                              flex items-center gap-3
                            "
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
          <div className="hidden lg:flex items-center gap-3">

            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="
                w-12 h-12
                rounded-2xl
                bg-gradient-to-br from-red-500 to-orange-500
                text-white
                flex items-center justify-center
                shadow-lg
                shadow-red-200
                hover:shadow-red-300
                transition-all
              "
            >
              <PhoneCall size={19} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="
                w-12 h-12
                rounded-2xl
                bg-gradient-to-br from-orange-500 to-pink-500
                text-white
                flex items-center justify-center
                shadow-lg
                shadow-orange-200
                hover:shadow-orange-300
                transition-all
              "
            >
              <MessageCircleMore size={19} />
            </motion.button>

            <Link
              to="/donate"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  h-12
                  px-7
                  rounded-2xl
                  bg-gradient-to-r from-red-600 via-orange-500 to-pink-500
                  text-white
                  text-[14px]
                  font-black
                  flex items-center justify-center
                  gap-2
                  shadow-2xl
                  shadow-red-300
                  hover:shadow-red-400
                  hover:brightness-110
                  transition-all
                  relative
                  overflow-hidden
                  group
                "
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <Heart size={18} className="fill-current" />
                  DONATE NOW
                </span>
              </motion.button>
            </Link>
          </div>

          {/* MOBILE: Donate + Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <Link to="/donate">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  h-10
                  px-4
                  rounded-xl
                  bg-gradient-to-r from-red-600 via-orange-500 to-pink-500
                  text-white
                  text-xs
                  font-black
                  flex items-center justify-center
                  gap-1.5
                  shadow-lg
                  shadow-red-200
                  whitespace-nowrap
                "
              >
                <Heart size={14} className="fill-current shrink-0" />
                DONATE
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(!open)}
              className="
                w-12 h-12
                rounded-2xl
                bg-gradient-to-r from-red-500 to-orange-500
                text-white
                flex items-center justify-center
                shadow-lg
                shadow-red-200
              "
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-orange-100 bg-white/98 backdrop-blur-xl shadow-2xl max-h-[calc(100vh-88px)] overflow-y-auto"
          >
            <div className="p-5 space-y-3">

              {navLinks.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >

                  {item.action === "contact" ? (

                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => {
                        setContactOpen(true);
                        setOpen(false);
                      }}
                      className="
                        w-full
                        text-left
                        px-5
                        py-4
                        rounded-2xl
                        text-[15px]
                        font-bold
                        bg-gradient-to-r from-gray-50 to-orange-50/30
                        text-gray-800
                        hover:from-red-50
                        hover:to-orange-100
                        hover:text-red-600
                        transition-all
                      "
                    >
                      {item.title}
                    </motion.button>

                  ) : !item.dropdown ? (

                    <NavLink
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `
                        block
                        px-5
                        py-4
                        rounded-2xl
                        text-[15px]
                        font-bold
                        transition-all
                        ${
                          isActive
                            ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-200"
                            : "bg-gradient-to-r from-gray-50 to-orange-50/30 text-gray-800 hover:from-red-50 hover:to-orange-100 hover:text-red-600"
                        }
                        ${
                          item.showUpcomingIndicator &&
                          hasUpcomingEvents &&
                          !isActive
                            ? "ring-2 ring-orange-300/70"
                            : ""
                        }
                      `
                      }
                    >
                      {({ isActive }) => (
                        <span className="inline-flex items-center gap-2">
                          {item.title}
                          {item.showUpcomingIndicator &&
                            renderEventsIndicator(isActive, true)}
                        </span>
                      )}
                    </NavLink>

                  ) : (

                    <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-orange-50/30 p-4">

                      <div className="text-[15px] font-black text-gray-800 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
                        {item.title}
                      </div>

                      <div className="space-y-2">

                        {item.dropdown.map((subItem, subIndex) => (

                          <motion.div
                            key={subIndex}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Link
                              to={subItem.path}
                              onClick={() => setOpen(false)}
                              className="
                                block
                                px-4
                                py-3
                                rounded-xl
                                bg-white
                                text-[14px]
                                font-semibold
                                text-gray-700
                                hover:bg-gradient-to-r from-red-50 to-orange-50
                                hover:text-red-600
                                transition-all
                                shadow-sm
                              "
                            >
                              {subItem.title}
                            </Link>
                          </motion.div>
                        ))}

                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Donate Button in Mobile Menu */}
              <Link to="/donate" onClick={() => setOpen(false)}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-gradient-to-r from-red-600 via-orange-500 to-pink-500
                    text-white
                    text-[16px]
                    font-black
                    flex items-center justify-center
                    gap-2
                    shadow-xl
                    shadow-red-300
                    mt-4
                  "
                >
                  <Heart size={20} className="fill-current" />
                  DONATE NOW
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT DIALOG — portaled to body for true center */}
      {contactModal}
    </header>
  );
}