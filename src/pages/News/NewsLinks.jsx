import { useEffect, useState } from "react";
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
  Link2,
} from "lucide-react";
import api from "@/api/axios";

const buildCoverImage = (title, colors = ["#c2410c", "#dc2626", "#9333ea"]) => {
  const [from, via = colors[0], to = colors[1]] = colors;
  const safeTitle = String(title || "News")
    .slice(0, 40)
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
      <text x="120" y="410" font-size="28" font-family="Arial, sans-serif" font-weight="600" fill="rgba(255,255,255,0.85)">News Update</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const typeConfig = {
  video: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-100",
    badge: "bg-red-500",
    icon: <Play className="w-3.5 h-3.5 fill-current" />,
    label: "Video",
    glow: "shadow-red-200",
    colors: ["#c2410c", "#dc2626", "#f59e0b"],
  },
  reel: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100",
    badge: "bg-purple-500",
    icon: <Film className="w-3.5 h-3.5" />,
    label: "Reel",
    glow: "shadow-purple-200",
    colors: ["#7c3aed", "#db2777", "#fb7185"],
  },
  link: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
    badge: "bg-blue-500",
    icon: <Link2 className="w-3.5 h-3.5" />,
    label: "Link",
    glow: "shadow-blue-200",
    colors: ["#1d4ed8", "#2563eb", "#38bdf8"],
  },
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function NewsLinks() {
  const [newsLinks, setNewsLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      try {
        const res = await api.get("/news-links?active=true");
        setNewsLinks(res.data?.links || []);
      } catch (_) {
        setNewsLinks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const primaryLinks = newsLinks.slice(0, 6);
  const extraLinks = newsLinks.slice(6);
  const featured = primaryLinks[0];
  const rest = primaryLinks.slice(1);

  const videoCount = newsLinks.filter((l) => l.link_type === "video").length;
  const reelCount = newsLinks.filter((l) => l.link_type === "reel").length;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #fff7ed 0%, #fff 40%, #fdf2f8 100%)",
      }}
    >
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #c2410c 0%, #dc2626 40%, #9333ea 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-sm font-bold border border-white/20"
            style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Live Updates
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4"
          >
            News &amp; Updates
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-medium max-w-xl mx-auto text-white/80"
          >
            Latest videos, reels &amp; highlights from{" "}
            <span className="font-black text-yellow-300">
              Shree Chitragupt Peeth
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10"
          >
            {[
              { label: "Videos", value: String(videoCount), icon: <Play className="w-4 h-4" /> },
              { label: "Reels", value: String(reelCount), icon: <Film className="w-4 h-4" /> },
              {
                label: "Links",
                value: String(newsLinks.length),
                icon: <ExternalLink className="w-4 h-4" />,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border border-white/15"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <div className="text-orange-200">{stat.icon}</div>
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <span className="text-xs font-semibold text-white/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20 pt-8">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading links...</div>
        ) : newsLinks.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No news links available yet.
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white"
                    style={{
                      background: "linear-gradient(90deg, #dc2626, #f97316)",
                    }}
                  >
                    <Newspaper className="w-4 h-4" />
                    Featured Story
                  </div>
                  <div
                    className="h-px flex-1"
                    style={{
                      background: "linear-gradient(90deg, #f97316, transparent)",
                    }}
                  />
                </div>

                <motion.a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="group block rounded-3xl overflow-hidden shadow-2xl"
                >
                  <div className="relative flex flex-col md:flex-row">
                    <div className="relative md:w-2/5 h-52 md:min-h-[240px] overflow-hidden">
                      <img
                        src={buildCoverImage(
                          featured.title,
                          typeConfig[featured.link_type]?.colors
                        )}
                        alt={featured.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white fill-current ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-red-500 capitalize">
                            {featured.link_type || "video"}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">
                            {formatDate(featured.created_at)}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-gray-500 text-base leading-relaxed">
                          {featured.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: "#1877f2" }}
                        >
                          <Facebook className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-medium">
                            Open link
                          </p>
                          <p className="text-sm font-bold text-gray-800">
                            External
                          </p>
                        </div>
                        <div
                          className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white"
                          style={{
                            background: "linear-gradient(135deg, #dc2626, #f97316)",
                          }}
                        >
                          Watch Now
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            )}

            {/* Card grid (remaining of first 6) */}
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-gray-700 bg-gray-100">
                    <Clapperboard className="w-4 h-4" />
                    More Stories
                  </div>
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-sm text-gray-400 font-medium">
                    {rest.length} updates
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((link) => {
                    const cfg = typeConfig[link.link_type] || typeConfig.link;
                    const isHov = hovered === link.id;
                    return (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onHoverStart={() => setHovered(link.id)}
                        onHoverEnd={() => setHovered(null)}
                        whileHover={{ y: -8 }}
                        className={`group flex flex-col rounded-2xl overflow-hidden bg-white border transition-all duration-300 ${cfg.border} ${
                          isHov ? `shadow-xl ${cfg.glow}` : "shadow-md"
                        }`}
                      >
                        <div className="relative h-36 overflow-hidden">
                          <img
                            src={buildCoverImage(link.title, cfg.colors)}
                            alt={link.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                              <Play className="w-6 h-6 text-white fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-white ${cfg.badge}`}
                            >
                              {cfg.icon}
                              {cfg.label}
                            </span>
                            <span className="text-[11px] text-gray-400 font-medium ml-auto">
                              {formatDate(link.created_at)}
                            </span>
                          </div>
                          <h3
                            className={`font-black text-[15px] leading-snug mb-2 ${
                              isHov ? cfg.text : "text-gray-800"
                            }`}
                          >
                            {link.title}
                          </h3>
                          <p className="text-gray-400 text-[13px] leading-relaxed flex-1 line-clamp-3">
                            {link.description}
                          </p>
                          <div
                            className={`flex items-center gap-2 mt-4 pt-4 border-t ${cfg.border}`}
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-400 font-medium">
                              Open
                            </span>
                            <ArrowUpRight
                              className={`ml-auto w-4 h-4 ${
                                isHov ? cfg.text : "text-gray-400"
                              }`}
                            />
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </>
            )}

            {/* Extra links (>6) — blue strip below cards */}
            {extraLinks.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white bg-blue-600">
                    <Link2 className="w-4 h-4" />
                    More Links
                  </div>
                  <div className="h-px flex-1 bg-blue-200" />
                  <span className="text-sm text-blue-500 font-medium">
                    {extraLinks.length} more
                  </span>
                </div>

                <div className="rounded-2xl bg-blue-600 p-4 shadow-lg shadow-blue-200/50">
                  <div className="flex gap-3 overflow-x-auto pb-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:thin]">
                    {extraLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 min-w-[240px] max-w-[280px] bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl px-4 py-3 text-white transition-all"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-white/20 px-2 py-0.5 rounded-full capitalize">
                            {link.link_type || "link"}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-80" />
                        </div>
                        <p className="font-bold text-sm line-clamp-2 leading-snug">
                          {link.title}
                        </p>
                        {link.description && (
                          <p className="text-xs text-blue-100 mt-1 line-clamp-2">
                            {link.description}
                          </p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #fff7ed, #fdf2f8)" }}
        >
          <div className="relative">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-xl"
              style={{ background: "#1877f2" }}
            >
              <Facebook className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">
              Follow Us on Facebook
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
              Never miss an update — follow Shree Chitragupt Peeth for daily
              spiritual content &amp; news.
            </p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white text-sm shadow-xl"
              style={{ background: "#1877f2" }}
            >
              <Facebook className="w-4 h-4" />
              Follow on Facebook
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
