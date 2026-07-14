import React, { useState } from "react";
import { Home, Calendar, MapPin, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Pooja Mahotsav",
      description: "Join us for our grand annual pooja celebration with special rituals and prasadam distribution.",
      date: "2026-08-15",
      time: "09:00 AM - 05:00 PM",
      location: "Shree Chitragupt Peeth, Vrindavan",
      image: "/gallery/g1.jpg"
    },
    {
      id: 2,
      title: "Spiritual Discourse",
      description: "A special satsang by Swamiji on the teachings of Lord Chitragupt.",
      date: "2026-08-22",
      time: "06:00 PM - 08:00 PM",
      location: "Shree Chitragupt Peeth, Vrindavan",
      image: "/gallery/g2.jpg"
    },
    {
      id: 3,
      title: "Youth Meditation Camp",
      description: "A 3-day meditation camp for youth to learn the art of mindfulness and spiritual practices.",
      date: "2026-09-05",
      time: "All Day",
      location: "Shree Chitragupt Peeth, Vrindavan",
      image: "/gallery/g3.jpg"
    },
    {
      id: 4,
      title: "Havan and Yajna",
      description: "Participate in the sacred havan ceremony for peace and prosperity.",
      date: "2026-09-15",
      time: "08:00 AM - 12:00 PM",
      location: "Shree Chitragupt Peeth, Vrindavan",
      image: "/gallery/g4.jpg"
    }
  ];

  const pastEvents = [
    {
      id: 5,
      title: "Chaitra Navratri Celebrations",
      description: "Grand celebration of Chaitra Navratri with daily aarti and prasadam.",
      date: "2026-04-01",
      time: "06:00 AM - 10:00 PM",
      location: "Shree Chitragupt Peeth, Vrindavan",
      image: "/gallery/gallery1.jpeg"
    },
    {
      id: 6,
      title: "Annual Bhandara",
      description: "Annual community feast serving thousands of devotees.",
      date: "2026-05-15",
      time: "12:00 PM - 08:00 PM",
      location: "Shree Chitragupt Peeth, Vrindavan",
      image: "/gallery/gallery2.jpeg"
    },
    {
      id: 7,
      title: "Guru Purnima Celebrations",
      description: "Special celebrations honoring our spiritual guide, Swamiji.",
      date: "2026-07-02",
      time: "09:00 AM - 07:00 PM",
      location: "Shree Chitragupt Peeth, Vrindavan",
      image: "/gallery/gm1.jpeg"
    },
    {
      id: 8,
      title: "Satsang Program",
      description: "Weekly spiritual satsang with discourses and devotional songs.",
      date: "2026-06-23",
      time: "07:00 PM - 09:00 PM",
      location: "Shree Chitragupt Peeth, Vrindavan",
      image: "/gallery/gm2.jpeg"
    }
  ];

  const formatDate = (dateStr) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date(dateStr);
    return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
  };

  const eventsToShow = activeTab === "upcoming" ? upcomingEvents : pastEvents;

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
          backgroundImage: "url('/gallery/g5.jpg')",
        }}
      >

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 to-orange-900/80" />

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
            text-center
          "
        >
          <h1
            className="
              text-4xl
              md:text-5xl
              font-black
              text-white
              drop-shadow-lg
            "
          >
            Events & Programs
          </h1>

          {/* BREADCRUMB */}
          <div
            className="
              absolute
              -bottom-5
              bg-white
              rounded-full
              shadow-lg
              px-6
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
                text-[14px]
                font-medium
                hover:text-red-500
                transition-all
              "
            >
              <Home size={16} />
              Home
            </Link>

            <span className="text-gray-400 text-sm">
              /
            </span>

            <span className="text-red-500 text-[14px] font-semibold">
              Events
            </span>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pt-24 pb-20">

        {/* TABS */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`
              px-8 py-3.5 rounded-full font-bold text-lg transition-all duration-300
              ${activeTab === "upcoming"
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-xl hover:shadow-2xl"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300 hover:text-red-500"
              }
            `}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`
              px-8 py-3.5 rounded-full font-bold text-lg transition-all duration-300
              ${activeTab === "past"
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-xl hover:shadow-2xl"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300 hover:text-red-500"
              }
            `}
          >
            Past Events
          </button>
        </div>

        {/* EVENTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eventsToShow.map((event, index) => (
            <div
              key={event.id}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-xl
                hover:shadow-2xl
                hover:-translate-y-3
                transition-all
                duration-500
                border
                border-orange-100
                group
              "
            >
              {/* EVENT IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="
                    bg-white
                    text-red-600
                    px-4
                    py-1.5
                    rounded-full
                    text-sm
                    font-bold
                    shadow-lg
                  ">
                    {formatDate(event.date)}
                  </span>
                </div>
              </div>

              {/* EVENT CONTENT */}
              <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
                <h3 className="
                  text-2xl
                  font-black
                  text-gray-800
                  mb-3
                  leading-tight
                ">
                  {event.title}
                </h3>
                <p className="
                  text-gray-600
                  text-base
                  mb-5
                  leading-relaxed
                  flex-grow
                ">
                  {event.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={18} className="text-red-500" />
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={18} className="text-orange-500" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                </div>

                <button className="
                  w-full
                  bg-gradient-to-r
                  from-red-600
                  to-orange-500
                  hover:from-red-700
                  hover:to-orange-600
                  text-white
                  py-4
                  rounded-2xl
                  font-bold
                  text-lg
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  duration-300
                  shadow-lg
                  hover:shadow-xl
                  active:scale-97
                  mt-auto
                ">
                  View Details
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NO EVENTS MESSAGE IF EMPTY */}
        {eventsToShow.length === 0 && (
          <div className="text-center py-24">
            <Calendar size={80} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 mb-3">No events found</h3>
            <p className="text-gray-500">Check back later for upcoming events!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Events;
