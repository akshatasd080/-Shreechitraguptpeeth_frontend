import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ChevronUp,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  const informationLinks = [
    "Home",
    "About Swami Ji",
    "About Temple",
    "Our Mission",
    "Our Volunteers",
    "Downloads",
    "Online Membership",
  ];

  const quickLinks = [
    "Donate Now",
    "Photo Gallery",
    "Video Gallery",
    "Media Gallery",
    "Contact Us",
    "Location Map",
  ];

  const posts = [
    {
      image: "/posts/post1.jpg",
      date: "Oct 20, 2022",
      title:
        "एक करोड़ मंत्र पर चितविधान होंगे भगवान श्री चित्रगुप्त जी",
    },

    {
      image: "/posts/post2.jpg",
      date: "May 20, 2022",
      title:
        "भगवान श्री चित्रगुप्त जी के दर्शन",
    },

    {
      image: "/posts/post3.jpg",
      date: "Oct 15, 2022",
      title:
        "भगवान श्री चित्रगुप्त जी पीठ स्थापना पर भव्य लेख",
    },
  ];

  return (
    <footer
      className="
        relative
        bg-[#f7ebeb]
        overflow-hidden
        pt-24
      "
    >
      
      {/* TOP SECTION */}
      <div className="max-w-[1450px] mx-auto px-6 lg:px-10">
        
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16">
          
          {/* ABOUT */}
          <div>
            <h3
              className="
                text-3xl
                font-black
                text-red-500
                mb-8
              "
            >
              About Us
            </h3>

            <p
              className="
                text-gray-700
                leading-[2]
                text-lg
              "
            >
              सम्पूर्ण भारत से भगवान श्री चित्रगुप्त जी के बहुत से
              मंदिर हैं। यहाँ आपको धार्मिक जानकारी एवं वेद पुराणों
              पर आधारित ज्ञान प्राप्त होगा।
            </p>

            {/* CONTACT INFO */}
            <div className="space-y-5 mt-10">
              
              {/* PHONE */}
              <div className="flex items-start gap-4">
                <Phone
                  size={22}
                  className="text-red-500 mt-1"
                />

                <p className="text-gray-700 font-semibold">
                  +91-7065013874
                </p>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <Mail
                  size={22}
                  className="text-red-500 mt-1"
                />

                <p className="text-gray-700 font-semibold break-all">
                  shreechitraguptpeeth@gmail.com
                </p>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-4">
                <MapPin
                  size={22}
                  className="text-red-500 mt-1"
                />

                <p className="text-gray-700 leading-relaxed font-semibold">
                  Shree Chitragupt Peeth
                  (Brij Shanti Kunj)
                  GGWF+2R6, Junihadi,
                  Uttar Pradesh 281504
                </p>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex items-center gap-4 mt-10">
              
              <button
                className="
                  w-12 h-12
                  rounded-full
                  bg-white
                  hover:bg-red-500
                  hover:text-white
                  text-red-500
                  shadow-md
                  flex items-center justify-center
                  transition-all
                "
              >
                <FaFacebookF size={18} />
              </button>

              <button
                className="
                  w-12 h-12
                  rounded-full
                  bg-white
                  hover:bg-red-500
                  hover:text-white
                  text-red-500
                  shadow-md
                  flex items-center justify-center
                  transition-all
                "
              >
                <FaInstagram size={18} />
              </button>

              <button
                className="
                  w-12 h-12
                  rounded-full
                  bg-white
                  hover:bg-red-500
                  hover:text-white
                  text-red-500
                  shadow-md
                  flex items-center justify-center
                  transition-all
                "
              >
                <FaYoutube size={18} />
              </button>

              <button
                className="
                  w-12 h-12
                  rounded-full
                  bg-white
                  hover:bg-red-500
                  hover:text-white
                  text-red-500
                  shadow-md
                  flex items-center justify-center
                  transition-all
                "
              >
                <FaTwitter size={18} />
              </button>
            </div>
          </div>

          {/* INFORMATION */}
          <div>
            <h3
              className="
                text-3xl
                font-black
                text-red-500
                mb-8
              "
            >
              Information
            </h3>

            <div className="space-y-5">
              {informationLinks.map((item, index) => (
                <Link
                  key={index}
                  to="/"
                  className="
                    flex items-center gap-3
                    text-gray-700
                    hover:text-red-500
                    font-semibold
                    transition-all
                  "
                >
                  <span className="text-red-500">
                    ॐ
                  </span>

                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3
              className="
                text-3xl
                font-black
                text-red-500
                mb-8
              "
            >
              Quick Links
            </h3>

            <div className="space-y-5">
              {quickLinks.map((item, index) => (
                <Link
                  key={index}
                  to="/"
                  className="
                    flex items-center gap-3
                    text-gray-700
                    hover:text-red-500
                    font-semibold
                    transition-all
                  "
                >
                  <span className="text-red-500">
                    ॐ
                  </span>

                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* RECENT POSTS */}
          <div>
            <h3
              className="
                text-3xl
                font-black
                text-red-500
                mb-8
              "
            >
              Recent Posts
            </h3>

            <div className="space-y-8">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="
                    flex gap-5
                    group
                  "
                >
                  
                  {/* IMAGE */}
                  <div
                    className="
                      min-w-[95px]
                      h-[85px]
                      rounded-2xl
                      overflow-hidden
                    "
                  >
                    <img
                      src={post.image}
                      alt=""
                      className="
                        w-full h-full
                        object-cover
                        group-hover:scale-110
                        transition-all duration-500
                      "
                    />
                  </div>

                  {/* CONTENT */}
                  <div>
                    
                    {/* DATE */}
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarDays
                        size={16}
                        className="text-red-500"
                      />

                      <p
                        className="
                          text-sm
                          text-gray-500
                          font-semibold
                        "
                      >
                        {post.date}
                      </p>
                    </div>

                    {/* TITLE */}
                    <h4
                      className="
                        text-[15px]
                        leading-relaxed
                        font-semibold
                        text-red-500
                        hover:text-black
                        transition-all
                        cursor-pointer
                      "
                    >
                      {post.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-20
            border-t border-red-100
            py-8
            flex flex-col md:flex-row
            items-center justify-between
            gap-5
          "
        >
          <p
            className="
              text-gray-600
              font-semibold
              text-center md:text-left
            "
          >
            © 2026 Shree Chitragupt Peeth.
            All Rights Reserved.
          </p>

          {/* SCROLL TOP */}
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="
              w-14 h-14
              rounded-full
              bg-white
              hover:bg-red-500
              hover:text-white
              text-red-500
              shadow-xl
              flex items-center justify-center
              transition-all
            "
          >
            <ChevronUp size={26} />
          </button>
        </div>
      </div>
    </footer>
  );
}