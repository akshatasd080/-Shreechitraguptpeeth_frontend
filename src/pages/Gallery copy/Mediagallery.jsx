import React, { useState } from "react";
import { Home, X, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const mediaImages = [
  "/gallery/gm1.jpeg",
  "/gallery/gm2.jpeg",
  "/gallery/gm3.jpeg",
  "/gallery/gm4.jpeg",
  "/gallery/gm5.jpeg",
  "/gallery/gm6.jpeg",
];

const Mediagallery = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="w-full bg-[#f8f8f8] overflow-hidden">

      {/* =========================================
                  HERO SECTION
      ========================================= */}
      <div
        className="
          relative
          w-full
          h-[300px]
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
              text-[42px]
              md:text-[72px]
              font-black
              text-center
              drop-shadow-2xl
            "
          >
            Media Gallery
          </h1>

          {/* BREADCRUMB */}
          <div
            className="
              absolute
              -bottom-8
              bg-white
              rounded-full
              shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              px-8
              py-4
              flex
              items-center
              gap-4
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
              MEDIA GALLERY
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
                  MAIN SECTION
      ========================================= */}
      <div className="max-w-[1650px] mx-auto px-5 lg:px-10 pt-28 pb-24">

        {/* SECTION TITLE */}
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
            <Newspaper size={18} />
            NEWS & MEDIA
          </span>

          <h2
            className="
              mt-6
              text-[38px]
              md:text-[62px]
              font-black
              text-[#ff3300]
            "
          >
            Media Coverage
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
            भगवान श्री चित्रगुप्त पीठ के समाचार पत्र,
            मीडिया कवरेज एवं धार्मिक कार्यक्रमों की झलकियाँ।
          </p>
        </div>

        {/* =========================================
                    MEDIA GRID
        ========================================= */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

          {mediaImages.map((image, index) => (

            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className="
                group
                relative
                bg-white
                rounded-[28px]
                overflow-hidden
                border
                border-gray-100
                shadow-[0_15px_50px_rgba(0,0,0,0.08)]
                hover:-translate-y-3
                hover:shadow-[0_30px_70px_rgba(255,80,0,0.18)]
                transition-all
                duration-500
                cursor-pointer
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

              {/* IMAGE */}
              <div className="p-3">

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[22px]
                  "
                >

                  <img
                    src={image}
                    alt="Media"
                    className="
                      w-full
                      h-[420px]
                      object-cover
                      group-hover:scale-110
                      transition-all
                      duration-700
                    "
                  />

                  {/* OVERLAY */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      group-hover:bg-black/25
                      transition-all
                      duration-500
                    "
                  />

                  {/* VIEW BUTTON */}
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      duration-500
                    "
                  >

                    <div
                      className="
                        px-7
                        py-3
                        rounded-full
                        bg-white
                        text-[#ff3300]
                        font-bold
                        shadow-2xl
                      "
                    >
                      View Media
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="px-6 pb-7">

                <h3
                  className="
                    text-[24px]
                    font-black
                    text-[#ff3300]
                    leading-[1.5]
                  "
                >
                  Media Coverage #{index + 1}
                </h3>

                <p
                  className="
                    mt-3
                    text-gray-600
                    leading-[1.9]
                    text-[15px]
                  "
                >
                  श्री चित्रगुप्त पीठ के धार्मिक एवं सामाजिक
                  कार्यक्रमों की मीडिया कवरेज।
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================
                  IMAGE MODAL
      ========================================= */}
      {selectedImage && (

        <div
          className="
            fixed
            inset-0
            z-[999]
            bg-black/90
            flex
            items-center
            justify-center
            p-5
          "
        >

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedImage(null)}
            className="
              absolute
              top-6
              right-6
              w-14
              h-14
              rounded-full
              bg-white
              text-[#ff3300]
              flex
              items-center
              justify-center
              shadow-2xl
              hover:rotate-90
              transition-all
              duration-300
            "
          >
            <X size={28} />
          </button>

          {/* IMAGE */}
          <img
            src={selectedImage}
            alt="Preview"
            className="
              max-w-full
              max-h-[90vh]
              rounded-[30px]
              shadow-[0_30px_100px_rgba(0,0,0,0.5)]
            "
          />
        </div>
      )}
    </div>
  );
};

export default Mediagallery;