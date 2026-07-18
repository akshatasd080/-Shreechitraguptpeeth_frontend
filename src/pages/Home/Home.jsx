import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  Languages,
} from "lucide-react";
import api from "@/api/axios";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const HERO_IMAGE_BASE = `${API_BASE_URL}/uploads/hero/`;
const POOJA_IMAGE_BASE = `${API_BASE_URL}/uploads/pooja/`;
const THOUGHT_IMAGE_BASE = `${API_BASE_URL}/uploads/thoughts/`;

const DEFAULT_SLIDES = [
  {
    image: "/hero_1.png",
    title: "श्री चित्रगुप्त पीठ, वृंदावन",
    subtitle:
      "श्री वृंदावन धाम की पावन भूमि पर स्थापित हो रही श्री चित्रगुप्त पीठ, भगवान श्री चित्रगुप्त जी को समर्पित विश्व की प्रथम आध्यात्मिक, सांस्कृतिक एवं वैदिक पीठ है। यह केवल एक मंदिर नहीं, बल्कि धर्म, न्याय, शिक्षा, संस्कार, सेवा, योग, तप एवं मानव कल्याण का एक समग्र आध्यात्मिक केंद्र है, जहाँ सनातन संस्कृति की अमूल्य विरासत को आनेवाली पीढ़ियों तक पहुँचाने का संकल्प चलाया गया है।",
  },
  {
    image: "/posts/post8.png",
    title: "नक्षत्र वाटिका",
    subtitle:
      "वैदिक ज्योतिष एवं भारतीय ऋषि परंपरा पर आधारित नक्षत्र वाटिका का उद्देश्य प्रकृति, ग्रह-नक्षत्रों और मानव जीवन के आध्यात्मिक संबंध को समझाना है। यहाँ प्रत्येक नक्षत्र के अनुरूप पवित्र वृक्षों का संरक्षण एवं रोपण किया जाएगा।",
  },
  {
    image: "/posts/post8.png",
    title: "जल परिक्रमा",
    subtitle:
      "जल परिक्रमा क्षेत्र भारतीय संस्कृति में जल के आध्यात्मिक एवं पर्यावरणीय महत्व को समर्पित होगा। यह श्रद्धालुओं को ध्यान, शांति और प्रकृति से जुड़ने का दिव्य अनुभव प्रदान करेगा।",
  },
  {
    image: "/posts/post6.png",
    title: "आयुर्वेदिक औषधालय",
    subtitle:
      "आयुर्वेद, योग एवं प्राकृतिक चिकित्सा के माध्यम से समाज को स्वस्थ एवं संतुलित जीवन प्रदान करना इस संस्थान का प्रमुख उद्देश्य होगा। यहाँ पारंपरिक भारतीय चिकित्सा पद्धतियों को आधुनिक स्वास्थ्य सेवाओं के साथ जोड़ा जाएगा।",
  },
  {
    image: "/posts/post6.png",
    title: "शोध संस्थान",
    subtitle:
      "श्री चित्रगुप्त चिंतन एवं शोध संस्थान भारतीय दर्शन, धर्मशास्त्र, वेद, पुराण, चित्रगुप्त साहित्य, भारतीय न्याय परंपरा एवं सनातन संस्कृति पर गहन शोध एवं प्रकाशन का राष्ट्रीय केंद्र होगा।",
  },
];

export default function Home() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);

  const features = [
    "श्री चित्रगुप्त पीठ वृन्दावन",
    "श्री चित्रगुप्त निवास",
    "घर आंगन",
    "आयुर्वेदिक औषधालय",
    "श्री चित्रगुप्त विद्यापीठ",
    "नक्षत्र वाटिका",
  ];

  const [videos, setVideos] = useState([
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
  ]);

  const [poojas, setPoojas] = useState([
    {
      image: "/posts/post1.jpg",
      title: "महा मृत्युंजय जाप",
      desc: "भगवान शिव की कृपा प्राप्ति एवं स्वास्थ्य लाभ हेतु विशेष महा मृत्युंजय जाप।",
      time: "Every Monday",
      duration: "45 Mins",
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
      time: "Everyday",
      duration: "45 Mins",
    },
    {
      image: "/posts/post1.jpg",
      title: "श्री हनुमान पाठ",
      desc: "भय, बाधा एवं नकारात्मक ऊर्जा से मुक्ति हेतु हनुमान पाठ।",
      time: "Tuesday",
      duration: "1 Hour",
    },
  ]);

  const tabs = [
  {
    id: "mantra",
    title: "🕉 Mantra",
    items: [
      { id: "radha-mantra", name: "Radha Mantra" },
      { id: "narayan-mantra", name: "Narayan Mantra" },
      { id: "kali-mantra", name: "Kali Mantra" },
      { id: "agni-mantra", name: "Agni Mantra" },
      { id: "shakti-mantra", name: "Shakti Mantra" },
      { id: "hanuman-mool-mantra", name: "Hanuman Mool Mantra" },
      { id: "shiv-mantra", name: "Shiv Mantra" },
      { id: "durga-mantra", name: "Durga Mantra" },
      { id: "lakshmi-mantra", name: "Lakshmi Mantra" },
    ],
  },

  {
    id: "aarti",
    title: "🙏 Aarti",
    items: [
      { id: "chintpurni-aarti", name: "Chintpurni Aarti" },
      { id: "bhagavad-gita-aarti", name: "Bhagavad Gita Aarti" },
      { id: "annapurna-aarti", name: "Annapurna Aarti" },
      { id: "om-jai-jagdish-hare", name: "Om Jai Jagdish Hare" },
      { id: "datta-aarti", name: "Dattachi Aarti" },
      { id: "ganesh-aarti", name: "Ganesh Aarti" },
      { id: "kali-aarti", name: "Kaali Aarti" },
      { id: "vishwakarma-aarti", name: "Vishwakarma Aarti" },
    ],
  },

  {
    id: "chalisa",
    title: "📖 Chalisa",
    items: [
      { id: "saraswati-chalisa", name: "Saraswati Chalisa" },
      { id: "shiv-chalisa", name: "Shiv Chalisa" },
      { id: "ram-chalisa", name: "Ram Chalisa" },
      { id: "chamunda-chalisa", name: "Chamunda Chalisa" },
      { id: "santoshi-chalisa", name: "Santoshi Chalisa" },
      { id: "hanuman-chalisa", name: "Hanuman Chalisa" },
      { id: "durga-chalisa", name: "Durga Chalisa" },
      { id: "kali-chalisa", name: "Kali Chalisa" },
    ],
  },

  {
    id: "sunRise",
    title: "🌞 Sun Rise",
    items: [
      { id: "mumbai-sunrise", name: "Mumbai" },
      { id: "delhi-sunrise", name: "Delhi" },
      { id: "kolkata-sunrise", name: "Kolkata" },
      { id: "chennai-sunrise", name: "Chennai" },
      { id: "bangalore-sunrise", name: "Bangalore" },
      { id: "hyderabad-sunrise", name: "Hyderabad" },
      { id: "ahmedabad-sunrise", name: "Ahmedabad" },
      { id: "pune-sunrise", name: "Pune" },
      { id: "surat-sunrise", name: "Surat" },
    ],
  },

  {
    id: "moonRise",
    title: "🌙 Moon Rise",
    items: [
      { id: "mumbai-moonrise", name: "Mumbai" },
      { id: "delhi-moonrise", name: "Delhi" },
      { id: "kolkata-moonrise", name: "Kolkata" },
      { id: "chennai-moonrise", name: "Chennai" },
      { id: "bangalore-moonrise", name: "Bangalore" },
      { id: "hyderabad-moonrise", name: "Hyderabad" },
      { id: "ahmedabad-moonrise", name: "Ahmedabad" },
      { id: "pune-moonrise", name: "Pune" },
      { id: "surat-moonrise", name: "Surat" },
    ],
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
  const [active, setActive] = useState(tabs[0].id);
  const [dailyThought, setDailyThought] = useState(null);
  const [thoughtLang, setThoughtLang] = useState("hi"); // hi | en
  const [translatedEn, setTranslatedEn] = useState("");
  const [translating, setTranslating] = useState(false);

  // Load active hero slides from backend
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const res = await api.get("/hero-slides?active=true");
        const apiSlides = res.data?.slides || [];
        if (apiSlides.length > 0) {
          setSlides(
            apiSlides.map((s) => ({
              image: s.image_filename
                ? `${HERO_IMAGE_BASE}${s.image_filename}`
                : "/hero_1.png",
              title: s.title,
              subtitle: s.subtitle || "",
            }))
          );
          setCurrent(0);
        }
      } catch (_) {
        // Keep DEFAULT_SLIDES if API is unavailable
      }
    };
    fetchHeroSlides();
  }, []);

  // Load active poojas from backend
  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        const res = await api.get("/poojas?active=true");
        const apiPoojas = res.data?.poojas || [];
        if (apiPoojas.length > 0) {
          setPoojas(
            apiPoojas.map((p) => ({
              image: p.image_filename
                ? `${POOJA_IMAGE_BASE}${p.image_filename}`
                : "/posts/post1.jpg",
              title: p.title,
              desc: p.description || "",
              time: p.day === "Everyday" ? "Everyday" : `Every ${p.day}`,
              duration: p.duration,
            }))
          );
        }
      } catch (_) {
        // Keep default poojas if API is unavailable
      }
    };
    fetchPoojas();
  }, []);

  // Load latest 6 active YouTube videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get(
          "/youtube-videos?active=true&latest=true&limit=6"
        );
        const apiVideos = res.data?.videos || [];
        if (apiVideos.length > 0) {
          setVideos(
            apiVideos.map((v) => ({
              title: v.title,
              description:
                v.description ||
                "Watch temple spiritual videos, events and devotional programs directly on our website.",
              url: v.youtube_url,
            }))
          );
        }
      } catch (_) {
        // Keep default videos if API is unavailable
      }
    };
    fetchVideos();
  }, []);

  // Load today's daily thought
  useEffect(() => {
    const fetchThought = async () => {
      try {
        const res = await api.get("/daily-thoughts?today=true");
        if (res.data?.thought) {
          setDailyThought(res.data.thought);
          setTranslatedEn("");
          setThoughtLang("hi");
        }
      } catch (_) {
        // keep null
      }
    };
    fetchThought();
  }, []);

  const toggleThoughtLang = async () => {
    if (thoughtLang === "en") {
      setThoughtLang("hi");
      return;
    }

    // Switching to English
    const savedEn = (dailyThought?.thought_en || "").trim();
    if (savedEn) {
      setThoughtLang("en");
      return;
    }

    // Auto-translate Hindi → English if English not saved
    const hindi = (dailyThought?.thought_hi || "").trim();
    if (!hindi) {
      setThoughtLang("en");
      return;
    }

    if (translatedEn) {
      setThoughtLang("en");
      return;
    }

    setTranslating(true);
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        hindi
      )}&langpair=hi|en`;
      const res = await fetch(url);
      const data = await res.json();
      const translated =
        data?.responseData?.translatedText?.trim() || hindi;
      setTranslatedEn(translated);
      setThoughtLang("en");
    } catch (_) {
      setTranslatedEn(hindi);
      setThoughtLang("en");
    } finally {
      setTranslating(false);
    }
  };

  // AUTO SLIDER
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [current, slides.length]);

  // NEXT
  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // PREV
  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[90vh] md:min-h-[100vh] w-full">
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
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

              {/* CONTENT */}
              <div
                className="
                  relative z-20
                  h-full
                  max-w-[1500px]
                  mx-auto
                  px-4 sm:px-6 lg:px-12
                  flex items-center
                "
              >
                <div className="max-w-4xl w-full">
                  {/* TOP TEXT */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-6 h-[1.5px] bg-red-500" />

                    <p
                      className="
                        uppercase
                        tracking-[2px]
                        text-[9px] sm:text-[10px]
                        font-semibold
                        text-white/90
                      "
                    >
                      Welcome To
                    </p>
                  </div>

                  {/* TITLE */}
                  <h1
                    className="
                      text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
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
                      mt-3 sm:mt-4
                      text-xs sm:text-sm md:text-base lg:text-lg
                      text-white/90
                      leading-relaxed
                      max-w-3xl
                    "
                  >
                    {slide.subtitle}
                  </p>

                  {/* BUTTONS */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-5 sm:mt-6">
                    <button
                      className="
                        group
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-4 sm:px-6
                        py-2 sm:py-2.5
                        rounded-full
                        text-xs sm:text-sm
                        font-bold
                        flex items-center gap-2
                        transition-all
                        shadow-lg
                        hover:shadow-2xl
                        hover:scale-[1.02]
                      "
                    >
                      JOIN TODAY
                      <ArrowRight
                        size={16}
                        className="
                          group-hover:translate-x-1
                          transition
                        "
                      />
                    </button>

                    <Link
                      to="/establishment"
                      className="
                        group
                        bg-white/95
                        hover:bg-white
                        text-red-600
                        px-4 sm:px-6
                        py-2 sm:py-2.5
                        rounded-full
                        text-xs sm:text-sm
                        font-bold
                        flex items-center gap-2
                        transition-all
                        shadow-lg
                        hover:shadow-2xl
                        hover:scale-[1.02]
                      "
                    >
                      LEARN MORE
                      <ArrowRight
                        size={16}
                        className="
                          group-hover:translate-x-1
                          transition
                        "
                      />
                    </Link>
                    
                  </div>
                </div>
              </div>
              {/* SLIDE INDICATORS */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      current === idx ? "bg-red-500 w-10" : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* LEFT */}
          <button
            onClick={prevSlide}
            className="
              absolute left-4 sm:left-5 bottom-10 sm:bottom-16
              z-30
              w-12 sm:w-16 h-12 sm:h-16
              rounded-full
              bg-red-500/90
              hover:bg-red-500
              text-white
              flex items-center justify-center
              transition-all
              hover:scale-110
              shadow-lg
            "
          >
            <ChevronLeft size={24} />
          </button>

          {/* RIGHT */}
          <button
            onClick={nextSlide}
            className="
              absolute right-4 sm:right-5 bottom-10 sm:bottom-16
              z-30
              w-12 sm:w-16 h-12 sm:h-16
              rounded-full
              bg-red-500/90
              hover:bg-red-500
              text-white
              flex items-center justify-center
              transition-all
              hover:scale-110
              shadow-lg
            "
          >
            <ChevronRight size={24} />
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
            src="/About/about4.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

        </div>

        {/* Main Image */}

        <div className="relative mt-10 w-full max-w-[470px] h-[540px] rounded-[28px] overflow-hidden shadow-2xl border-[6px] border-white">

          <img
            src="/About/about6.jpg"
            alt=""
            className="w-full h-full object-cover"
          />

          {/* Floating Image */}

          <div className="absolute bottom-5 right-5 w-32 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl">

            <img
              src="/About/about5.jpg"
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

        <Link
          to="/about-swami"
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

        </Link>

      </div>

    </div>

  </div>

</section>

      {/* ================= DAILY THOUGHT / आज का विचार ================= */}
      {dailyThought && (
        <section className="relative bg-[#fff8f5] py-8 lg:py-12 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center opacity-[0.03]" />

          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <motion.span
                  className="text-red-500 text-lg"
                  animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ॐ
                </motion.span>
                <p className="uppercase tracking-[3px] text-red-500 font-bold text-xs">
                  Daily Thought
                </p>
                <motion.span
                  className="text-red-500 text-lg"
                  animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  ॐ
                </motion.span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-red-600">
                आज का विचार
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-10 items-center">
              {/* LEFT — Image */}
              <motion.div
                className="relative mx-auto lg:mx-0 w-full max-w-[280px] xl:max-w-[320px]"
                initial={{ opacity: 0, x: -40, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              >
                <motion.div
                  className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-square"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={
                      dailyThought.image_filename
                        ? `${THOUGHT_IMAGE_BASE}${dailyThought.image_filename}`
                        : "/About/about6.jpg"
                    }
                    alt="आज का विचार"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* RIGHT — Text + Hindi/English toggle */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="h-[2px] bg-red-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: 32 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={thoughtLang + "-label"}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="uppercase tracking-[2px] text-red-500 font-bold text-xs"
                      >
                        {thoughtLang === "hi"
                          ? "आज का विचार"
                          : "Thought of the Day"}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="button"
                    onClick={toggleThoughtLang}
                    disabled={translating}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white text-xs font-bold shadow-md transition-colors"
                  >
                    <Languages size={14} />
                    {translating
                      ? "Converting..."
                      : thoughtLang === "hi"
                        ? "English"
                        : "हिंदी"}
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={thoughtLang + "-text"}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`text-gray-800 leading-relaxed whitespace-pre-wrap ${
                      thoughtLang === "hi"
                        ? "text-base md:text-lg font-semibold"
                        : "text-sm md:text-base"
                    }`}
                  >
                    {thoughtLang === "hi"
                      ? dailyThought.thought_hi
                      : (dailyThought.thought_en || "").trim() ||
                        translatedEn ||
                        dailyThought.thought_hi}
                  </motion.p>
                </AnimatePresence>

                {dailyThought.thought_date && (
                  <motion.p
                    className="mt-3 text-xs text-gray-500 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 }}
                  >
                    {new Date(dailyThought.thought_date).toLocaleDateString(
                      thoughtLang === "hi" ? "hi-IN" : "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

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

    {/* Cards — horizontal scroll when more than 4 */}

    <div className="relative">
      {poojas.length > 4 && (
        <p className="text-center text-sm text-gray-500 mb-4">
          Swipe / scroll to see more poojas →
        </p>
      )}

      <div
        className={`
          flex gap-5
          overflow-x-auto
          pb-4
          snap-x snap-mandatory
          scroll-smooth
          [-ms-overflow-style:none]
          [scrollbar-width:thin]
          [&::-webkit-scrollbar]:h-1.5
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-red-300
        `}
      >
        {poojas.map((item, index) => (
          <div
            key={index}
            className="
              snap-start
              shrink-0
              w-[85%]
              sm:w-[calc(50%-10px)]
              xl:w-[calc(25%-15px)]
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

            <div className="p-5 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-red-600 mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-[15px] leading-7 mb-5 line-clamp-3">
                {item.desc}
              </p>

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
                      mt-auto
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
                    max-w-3xl
                    rounded-2xl
                    p-0
                    border-0
                    max-h-[90vh]
                    overflow-y-auto
                    top-[50%]
                    left-[50%]
                    translate-x-[-50%]
                    translate-y-[-50%]
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
                    line-clamp-4
                  "
                  >
                    {video.description ||
                      "Watch temple spiritual videos, events and devotional programs directly on our website."}
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



 <section className="py-20 bg-gradient-to-b from-orange-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-flex items-center gap-2 bg-orange-100 px-5 py-2 rounded-full text-orange-600 font-semibold">

            🕉 Spiritual Resources

          </span>

          <h2 className="mt-5 text-4xl font-black text-gray-900">

            Explore

            <span className="text-orange-500">

              {" "}Mantras, Aarti & Chalisa

            </span>

          </h2>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">

            Access daily devotional prayers, mantras, aartis,
            chalisas and sunrise timings.

          </p>

        </div>

        {/* Tabs */}

        <div className="flex flex-wrap justify-center gap-4 mt-12">

          {tabs.map((tab) => (

            <button

              key={tab.id}

              onClick={() => setActive(tab.id)}

              className={`

                px-6

                h-12

                rounded-full

                font-semibold

                transition

                ${
                  active === tab.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white border border-orange-200 text-gray-700 hover:bg-orange-50"
                }

              `}

            >

              {tab.title}

            </button>

          ))}

        </div>

        {/* Content */}

        <div

          className="

            mt-10

            bg-white

            rounded-3xl

            border

            border-orange-100

            shadow-lg

            p-8

          "

        >

          <div className="flex flex-wrap gap-4">
            {tabs.find(tab => tab.id === active)?.items.map((item) => (
              <Link
                key={item.id}
                to={`/spiritual/${active}/${item.id}`}
                className="
                  px-5
                  py-3
                  rounded-full
                  bg-orange-50
                  text-orange-600
                  font-medium
                  border
                  border-orange-200
                  hover:bg-orange-500
                  hover:text-white
                  transition-all
                  duration-300
                "
              >
                {item.name}
              </Link>
            ))}
          </div>

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
