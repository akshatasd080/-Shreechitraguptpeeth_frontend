import React from "react";
import { Home, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    img: "/New folder/sec7.jpg",
    title: "आधुनिक भवन",
  },
  {
    img: "/New folder/sec8.jpg",
    title: "सेवा केंद्र",
  },
  {
    img: "/New folder/sec9.jpg",
    title: "आवासीय सुविधा",
  },
  {
    img: "/New folder/sec10.jpeg",
    title: "शिक्षण परिसर",
  },
  {
    img: "/New folder/sec11.jpeg",
    title: "धर्मशाला",
  },
  {
    img: "/New folder/sec12.jpeg",
    title: "आध्यात्मिक केंद्र",
  },
];

const AboutPeeth = () => {
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
            About Us
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
              ABOUT PEETH
            </span>

          </div>
        </div>
      </div>

      {/* ================= MAIN SECTION ================= */}

      <div className="max-w-[1300px] mx-auto px-4 lg:px-6 pt-20 pb-16">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}

          <div>

            {/* TAG */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-red-50
                px-4 py-2
                rounded-full
                border border-red-100
                mb-6
              "
            >

              <span className="text-red-500 text-sm">
                ॐ
              </span>

              <span
                className="
                  uppercase
                  tracking-wide
                  text-red-500
                  font-semibold
                  text-[12px]
                "
              >
                About Temple
              </span>

            </div>

            {/* TITLE */}
            <h2
              className="
                text-[26px]
                md:text-[38px]
                font-bold
                text-[#ff3300]
                leading-tight
                mb-6
              "
            >
              भगवान श्री चित्रगुप्त
              <br />
              पीठ दीदारगंज
            </h2>

            {/* CONTENT CARD */}

            <div
              className="
                bg-white
                rounded-2xl
                p-5
                border
                border-gray-100
                shadow-sm
              "
            >

              <p
                className="
                  text-gray-700
                  leading-8
                  text-[14px]
                  text-justify
                "
              >
                भगवान श्री चित्रगुप्त पीठ दीदारगंज धार्मिक,
                सांस्कृतिक एवं आध्यात्मिक चेतना का प्रमुख केंद्र
                है। यहाँ भगवान श्री चित्रगुप्त की भव्य प्रतिमा
                स्थापित है जो श्रद्धालुओं के लिए आस्था एवं
                प्रेरणा का केंद्र बनी हुई है।
              </p>

              {/* LOCATION */}

              <div className="mt-8 flex gap-4 items-start">

                {/* ICON */}

                <div
                  className="
                    w-12 h-12
                    rounded-full
                    bg-gradient-to-r
                    from-red-500
                    to-orange-400
                    text-white
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <MapPin size={18} />
                </div>

                {/* TEXT */}

                <div>

                  <h3
                    className="
                      text-[18px]
                      font-semibold
                      text-[#ff3300]
                      mb-2
                    "
                  >
                    Temple Location
                  </h3>

                  <p
                    className="
                      text-gray-700
                      text-[14px]
                      leading-7
                    "
                  >
                    प्राचीन श्री चित्रगुप्त मंदिर नगर क्षेत्र,
                    पटना साहिब, बिहार भारत
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Patna - 800008
                  </p>

                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE GRID */}

          <div>

            <div className="grid grid-cols-2 gap-4">

              {[
                "/New folder/sec1.jpg",
                "/New folder/sec2.jpg",
                "/New folder/sec3.jpg",
                "/New folder/sec4.jpg",
              ].map((img, index) => (

                <div
                  key={index}
                  className={`
                    group
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    p-2
                    border
                    border-gray-100
                    shadow-sm
                    ${
                      index % 2 !== 0
                        ? "mt-6"
                        : ""
                    }
                  `}
                >

                  <div className="overflow-hidden rounded-xl">

                    <img
                      src={img}
                      alt=""
                      className="
                        w-full
                        h-[210px]
                        object-cover
                        group-hover:scale-105
                        transition-all
                        duration-500
                      "
                    />

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= FEATURE SECTION ================= */}

        <div className="mt-20">

          {/* TITLE */}

          <div className="text-center mb-12">

            <span
              className="
                inline-flex
                px-4 py-2
                rounded-full
                bg-red-50
                text-red-500
                font-semibold
                tracking-wide
                text-[12px]
                border border-red-100
              "
            >
              PREMIUM FACILITIES
            </span>

            <h2
              className="
                mt-5
                text-[28px]
                md:text-[38px]
                font-bold
                text-[#ff3300]
              "
            >
              पीठ की विशेष सुविधाएं
            </h2>

            <p
              className="
                mt-4
                text-gray-600
                text-[14px]
                max-w-[650px]
                mx-auto
                leading-7
              "
            >
              आधुनिक सुविधाओं एवं दिव्य वातावरण से युक्त
              विशेष परिसर।
            </p>
          </div>

          {/* CARDS */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {features.map((item, index) => (

              <div
                key={index}
                className="
                  group
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  border
                  border-gray-100
                  shadow-sm
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
              >

                {/* IMAGE */}

                <div className="overflow-hidden">

                  <img
                    src={item.img}
                    alt={item.title}
                    className="
                      w-full
                      h-[190px]
                      object-cover
                      group-hover:scale-105
                      transition-all
                      duration-500
                    "
                  />

                </div>

                {/* CONTENT */}

                <div className="p-5">

                  <h3
                    className="
                      text-[18px]
                      font-semibold
                      text-[#ff3300]
                      mb-3
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      text-gray-600
                      text-[13px]
                      leading-6
                    "
                  >
                    आधुनिक सुविधाओं एवं दिव्य वातावरण से युक्त
                    विशेष परिसर।
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MANTRA SECTION ================= */}

        <div className="mt-20">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}

            <div>

              {/* TAG */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4 py-2
                  rounded-full
                  bg-red-50
                  border border-red-100
                  text-red-500
                  text-[12px]
                  font-semibold
                  tracking-wide
                  mb-5
                "
              >
                ॐ यमाय धर्मराजाय श्री चित्रगुप्ताय वै नमः
              </div>

              {/* TITLE */}

              <h2
                className="
                  text-[28px]
                  md:text-[40px]
                  font-bold
                  leading-tight
                  text-[#ff3300]
                  mb-6
                "
              >
                एक करोड़ मंत्र पर
                <br />
                विराजित होंगे भगवान
                <br />
                श्री चित्रगुप्त जी
              </h2>

              {/* CONTENT BOX */}

              <div
                className="
                  bg-white
                  rounded-2xl
                  p-5
                  border
                  border-gray-100
                  shadow-sm
                "
              >

                <p
                  className="
                    text-gray-700
                    leading-8
                    text-[14px]
                  "
                >
                  भगवान श्री चित्रगुप्त शोध चिंतन मंत्र लेखन
                  अभियान द्वारा प्रतिदिन चित्रांश बंधुओं से मंत्र
                  लेखन का एक पुण्य कार्य करवाया जाता है।
                </p>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-3 mt-6">

                {[
                  "ॐ मंत्र लेखन",
                  "मंदिर",
                  "ॐ भूमि पूजन",
                  "आधारशिला",
                ].map((item, index) => (

                  <button
                    key={index}
                    className="
                      px-5
                      py-2.5
                      rounded-xl
                      bg-white
                      border
                      border-gray-200
                      text-[#ff3300]
                      text-sm
                      font-medium
                      hover:bg-[#ff3300]
                      hover:text-white
                      transition-all
                    "
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* EXTRA BOX */}

              <div
                className="
                  mt-6
                  bg-white
                  rounded-2xl
                  p-5
                  border
                  border-gray-100
                  shadow-sm
                "
              >

                <p
                  className="
                    text-gray-700
                    leading-8
                    text-[14px]
                  "
                >
                  मंदिर निर्माण पूर्ण होने पर भगवान श्री
                  चित्रगुप्त जी को विराजित किया जाएगा।
                </p>

              </div>
            </div>

            {/* RIGHT IMAGE */}

            <div className="relative">

              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  border-[6px]
                  border-white
                  shadow-xl
                "
              >

                <img
                  src="/New folder/sec8.jpg"
                  alt="Temple"
                  className="
                    w-full
                    h-[500px]
                    object-cover
                  "
                />

              </div>

              {/* BADGE */}

              <div
                className="
                  absolute
                  -bottom-5
                  -left-5
                  w-[90px]
                  h-[90px]
                  rounded-full
                  bg-white
                  shadow-lg
                  flex
                  items-center
                  justify-center
                "
              >

                <div className="text-center">

                  <h4
                    className="
                      text-[20px]
                      font-bold
                      text-[#ff3300]
                    "
                  >
                    1Cr+
                  </h4>

                  <p
                    className="
                      text-[10px]
                      text-gray-600
                      font-medium
                    "
                  >
                    मंत्र लेखन
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPeeth;