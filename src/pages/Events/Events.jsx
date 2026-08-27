import React, { useEffect, useState } from "react";
import { Home, Calendar, MapPin, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/api/axios";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/events/`;

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          api.get("/events?active=true&type=upcoming"),
          api.get("/events?active=true&type=past"),
        ]);

        const mapEvent = (e) => ({
          id: e.id,
          title: e.title,
          description: e.description || "",
          date: e.event_date,
          time: e.event_time || "",
          location: e.location || "",
          image: e.image_filename
            ? `${IMAGE_BASE_URL}${e.image_filename}`
            : "/gallery/g1.jpg",
        });

        setUpcomingEvents((upcomingRes.data?.events || []).map(mapEvent));
        setPastEvents((pastRes.data?.events || []).map(mapEvent));
      } catch (_) {
        setUpcomingEvents([]);
        setPastEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateStr) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
  };

  const eventsToShow = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="w-full bg-[#fffaf7] overflow-hidden">
      <div
        className="relative w-full h-[200px] md:h-[260px] lg:h-[320px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/gallery/g5.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 to-orange-900/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg px-2">
            Events & Programs
          </h1>
          <div className="absolute -bottom-5 max-w-[calc(100%-1.5rem)] bg-white rounded-full shadow-lg px-4 sm:px-6 py-2.5 flex items-center gap-2 sm:gap-3 border text-xs sm:text-sm flex-wrap justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 text-[14px] font-medium hover:text-red-500 transition-all"
            >
              <Home size={16} />
              Home
            </Link>
            <span className="text-gray-400 text-sm">/</span>
            <span className="text-red-500 text-[14px] font-semibold">
              Events
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pt-24 pb-20">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 px-1">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-5 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 ${
              activeTab === "upcoming"
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-xl hover:shadow-2xl"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300 hover:text-red-500"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-5 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 ${
              activeTab === "past"
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-xl hover:shadow-2xl"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300 hover:text-red-500"
            }`}
          >
            Past Events
          </button>
        </div>

        {loading ? (
          <div className="text-center py-24 text-gray-500 font-medium">
            Loading events...
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {eventsToShow.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-orange-100 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white text-red-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        {formatDate(event.date)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
                    <h3 className="text-2xl font-black text-gray-800 mb-3 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-base mb-5 leading-relaxed flex-grow">
                      {event.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {event.time && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock size={18} className="text-red-500" />
                          <span className="font-medium">{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin size={18} className="text-orange-500" />
                          <span className="font-medium">{event.location}</span>
                        </div>
                      )}
                    </div>

                    <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-97 mt-auto">
                      View Details
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {eventsToShow.length === 0 && (
              <div className="text-center py-24">
                <Calendar size={80} className="mx-auto text-gray-300 mb-6" />
                <h3 className="text-2xl font-bold text-gray-600 mb-3">
                  No events found
                </h3>
                <p className="text-gray-500">
                  {activeTab === "upcoming"
                    ? "Check back later for upcoming events!"
                    : "No past events to show yet."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
