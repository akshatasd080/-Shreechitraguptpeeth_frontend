import React, { useEffect, useState } from "react";
import { Home, Play } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/api/axios";

const FALLBACK_VIDEOS = [
  {
    title: "श्री चित्रगुप्त पीठ वीडियो",
    url: "https://www.youtube.com/embed/bpy6LDwDhCc",
  },
  {
    title: "श्री चित्रगुप्त पीठ वीडियो",
    url: "https://www.youtube.com/embed/bpy6LDwDhCc",
  },
  {
    title: "श्री चित्रगुप्त पीठ वीडियो",
    url: "https://www.youtube.com/embed/bpy6LDwDhCc",
  },
  {
    title: "श्री चित्रगुप्त पीठ वीडियो",
    url: "https://www.youtube.com/embed/bpy6LDwDhCc",
  },
  {
    title: "श्री चित्रगुप्त पीठ वीडियो",
    url: "https://www.youtube.com/embed/bpy6LDwDhCc",
  },
];

const VideoGallery = () => {
  const [videos, setVideos] = useState(FALLBACK_VIDEOS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await api.get("/gallery-videos?active=true");
        const apiVideos = res.data?.videos || [];
        if (apiVideos.length > 0) {
          setVideos(
            apiVideos.map((video) => ({
              id: video.id,
              title: video.title || "श्री चित्रगुप्त पीठ वीडियो",
              url: video.youtube_url,
              description: video.description || "",
            }))
          );
        }
      } catch (_) {
        // keep fallback videos
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-full bg-[#f8f8f8] overflow-hidden">

      {/* =========================================
                  HERO SECTION
      ========================================= */}
      <div
        className="
          relative
          w-full
          h-[220px]
          sm:h-[300px]
          md:h-[400px]
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
            text-white
            px-5
          "
        >

          {/* TAG */}
          <span
            className="
              px-6 py-2
              rounded-full
              bg-white/10
              backdrop-blur-lg
              border border-white/20
              text-sm
              tracking-[3px]
              uppercase
              mb-5
            "
          >
            Shree Chitragupt Peeth
          </span>

          {/* TITLE */}
          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-[72px]
              font-black
              text-center
              drop-shadow-2xl
              px-2
              leading-tight
            "
          >
            Video Gallery
          </h1>

          {/* BREADCRUMB */}
          <div
            className="
              absolute
              -bottom-8
              max-w-[calc(100%-1.5rem)]
              bg-white
              rounded-full
              shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              px-4
              sm:px-8
              py-2.5
              sm:py-4
              flex
              items-center
              gap-2
              sm:gap-4
              text-xs
              sm:text-base
              flex-wrap
              justify-center
            "
          >

            <Link
              to="/"
              className="
                flex items-center gap-2
                text-gray-600
                font-bold
                hover:text-red-500
                transition-all
              "
            >
              <Home size={18} />
              HOME
            </Link>

            <span className="text-gray-400">
              /
            </span>

            <span className="font-bold text-red-500">
              VIDEO GALLERY
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
                  VIDEO SECTION
      ========================================= */}
      <div className="max-w-[1650px] mx-auto px-5 lg:px-10 pt-28 pb-24">

        {/* TITLE */}
        <div className="text-center mb-16">

          <span
            className="
              inline-flex
              items-center
              gap-2
              px-6 py-3
              rounded-full
              bg-red-50
              text-red-500
              font-bold
              border border-red-100
              tracking-[3px]
              text-sm
            "
          >
            ▶ SPIRITUAL VIDEOS
          </span>

          <h2
            className="
              mt-6
              text-3xl
              sm:text-4xl
              md:text-[62px]
              font-black
              text-[#ff3300]
              leading-tight
              px-2
            "
          >
            Divine Video Collection
          </h2>

          <p
            className="
              mt-5
              text-gray-600
              text-[18px]
              max-w-[850px]
              mx-auto
              leading-[2]
            "
          >
            भगवान श्री चित्रगुप्त पीठ के आध्यात्मिक प्रवचन,
            धार्मिक कार्यक्रम एवं दिव्य वीडियो संग्रह।
          </p>
        </div>

        {/* =========================================
                    VIDEO GRID
        ========================================= */}
        {loading ? (
          <div className="text-center py-16 text-gray-500 text-lg font-medium">
            Loading gallery videos...
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-lg font-medium">
            No gallery videos available yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {videos.map((video, index) => (

            <div
              key={video.id || index}
              className="
                group
                bg-white
                rounded-[30px]
                overflow-hidden
                shadow-[0_15px_50px_rgba(0,0,0,0.08)]
                border border-gray-100
                hover:-translate-y-3
                hover:shadow-[0_30px_70px_rgba(255,80,0,0.18)]
                transition-all
                duration-500
              "
            >

              {/* TOP BORDER */}
              <div
                className="
                  h-[5px]
                  w-full
                  bg-gradient-to-r
                  from-[#ff3300]
                  to-[#ff7a00]
                "
              />

              {/* VIDEO */}
              <div className="relative overflow-hidden">

                <iframe
                  className="
                    w-full
                    aspect-video
                    h-auto
                  "
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                />

                {/* PLAY BUTTON */}
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    pointer-events-none
                  "
                >

                  <div
                    className="
                      w-20
                      h-20
                      rounded-full
                      bg-[#ff3300]
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-[0_20px_60px_rgba(255,80,0,0.4)]
                      group-hover:scale-110
                      transition-all
                      duration-500
                    "
                  >
                    <Play
                      size={34}
                      fill="white"
                    />
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-7">

                <h3
                  className="
                    text-[24px]
                    font-black
                    text-[#ff3300]
                    leading-[1.5]
                  "
                >
                  {video.title}
                </h3>

                <p
                  className="
                    mt-4
                    text-gray-600
                    leading-[1.9]
                    text-[15px]
                  "
                >
                  {video.description ||
                    "श्री चित्रगुप्त पीठ के धार्मिक एवं आध्यात्मिक कार्यक्रम।"}
                </p>

                {/* BUTTON */}
                <a
                  href={video.url.replace(
                    "/embed/",
                    "/watch?v="
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-3
                    px-6
                    py-3
                    rounded-full
                    bg-red-50
                    text-[#ff3300]
                    font-bold
                    border border-red-100
                    hover:bg-[#ff3300]
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <Play size={16} fill="currentColor" />
                  Watch Video
                </a>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGallery;