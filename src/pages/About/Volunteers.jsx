import React from "react";
import { Home, Plus, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const volunteers = [
  {
    image: "/volunteers/volunteer1.jpg",
    name: "श्री श्री 1008 श्रीचित्रगुप्त पीठाधीश्वर",
    role: "महामंडलेश्वर दंडी स्वामी चैतन्य पुरुषोत्तम",
    location: "उज्जैन पीठ",
    mobile: "+91-7065013871",
  },
  {
    image: "/volunteers/volunteer2.jpg",
    name: "चित्रांशी शिल्पा स्वरूप",
    role: "संस्थापक - श्री चित्रगुप्त पीठ",
    location: "भारत",
    mobile: "+91-7065013874",
  },
  {
    image: "/volunteers/volunteer3.jpg",
    name: "श्री महंत सुरेशनंद जी महाराज",
    role: "मंत्र लेखन एवं शोध संस्थान",
    location: "श्री चित्रगुप्त पीठ",
    mobile: "+91-XXXXXXXXXX",
  },
  {
    image:
      "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
    name: "श्रीमति वंदना",
    role: "सह व्यवस्थापक",
    location: "श्री चित्रगुप्त पीठ",
    mobile: "+91-9876543210",
  },
  {
    image:
      "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    name: "श्री किरण कुमार",
    role: "टीम प्रमुख",
    location: "श्री चित्रगुप्त पीठ",
    mobile: "+91-9876543211",
  },
  {
    image:
      "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
    name: "प्रथम वत्सल",
    role: "टीम सदस्य",
    location: "श्री चित्रगुप्त पीठ",
    mobile: "+91-9876543212",
  },
];

const Volunteers = () => {
  return (
    <div className="w-full bg-[#f8f8f8] overflow-hidden">

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

        <div className="absolute inset-0 bg-black/55" />

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

          {/* TAG */}

          <span
            className="
              px-4 py-2
              rounded-full
              bg-white/10
              border border-white/20
              backdrop-blur-md
              text-white
              text-[11px]
              tracking-widest
              uppercase
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
            "
          >
            Our Volunteers
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
              OUR VOLUNTEERS
            </span>

          </div>
        </div>
      </div>

      {/* ================= MAIN SECTION ================= */}

      <div className="max-w-[1300px] mx-auto px-4 lg:px-6 pt-20 pb-16">

        <div className="grid xl:grid-cols-4 gap-8 items-start">

          {/* ================= LEFT SIDE ================= */}

          <div className="xl:col-span-3">

            {/* TITLE */}

            <div className="mb-10">

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4 py-2
                  rounded-full
                  bg-red-50
                  text-red-500
                  border border-red-100
                  text-[12px]
                  font-semibold
                  tracking-wide
                "
              >
                ✨ VOLUNTEER TEAM
              </span>

              <h2
                className="
                  mt-4
                  text-[28px]
                  md:text-[40px]
                  font-bold
                  text-[#ff3300]
                "
              >
                Dedicated Volunteers
              </h2>

            </div>

            {/* CARD GRID */}

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

              {volunteers.map((item, index) => (

                <div
                  key={index}
                  className="
                    group
                    relative
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-lg
                    transition-all
                    duration-300
                    overflow-hidden
                  "
                >

                  {/* TOP LINE */}

                  <div
                    className="
                      h-1
                      w-full
                      bg-gradient-to-r
                      from-[#ff3300]
                      to-[#ff7a00]
                    "
                  />

                  {/* PLUS ICON */}

                  <div
                    className="
                      absolute
                      top-4
                      right-4
                      w-9 h-9
                      rounded-full
                      bg-[#ff3300]
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-md
                      z-20
                    "
                  >
                    <Plus size={16} />
                  </div>

                  {/* IMAGE */}

                  <div className="pt-6 flex justify-center">

                    <div
                      className="
                        w-[120px]
                        h-[120px]
                        rounded-full
                        overflow-hidden
                        border-[5px]
                        border-[#fff2ec]
                        shadow-md
                      "
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-105
                          transition-all
                          duration-500
                        "
                      />

                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-5 text-center">

                    {/* NAME */}

                    <h2
                      className="
                        text-[17px]
                        font-semibold
                        text-[#ff3300]
                        leading-7
                      "
                    >
                      {item.name}
                    </h2>

                    {/* ROLE */}

                    <p
                      className="
                        mt-3
                        text-gray-700
                        text-[13px]
                        leading-6
                        font-medium
                      "
                    >
                      {item.role}
                    </p>

                    {/* LOCATION */}

                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-gray-500
                        text-[13px]
                      "
                    >
                      <MapPin size={14} />
                      {item.location}
                    </div>

                    {/* MOBILE */}

                    <div
                      className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        px-4 py-2
                        rounded-full
                        bg-red-50
                        text-[#ff3300]
                        text-[12px]
                        font-semibold
                        border border-red-100
                      "
                    >
                      <Phone size={13} />
                      {item.mobile}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SIDEBAR ================= */}

          <div>

            <div
              className="
                bg-white
                rounded-3xl
                p-5
                border
                border-gray-100
                shadow-sm
                sticky
                top-6
              "
            >

              {/* TITLE */}

              <div className="mb-8">

                <div
                  className="
                    w-10
                    h-[3px]
                    rounded-full
                    bg-gradient-to-r
                    from-[#ff3300]
                    to-[#ff7a00]
                    mb-4
                  "
                />

                <h2
                  className="
                    text-[22px]
                    font-bold
                    text-[#ff3300]
                    leading-tight
                  "
                >
                  State Wise
                  <br />
                  Volunteers
                </h2>

              </div>

              {/* LIST */}

              <div className="space-y-3">

                {[
                  "मध्यप्रदेश",
                  "उत्तर प्रदेश",
                  "दिल्ली",
                  "बिहार",
                  "राजस्थान",
                  "गुजरात",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="
                      px-4 py-3
                      rounded-xl
                      bg-gray-50
                      border
                      border-gray-100
                      text-[13px]
                      font-medium
                      text-gray-700
                      hover:bg-[#ff3300]
                      hover:text-white
                      transition-all
                      cursor-pointer
                    "
                  >
                    श्री चित्रगुप्त पीठ सेवाधारी {item}
                  </div>
                ))}
              </div>

              {/* JOIN BOX */}

              <div
                className="
                  mt-8
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#ff3300]
                  to-[#ff7a00]
                  p-5
                  text-white
                "
              >

                <h3
                  className="
                    text-[24px]
                    font-bold
                    leading-tight
                  "
                >
                  Join Our
                  <br />
                  Volunteer Team
                </h3>

                <p
                  className="
                    mt-3
                    text-white/90
                    text-[13px]
                    leading-6
                  "
                >
                  समाज सेवा एवं धर्म प्रचार हेतु हमारे साथ जुड़ें।
                </p>

                {/* BUTTON */}

                <button
                  className="
                    mt-5
                    w-full
                    bg-white
                    text-[#ff3300]
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                    hover:scale-[1.02]
                    transition-all
                  "
                >
                  Become Volunteer
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;