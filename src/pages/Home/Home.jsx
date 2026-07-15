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
      <section className="relative h-screen bg-[#fafafa] overflow-hidden flex items-center">

  {/* Background Pattern */}
  <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center opacity-[0.03]" />

  <div className="relative z-10 max-w-[1500px] mx-auto w-full px-6 lg:px-10">

    <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

      {/* LEFT IMAGE SECTION */}

      <div className="relative flex justify-center">

        {/* Small Top Image */}

        <div className="absolute top-2 left-0 lg:left-4 w-36 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl z-20">

          <img
            src="/About/about1.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

        </div>

        {/* Main Image */}

        <div className="relative mt-10 w-full max-w-[470px] h-[540px] rounded-[28px] overflow-hidden shadow-2xl border-[6px] border-white">

          <img
            src="/posts/post4.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          {/* Floating Image */}

          <div className="absolute bottom-5 right-5 w-32 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl">

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

        {/* Heading */}

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-[2px] bg-red-500" />

          <span className="uppercase tracking-[4px] text-red-500 font-bold text-sm">
            About Us
          </span>

        </div>

        <h2 className="text-4xl xl:text-5xl font-black text-red-600 leading-tight">

          श्री चित्रगुप्त पीठ की स्थापना

        </h2>

        <p className="mt-5 text-gray-600 text-[17px] leading-8">

          समस्त प्राणियों को उनके कर्मों के आधार पर फल देने वाले देवता
          ब्रह्मा लेखनी दाता भगवान श्री चित्रगुप्त की महिमा धार्मिक
          ग्रंथों में वर्णित है। यह पवित्र पीठ आध्यात्मिक चेतना,
          सेवा एवं संस्कृति के संरक्षण के लिए समर्पित है।

        </p>

        {/* Features */}

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8">

          {features.map((item, index) => (

            <div
              key={index}
              className="flex items-center gap-3"
            >

              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">

                <Check size={18} className="text-red-500" />

              </div>

              <p className="text-gray-800 font-semibold text-[15px]">

                {item}

              </p>

            </div>

          ))}

        </div>

        {/* Button */}

        <button
          className="
            mt-8
            px-8
            h-14
            rounded-full
            bg-gradient-to-r
            from-red-500
            to-red-600
            hover:from-red-600
            hover:to-red-700
            text-white
            font-semibold
            flex
            items-center
            gap-3
            transition-all
            duration-300
            shadow-lg
            hover:shadow-xl
            hover:scale-[1.02]
          "
        >

          KNOW MORE

          <ArrowRight size={20} />

        </button>

      </div>

    </div>

  </div>

</section>

<section className="relative min-h-screen bg-[#fafafa] py-16 lg:py-20 overflow-hidden">

  {/* Background */}
  <div
    className="
      absolute inset-0
      opacity-[0.03]
      bg-[url('/pattern.png')]
      bg-cover
      bg-center
    "
  />

  <div className="relative z-10 max-w-[1650px] mx-auto px-5 lg:px-10">

    {/* Heading */}

    <div className="text-center mb-12">

      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-red-500 text-2xl">ॐ</span>

        <p className="uppercase tracking-[5px] text-red-500 font-bold text-sm">
          Online Pooja Booking
        </p>

        <span className="text-red-500 text-2xl">ॐ</span>
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
        Book Your Sacred Pooja
      </h2>

      <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg leading-8">
        Participate in divine poojas and spiritual rituals online with
        blessings from our temple priests.
      </p>

    </div>

    {/* Cards */}

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {poojas.map((item, index) => (

        <div
          key={index}
          className="
            bg-white
            rounded-3xl
            overflow-hidden
            border
            border-gray-100
            shadow-lg
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-500
            flex
            flex-col
            h-full
            group
          "
        >

          {/* Image */}

          <div className="relative overflow-hidden">

            <img
              src={item.image}
              alt={item.title}
              className="
                w-full
                h-56
                object-cover
                group-hover:scale-110
                duration-700
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          </div>

          {/* Content */}

          {/* CONTENT */}

<div className="p-5 flex flex-col h-full">

  {/* Title */}

  <h3 className="text-2xl font-bold text-red-600 mb-2">
    {item.title}
  </h3>

  {/* Description */}

  <p className="text-gray-600 text-[15px] leading-7 mb-5">
    {item.desc}
  </p>

  {/* Info */}

  <div className="space-y-3 mb-5">

    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
        <Calendar size={18} className="text-red-500" />
      </div>

      <span className="font-semibold text-gray-700">
        {item.time}
      </span>

    </div>

    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
        <Clock3 size={18} className="text-red-500" />
      </div>

      <span className="font-semibold text-gray-700">
        {item.duration}
      </span>

    </div>

  </div>

  {/* Button */}

  <Dialog>

    <DialogTrigger asChild>

      <button
        className="
          w-full
          h-14
          rounded-full
          bg-red-500
          hover:bg-red-600
          text-white
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          transition-all
          group/btn
        "
      >
        Book Pooja

        <ArrowRight
          size={18}
          className="group-hover/btn:translate-x-1 duration-300"
        />

      </button>

    </DialogTrigger>

    <DialogContent
      className="
        w-[95vw]
        max-w-6xl
        rounded-3xl
        p-0
        border-0
        max-h-[90vh]
        overflow-y-auto
      "
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

    

     <section className="relative min-h-screen bg-[#fafafa] py-16 lg:py-20 overflow-hidden">

  {/* Background */}

  <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center opacity-[0.03]" />

  <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-10">

    {/* Heading */}

    <div className="text-center mb-12">

      <div className="flex items-center justify-center gap-3 mb-3">

        <div className="w-12 h-[2px] bg-red-500" />

        <span className="uppercase tracking-[5px] text-red-500 font-bold text-sm">
          Donate Us To Help
        </span>

        <div className="w-12 h-[2px] bg-red-500" />

      </div>

      <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
        Support Temple Projects
      </h2>

      <p className="mt-4 max-w-3xl mx-auto text-gray-600 leading-7">
        Every contribution helps preserve our sacred traditions,
        maintain the temple, and support charitable activities.
      </p>

    </div>

    {/* Cards */}

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
  {donations.map((item, index) => (
    <div
      key={index}
      className="
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        border
        border-gray-100
        flex
        flex-col
        group
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="
            w-full
            h-36
            object-cover
            group-hover:scale-105
            duration-500
          "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-lg font-bold text-red-600 mb-2 leading-snug">
          {item.title}
        </h3>

        <p className="text-gray-600 text-sm leading-6 line-clamp-3">
          {item.desc}
        </p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs font-medium mb-2">
            <span>Raised</span>
            <span>90%</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full w-[90%] bg-red-500 rounded-full" />
          </div>
        </div>

        {/* Button */}
        <button
          className="
            mt-4
            w-full
            h-10
            rounded-full
            bg-gradient-to-r
            from-red-500
            to-red-600
            hover:from-red-600
            hover:to-red-700
            text-white
            text-sm
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            transition-all
            duration-300
            shadow
          "
        >
          DONATE NOW
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  ))}
</div>

    {/* Scroll Top */}

    <div className="flex justify-center mt-12">

      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="
          w-14
          h-14
          rounded-full
          bg-white
          border
          border-red-200
          text-red-500
          shadow-lg
          hover:bg-red-500
          hover:text-white
          transition-all
          duration-300
          hover:scale-110
        "
      >

        ↑

      </button>

    </div>

  </div>

</section>


     <section className="relative bg-[#fafafa] py-16 lg:py-20 overflow-hidden">

  <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center opacity-[0.03]" />

  <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-10">

    <div className="grid lg:grid-cols-12 gap-10 items-center">

      {/* LEFT */}

      <div className="lg:col-span-4">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-[2px] bg-red-500"></div>

          <span className="uppercase tracking-[4px] text-red-500 font-bold text-sm">
            Volunteers
          </span>

        </div>

        <h2 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight">

          Our Volunteers Achievements

        </h2>

        <p className="mt-5 text-gray-600 leading-8 text-[16px] border-l-4 border-red-500 pl-5">

          We are a Hindu organization dedicated to preserving traditions,
          serving society, and spreading the teachings of Lord Rama and
          Lord Vishnu through devotion and community service.

        </p>

        <div className="mt-8">

          <h3 className="text-2xl font-bold text-red-600">

            श्री चित्रगुप्त पीठ आश्रयशाला

          </h3>

          <p className="mt-3 text-gray-600 leading-8">

            श्री चित्रगुप्त पीठ आश्रयशाला का कार्यक्रम दिनांक 22 अप्रैल
            2023 अक्षय तृतीया के शुभ अवसर पर सम्पन्न हुआ।

          </p>

        </div>

        <button className="mt-8 h-12 px-8 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-all">

          View All Volunteers

        </button>

      </div>

      {/* RIGHT */}

      <div className="lg:col-span-8">

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

          {volunteers.map((item, index) => (

            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-lg
                border
                border-gray-100
                hover:-translate-y-2
                hover:shadow-2xl
                duration-500
                group
              "
            >

              {/* Image */}

              <div className="relative overflow-hidden">

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-full
                    h-64
                    object-cover
                    group-hover:scale-110
                    duration-700
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                <button
                  className="
                    absolute
                    top-4
                    right-4
                    w-11
                    h-11
                    rounded-full
                    bg-white
                    shadow-lg
                    flex
                    items-center
                    justify-center
                    text-red-500
                    hover:bg-red-500
                    hover:text-white
                    duration-300
                  "
                >
                  <Plus size={18} />
                </button>

              </div>

              {/* Content */}

              <div className="p-5 text-center">

                <h3 className="text-xl font-bold text-gray-900">

                  {item.name}

                </h3>

                <p className="mt-2 text-red-500 font-semibold text-sm">

                  {item.role}

                </p>

                <p className="mt-3 text-gray-600 leading-7 text-[14px]">

                  {item.desc}

                </p>

                {item.mobile && (

                  <div className="mt-5 inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-red-600 font-semibold text-sm">

                    📞 {item.mobile}

                  </div>

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

     <section className="relative min-h-screen bg-[#fafafa] flex items-center py-10 overflow-hidden">

  {/* Background */}
  <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center opacity-[0.03]" />

  <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-8 w-full">

    {/* Heading */}

    <div className="text-center mb-10">

      <div className="flex items-center justify-center gap-3 mb-3">

        <div className="w-10 h-[2px] bg-red-500" />

        <span className="uppercase tracking-[5px] text-red-500 font-bold text-sm">
          Photo Gallery
        </span>

        <div className="w-10 h-[2px] bg-red-500" />

      </div>

      <h2 className="text-3xl md:text-4xl xl:text-5xl font-black text-gray-900">
        Temple Memories
      </h2>

      <p className="mt-3 text-gray-600 max-w-2xl mx-auto leading-7">
        Explore the memorable moments of Shri Chitragupt Peeth events,
        celebrations and spiritual activities.
      </p>

    </div>

    {/* Gallery */}

    <div className="grid lg:grid-cols-2 gap-6">

      {gallery.map((item, index) => (

        <div
          key={index}
          className="
            bg-white
            rounded-3xl
            overflow-hidden
            shadow-lg
            border
            border-gray-100
            hover:-translate-y-2
            hover:shadow-2xl
            transition-all
            duration-500
            group
          "
        >

          {/* Image */}

          <div className="relative overflow-hidden">

            <img
              src={item.image}
              alt={item.title}
              className="
                w-full
                h-[320px]
                object-cover
                group-hover:scale-105
                transition-transform
                duration-700
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          </div>

          {/* Content */}

          <div className="flex items-center justify-between p-5">

            <div>

              <h3 className="text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                View Gallery
              </p>

            </div>

            <button
              className="
                w-11
                h-11
                rounded-full
                bg-red-50
                text-red-500
                hover:bg-red-500
                hover:text-white
                transition-all
                flex
                items-center
                justify-center
                shadow-md
              "
            >

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      ))}

    </div>

    {/* Bottom Navigation */}

    <div className="flex justify-center gap-4 mt-10">

      <button
        className="
          w-12
          h-12
          rounded-full
          bg-white
          border
          border-red-200
          text-red-500
          shadow-md
          hover:bg-red-500
          hover:text-white
          transition-all
        "
      >

        <ChevronLeft size={22} />

      </button>

      <button
        className="
          w-12
          h-12
          rounded-full
          bg-white
          border
          border-red-200
          text-red-500
          shadow-md
          hover:bg-red-500
          hover:text-white
          transition-all
        "
      >

        <ChevronRight size={22} />

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
