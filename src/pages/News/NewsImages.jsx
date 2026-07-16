import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

const galleryImages = [
  { src: "/gallery/g1.jpg", alt: "News Image 1" },
  { src: "/gallery/g2.jpg", alt: "News Image 2" },
  { src: "/gallery/g3.jpg", alt: "News Image 3" },
  { src: "/gallery/g4.jpg", alt: "News Image 4" },
  { src: "/gallery/g5.jpg", alt: "News Image 5" },
  { src: "/gallery/g6.jpg", alt: "News Image 6" },
  { src: "/gallery/gallery1.jpeg", alt: "News Image 7" },
  { src: "/gallery/gallery2.jpeg", alt: "News Image 8" },
  { src: "/gallery/gm1.jpeg", alt: "News Image 9" },
  { src: "/gallery/gm2.jpeg", alt: "News Image 10" },
  { src: "/gallery/gm3.jpeg", alt: "News Image 11" },
  { src: "/gallery/gm4.jpeg", alt: "News Image 12" },
  { src: "/gallery/gm5.jpeg", alt: "News Image 13" },
  { src: "/gallery/gm6.jpeg", alt: "News Image 14" },
];

export default function NewsImages() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setLightbox((i) => (i + 1) % galleryImages.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-pink-600 py-16 px-4 overflow-hidden">
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
            className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg"
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
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => openLightbox(index)}
              className="cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-300 bg-white group"
              style={{ aspectRatio: "1 / 1" }}
            >
              <div className="relative w-full h-full">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.parentElement.parentElement.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-sm font-semibold">{img.alt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
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
              onClick={(e) => { e.stopPropagation(); prev(); }}
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
              className="max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].alt}
                className="max-h-[85vh] w-auto object-contain"
              />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
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
