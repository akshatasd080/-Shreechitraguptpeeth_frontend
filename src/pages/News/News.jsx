import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

// Sample news data
const newsData = [
  {
    id: 1,
    title: "Annual Mahotsav Celebrations",
    description: "Join us for the grand annual celebrations with special pujas, cultural programs, and community feasts.",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=800&h=400",
    readMore: "#",
  },
  {
    id: 2,
    title: "New Meditation Center Inauguration",
    description: "Our new state-of-the-art meditation center is now open! Visit us to experience peace and tranquility.",
    date: "2024-01-20",
    image: "https://images.unsplash.com/photo-1493676870881-b94e5488567c?auto=format&fit=crop&q=80&w=800&h=400",
    readMore: "#",
  },
  {
    id: 3,
    title: "Charity Drive for Poor Children",
    description: "We organized a successful charity drive, providing food, education materials, and care to underprivileged children.",
    date: "2024-01-25",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800&h=400",
    readMore: "#",
  },
  {
    id: 4,
    title: "Yoga Workshop for All Ages",
    description: "Free yoga workshop conducted by experts! Sessions suitable for beginners and advanced practitioners alike.",
    date: "2024-02-01",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=400",
    readMore: "#",
  },
];

function News() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Latest News & Events
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Stay updated with our spiritual activities, events, and community initiatives
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {newsData.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {news.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                  {news.title}
                </h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  {news.description}
                </p>
                <Link
                  to={news.readMore}
                  className="inline-flex items-center gap-2 text-orange-600 font-bold text-lg hover:text-red-600 transition-all"
                >
                  Read More
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
