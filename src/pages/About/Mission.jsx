import React from "react";
import { Home, Target, CheckCircle, BookOpen, Heart, Calendar, Leaf, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Mission = () => {
  const objectives = [
    {
      title: "Divine Message of Chitragupt",
      icon: BookOpen,
      desc: "भगवान श्री चित्रगुप्त जी की महिमा, शिक्षाओं एवं दिव्य स्वरूप का राष्ट्रीय एवं वैश्विक स्तर पर प्रचार-प्रसार करना।"
    },
    {
      title: "Sanatan Dharma & Culture",
      icon: Shield,
      desc: "सनातन धर्म, भारतीय वैदिक संस्कृति एवं गुरुकुल परम्परा के संरक्षण, संवर्धन एवं पुनर्जागरण हेतु कार्य करना।"
    },
    {
      title: "Youth Empowerment",
      icon: Users,
      desc: "युवाओं को अपने धर्म, संस्कृति, इतिहास एवं नैतिक मूल्यों से जोड़कर उत्तरदायी एवं राष्ट्रभक्त नागरिक बनाना।"
    },
    {
      title: "Spiritual Growth",
      icon: Heart,
      desc: "योग, ध्यान, वैदिक ज्ञान एवं आध्यात्मिक साधना के माध्यम से मानसिक, शारीरिक एवं आध्यात्मिक उन्नति को प्रोत्साहित करना।"
    },
    {
      title: "Social Harmony",
      icon: Heart,
      desc: "सेवा, सद्भाव, सामाजिक समानता एवं पारिवारिक मूल्यों को सुदृढ़ करते हुए समाज में एकता एवं प्रेम की भावना विकसित करना।"
    },
    {
      title: "Environment Protection",
      icon: Leaf,
      desc: "जल संरक्षण, नदी स्वच्छता, वृक्षारोपण एवं पर्यावरण संरक्षण के माध्यम से प्रकृति के प्रति उत्तरदायित्व का भाव जागृत करना।"
    },
    {
      title: "Educational Excellence",
      icon: BookOpen,
      desc: "शिक्षा, संस्कार एवं आध्यात्मिक जागरूकता के माध्यम से भावी पीढ़ियों को धर्मपरायण एवं विद्वान जीवन की प्रेरणा देना।"
    },
    {
      title: "National Welfare",
      icon: Target,
      desc: "राष्ट्रभक्ति, सामाजिक न्याय एवं मानव कल्याण के लिए सतत सेवा कार्यों का संचालन करना।"
    }
  ];

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
          backgroundImage: "url('/New folder/subheader.jpg')",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-orange-900/30" />
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
            Our Mission
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
              Our Mission
            </span>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pt-24 pb-20">
        {/* QUOTE SECTION */}
        <div className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-red-50 to-orange-50 border border-orange-200 rounded-3xl px-10 py-8 shadow-2xl">
            <div className="text-6xl mb-4">ॐ</div>
            <p className="
              text-2xl md:text-3xl
              font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500
              mb-3
            ">
              "धर्मो रक्षति रक्षितः"
            </p>
            <p className="text-gray-700 text-lg font-medium">
              जो धर्म की रक्षा करता है, धर्म उसकी रक्षा करता है।
            </p>
          </div>
        </div>

        {/* MISSION DESCRIPTION */}
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-orange-100 mb-16">
          <h2 className="
            text-3xl md:text-4xl
            font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500
            mb-6 text-center
          ">
            हमारा मिशन
          </h2>
          <div className="text-gray-700 leading-relaxed text-lg space-y-4">
            <p>
              श्री चित्रगुप्त पीठ का मर्शन भगवान श्री चित्रगुप्त जी के न्याय, सत्य, कर्तव्य एवं धर्म के शाश्वत संदेश को
              सम्पूर्ण मानव समाज तक पहुँचाना तथा सनातन संस्कृति के मूल्यों को जन-जन के जीवन का अभिन्न अंग
              बनाना है। हमारा उद्देश्य केवल धार्मिक गतिविधियों तक सीमित नहीं है, बल्कि एक ऐसे समाज का निर्माण
              करना है जहाँ प्रत्येक व्यक्ति सत्यनिष्ठा, नैतिकता, करुणा, सेवा, न्याय और आत्मिक चेतना के साथ जीवन
              व्यतीत करे।
            </p>
            <p>
              भगवान श्री चित्रगुप्त जी सार्स प्राणियों के कर्मों के दिव्य साक्षी एवं न्याय के सर्वोच्च अधिष्ठाता हैं। उनके
              आदर्शहमें यह प्रेरणा देते हैं कि प्रत्येक कर्म उत्तरदायित्व, ईमानदारी और धर्म के अनुरूप होना चाहिए।
              इसी दिव्य प्रेरणा को समाज के प्रत्येक व्यक्ति तक पहुँचाना ही श्री चित्रगुप्त पीठ का मूल ध्येय है।
            </p>
          </div>
        </div>

        {/* OBJECTIVES */}
        <div className="mb-20">
          <h2 className="
            text-3xl md:text-4xl
            font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500
            mb-12 text-center
          ">
            हमारा उद्देश्य
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="
                  bg-gradient-to-br from-white to-gray-50
                  rounded-3xl p-8 shadow-xl border border-orange-100
                  hover:-translate-y-3 hover:shadow-2xl transition-all duration-500
                  group
                "
              >
                <div className="
                  w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100
                  rounded-2xl flex items-center justify-center mb-5
                  group-hover:scale-110 transition-transform duration-300
                  shadow-lg
                ">
                  <obj.icon size={40} className="text-red-600" />
                </div>
                <h3 className="
                  text-xl font-bold text-gray-800 mb-3
                ">
                  {obj.title}
                </h3>
                <p className="
                  text-gray-600 leading-relaxed text-base
                ">
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RESOLUTION SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="/New folder/sec5.jpg"
              alt="Our Resolution"
              className="rounded-3xl shadow-2xl border-8 border-white"
            />
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-orange-100">
            <h2 className="
              text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500
              mb-6
            ">
              हमारा संकल्प
            </h2>
            <div className="text-gray-700 leading-relaxed text-lg space-y-4">
              <p>
                हमारा संकल्प है कि भगवान श्री चित्रगुप्त जी के दिव्य आदेशों को केवल मन्दिरों तक सीमित न रखकर
                समाज के प्रत्येक परिवार, प्रत्येक युवा, प्रत्येक विद्यार्थी एवं प्रत्येक नागरिक तक पहुँचाया जाए। श्री चित्रगुप्त
                पीठ एक ऐसे भारत एवं विश्व के निर्माण के लिए समर्पित है जहाँ धर्म और विज्ञान, आध्यात्मिकता और
                आधुनिकता, संस्कृति और प्रगति एक-दूसरे के पूरक बनकर मानवता के कल्याण का मार्ग प्रशस्त करें।
              </p>
              <p>
                हमारा विश्वास है कि जब व्यक्ति अपने कर्मों के प्रति सजग, सत्यनिष्ठ एवं उत्तरदायी बनता है, तभी परिवार
                सशक्त होता है, समाज संगठित होता है और राष्ट्र समृद्ध बनता है। इसी विश्वास के साथ श्री चित्रगुप्त पीठ
                धर्म, सेवा, संस्कार और मानव कल्याण के पथ पर निरंतर अग्रसर है।
              </p>
            </div>
          </div>
        </div>

        {/* INSPIRING MESSAGE */}
        <div className="bg-gradient-to-br from-red-600 via-orange-500 to-pink-500 rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="
              text-3xl md:text-4xl
              font-black text-white
              mb-6
            ">
              हमारा प्रेरक संदेश
            </h2>
            <p className="
              text-xl md:text-2xl text-red-50 font-bold
              leading-relaxed
            ">
              "न्याय हमारा आधार, धर्म हमारा मार्ग, सेवा हमारा कर्म और मानव कल्याण हमारा परम उद्देश्य है।"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
