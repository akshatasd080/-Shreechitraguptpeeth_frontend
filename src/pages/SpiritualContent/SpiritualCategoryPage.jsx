import React, { useEffect, useState } from "react";
import { Home, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "@/api/axios";
import {
  SPIRITUAL_IMAGE_BASE,
  SPIRITUAL_TYPE_META,
  slugifyCategory,
} from "./spiritualUtils";

const SpiritualCategoryPage = () => {
  const { type, categorySlug } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const meta = SPIRITUAL_TYPE_META[type] || {};
  const gradientClass = meta.color || "from-orange-500 to-red-500";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [type, categorySlug]);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/spiritual-resources?active=true&type=${type}`);
        const resources = res.data?.resources || [];
        const filtered = resources.filter(
          (r) => slugifyCategory(r.category) === categorySlug
        );

        if (filtered.length > 0) {
          setCategoryName(filtered[0].category || categorySlug);
          setItems(
            filtered.map((r) => ({
              id: r.slug,
              name: r.name,
              type: r.type,
              image: r.image_filename
                ? `${SPIRITUAL_IMAGE_BASE}${r.image_filename}`
                : null,
            }))
          );
        } else {
          setCategoryName(categorySlug.replace(/-/g, " "));
          setItems([]);
        }
      } catch (_) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryItems();
  }, [type, categorySlug]);

  if (loading) {
    return (
      <div className="w-full bg-[#fffaf7] min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fffaf7] overflow-hidden min-h-screen">
      <div
        className="relative w-full h-[200px] md:h-[260px] lg:h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url('/New folder/subheader1.jpg')" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-80`} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <span className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-2">
            {meta.emoji} {meta.label}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white capitalize">
            {categoryName}
          </h1>

          <div className="absolute -bottom-5 bg-white rounded-full shadow-lg px-5 py-2.5 flex items-center gap-3 border">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 text-[13px] font-medium hover:text-red-500 transition-all"
            >
              <Home size={15} />
              HOME
            </Link>
            <span className="text-gray-400 text-sm">/</span>
            <span className="text-red-500 text-[13px] font-semibold uppercase">
              {categoryName}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-20 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all"
        >
          <ArrowLeft size={16} />
          पीछे जाएँ
        </button>

        {items.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-orange-200 bg-white">
            <div className="text-5xl mb-4 opacity-50">🕉</div>
            <p className="text-gray-500 font-medium">No items found in this category.</p>
            <Link to="/" className="inline-block mt-4 text-orange-500 hover:underline text-sm">
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-500 text-sm">
                {items.length} devotional{items.length !== 1 ? "s" : ""} in this category
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                >
                  <Link
                    to={`/spiritual/${item.type}/${item.id}`}
                    className="group block h-full"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-white ring-1 ring-gray-100 shadow-sm hover:shadow-2xl hover:ring-orange-200 transition-all duration-500 hover:-translate-y-1.5">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        {item.image ? (
                          <>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          </>
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                            <span className="text-5xl">{meta.emoji || "🕉"}</span>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        )}

                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <ArrowRight size={14} className="text-white" />
                        </div>

                        <div className="absolute bottom-0 inset-x-0 p-4">
                          <p className="text-white font-bold text-sm leading-snug drop-shadow-lg line-clamp-2">
                            {item.name}
                          </p>
                        </div>
                      </div>

                      <div className={`px-4 py-3 flex items-center justify-between border-t ${meta.border || "border-orange-100"} ${meta.bg || "bg-orange-50/50"}`}>
                        <span className={`text-xs font-bold uppercase tracking-wider ${meta.accent || "text-orange-600"}`}>
                          Read Now
                        </span>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs bg-gradient-to-r ${gradientClass} text-white`}>
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpiritualCategoryPage;
