import {
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  Heart,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Link } from "react-router-dom";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Shree+Chitragupt+Peeth+Brij+Shanti+Kunj+Junihadi+Uttar+Pradesh+281504";

const informationLinks = [
  { title: "Home", path: "/" },
  { title: "Establishment", path: "/establishment" },
  { title: "About Peeth", path: "/about-peeth" },
  { title: "About Swami Ji", path: "/about-swami" },
  { title: "About Shri Chitragupt Ji", path: "/about-chitragupt" },
  { title: "Our Mission", path: "/mission" },
  { title: "Our Volunteers", path: "/volunteers" },
  { title: "Membership", path: "/membership" },
];

const quickLinks = [
  { title: "Donate Now", path: "/donate" },
  { title: "Events", path: "/events" },
  { title: "Photo Gallery", path: "/photo-gallery" },
  { title: "Video Gallery", path: "/video-gallery" },
  { title: "Youtube Videos", path: "/youtube-videos" },
  { title: "Media Gallery", path: "/media-gallery" },
  { title: "News", path: "/news-images" },
  { title: "Location Map", path: MAPS_URL, external: true },
];

const socialLinks = [
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/share/19AUfxA5k7/?mibextid=wwXIfr",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/dr.swamisachidanand_chitragupt?igsi=MTcwYmhrMHhrbWNpMQ==",
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    href: "https://youtube.com/@shreechitraguptpeeth3940?si=6sVJ9vhk7kGRatuV",
  },
  {
    icon: FaXTwitter,
    label: "X",
    href: "https://x.com/sanjeev02507712?s=11",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#fff8f5] via-[#ffe9e0] to-[#f7d9cf]">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-orange-200/50 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-red-200/40 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1450px] px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-[env(safe-area-inset-bottom)] lg:px-10">
        {/* Brand strip */}
        <div className="mb-10 sm:mb-14 flex flex-col items-stretch sm:items-start justify-between gap-5 sm:gap-6 border-b border-red-200/60 pb-8 sm:pb-10 md:flex-row md:items-center">
          <Link to="/" className="group flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 opacity-30 blur-lg transition-opacity group-hover:opacity-50" />
              <img
                src="/logo.png"
                alt="Shree Chitragupt Peeth"
                className="relative h-14 w-14 object-contain drop-shadow-md md:h-20 md:w-20"
              />
            </div>
            <div className="min-w-0">
              <h2 className="bg-gradient-to-r from-red-700 via-orange-600 to-red-600 bg-clip-text text-xl sm:text-2xl font-black tracking-tight text-transparent md:text-3xl break-words">
                Shree Chitragupt Peeth
              </h2>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-stone-600">
                Brij Shanti Kunj · Spiritual wisdom & devotion
              </p>
            </div>
          </Link>

          <Link
            to="/donate"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-red-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-red-300/50 transition hover:brightness-110"
          >
            <Heart className="h-4 w-4 fill-current" />
            Donate Now
          </Link>
        </div>

        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* About + contact */}
          <div className="lg:col-span-1">
            <h3 className="mb-5 text-xl font-black tracking-tight text-red-600">
              About Us
            </h3>
            <p className="text-[15px] leading-7 text-stone-700">
              सम्पूर्ण भारत में भगवान श्री चित्रगुप्त जी के मंदिर हैं। यहाँ
              धार्मिक जानकारी एवं वेद-पुराणों पर आधारित ज्ञान प्राप्त करें।
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+917065013874"
                className="group flex items-start gap-3 text-stone-700 transition hover:text-red-600"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm ring-1 ring-red-100 transition group-hover:bg-red-500 group-hover:text-white">
                  <Phone size={18} />
                </span>
                <span className="pt-2 font-semibold">+91-7065013874</span>
              </a>

              <a
                href="mailto:shreechitraguptpeeth@gmail.com"
                className="group flex items-start gap-3 text-stone-700 transition hover:text-red-600"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm ring-1 ring-red-100 transition group-hover:bg-red-500 group-hover:text-white">
                  <Mail size={18} />
                </span>
                <span className="break-all pt-2 font-semibold">
                  shreechitraguptpeeth@gmail.com
                </span>
              </a>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-stone-700 transition hover:text-red-600"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm ring-1 ring-red-100 transition group-hover:bg-red-500 group-hover:text-white">
                  <MapPin size={18} />
                </span>
                <span className="pt-1.5 text-[15px] font-semibold leading-relaxed">
                  Shree Chitragupt Peeth (Brij Shanti Kunj)
                  <br />
                  GGWF+2R6, Junihadi, Uttar Pradesh 281504
                </span>
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-red-500 shadow-md ring-1 ring-red-100 transition hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 hover:text-white hover:shadow-lg"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-5 text-xl font-black tracking-tight text-red-600">
              Information
            </h3>
            <ul className="space-y-1">
              {informationLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-3 rounded-xl px-2 py-2.5 font-semibold text-stone-700 transition hover:bg-white/70 hover:text-red-600"
                  >
                    <span className="text-red-500 transition group-hover:scale-110">
                      ॐ
                    </span>
                    <span className="flex-1">{item.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-black tracking-tight text-red-600">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((item) =>
                item.external ? (
                  <li key={item.title}>
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl px-2 py-2.5 font-semibold text-stone-700 transition hover:bg-white/70 hover:text-red-600"
                    >
                      <span className="text-red-500 transition group-hover:scale-110">
                        ॐ
                      </span>
                      <span className="flex-1">{item.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-60" />
                    </a>
                  </li>
                ) : (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="group flex items-center gap-3 rounded-xl px-2 py-2.5 font-semibold text-stone-700 transition hover:bg-white/70 hover:text-red-600"
                    >
                      <span className="text-red-500 transition group-hover:scale-110">
                        ॐ
                      </span>
                      <span className="flex-1">{item.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-60" />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Explore / CTA card */}
          <div>
            <h3 className="mb-5 text-xl font-black tracking-tight text-red-600">
              Visit & Connect
            </h3>
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-orange-500 to-red-500 p-6 text-white shadow-xl shadow-red-300/40">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
                Temple welcome
              </p>
              <h4 className="mt-2 text-2xl font-black leading-snug">
                Join darshan, seva & upcoming events
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                Explore galleries, book pooja, and stay updated with temple
                news.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-orange-50"
                >
                  View Events
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Become a Member
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-red-200/70 py-8 md:flex-row">
          <p className="text-center text-sm font-semibold text-stone-600 md:text-left">
            © {new Date().getFullYear()} Shree Chitragupt Peeth. All Rights
            Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-stone-600">
            <Link to="/Privacy" className="transition hover:text-red-600">
              Privacy
            </Link>
            <span className="text-red-200">|</span>
            <Link to="/terms" className="transition hover:text-red-600">
              Terms
            </Link>
            <span className="text-red-200">|</span>
            <Link to="/cookies" className="transition hover:text-red-600">
              Cookies
            </Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-red-500 shadow-lg ring-1 ring-red-100 transition hover:-translate-y-1 hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 hover:text-white"
          >
            <ChevronUp size={22} />
          </button>
        </div>
      </div>
    </footer>
  );
}
