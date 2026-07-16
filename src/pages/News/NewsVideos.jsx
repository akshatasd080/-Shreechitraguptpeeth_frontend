import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Video, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const videos = [
  {
    src: "/video/WhatsApp Video 2026-07-16 at 14.59.12 (1).mp4",
    title: "Shree Chitragupt Peeth - Video 1",
    thumbnail: null,
  },
  {
    src: "/video/WhatsApp Video 2026-07-16 at 14.59.12.mp4",
    title: "Shree Chitragupt Peeth - Video 2",
    thumbnail: null,
  },
  {
    src: "/video/WhatsApp Video 2026-07-16 at 14.59.22.mp4",
    title: "Shree Chitragupt Peeth - Video 3",
    thumbnail: null,
  },
  {
    src: "/video/WhatsApp Video 2026-07-16 at 14.59.35.mp4",
    title: "Shree Chitragupt Peeth - Video 4",
    thumbnail: null,
  },
  {
    src: "/video/WhatsApp Video 2026-07-16 at 14.59.43 (1).mp4",
    title: "Shree Chitragupt Peeth - Video 5",
    thumbnail: null,
  },
  {
    src: "/video/WhatsApp Video 2026-07-16 at 14.59.43 (2).mp4",
    title: "Shree Chitragupt Peeth - Video 6",
    thumbnail: null,
  },
  {
    src: "/video/WhatsApp Video 2026-07-16 at 14.59.43.mp4",
    title: "Shree Chitragupt Peeth - Video 7",
    thumbnail: null,
  },
  {
    src: "/video/WhatsApp Video 2026-07-16 at 14.59.51.mp4",
    title: "Shree Chitragupt Peeth - Video 8",
    thumbnail: null,
  },
];

export default function NewsVideos() {
  const [activeVideo, setActiveVideo] = useState(null); // index or null

  const openVideo = (index) => setActiveVideo(index);
  const closeVideo = () => setActiveVideo(null);
  const prev = () => setActiveVideo((i) => (i - 1 + videos.length) % videos.length);
  const next = () => setActiveVideo((i) => (i + 1) % videos.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-red-700 via-red-500 to-orange-500 py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/5 rounded-full" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <Video className="w-7 h-7 text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg"
          >
            News Videos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-red-100 text-lg font-medium"
          >
            Watch the latest news and events from Shree Chitragupt Peeth
          </motion.p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => openVideo(index)}
              className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-200/50 transition-all duration-300"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                <video
                  src={video.src}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  preload="metadata"
                  muted
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50 border-4 border-white/30"
                  >
                    <Play className="w-7 h-7 text-white fill-current ml-1" />
                  </motion.div>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-white text-xs font-bold bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                    Video {index + 1}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
                  <span className="text-xs text-gray-400 font-medium">Shree Chitragupt Peeth</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Lightbox / Modal */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            {/* Close */}
            <button
              onClick={closeVideo}
              className="absolute top-5 right-5 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-2xl flex items-center justify-center border border-white/20 text-white transition-all z-10"
            >
              <X size={22} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-2xl flex items-center justify-center border border-white/20 text-white transition-all z-10"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Video Player */}
            <motion.div
              key={activeVideo}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl bg-black"
            >
              <video
                src={videos[activeVideo].src}
                controls
                autoPlay
                className="w-full max-h-[80vh]"
              />
              <div className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800">
                <h3 className="text-white font-bold text-lg">{videos[activeVideo].title}</h3>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-2xl flex items-center justify-center border border-white/20 text-white transition-all z-10"
            >
              <ChevronRight size={22} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold border border-white/20">
              {activeVideo + 1} / {videos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
