import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import api from "@/api/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/news/`;
const WORD_LIMIT = 30;

const DEFAULT_IMAGES = [
  { src: "/News/n1.png", description: "News Image 0" },
  { src: "/News/n2.png", description: "News Image 1" },
  { src: "/gallery/g1.jpg", description: "News Image 1" },
  { src: "/gallery/g2.jpg", description: "News Image 2" },
  { src: "/gallery/g3.jpg", description: "News Image 3" },
  { src: "/gallery/g4.jpg", description: "News Image 4" },
  { src: "/gallery/g5.jpg", description: "News Image 5" },
  { src: "/gallery/g6.jpg", description: "News Image 6" },
];

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

export default function NewsImages() {
  const [galleryImages, setGalleryImages] = useState(DEFAULT_IMAGES);
  const [monthLabel, setMonthLabel] = useState("");
  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [detailItem, setDetailItem] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await api.get("/news-images?monthly=true");
        const apiImages = res.data?.images || [];
        if (apiImages.length > 0) {
          setGalleryImages(
            apiImages.map((img) => ({
              src: `${IMAGE_BASE_URL}${img.image_filename}`,
              description: img.description || "",
            }))
          );
          setMonthLabel(res.data.month_label || "");
          setIsFallback(!!res.data.is_fallback);
        } else {
          setMonthLabel(res.data?.month_label || "");
          setIsFallback(false);
        }
      } catch (_) {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prev = () =>
    setLightbox((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setLightbox((i) => (i + 1) % galleryImages.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-pink-600 py-10 sm:py-16 px-4 overflow-hidden">
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
              <Images className="w-7 h-7 text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg"
          >
            News Images
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-red-100 text-lg font-medium"
          >
            Latest visual coverage from Shree Chitragupt Peeth
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

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        {loading ? (
          <div className="flex justify-center py-20 text-gray-500 font-medium">
            Loading images...
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No news images available yet.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {galleryImages.map((img, index) => {
              const { preview, needsMore } = truncateWords(
                img.description,
                WORD_LIMIT
              );

              return (
                <motion.div
                  key={`${img.src}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-300 bg-white flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="relative w-full aspect-square overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={img.src}
                      alt={img.description || "News Image"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </button>

                  <div className="p-4 flex flex-col flex-1">
                    {img.description ? (
                      <>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {preview}
                        </p>
                        {needsMore && (
                          <button
                            type="button"
                            onClick={() => setDetailItem(img)}
                            className="mt-2 self-start text-red-600 hover:text-red-700 text-sm font-bold"
                          >
                            Read more
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-400 text-sm italic">
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

      {/* Read more dialog — full image + complete description */}
      <Dialog
        open={!!detailItem}
        onOpenChange={(open) => {
          if (!open) setDetailItem(null);
        }}
      >
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl">
          {detailItem && (
            <>
              <div className="w-full bg-black/5">
                <img
                  src={detailItem.src}
                  alt={detailItem.description || "News Image"}
                  className="w-full max-h-[50vh] object-contain"
                />
              </div>
              <div className="p-6 pt-4">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-red-600">
                    News Details
                  </DialogTitle>
                </DialogHeader>
                <p className="mt-3 text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {detailItem.description}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && galleryImages[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-2xl flex items-center justify-center border border-white/20 text-white transition-all z-10"
            >
              <X size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-2xl flex items-center justify-center border border-white/20 text-white transition-all z-10"
            >
              <ChevronLeft size={22} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl bg-black/40"
            >
              <img
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].description || "News Image"}
                className="max-h-[70vh] w-auto mx-auto object-contain"
              />
              {galleryImages[lightbox].description && (
                <div className="bg-black/70 text-white py-3 px-4 text-sm text-center max-h-28 overflow-y-auto">
                  <p>{galleryImages[lightbox].description}</p>
                  {getWords(galleryImages[lightbox].description).length >
                    WORD_LIMIT && (
                    <button
                      type="button"
                      onClick={() => {
                        setDetailItem(galleryImages[lightbox]);
                        closeLightbox();
                      }}
                      className="mt-2 text-orange-300 font-bold hover:text-orange-200"
                    >
                      Read more
                    </button>
                  )}
                </div>
              )}
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-2xl flex items-center justify-center border border-white/20 text-white transition-all z-10"
            >
              <ChevronRight size={22} />
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold border border-white/20">
              {lightbox + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
