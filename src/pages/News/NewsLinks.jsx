import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Facebook,
  Play,
  Film,
  Clapperboard,
  Newspaper,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const buildCoverImage = (title, colors = ["#c2410c", "#dc2626", "#9333ea"]) => {
  const [from, via = colors[0], to = colors[1]] = colors;
  const safeTitle = title
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="55%" stop-color="${via}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)" />
      <circle cx="980" cy="180" r="220" fill="rgba(255,255,255,0.16)" />
      <circle cx="280" cy="650" r="320" fill="rgba(255,255,255,0.16)" />
      <rect x="80" y="80" width="1040" height="640" rx="36" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.25)" />
      <text x="120" y="340" font-size="48" font-family="Georgia, serif" font-weight="700" fill="white">${safeTitle}</text>
      <text x="120" y="410" font-size="28" font-family="Arial, sans-serif" font-weight="600" fill="rgba(255,255,255,0.85)">Facebook Update</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const newsLinks = [
  {
    id: 1,
    title: "Shree Chitragupt Peeth – पवित्र समारोह",
    url: "https://www.facebook.com/share/v/1Bur4Xx1VS/",
    description:
      "Watch this inspiring video shared from Shree Chitragupt Peeth's Facebook page. A divine glimpse into our sacred celebrations.",
    date: "16 July 2026",
    type: "video",
    featured: true,
  },
  {
    id: 2,
    title: "Shree Chitragupt Peeth – दिव्य क्षण",
    url: "https://www.facebook.com/share/v/17sZDWdwbb/",
    description:
      "A divine moment captured and shared from our Facebook community.",
    date: "16 July 2026",
    type: "video",
    featured: false,
  },
  {
    id: 3,
    title: "Shree Chitragupt Peeth – आध्यात्मिक वातावरण",
    url: "https://www.facebook.com/share/v/1H7zwNmF7D/",
    description:
      "Experience the spiritual atmosphere through this Facebook video.",
    date: "16 July 2026",
    type: "video",
    featured: false,
  },
  {
    id: 4,
    title: "Shree Chitragupt Peeth – Viral Reel",
    url: "https://www.facebook.com/share/r/1RfdjifQ5j/",
    description:
      "A beautiful reel showcasing the activities at Shree Chitragupt Peeth.",
    date: "16 July 2026",
    type: "reel",
    featured: false,
  },
  {
    id: 5,
    title: "Shree Chitragupt Peeth – ताज़ा समाचार",
    url: "https://www.facebook.com/share/v/1QXRd13Ldn/",
    description:
      "Latest news and updates from Shree Chitragupt Peeth. Stay connected with our community.",
    date: "16 July 2026",
    type: "video",
    featured: false,
  },
  {
    id: 6,
    title: "Shree Chitragupt Peeth – उत्सव झलकियाँ",
    url: "https://www.facebook.com/share/v/18mnh7iWdU/",
    description:
      "Witness the divine celebrations and events at the Peeth through this special video.",
    date: "16 July 2026",
    type: "video",
    featured: false,
  },
];

const typeConfig = {
  video: {
    gradient: "from-red-500 via-orange-400 to-amber-400",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-100",
    badge: "bg-red-500",
    icon: <Play className="w-3.5 h-3.5 fill-current" />,
    label: "Video",
    glow: "shadow-red-200",
  },
  reel: {
    gradient: "from-purple-500 via-pink-500 to-rose-400",
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100",
    badge: "bg-purple-500",
    icon: <Film className="w-3.5 h-3.5" />,
    label: "Reel",
    glow: "shadow-purple-200",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function NewsLinks() {
  const [hovered, setHovered] = useState(null);
  const featured = newsLinks[0];
  const rest = newsLinks.slice(1);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fff 40%, #fdf2f8 100%)" }}>

      {/* ─── HERO ─── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #c2410c 0%, #dc2626 40%, #9333ea 100%)" }}>
        {/* Decorative blobs */}
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: "#fb923c" }} />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-2xl" style={{ background: "#e879f9" }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-40 rounded-full opacity-10 blur-3xl" style={{ background: "#fbbf24" }} />

        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-sm font-bold border border-white/20 backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Live from Facebook
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
          >
            News &amp;{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Updates</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 rounded-full opacity-40" style={{ background: "#fbbf24" }} />
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-lg font-medium max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Stay connected with the latest videos, reels &amp; highlights from{" "}
            <span className="font-black text-yellow-300">Shree Chitragupt Peeth</span>
          </motion.p>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            {[
              { label: "Videos", value: "5", icon: <Play className="w-4 h-4" /> },
              { label: "Reels", value: "1", icon: <Film className="w-4 h-4" /> },
              { label: "Links", value: "6", icon: <ExternalLink className="w-4 h-4" /> },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div className="text-orange-200">{stat.icon}</div>
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z"
              fill="#fff7ed" />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20 pt-4">

        {/* ─── FEATURED CARD ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white"
              style={{ background: "linear-gradient(90deg, #dc2626, #f97316)" }}
            >
              <Newspaper className="w-4 h-4" />
              Featured Story
            </div>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, #f97316, transparent)" }} />
          </div>

          <motion.a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            className="group block rounded-3xl overflow-hidden shadow-2xl"
            style={{ boxShadow: "0 25px 60px rgba(220,38,38,0.15)" }}
          >
            <div className="relative flex flex-col md:flex-row">
              {/* Left – preview image */}
              <div className="relative md:w-2/5 h-52 md:h-auto min-h-[220px] overflow-hidden flex items-center justify-center">
                <img
                  src={buildCoverImage(featured.title, ["#c2410c", "#dc2626", "#9333ea"])}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                />
                <div className="absolute inset-0 bg-linear-to-br from-black/15 via-transparent to-black/35" />
                <motion.div whileHover={{ scale: 1.1 }} className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30"
                  style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)" }}
                >
                  <Play className="w-10 h-10 text-white fill-current ml-1" />
                </motion.div>
                <Facebook className="absolute bottom-4 right-4 w-8 h-8 text-white opacity-30" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                >
                  ★ Featured
                </span>
              </div>

              {/* Right – content */}
              <div className="flex-1 bg-white p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-red-500">
                      <Play className="w-3 h-3 fill-current" /> Video
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{featured.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-base leading-relaxed">{featured.description}</p>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#1877f2" }}>
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Watch on</p>
                    <p className="text-sm font-bold text-gray-800">Facebook</p>
                  </div>
                  <motion.div whileHover={{ x: 4 }}
                    className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white"
                    style={{ background: "linear-gradient(135deg, #dc2626, #f97316)" }}
                  >
                    Watch Now
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.a>
        </motion.div>

        {/* ─── REST OF CARDS ─── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-gray-700"
            style={{ background: "#f5f5f5" }}
          >
            <Clapperboard className="w-4 h-4" />
            More Stories
          </div>
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400 font-medium">{rest.length} updates</span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rest.map((link, index) => {
            const cfg = typeConfig[link.type];
            const isHov = hovered === link.id;

            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                onHoverStart={() => setHovered(link.id)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.97 }}
                className={`group flex flex-col rounded-2xl overflow-hidden bg-white border transition-all duration-300 cursor-pointer ${cfg.border} ${isHov ? `shadow-xl ${cfg.glow}` : "shadow-md"}`}
              >
                {/* Card Top Visual */}
                <div className={`relative h-36 flex items-center justify-center overflow-hidden`}>
                  <img
                    src={buildCoverImage(link.title, link.type === "reel" ? ["#7c3aed", "#db2777", "#fb7185"] : ["#c2410c", "#dc2626", "#f59e0b"])}
                    alt={link.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-black/20 via-transparent to-black/30" />
                  <div className="absolute inset-0 opacity-15"
                    style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "18px 18px" }}
                  />
                  <span className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white font-black text-sm backdrop-blur-sm">
                    {index + 2}
                  </span>

                  <motion.div
                    animate={{ scale: isHov ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-xl"
                  >
                    <Play className="w-7 h-7 text-white fill-current ml-0.5" />
                  </motion.div>

                  <Facebook className="absolute bottom-3 right-3 w-5 h-5 text-white opacity-40" />

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHov ? 1 : 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.2)" }}
                  >
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-900 text-sm font-bold shadow-lg">
                      <ExternalLink className="w-4 h-4" />
                      Open Link
                    </span>
                  </motion.div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Badge + Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-white ${cfg.badge}`}>
                      {cfg.icon}
                      {cfg.label}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium ml-auto">{link.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-black text-[15px] leading-snug mb-2 transition-colors ${isHov ? cfg.text : "text-gray-800"}`}>
                    {link.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-[13px] leading-relaxed flex-1 line-clamp-3">
                    {link.description}
                  </p>

                  {/* Footer */}
                  <div className={`flex items-center gap-2 mt-4 pt-4 border-t ${cfg.border}`}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#1877f2" }}>
                      <Facebook className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">Facebook</span>
                    <motion.div
                      animate={{ x: isHov ? 3 : 0 }}
                      className={`ml-auto w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isHov ? `${cfg.bg} ${cfg.text}` : "bg-gray-50 text-gray-400"}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* ─── BOTTOM CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 rounded-3xl p-10 text-center overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #fff7ed, #fdf2f8)" }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ background: "#f97316" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: "#a855f7" }} />
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-xl"
              style={{ background: "#1877f2" }}
            >
              <Facebook className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">Follow Us on Facebook</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
              Never miss an update — follow Shree Chitragupt Peeth for daily spiritual content &amp; news.
            </p>
            <motion.a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white text-sm shadow-xl"
              style={{ background: "#1877f2" }}
            >
              <Facebook className="w-4 h-4" />
              Follow on Facebook
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
