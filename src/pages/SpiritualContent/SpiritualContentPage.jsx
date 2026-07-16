import React, { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getSpiritualContent } from "./spiritualData";

const SpiritualContentPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  
  const content = getSpiritualContent(type, id);
  
  useEffect(() => {
    // Scroll to top of page when component mounts or params change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // or 'auto' for instant jump
    });
  }, [type, id]);

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
      {/* ================= HERO SECTION ================= */}

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
          backgroundImage: "url('/New folder/subheader1.jpg')",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
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
          {/* TOP TAG */}
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

          {/* TITLE */}
          <h1
            className="
              text-3xl
              md:text-5xl
              font-bold
              text-white
              text-center
            "
          >
            {content.title}
          </h1>

          {/* BREADCRUMB */}
          <div
            className="
              absolute
              -bottom-5
              bg-white
              rounded-full
              shadow-lg
              px-5
              py-2.5
              flex
              items-center
              gap-3
              border
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

            <span className="text-gray-400 text-sm">
              /
            </span>

            <span className="text-red-500 text-[13px] font-semibold">
              {content.title.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT SECTION ================= */}

      <div className="max-w-[1100px] mx-auto px-4 lg:px-6 pt-20 pb-16">
        
        {/* Back Button */}
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
        
        {/* Subtitle if present */}
        {content.subtitle && (
          <h2 className="text-xl md:text-2xl font-semibold text-orange-600 mb-6">
            {content.subtitle}
          </h2>
        )}
        
        {/* Content Card */}
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
