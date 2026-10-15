import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, Play } from "lucide-react";
import api from "@/api/axios";

const VIDEOS_PER_PAGE = 6;

const FALLBACK_VIDEOS = [
  {
    title: "Shree Chitragupt Peeth Video 1",
    description:
      "Watch temple spiritual videos, events and devotional programs directly on our website.",
    url: "https://www.youtube.com/embed/RpcjBwvzRSU",
  },
  {
    title: "Shree Chitragupt Peeth Video 2",
    description:
      "Watch temple spiritual videos, events and devotional programs directly on our website.",
    url: "https://www.youtube.com/embed/RpcjBwvzRSU",
  },
  {
    title: "Shree Chitragupt Peeth Video 3",
    description:
      "Watch temple spiritual videos, events and devotional programs directly on our website.",
    url: "https://www.youtube.com/embed/X3PT3Ve0Wus",
  },
  {
    title: "Shree Chitragupt Peeth Video 4",
    description:
      "Watch temple spiritual videos, events and devotional programs directly on our website.",
    url: "https://www.youtube.com/embed/6kyWPlx8LdI",
  },
  {
    title: "Shree Chitragupt Peeth Video 5",
    description:
      "Watch temple spiritual videos, events and devotional programs directly on our website.",
    url: "https://www.youtube.com/embed/QYWZy_1F-WQ",
  },
  {
    title: "Shree Chitragupt Peeth Video 6",
    description:
      "Watch temple spiritual videos, events and devotional programs directly on our website.",
    url: "https://www.youtube.com/embed/01LAsYqmGEw",
  },
];

export default function YoutubeGallery() {
  const [videos, setVideos] = useState(FALLBACK_VIDEOS);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = "Youtube Videos | Shree Chitragupt Peeth";

    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await api.get("/youtube-videos?active=true");
        const apiVideos = res.data?.videos || [];
        if (apiVideos.length > 0) {
          setVideos(
            apiVideos.map((video) => ({
              id: video.id,
              title: video.title,
              description:
                video.description ||
                "Watch temple spiritual videos, events and devotional programs directly on our website.",
              url: video.youtube_url,
            }))
          );
          setPage(1);
        }
      } catch {
        // Keep the same fallback videos used on the homepage.
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const totalPages = Math.max(1, Math.ceil(videos.length / VIDEOS_PER_PAGE));
  const pageStart = (page - 1) * VIDEOS_PER_PAGE;
  const visibleVideos = videos.slice(pageStart, pageStart + VIDEOS_PER_PAGE);

  return (
    <div className="w-full bg-[#f8f8f8] overflow-hidden">
      <div
        className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/New folder/subheader1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-5">
          <span className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-sm tracking-[3px] uppercase mb-5">
            Shree Chitragupt Peeth
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-[72px] font-black text-center drop-shadow-2xl px-2 leading-tight">
            Youtube Videos
          </h1>
          <div className="absolute -bottom-8 max-w-[calc(100%-1.5rem)] bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.12)] px-4 sm:px-8 py-2.5 sm:py-4 flex items-center gap-2 sm:gap-4 text-xs sm:text-base flex-wrap justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 font-bold hover:text-red-500 transition-all"
            >
              <Home size={18} />
              HOME
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-bold text-red-500">YOUTUBE VIDEOS</span>
          </div>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-red-500 text-xl">ॐ</span>
            <p className="uppercase text-red-500 font-bold tracking-[3px]">
              Video Gallery
            </p>
            <span className="text-red-500 text-xl">ॐ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-red-500">
            Youtube
          </h2>
          <p className="mt-5 text-gray-600 text-base sm:text-lg max-w-[850px] mx-auto leading-8">
            भगवान श्री चित्रगुप्त पीठ के आध्यात्मिक प्रवचन, धार्मिक कार्यक्रम
            एवं YouTube वीडियो संग्रह।
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500 text-lg font-medium">
            Loading YouTube videos...
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-lg font-medium">
            No YouTube videos available yet.
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleVideos.map((video, index) => (
                <div
                  key={video.id || `${page}-${index}`}
                  className="bg-white rounded-[24px] overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className="relative overflow-hidden">
                    <iframe
                      src={video.url}
                      title={video.title}
                      className="w-full aspect-video h-auto"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 rounded-full bg-red-500/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
                        <Play size={36} fill="white" className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg sm:text-2xl font-black text-red-500">
                      {video.title}
                    </h3>
                    <p className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-lg line-clamp-4">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5">
              <p className="text-sm sm:text-base font-semibold text-gray-700">
                Showing {pageStart + 1}–
                {Math.min(pageStart + VIDEOS_PER_PAGE, videos.length)} of{" "}
                {videos.length} videos
              </p>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1}
                    aria-label="Previous video page"
                    className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-red-500"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        type="button"
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        aria-label={`Video page ${pageNumber}`}
                        aria-current={page === pageNumber ? "page" : undefined}
                        className={`w-10 h-10 rounded-full border font-bold transition ${
                          page === pageNumber
                            ? "bg-red-500 border-red-500 text-white"
                            : "bg-white border-red-200 text-red-500 hover:bg-red-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    disabled={page === totalPages}
                    aria-label="Next video page"
                    className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-red-500"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
