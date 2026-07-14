import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Play } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import PoojaBookingDialog from "@/components/PoojaBooking";

import { Landmark, BookOpen, HandCoins } from "lucide-react";

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
  Clock3,
  Check,
} from "lucide-react";

export default function Home() {
  const slides = [
    {
      image: "/hero_1.png",
      title: "श्री चित्रगुप्त पीठ, वृंदावन",
      subtitle:
        "श्री वृंदावन धाम की पावन भूमि पर स्थापित हो रही श्री चित्रगुप्त पीठ, भगवान श्री चित्रगुप्त जी को समर्पित विश्व की प्रथम आध्यात्मिक, सांस्कृतिक एवं वैदिक पीठ है। यह केवल एक मंदिर नहीं, बल्कि धर्म, न्याय, शिक्षा, संस्कार, सेवा, योग, तप एवं मानव कल्याण का एक समग्र आध्यात्मिक केंद्र है, जहाँ सनातन संस्कृति की अमूल्य विरासत को आनेवाली पीढ़ियों तक पहुँचाने का संकल्प चलाया गया है।",
    },

    {
      image: "/posts/post5.jpg",
      title: "भव्य धार्मिक परिसर",
      subtitle: "आध्यात्मिक वातावरण एवं आधुनिक सुविधाओं से युक्त भव्य परिसर।",
    },

    {
      image: "/posts/post2.jpg",
      title: "सुविधाजनक अतिथि सेवा",
      subtitle:
        "परिवार एवं अतिथियों के लिए आरामदायक एवं उत्कृष्ट सेवाएँ उपलब्ध।",
    },
  ];

  const features = [
    "श्री चित्रगुप्त पीठ वृन्दावन",
    "श्री चित्रगुप्त निवास",
    "घर आंगन",
    "आयुर्वेदिक औषधालय",
    "श्री चित्रगुप्त विद्यापीठ",
    "नक्षत्र वाटिका",
  ];

  const videos = [
    {
      title: "Shree Chitragupt Peeth Video",
      url: "https://www.youtube.com/embed/bpy6LDwDhCc",
    },
    {
      title: "Shree Chitragupt Peeth Video",
      url: "https://www.youtube.com/embed/bpy6LDwDhCc",
    },
    {
      title: "Shree Chitragupt Peeth Video",
      url: "https://www.youtube.com/embed/bpy6LDwDhCc",
    },
    {
      title: "Shree Chitragupt Peeth Video",
      url: "https://www.youtube.com/embed/bpy6LDwDhCc",
    },
    {
      title: "Shree Chitragupt Peeth Video",
      url: "https://www.youtube.com/embed/bpy6LDwDhCc",
    },
  ];

  const poojas = [
    {
      image: "/posts/post1.jpg",
      title: "महा मृत्युंजय जाप",
      desc: "भगवान शिव की कृपा प्राप्ति एवं स्वास्थ्य लाभ हेतु विशेष महा मृत्युंजय जाप।",
      time: "Every Monday",
      duration: "45 Min",
    },

    {
      image: "/posts/post2.jpg",
      title: "श्री सत्यनारायण कथा",
      desc: "परिवार सुख, शांति एवं समृद्धि हेतु श्री सत्यनारायण भगवान की कथा।",
      time: "Every Purnima",
      duration: "1 Hour",
    },

    {
      image: "/posts/post3.jpg",
      title: "रुद्राभिषेक पूजा",
      desc: "शिव कृपा एवं जीवन में सकारात्मक ऊर्जा हेतु रुद्राभिषेक पूजा।",
      time: "Daily Available",
      duration: "30 Min",
    },

    {
      image: "/posts/post1.jpg",
      title: "श्री हनुमान पाठ",
      desc: "भय, बाधा एवं नकारात्मक ऊर्जा से मुक्ति हेतु हनुमान पाठ।",
      time: "Tuesday & Saturday",
      duration: "50 Min",
    },
  ];

  const gallery = [
    {
      image: "/gallery/gallery1.jpeg",
      title: "Shree Chitragupt Peeth",
    },

    {
      image: "/gallery/gallery2.jpeg",
      title: "Shree Chitragupt Peeth",
    },
  ];

  const donations = [
    {
      image: "/donate/donate1.jpeg",
      title: "श्री चित्रगुप्त पीठ वृंदावन",
      desc: "Temple is place where hindu worship consectetur adipisicing elit, sed do",
    },

    {
      image: "/donate/donate2.jpeg",
      title: "नक्षत्र वाटिका",
      desc: "Temple is place where hindu worship consectetur adipisicing elit, sed do",
    },

    {
      image: "/donate/donate3.jpeg",
      title: "जल परिक्रमा",
      desc: "Temple is place where hindu worship consectetur adipisicing elit, sed do",
    },

    {
      image: "/donate/donate4.jpeg",
      title: "घर आँगन",
      desc: "घर आंगन बुजुर्ग माता-पिता के लिए आधुनिक एवं मेडिकल सुविधायुक्त सुविधाओं के साथ 42 कमरे व 6 डॉरमेट्री हॉल के साथ भव्य भवन",
    },

    {
      image: "/donate/donate5.jpeg",
      title: "श्री चित्रगुप्त निवास",
      desc: "श्री चित्रगुप्त निवास 50 वातानुकूलित कमरे एवं भोजनालय का भव्य अतिथि गृह।",
    },

    {
      image: "/donate/donate6.jpeg",
      title: "श्री चित्रगुप्त विद्यापीठ",
      desc: "Temple is place where hindu worship consectetur adipisicing elit, sed do",
    },

    {
      image: "/donate/donate7.jpeg",
      title: "श्री चित्रगुप्त चिंतन एवं शोध संस्थान",
      desc: "श्री चित्रगुप्त जी के लेखन हेतु एवं शोध चिंतन संस्थान।",
    },
  ];

  const volunteers = [
    {
      image: "/volunteers/volunteer1.jpg",
      name: "जगद्गुरु श्री चित्रगुप्ताचार्य",
      role: "डॉ स्वामी सच्चिदानंद गिरिजीश्वर श्री चित्रगुप्त पीठ वृंदावन",
      desc: "प्रधान संरक्षक भगवान श्री चित्रगुप्त मंत्र लेखन अभियान भारत",
      mobile: "(MOB - +91-7065013871)",
    },

    {
      image: "/volunteers/volunteer2.jpg",
      name: "चिरांशी शिल्पा स्वरूप",
      role: "संस्थापक - सदस्य श्री चित्रगुप्त पीठ",
      desc: "व्यवस्थापक - श्री चित्रगुप्त कैंसर फाउंडेशन भारत",
      mobile: "(MOB - +91-7065013874)",
    },

    {
      image: "/volunteers/volunteer3.jpg",
      name: "श्री महंत सुरेंद्र दास जी महाराज",
      role: "(मथुरा) तेज लेखन एवं श्री चित्रगुप्त शोध संस्थान श्री चित्रगुप्त पीठ",
      desc: "",
      mobile: "",
    },
  ];

  const cards = [
    {
      icon: <Landmark size={55} />,
      title: "श्री चित्रगुप्त पीठ",
      desc: "Experience the divine presence at our sacred temple dedicated to Lord Chitragupta, the divine accountant.",
      bg: "bg-[#ff2d12]",
      text: "text-white",
    },

    {
      icon: <BookOpen size={55} />,
      title: "Our Spiritual Guide",
      desc: "Receive blessings and guidance from our revered Swami Ji, leading us on the path of spirituality.",
      bg: "bg-[#ff6464]",
      text: "text-white",
    },

    {
      icon: <HandCoins size={55} />,
      title: "Divine Pujas",
      desc: "Participate in sacred rituals and pujas that bring peace, prosperity and divine blessings to your life.",
      bg: "bg-white",
      text: "text-gray-800",
    },
  ];

  const [current, setCurrent] = useState(0);

  // AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  // NEXT
  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // PREV
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <div className="relative h-screen w-full">
          {/* SLIDES */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`
                absolute inset-0
                transition-all duration-1000 ease-in-out
                ${
                  current === index
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                }
              `}
            >
              {/* BG IMAGE */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/45" />

              {/* CONTENT */}
              <div
                className="
                  relative z-20
                  h-full
                  max-w-[1500px]
                  mx-auto
                  px-6 lg:px-12
                  flex items-center
                "
              >
                <div className="max-w-3xl">
                  {/* TOP TEXT */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-red-500" />

                    <p
                      className="
                        uppercase
                        tracking-[5px]
                        text-sm
                        font-semibold
                        text-white/80
                      "
                    >
                      Welcome To
                    </p>
                  </div>

                  {/* TITLE */}
                  <h1
                    className="
                      text-5xl
                      sm:text-6xl
                      lg:text-7xl
                      font-black
                      leading-tight
                      text-white
                    "
                  >
                    {slide.title}
                  </h1>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      mt-6
                      text-lg
                      lg:text-2xl
                      text-white/90
                      leading-relaxed
                      max-w-2xl
                    "
                  >
                    {slide.subtitle}
                  </p>

                  {/* BUTTONS */}
                  <div className="flex flex-wrap gap-5 mt-10">
                    <button
                      className="
                        group
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-8 py-4
                        rounded-full
                        text-lg
                        font-bold
                        flex items-center gap-3
                        transition-all
                      "
                    >
                      JOIN TODAY
                      <ArrowRight
                        size={22}
                        className="
                          group-hover:translate-x-1
                          transition
                        "
                      />
                    </button>

                    <button
                      className="
                        group
                        bg-white
                        hover:bg-gray-100
                        text-red-500
                        px-8 py-4
                        rounded-full
                        text-lg
                        font-bold
                        flex items-center gap-3
                        transition-all
                      "
                    >
                      LEARN MORE
                      <ArrowRight
                        size={22}
                        className="
                          group-hover:translate-x-1
                          transition
                        "
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* LEFT */}
          <button
            onClick={prevSlide}
            className="
              absolute left-5 bottom-10
              z-30
              w-16 h-16
              rounded-full
              bg-red-500
              text-white
              flex items-center justify-center
            "
          >
            <ChevronLeft size={30} />
          </button>

          {/* RIGHT */}
          <button
            onClick={nextSlide}
            className="
              absolute right-5 bottom-10
              z-30
              w-16 h-16
              rounded-full
              bg-red-500
              text-white
              flex items-center justify-center
            "
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="relative min-h-screen bg-[#f8f8f8] overflow-hidden flex items-center">
        <div className="max-w-[1450px] mx-auto px-6 lg:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* LEFT IMAGES */}
            <div className="relative flex justify-center lg:justify-start">
              {/* SMALL IMAGE */}
              <div
                className="
                  absolute
                  top-0 left-0
                  w-[170px]
                  h-[210px]
                  rounded-2xl
                  overflow-hidden
                  border-[6px] border-white
                  shadow-2xl
                  z-10
                "
              >
                <img
                  src="/About/about1.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* MAIN IMAGE */}
              <div
                className="
                  relative
                  mt-16
                  w-full
                  max-w-[520px]
                  h-[620px]
                  rounded-[30px]
                  overflow-hidden
                  border-[8px] border-white
                  shadow-2xl
                "
              >
                <img
                  src="/posts/post4.jpg"
                  alt=""
                  className="
                    w-full h-full object-cover
                  "
                />

                {/* FLOATING */}
                <div
                  className="
                    absolute
                    bottom-6 right-6
                    w-[130px]
                    h-[170px]
                    rounded-2xl
                    overflow-hidden
                    border-4 border-white
                    shadow-2xl
                  "
                >
                  <img
                    src="/About/about3.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              {/* TOP */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-[2px] bg-red-500" />

                <p
                  className="
                    uppercase
                    text-red-500
                    font-bold
                    tracking-[3px]
                  "
                >
                  About Us
                </p>
              </div>

              {/* TITLE */}
              <h2
                className="
                  text-4xl
                  md:text-5xl
                  font-black
                  text-red-500
                  leading-tight
                "
              >
                श्री चित्रगुप्त पीठ की स्थापना
              </h2>

              {/* TEXT */}
              <p
                className="
                  mt-8
                  text-lg
                  leading-[2]
                  text-gray-700
                "
              >
                समस्त प्राणियों को उनके कर्मों के आधार पर फल देने वाले देवता
                ब्रह्मा लेखनी दाता भगवान श्री चित्रगुप्त की महिमा धार्मिक
                ग्रंथों में वर्णित है।
              </p>

              {/* FEATURES */}
              <div className="grid md:grid-cols-2 gap-5 mt-12">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="
                      flex items-center gap-4
                    "
                  >
                    <div
                      className="
                        w-12 h-12
                        rounded-full
                        bg-white
                        shadow-md
                        flex items-center justify-center
                      "
                    >
                      <Check size={22} className="text-red-500" />
                    </div>

                    <p
                      className="
                        text-lg
                        font-semibold
                        text-gray-800
                      "
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* BUTTON */}
              <button
                className="
                  mt-12
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-8 py-4
                  rounded-full
                  flex items-center gap-3
                  font-bold
                  text-lg
                  transition-all
                "
              >
                KNOW MORE
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-[#f8f8f8] overflow-hidden relative flex items-center">
        {/* BACKGROUND */}

        <div
          className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[url('/pattern.png')]
          bg-cover
          bg-center
        "
        />

        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 relative z-10 w-full">
          {/* TOP HEADING */}

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="text-red-500 text-2xl">ॐ</span>

              <p
                className="
                uppercase
                text-red-500
                font-bold
                tracking-[4px]
              "
              >
                Online Pooja Booking
              </p>

              <span className="text-red-500 text-2xl">ॐ</span>
            </div>

            <h2
              className="
              text-4xl
              md:text-6xl
              font-black
              text-gray-900
            "
            >
              Book Your Sacred Pooja
            </h2>

            <p
              className="
              mt-6
              text-gray-600
              text-lg
              max-w-3xl
              mx-auto
              leading-[2]
            "
            >
              Participate in divine poojas and spiritual rituals online with
              blessings from our temple priests.
            </p>
          </div>

          {/* POOJA GRID */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {poojas.map((item, index) => (
              <div
                key={index}
                className="
                bg-white
                rounded-[30px]
                overflow-hidden
                shadow-xl
                hover:-translate-y-3
                hover:shadow-2xl
                transition-all duration-500
                group
              "
              >
                {/* IMAGE */}

                <div className="overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                    w-full
                    h-[280px]
                    object-cover
                    group-hover:scale-110
                    transition-all duration-700
                  "
                  />

                  {/* OVERLAY */}

                  <div
                    className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/50
                    to-transparent
                  "
                  />
                </div>

                {/* CONTENT */}

                <div className="p-7">
                  {/* TITLE */}

                  <h3
                    className="
                    text-3xl
                    font-black
                    text-red-500
                    leading-snug
                  "
                  >
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className="
                    mt-5
                    text-gray-700
                    leading-[2]
                    min-h-[120px]
                  "
                  >
                    {item.desc}
                  </p>

                  {/* INFO */}

                  <div className="space-y-4 mt-6">
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-red-500" />

                      <span className="font-semibold text-gray-700">
                        {item.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock3 size={20} className="text-red-500" />

                      <span className="font-semibold text-gray-700">
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="
        mt-8
        w-full
        bg-red-500
        hover:bg-red-600
        text-white
        py-4
        rounded-full
        font-bold
        text-lg
        flex
        items-center
        justify-center
        gap-3
        transition-all
        group/btn
      "
                      >
                        Book Pooja
                        <ArrowRight
                          size={20}
                          className="
          group-hover/btn:translate-x-1
          transition-all
        "
                        />
                      </button>
                    </DialogTrigger>

                    <DialogContent
                      className="
      w-[95vw]
      max-w-6xl
      sm:max-w-6xl
      p-0
      overflow-hidden
      rounded-[35px]
      border-0
      max-h-[90vh]
      overflow-y-auto
    "
                      showCloseButton={true}
                    >
                      <PoojaBookingDialog poojaName={item.title} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      <section className="min-h-screen bg-[#f8f8f8] relative overflow-hidden flex items-center">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 w-full">
          {/* TOP HEADING */}

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-red-500" />

              <p
                className="
                uppercase
                text-red-500
                font-bold
                tracking-[3px]
              "
              >
                Donate Us To Help
              </p>

              <div className="w-10 h-[2px] bg-red-500" />
            </div>

            <h2
              className="
              text-4xl
              md:text-5xl
              font-black
              text-gray-900
            "
            >
              Support Temple Projects
            </h2>
          </div>

          {/* CARDS */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {donations.map((item, index) => (
              <div
                key={index}
                className="
                bg-white
                rounded-[24px]
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                transition-all duration-500
                hover:-translate-y-2
                group
              "
              >
                {/* IMAGE */}

                <div className="overflow-hidden h-[240px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-110
                    transition-all duration-700
                  "
                  />
                </div>

                {/* CONTENT */}

                <div className="p-6">
                  {/* TITLE */}

                  <h3
                    className="
                    text-2xl
                    font-black
                    text-red-500
                    leading-snug
                  "
                  >
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className="
                    mt-5
                    text-gray-700
                    leading-[2]
                    text-[16px]
                    min-h-[110px]
                  "
                  >
                    {item.desc}
                  </p>

                  {/* LINE */}

                  <div className="w-full h-[4px] bg-gray-100 mt-6 rounded-full overflow-hidden">
                    <div className="w-[90%] h-full bg-red-500" />
                  </div>

                  {/* BUTTON */}

                  <button
                    className="
                    mt-8
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-7
                    py-4
                    rounded-full
                    font-bold
                    flex items-center
                    gap-3
                    transition-all
                    group/btn
                  "
                  >
                    DONATE NOW
                    <ArrowRight
                      size={20}
                      className="
                      group-hover/btn:translate-x-1
                      transition-all
                    "
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SCROLL TOP */}

          <div className="flex justify-center mt-16">
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="
              w-16
              h-16
              rounded-full
              border-2
              border-red-300
              text-red-500
              hover:bg-red-500
              hover:text-white
              transition-all
              flex items-center
              justify-center
              shadow-lg
            "
            >
              ↑
            </button>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-[#f8f8f8] overflow-hidden relative flex items-center">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 w-full">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* LEFT CONTENT */}

            <div className="lg:col-span-4">
              {/* TOP TAG */}

              <div className="flex items-center gap-3 mb-5">
                <span className="text-red-500 text-2xl">ॐ</span>

                <p
                  className="
                  uppercase
                  text-red-500
                  font-bold
                  tracking-[3px]
                "
                >
                  Volunteers
                </p>
              </div>

              {/* HEADING */}

              <h2
                className="
                text-4xl
                md:text-5xl
                font-black
                text-red-500
                leading-tight
              "
              >
                Our Volunteers Achievements
              </h2>

              {/* DESCRIPTION */}

              <div className="flex gap-5 mt-10">
                {/* RED LINE */}

                <div className="w-[4px] bg-red-500 rounded-full" />

                <p
                  className="
                  text-gray-700
                  text-lg
                  leading-[2]
                "
                >
                  We are a Hindu that believes in Lord Rama and Vishnu Devu the
                  followers and We are a Hindu that believes in Lord Rama and
                  Vishnu Deva.
                </p>
              </div>

              {/* SUB CONTENT */}

              <div className="mt-10">
                <h3
                  className="
                  text-2xl
                  font-black
                  text-red-500
                "
                >
                  श्री चित्रगुप्त पीठ आश्रयशाला
                </h3>

                <p
                  className="
                  mt-5
                  text-gray-700
                  leading-[2]
                  text-lg
                "
                >
                  श्री चित्रगुप्त पीठ आश्रयशाला का कार्यक्रम दिनांक 22 अप्रैल
                  2023 अक्षय तृतीया के शुभ अवसर पर समस्त संत जगत एवं चित्रांश
                  बंधुओं की उपस्थिति में सम्पन्न हुआ।
                </p>
              </div>

              {/* BOTTOM LINE */}

              <div className="flex items-center gap-4 mt-14">
                <div className="w-16 h-[5px] bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-10 h-full bg-red-500" />
                </div>

                <div className="w-10 h-[5px] bg-gray-200 rounded-full" />
              </div>
            </div>

            {/* RIGHT CARDS */}

            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-3 gap-8">
                {volunteers.map((item, index) => (
                  <div
                    key={index}
                    className="
                    bg-white
                    shadow-lg
                    overflow-hidden
                    group
                    hover:-translate-y-2
                    transition-all duration-500
                  "
                  >
                    {/* IMAGE */}

                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                        w-full
                        h-[330px]
                        object-cover
                        group-hover:scale-110
                        transition-all duration-700
                      "
                      />

                      {/* PLUS ICON */}

                      <button
                        className="
                        absolute
                        top-4
                        right-4
                        w-12
                        h-12
                        bg-white
                        text-red-500
                        hover:bg-red-500
                        hover:text-white
                        transition-all
                        flex items-center
                        justify-center
                        shadow-lg
                      "
                      >
                        <Plus size={22} />
                      </button>
                    </div>

                    {/* CONTENT */}

                    <div className="p-6 text-center">
                      {/* NAME */}

                      <h3
                        className="
                        text-xl
                        font-black
                        text-red-500
                        leading-snug
                      "
                      >
                        {item.name}
                      </h3>

                      {/* ROLE */}

                      <p
                        className="
                        mt-4
                        text-gray-700
                        leading-[1.8]
                        text-[15px]
                        font-medium
                      "
                      >
                        {item.role}
                      </p>

                      {/* DESCRIPTION */}

                      <p
                        className="
                        mt-3
                        text-red-500
                        leading-[1.8]
                        text-[15px]
                        font-semibold
                      "
                      >
                        {item.desc}
                      </p>

                      {/* MOBILE */}

                      {item.mobile && (
                        <p
                          className="
                          mt-5
                          text-red-500
                          font-black
                        "
                        >
                          {item.mobile}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-[#f8f8f8] overflow-hidden flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          {/* TOP HEADING */}

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-red-500 text-xl">ॐ</span>

              <p
                className="
                uppercase
                text-red-500
                font-bold
                tracking-[3px]
              "
              >
                Video Gallery
              </p>

              <span className="text-red-500 text-xl">ॐ</span>
            </div>

            <h2
              className="
              text-4xl
              md:text-5xl
              font-black
              text-red-500
            "
            >
              Youtube [View All]
            </h2>
          </div>

          {/* VIDEO GRID */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div
                key={index}
                className="
                bg-white
                rounded-[24px]
                overflow-hidden
                shadow-xl
                hover:-translate-y-2
                transition-all duration-500
                group
              "
              >
                {/* VIDEO */}

                <div className="relative overflow-hidden">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="
                    w-full
                    h-[260px]
                  "
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {/* PLAY ICON */}

                  <div
                    className="
                    absolute
                    inset-0
                    flex items-center justify-center
                    pointer-events-none
                  "
                  >
                    <div
                      className="
                      w-20
                      h-20
                      rounded-full
                      bg-red-500/90
                      flex items-center justify-center
                      shadow-2xl
                      group-hover:scale-110
                      transition-all duration-500
                    "
                    >
                      <Play
                        size={36}
                        fill="white"
                        className="text-white ml-1"
                      />
                    </div>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-6">
                  <h3
                    className="
                    text-2xl
                    font-black
                    text-red-500
                  "
                  >
                    {video.title}
                  </h3>

                  <p
                    className="
                    mt-4
                    text-gray-700
                    leading-[2]
                    text-lg
                  "
                  >
                    Watch temple spiritual videos, events and devotional
                    programs directly on our website.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-[#f8f8f8] overflow-hidden relative flex items-center">
        {/* BACKGROUND SHAPE */}

        <div
          className="
          absolute
          inset-0
          opacity-[0.04]
          bg-[url('/pattern.png')]
          bg-center
          bg-cover
        "
        />

        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 relative z-10 w-full">
          {/* TOP HEADING */}

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-red-500 text-xl">ॐ</span>

              <p
                className="
                uppercase
                text-red-500
                font-bold
                tracking-[3px]
              "
              >
                Photo Gallery
              </p>

              <span className="text-red-500 text-xl">ॐ</span>
            </div>

            <h2
              className="
              text-4xl
              md:text-5xl
              font-black
              text-red-500
            "
            >
              Memories [View All]
            </h2>
          </div>

          {/* GALLERY GRID */}

          <div className="grid lg:grid-cols-2 gap-10">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="
                bg-white
                shadow-xl
                overflow-hidden
                group
                hover:-translate-y-2
                transition-all duration-500
              "
              >
                {/* IMAGE */}

                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                    w-full
                    h-[520px]
                    object-cover
                    group-hover:scale-105
                    transition-all duration-700
                  "
                  />
                </div>

                {/* CONTENT */}

                <div
                  className="
                  flex
                  items-center
                  justify-between
                  px-8
                  py-7
                "
                >
                  <h3
                    className="
                    text-2xl
                    font-black
                    text-red-500
                  "
                  >
                    {item.title}
                  </h3>

                  <button
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-red-50
                    hover:bg-red-500
                    text-red-500
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                  "
                  >
                    <ArrowRight size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM BUTTONS */}

          <div className="flex items-center justify-center gap-5 mt-16">
            <button
              className="
              w-16
              h-16
              rounded-full
              bg-white
              hover:bg-red-500
              hover:text-white
              text-red-500
              shadow-xl
              flex
              items-center
              justify-center
              transition-all
            "
            >
              <ChevronLeft size={28} />
            </button>

            <button
              className="
              w-16
              h-16
              rounded-full
              bg-white
              hover:bg-red-500
              hover:text-white
              text-red-500
              shadow-xl
              flex
              items-center
              justify-center
              transition-all
            "
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </section>

      <section
        className="
        min-h-screen
        relative
        overflow-hidden
        bg-gradient-to-r
        from-[#5e1f1f]
        to-[#7c3434]
        flex items-center
      "
      >
        {/* BACKGROUND OVERLAY */}

        <div
          className="
          absolute
          inset-0
          opacity-10
          bg-[url('/pattern.png')]
          bg-cover
          bg-center
        "
        />

        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT MAP */}

            <div>
              {/* TITLE */}

              <h2
                className="
                text-4xl
                font-black
                text-red-500
                mb-8
              "
              >
                Address on map
              </h2>

              {/* MAP */}

              <div
                className="
                overflow-hidden
                shadow-2xl
                border-[6px]
                border-white/10
              "
              >
                <iframe
                  src="https://www.google.com/maps?q=Shree+Chitragupt+Peeth+(Brij+Shanti+Kunj+Ashram),+GGWF+2R6,+Junhaidi,+Uttar+Pradesh+281504&output=embed"
                  width="100%"
                  height="520"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </div>

            {/* RIGHT VIDEO */}

            <div>
              {/* TITLE */}

              <h2
                className="
                text-4xl
                font-black
                text-red-500
                mb-8
              "
              >
                Temple Video
              </h2>

              {/* VIDEO */}

              <div
                className="
                overflow-hidden
                shadow-2xl
                border-[6px]
                border-white/10
                bg-black
              "
              >
                <iframe
                  width="100%"
                  height="520"
                  src="https://www.youtube.com/embed/bpy6LDwDhCc"
                  title="Temple Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
