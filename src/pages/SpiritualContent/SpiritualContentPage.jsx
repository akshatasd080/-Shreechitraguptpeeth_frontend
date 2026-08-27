import React, { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { getSpiritualContent } from "./spiritualData";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/spiritual/`;

const SpiritualContentPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [type, id]);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/spiritual-resources/${type}/${id}`);
        const resource = res.data?.resource;
        if (resource) {
          setContent({
            title: resource.name,
            subtitle: resource.category,
            content: resource.content,
            image: resource.image_filename
              ? `${IMAGE_BASE_URL}${resource.image_filename}`
              : null,
          });
          setLoading(false);
          return;
        }
      } catch (_) {
        // Fall back to static data
      }

      const staticContent = getSpiritualContent(type, id);
      setContent(staticContent);
      setLoading(false);
    };

    fetchContent();
  }, [type, id]);

  if (loading) {
    return (
      <div className="w-full bg-[#fffaf7] min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="w-full bg-[#fffaf7] min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            सामग्री नहीं मिली
          </h2>
          <Link to="/" className="text-orange-500 hover:underline">
            होम पेज पर जाएँ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fffaf7] overflow-hidden">
      <div
        className="
          relative
          w-full
          h-[200px]
          md:h-[260px]
          lg:h-[320px]
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: content.image
            ? `url('${content.image}')`
            : "url('/New folder/subheader1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div
          className="
            relative
            z-10
            h-full
            flex
            flex-col
            items-center
            justify-center
            px-4
          "
        >
          <span
            className="
              px-4 py-2
              rounded-full
              bg-white/10
              backdrop-blur-md
              border border-white/20
              text-[11px]
              tracking-widest
              uppercase
              text-white
              mb-4
            "
          >
            Shree Chitragupt Peeth
          </span>

          <h1
            className="
              text-2xl
              sm:text-3xl
              md:text-5xl
              font-bold
              text-white
              text-center
              px-2
              leading-tight
            "
          >
            {content.title}
          </h1>

          <div
            className="
              absolute
              -bottom-5
              max-w-[calc(100%-1.5rem)]
              bg-white
              rounded-full
              shadow-lg
              px-4
              sm:px-5
              py-2.5
              flex
              items-center
              gap-2
              sm:gap-3
              border
              text-xs
              sm:text-[13px]
              flex-wrap
              justify-center
            "
          >
            <Link
              to="/"
              className="
                flex items-center gap-2
                text-gray-600
                text-[13px]
                font-medium
                hover:text-red-500
                transition-all
              "
            >
              <Home size={15} />
              HOME
            </Link>

            <span className="text-gray-400 text-sm">/</span>

            <span className="text-red-500 text-[13px] font-semibold">
              {content.title.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 lg:px-6 pt-20 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="
            mb-8
            flex items-center gap-2
            px-4 py-2
            rounded-full
            bg-white
            border border-gray-200
            text-gray-700
            hover:bg-orange-50
            hover:text-orange-600
            transition-all
            duration-300
          "
        >
          <ArrowLeft size={16} />
          पीछे जाएँ
        </button>

        {content.subtitle && (
          <h2 className="text-xl md:text-2xl font-semibold text-orange-600 mb-6">
            {content.subtitle}
          </h2>
        )}

        {content.image && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-orange-100 shadow-sm">
            <img
              src={content.image}
              alt={content.title}
              className="w-full max-h-80 object-cover"
            />
          </div>
        )}

        <div
          className="
            bg-white
            rounded-2xl
            p-6 lg:p-8
            border
            border-gray-100
            shadow-sm
          "
        >
          {content.content ? (
            <div
              dangerouslySetInnerHTML={{ __html: content.content }}
              className="text-gray-700"
            />
          ) : (
            <p className="text-gray-600">
              इस सामग्री को जल्द ही जोड़ा जाएगा!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpiritualContentPage;
