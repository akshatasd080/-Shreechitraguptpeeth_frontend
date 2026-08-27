import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Video, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/api/axios";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const VIDEO_BASE_URL = `${API_BASE_URL}/uploads/news-videos/`;

const WORD_LIMIT = 30;

function getWords(text = "") {
  return String(text)
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function truncateWords(text = "", limit = WORD_LIMIT) {
  const words = getWords(text);
  if (words.length <= limit) {
    return { preview: words.join(" "), needsMore: false };
  }
  return {
    preview: words.slice(0, limit).join(" ") + "...",
    needsMore: true,
  };
}

export default function NewsVideos() {
  const [videos, setVideos] = useState([]);
  const [monthLabel, setMonthLabel] = useState("");
  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [detailItem, setDetailItem] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await api.get("/news-videos?monthly=true");
        const apiVideos = res.data?.videos || [];
        setVideos(
          apiVideos.map((v) => ({
            src: `${VIDEO_BASE_URL}${v.video_filename}`,
            description: v.description || "",
            title: v.description || "News Video",
          }))
        );
        setMonthLabel(res.data?.month_label || "");
        setIsFallback(!!res.data?.is_fallback);
      } catch (_) {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const openVideo = (index) => setActiveVideo(index);
  const closeVideo = () => setActiveVideo(null);
  const prev = () =>
    setActiveVideo((i) => (i - 1 + videos.length) % videos.length);
  const next = () => setActiveVideo((i) => (i + 1) % videos.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="relative bg-gradient-to-r from-red-700 via-red-500 to-orange-500 py-10 sm:py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
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
            className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg"
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
          {monthLabel && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full border border-white/30"
            >
              {monthLabel}
              {isFallback ? " (latest available)" : ""}
            </motion.p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading videos...</div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No news videos available yet.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {videos.map((video, index) => {
              const { preview, needsMore } = truncateWords(video.description);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-200/50 transition-all duration-300 flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => openVideo(index)}
                    className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden group cursor-pointer"
                  >
                    <video
                      src={video.src}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                      preload="metadata"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                        <Play className="w-7 h-7 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </button>

                  <div className="p-4 flex flex-col flex-1">
                    {video.description ? (
                      <>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {preview}
                        </p>
                        {needsMore && (
                          <button
                            type="button"
                            onClick={() => setDetailItem(video)}
                            className="mt-2 self-start text-red-600 hover:text-red-700 text-sm font-bold"
                          >
                            Read more
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-gray-400 italic">
                        No description
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Detail dialog */}
      <AnimatePresence>
        {detailItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setDetailItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <video
                src={detailItem.src}
                controls
                className="w-full max-h-[50vh] bg-black"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-600 mb-3">
                  Video Details
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {detailItem.description}
                </p>
                <button
                  type="button"
                  onClick={() => setDetailItem(null)}
                  className="mt-6 px-5 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeVideo !== null && videos[activeVideo] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <button
              onClick={closeVideo}
              className="absolute top-5 right-5 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-2xl flex items-center justify-center border border-white/20 text-white z-10"
            >
              <X size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-2xl flex items-center justify-center border border-white/20 text-white z-10"
            >
              <ChevronLeft size={22} />
            </button>
            <motion.div
              key={activeVideo}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl bg-black"
            >
              <video
                src={videos[activeVideo].src}
                controls
                autoPlay
                className="w-full max-h-[70vh]"
              />
              {videos[activeVideo].description && (
                <div className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800">
                  <p className="text-white text-sm leading-relaxed">
                    {videos[activeVideo].description}
                  </p>
                </div>
              )}
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-2xl flex items-center justify-center border border-white/20 text-white z-10"
            >
              <ChevronRight size={22} />
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold border border-white/20">
              {activeVideo + 1} / {videos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
