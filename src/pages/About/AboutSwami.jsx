import React, { useState } from "react";
import { Home, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSwami = () => {

  const [language, setLanguage] = useState("hindi");

  const allContent = {
    hindi: {
      heroTitle: "स्वामी जी के बारे में",
      breadcrumb: "स्वामी जी",
      tag: "ॐ श्री चित्रगुप्ताय नमः",
      mainTitle: "जगद्गुरु श्री चित्रगुप्ताचार्य डॉ. स्वामी सच्चिदानन्द चित्रगुप्त पीठाधीश्वर श्री चित्रगुप्त पीठ, वृन्दावन",
      intro: "जगद्गुरु श्री चित्रगुप्ताचार्य डॉ. स्वामी सच्चिदानन्द चित्रगुप्त जी महाराज धर्म, संस्कृति, अध्यात्म एवं समाज सेवा के महान प्रेरणास्रोत हैं।",
      sections: [
        {
          title: "जन्म एवं प्रारंभिक जीवन",
          points: [
            "जगद्गुरु श्री चित्रगुप्ताचार्य डॉ. स्वामी सच्चिदानन्द चित्रगुप्त जी का जन्म चिचित नाम श्री संजीव कुमार सक्सेना के रूप में हुआ।",
            "आपका जन्म 1 अप्रैल 1972 को उत्तर प्रदेश के रायबरेली जनपद में हुआ।",
            "बाल्यकाल से ही आपका मन धर्म, अध्यात्म एवं मानव सेवा के प्रति विशेष रूप से समर्पित था।"
          ]
        },
        {
          title: "मातृ कृपा एवं आध्यात्मिक संस्कार",
          points: [
            "स्वामी जी की पूज्य माताजी श्रीमती शांति देवी स्वर्गमा भगवती की परम उपासका एवं महान साधिका थीं।",
            "समाज में वे 'वीरांगना वाली माता जी' के नाम से प्रसिद्ध थीं।",
            "उनकी कठोर तपस्या, अखण्ड साधना एवं मां भगवती के श्रीचरणों में अटूट भक्ति के परिणामस्वरूप उन्हें स्वामी सच्चिदानन्द जी जैसे दिव्य संत पुत्र की प्राप्ति हुई।",
            "माता श्री के आध्यात्मिक संस्कारों एवं साधना का प्रभाव स्वामी जी के जीवन पर प्रारम्भ से ही स्पष्ट रूप से विद्यमान रहा, जिसने उन्हें धर्म, अध्यात्म और ईश्वर-साक्षात्कार के मार्ग पर अग्रसर किया।"
          ]
        },
        {
          title: "शिक्षा",
          points: [
            "प्रारंभिक शिक्षा: जनपद उन्नाव, उत्तर प्रदेश",
            "माध्यमिक शिक्षा: डी.ए.वी. स्कूल, बरेली, उत्तर प्रदेश",
            "उच्च शिक्षा: विधि (Law) की शिक्षा — महाविद्यालय, लखनऊ, उत्तर प्रदेश"
          ]
        },
        {
          title: "आध्यात्मिक एवं दायिक गुरु",
          points: [
            "स्वामी जी को अनेक महान संतों एवं आध्यात्मिक विभूतियों का सान्निध्य एवं आशीर्वाद प्राप्त हुआ—",
            "• परम पूज्य महर्षि महेश योगी जी — ध्यान एवं अध्यात्म (ट्रांसेंडेंटल मेडिटेशन) के गुरु।",
            "• परम पूज्य अवधूत श्री कपाली जी महाराज।",
            "• परम पूज्य स्वामी दीक्षापान जी महाराज।",
            "• ब्रह्मचारी गौरी शंकराचार्य जी महाराज से दीक्षा एवं आध्यात्मिक मार्गदर्शन प्राप्त किया, जिनकी दिव्य प्रेरणा से अपने पितृपितृ अखाडा के आधार महामण्डलेश्वर के रूप में सनातन धर्म की सेवा की।"
          ]
        },
        {
          title: "प्रेरणास्रोत",
          points: [
            "स्वामी विवेकानन्द",
            "नेताजी सुभाष चंद्र बोस"
          ]
        },
        {
          title: "जीवन का उद्देश्य",
          points: [
            "भगवान श्री चित्रगुप्त जी की महिमा एवं दिव्य स्वरूप का विश्वभर में प्रचार-प्रसार करना।",
            "सनातन धर्म का संरक्षण, संवर्धन एवं प्रचार करना।"
          ]
        },
        {
          title: "पावन संकल्प",
          points: [
            "\"भारत शुद्धीकरण यात्रा\""
          ]
        },
        {
          title: "प्रमुख उद्देश्य",
          points: [
            "विकसित भारत के निर्माण के मार्ग में आने वाली प्रत्येक बाधा—चाहे वह जिहादी मानसिकता की विषैली विचारधारा हो, विदेशी घुसपैठ, सांस्कृतिक प्रदूषण अथवा न्याय व्यवस्था में असमानता—का समूल निवारण कर एक शुद्ध, समरस एवं सनातन भारत की स्थापना करना।"
          ]
        },
        {
          title: "यात्रा के प्रमुख संकल्प",
          points: [
            "1. भारत की सभी पवित्र नदियों का शुद्धीकरण।",
            "2. जल संरक्षण एवं पर्यावरण सुरक्षा।",
            "3. ट्रांसेंडेंटल मेडिटेशन एवं योग के माध्यम से समाज में स्वास्थ्य, शांति एवं आध्यात्मिक जागरण का प्रसार।",
            "4. अधर्म एवं विनाशकारी विचारों का उन्मूलन।"
          ]
        },
        {
          title: "श्री चित्रगुप्त पीठ उपलब्धियाँ एवं संस्थागत योगदान",
          points: [
            "डॉ. स्वामी सच्चिदानन्द चित्रगुप्त जी ने अपना सम्पूर्ण जीवन केवल व्यक्तिगत तप एवं साधना तक सीमित नहीं रखा, बल्कि धर्म के संगठन, समाज जागरण एवं सनातन संस्कृति के पुनरुत्थान के लिए समर्पित कर दिया।"
          ]
        },
        {
          title: "1. श्री चित्रगुप्त पीठ, वृन्दावन (मथुरा)",
          points: [
            "आपके दिव्य नेतृत्व में श्री चित्रगुप्त पीठ की स्थापना भगवान श्री चित्रगुप्त जी की आराधना, महिमा-प्रचार एवं सनातन धर्म के शाश्वत सिद्धांतों के प्रसार हेतु की गई।",
            "यहाँ नियमित रूप से पूजा-अर्चना, यज्ञ, ध्यान, सत्संग, प्रवचन एवं कथा का आयोजन होता है।",
            "पीठ धार्मिक जागरण के साथ-साथ समाज सेवा के विविध कार्यों में भी सक्रिय रूप से संलग्न है।",
            "स्वामी जी सदैव सनातन परिवारों में तलाक की बढ़ती प्रवृत्ति के प्रबल विरोधी रहे हैं।",
            "पीठ के अंतर्गत गठित एक विशेष समिति पारिवारिक विवादों से ग्रस्त दम्पत्तियों के मध्य संवाद एवं समन्वय स्थापित कर परिवारों को पुनः एकजुट करने का सतत प्रयास करती है।"
          ]
        },
        {
          title: "2. श्री चित्रगुप्त अखाडा",
          points: [
            "परम पूज्य स्वामी दीक्षापान जी महाराज के आशीर्वाद से स्थापित यह अखाडा स्वामी जी के मार्गदर्शन में धर्म, न्याय एवं सनातन मूल्यों की रक्षा हेतु कार्यरत है।",
            "अखाडा का प्रमुख उद्देश्य युवाओं को उनकी सांस्कृतिक एवं आध्यात्मिक विरासत से जोड़ना तथा राष्ट्रीय एकता एवं सामाजिक समरसता को सुदृढ़ करना है।"
          ]
        },
        {
          title: "3. धार्मिक एवं सामाजिक अभियान",
          points: [
            "नदियों की स्वच्छता एवं पर्यावरण संरक्षण हेतु नियमित जन-जागरण अभियान।",
            "ट्रांसेंडेंटल मेडिटेशन एवं योग शिविरों का आयोजन, जिनका संचालन कारागारों एवं सुधार गृहों में भी किया जाता है, जिससे शारीरिक, मानसिक एवं आध्यात्मिक स्वास्थ्य का विकास हो।",
            "निबन्ध प्रतियोगिताओं, व्याख्यानों एवं संगोष्ठियों के माध्यम से युवाओं में धर्म, संस्कृति एवं कर्तव्यवानता के संस्कारों का विकास।"
          ]
        },
        {
          title: "4. राष्ट्रीय एवं धार्मिक मंचों पर प्रतिनिधित्व",
          points: [
            "स्वामी जी ने अनेक राष्ट्रीय एवं अंतर्राष्ट्रीय मंचों पर सनातन धर्म, भगवान श्री चित্রगुप्त जी की महिमा तथा मानव सेवा के आदर्शों का प्रभावशाली प्रतिनिधित्व करते हुए विश्वभर के लोगों को प्रेरित किया है।"
          ]
        },
        {
          title: "5. साहित्य एवं आध्यात्मिक योगदान",
          points: [
            "अपने प्रवचनों, लेखन एवं भक्ति रचनाओं के माध्यम से स्वामी जी ने भगवान श्री चित्रगुप्त जी की दिव्य महिमा का व्यापक प्रचार-प्रसार किया।",
            "उनके साहित्य एवं आध्यात्मिक संदेशों ने समाज में आस्था, भक्ति, नैतिकता एवं धर्मबोध को पुनर्जीवित करने में महत्वपूर्ण योगदान दिया है।"
          ]
        },
        {
          title: "समग्र दृष्टिकोण",
          points: [
            "जगद्गुरु श्री चित्रगुप्ताचार्य डॉ. स्वामी सच्चिदानन्द चित्रगुप्त जी का जीवन एक आदिवासी संन्यासी, साधक एवं समाज सुधारक का उत्कृष्ट उदाहरण है।",
            "उन्होंने अपने जीवन से यह सिद्ध किया है कि धर्म केवल पूजा-पद्धति या कर्मकाण्ड तक सीमित नहीं है, बल्कि न्याय, सेवा, करुणा, प्रकृति संरक्षण एवं मानव कल्याण के माध्यम से समाज में साकार होता है।",
            "उनका प्रेरणादायी जीवन आज भी सम्पूर्ण मानवता को धर्मचेतना, करुणा, नैतिकता एवं ईश्वरभक्ति के साथ जीवन जीने की प्रेरणा प्रदान कर रहा है।"
          ]
        }
      ],
      achievements: [
        {
          title: "धर्म प्रचार",
          desc: "सनातन धर्म एवं आध्यात्मिक चेतना का प्रसार।"
        },
        {
          title: "समाज सेवा",
          desc: "मानव सेवा एवं सामाजिक उत्थान हेतु कार्य।"
        },
        {
          title: "आध्यात्मिक शिक्षा",
          desc: "योग, ध्यान एवं आध्यात्मिक ज्ञान का प्रचार।"
        },
        {
          title: "सांस्कृतिक संरक्षण",
          desc: "भारतीय संस्कृति एवं परंपराओं का संरक्षण।"
        },
        {
          title: "युवा प्रेरणा",
          desc: "युवाओं को धर्म एवं नैतिकता की प्रेरणा।"
        },
        {
          title: "मानव कल्याण",
          desc: "समाज में शांति एवं सद्भाव का संदेश।"
        }
      ]
    },
    english: {
      heroTitle: "About Swami Ji",
      breadcrumb: "ABOUT SWAMI",
      tag: "Om Shri Chitraguptaya Namah",
      mainTitle: "Jagadguru Shri Chitraguptacharya Dr. Swami Sachchidanand Chitragupt Peethadhishwar Shri Chitragupt Peeth, Vrindavan",
      intro: "Jagadguru Shri Chitraguptacharya Dr. Swami Sachchidanand Chitragupt Ji Maharaj is a great source of inspiration for religion, culture, spirituality and social service.",
      sections: [
        {
          title: "Birth and Early Life",
          points: [
            "Jagadguru Shri Chitraguptacharya Dr. Swami Sachchidanand Chitragupt Ji was born with the worldly name Shri Sanjeev Kumar Saxena.",
            "He was born on 1st April 1972 in Rai Bareli district, Uttar Pradesh.",
            "Since childhood, his mind was specially dedicated to religion, spirituality and human service."
          ]
        },
        {
          title: "Mother's Grace and Spiritual Sanskars",
          points: [
            "Swami Ji's revered mother Shrimati Shanti Devi Swargiya was a great devotee of Maa Bhagwati.",
            "In society, she was famous as 'Veerangana Wali Mata Ji'.",
            "As a result of her severe penance, continuous sadhana and unwavering devotion at the feet of Maa Bhagwati, she received a divine saint son like Swami Sachchidanand Ji.",
            "The influence of Mata Shri's spiritual values and sadhana was clearly visible on Swami Ji's life from the beginning, which led him on the path of religion, spirituality and God-realization."
          ]
        },
        {
          title: "Education",
          points: [
            "Primary Education: Unnao district, Uttar Pradesh",
            "Secondary Education: D.A.V. School, Bareilly, Uttar Pradesh",
            "Higher Education: Law education — College, Lucknow, Uttar Pradesh"
          ]
        },
        {
          title: "Spiritual and Divine Gurus",
          points: [
            "Swami Ji received the grace and blessings of many great saints and spiritual personalities—",
            "• Param Pujya Maharishi Mahesh Yogi Ji — Guru of meditation and spirituality (Transcendental Meditation).",
            "• Param Pujya Avdhoot Shri Kapali Ji Maharaj.",
            "• Param Pujya Swami Dikshapaan Ji Maharaj.",
            "• Received diksha and spiritual guidance from Brahmachari Gauri Shankaracharya Ji Maharaj, under whose divine inspiration he served Sanatan Dharma as the Mahamandaleshwar of his ancestral akhada."
          ]
        },
        {
          title: "Inspiration",
          points: [
            "Swami Vivekananda",
            "Netaji Subhash Chandra Bose"
          ]
        },
        {
          title: "Life Mission",
          points: [
            "To spread the glory and divine form of Lord Shri Chitragupt Ji throughout the world.",
            "To protect, promote and propagate Sanatan Dharma."
          ]
        },
        {
          title: "Sacred Resolution",
          points: [
            "\"Bharat Shuddhikaran Yatra\""
          ]
        },
        {
          title: "Main Objective",
          points: [
            "To completely eradicate every obstacle in the path of building a developed India—whether it is the poisonous ideology of jihadi mentality, foreign infiltration, cultural pollution or inequality in the justice system—and establish a pure, harmonious and Sanatan India."
          ]
        },
        {
          title: "Key Resolutions of the Yatra",
          points: [
            "1. Purification of all sacred rivers of India.",
            "2. Water conservation and environmental protection.",
            "3. Spreading health, peace and spiritual awakening in society through Transcendental Meditation and Yoga.",
            "4. Eradication of irreligious and destructive ideas."
          ]
        },
        {
          title: "Shri Chitragupt Peeth Achievements and Institutional Contributions",
          points: [
            "Dr. Swami Sachchidanand Chitragupt Ji did not limit his entire life only to personal penance and sadhana, but dedicated it to religious organization, social awakening and revival of Sanatan culture."
          ]
        },
        {
          title: "1. Shri Chitragupt Peeth, Vrindavan (Mathura)",
          points: [
            "Under his divine leadership, Shri Chitragupt Peeth was established for worshiping Lord Shri Chitragupt Ji, spreading His glory and propagating the eternal principles of Sanatan Dharma.",
            "Regular puja-archana, yajna, meditation, satsang, discourses and katha are organized here.",
            "The Peeth is also actively involved in various social service activities along with religious awakening.",
            "Swami Ji has always been a strong opponent of the increasing trend of divorce in Sanatan families.",
            "A special committee formed under the Peeth continuously works to establish dialogue and coordination between couples suffering from family disputes to reunite families."
          ]
        },
        {
          title: "2. Shri Chitragupt Akhada",
          points: [
            "Established with the blessings of Param Pujya Swami Dikshapaan Ji Maharaj, this akhada works under Swami Ji's guidance to protect religion, justice and Sanatan values.",
            "The main objective of the akhada is to connect youth with their cultural and spiritual heritage and to strengthen national unity and social harmony."
          ]
        },
        {
          title: "3. Religious and Social Campaigns",
          points: [
            "Regular public awareness campaigns for cleanliness of rivers and environmental protection.",
            "Organization of Transcendental Meditation and Yoga camps, which are also conducted in jails and reform homes, leading to physical, mental and spiritual health development.",
            "Development of values of religion, culture and responsibility among youth through essay competitions, lectures and seminars."
          ]
        },
        {
          title: "4. Representation on National and Religious Platforms",
          points: [
            "Swami Ji has inspired people all over the world by effectively representing Sanatan Dharma, the glory of Lord Shri Chitragupt Ji and the ideals of human service on many national and international platforms."
          ]
        },
        {
          title: "5. Literature and Spiritual Contribution",
          points: [
            "Through his discourses, writings and devotional compositions, Swami Ji has extensively propagated the divine glory of Lord Shri Chitragupt Ji.",
            "His literature and spiritual messages have made important contributions in reviving faith, devotion, morality and religious consciousness in society."
          ]
        },
        {
          title: "Holistic Vision",
          points: [
            "The life of Jagadguru Shri Chitraguptacharya Dr. Swami Sachchidanand Chitragupt Ji is an excellent example of a traditional sannyasi, sadhak and social reformer.",
            "He has proven through his life that religion is not limited only to worship rituals or ceremonies, but is manifested in society through justice, service, compassion, nature conservation and human welfare.",
            "His inspirational life continues to inspire the entire humanity to live life with religious consciousness, compassion, morality and devotion to God even today."
          ]
        }
      ],
      achievements: [
        {
          title: "Religious Promotion",
          desc: "Promotion of Sanatan Dharma and spiritual awareness."
        },
        {
          title: "Social Service",
          desc: "Working for humanity and social welfare."
        },
        {
          title: "Spiritual Education",
          desc: "Promotion of yoga, meditation and spiritual knowledge."
        },
        {
          title: "Cultural Preservation",
          desc: "Preservation of Indian culture and traditions."
        },
        {
          title: "Youth Inspiration",
          desc: "Inspiring youth towards morality and spirituality."
        },
        {
          title: "Human Welfare",
          desc: "Spreading peace and harmony in society."
        }
      ]
    }
  };

  const content = allContent[language];

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

          {/* TITLE */}

          <h1
            className="
              text-3xl
              md:text-5xl
              font-bold
              text-white
            "
          >
            {content.heroTitle}
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
              {content.breadcrumb}
            </span>

          </div>
        </div>
      </div>

      {/* ================= MAIN SECTION ================= */}

      <div className="max-w-[1300px] mx-auto px-4 lg:px-6 pt-20 pb-16">

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ================= LEFT CONTENT ================= */}

          <div>

            {/* TOP ACTION BAR — language toggle + share placeholder */}

            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              {/* LANGUAGE SWITCHER — SEGMENTED CONTROL */}
              <div className="relative inline-flex items-center p-1.5 rounded-full bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 border border-red-200/80 shadow-[0_10px_30px_-15px_rgba(220,38,38,0.3)]">
                <div
                  className={`
                    absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full
                    bg-gradient-to-r from-red-600 via-orange-500 to-amber-500
                    shadow-lg shadow-orange-500/40
                    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${language === "hindi" ? "left-1.5" : "left-[calc(50%)]"}
                  `}
                />
                <button
                  onClick={() => setLanguage("hindi")}
                  className="relative z-10 px-5 md:px-6 py-2 rounded-full text-sm font-black transition-all duration-300 select-none"
                >
                  <span className={language === "hindi" ? "text-white drop-shadow-sm" : "text-red-700 hover:text-red-800"}>
                    हिंदी
                  </span>
                </button>
                <button
                  onClick={() => setLanguage("english")}
                  className="relative z-10 px-5 md:px-6 py-2 rounded-full text-sm font-black transition-all duration-300 select-none"
                >
                  <span className={language === "english" ? "text-white drop-shadow-sm" : "text-red-700 hover:text-red-800"}>
                    English
                  </span>
                </button>
              </div>

              {/* Decorative स्वास्तिक/ॐ chip */}
              <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-orange-200/70 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500 animate-pulse" />
                <span className="text-[11px] font-black tracking-[0.25em] text-orange-700">
                  {language === "hindi" ? "॥ श्री गुरुर्देवो नमः ॥" : "॥ SHRI GURU DEVAH NAMAH ॥"}
                </span>
              </div>
            </div>

            {/* TAG */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4 py-2
                rounded-full
                bg-gradient-to-r from-red-50 to-orange-50
                border border-red-200
                text-red-600
                text-[12px]
                font-bold
                tracking-wide
                mb-6
              "
            >
              <Star size={14} className="text-orange-500" />
              {content.tag}
              <Star size={14} className="text-orange-500" />
            </div>

            {/* TITLE */}

            <h2
              className="
                text-[24px]
                md:text-[34px]
                font-black
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-red-600
                to-orange-500
                leading-tight
                mb-6
              "
            >
              {content.mainTitle}
            </h2>

            {/* INTRO BOX — REFINED NEW UI */}

            <div
              className="
                bg-gradient-to-br
                from-white
                via-orange-50/30
                to-amber-50
                rounded-[2rem]
                p-7
                border
                border-amber-100
                shadow-[0_20px_60px_-20px_rgba(220,38,38,0.25)]
                relative
                overflow-hidden
                group
              "
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-red-400/20 via-orange-400/15 to-transparent blur-3xl" />
              <div className="absolute -bottom-20 -left-10 w-44 h-44 rounded-full bg-gradient-to-tr from-amber-400/20 via-yellow-300/10 to-transparent blur-3xl" />

              <p
                className="
                  relative
                  text-gray-800
                  leading-[1.9]
                  text-[15px] md:text-base
                  font-medium
                "
              >
                {content.intro}
              </p>

              <div className="relative mt-5 flex items-center gap-3 opacity-80">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
                <span className="text-xl text-orange-500 font-black tracking-widest">॥ ॐ ॥</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
              </div>

            </div>

            {/* CONTENT — COMPLETE NEW 3-COL CARD UI WITH NUMBER + VERTICAL ACCENT */}

        

            {/* Decorative section-end ॐ divider */}
            <div className="mt-16 flex flex-col items-center gap-3">
              <div className="flex items-center gap-4 w-full max-w-lg">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-orange-400 to-red-500" />
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/30 animate-[spin_18s_linear_infinite]">
                  <span className="text-xl md:text-2xl font-black">ॐ</span>
                </div>
                <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-orange-400 to-red-500" />
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}

          <div className="relative lg:sticky lg:top-8 space-y-6">

            {/* IMAGE CARD — PREMIUM GLOW FRAME */}

            <div
              className="
                relative
                rounded-[2rem]
                p-[3px]
                overflow-hidden
                shadow-2xl
              "
            >
              {/* Animated spinning gradient border */}
              <div
                className="absolute -inset-x-10 -inset-y-24 opacity-90"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, #dc2626 0deg, #f97316 90deg, #f59e0b 180deg, #f97316 270deg, #dc2626 360deg)',
                  animation: 'spin 8s linear infinite',
                }}
              />

              <div className="relative rounded-[1.85rem] overflow-hidden border-[6px] border-white bg-white">

                <img
                  src="/New folder/swamiji.jpg"
                  alt="Swami Ji"
                  className="
                    w-full
                    h-[480px]
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-[1.06]
                  "
                />

                {/* Decorative corner */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-30 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full opacity-30 blur-3xl pointer-events-none" />

                {/* Bottom gradient overlay with name plate */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-5 md:p-6">
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/40 flex-shrink-0">
                      <span className="text-xl font-black">ॐ</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-white font-black text-base md:text-lg leading-tight">
                        {language === "hindi"
                          ? "स्वामी श्री चित्रगुप्तानंद जी"
                          : "Swami Shri Chitraguptanand Ji"}
                      </h5>
                      <p className="text-orange-200 text-[11px] md:text-xs font-semibold tracking-wide mt-0.5">
                        {language === "hindi"
                          ? "पीठाधीश्वर · श्री चित्रगुप्त पीठ, वृन्दावन"
                          : "Peethadhishwar · Shri Chitragupt Peeth, Vrindavan"}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* STATS & INFO CARDS — FILL EMPTY SPACE */}

            <div className="grid grid-cols-2 gap-4">

              {/* 50+ YEARS */}
              <div
                className="
                  bg-gradient-to-br from-white to-gray-50
                  rounded-2xl
                  shadow-xl
                  p-5
                  border
                  border-orange-100
                  flex flex-col
                "
              >
                <h4
                  className="
                    text-3xl
                    font-black
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r from-red-600 to-orange-500
                  "
                >
                  50+
                </h4>
                <p
                  className="
                    mt-2
                    text-gray-700
                    text-sm
                    leading-relaxed
                    font-semibold
                  "
                >
                  {language === "hindi"
                    ? "वर्षों से धर्म एवं समाज सेवा में समर्पित।"
                    : "Years dedicated to spirituality and service."}
                </p>
              </div>

              {/* PEETH TITLE */}
              <div
                className="
                  bg-gradient-to-br from-orange-50 to-red-50
                  rounded-2xl
                  shadow-xl
                  p-5
                  border
                  border-orange-100
                  flex flex-col
                "
              >
                <h4
                  className="
                    text-base md:text-lg
                    font-black
                    text-red-600
                    mb-2
                    leading-tight
                  "
                >
                  {language === "hindi" ? "ॐ श्री चित्रगुप्ताय" : "Om Shri Chitraguptaya"}
                </h4>
                <p
                  className="
                    text-gray-700
                    text-xs md:text-sm
                    font-semibold
                    leading-relaxed
                  "
                >
                  {language === "hindi" ? "पीठाधीश्वर, वृन्दावन" : "Peethadhishwar, Vrindavan"}
                </p>
              </div>

           

           


            </div>
          </div>
        </div>

        {/* ================= ACHIEVEMENTS ================= */}

        <div className="mt-28 relative">

          {/* TITLE */}

          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-full max-w-2xl h-32 rounded-full bg-gradient-to-b from-orange-200/30 via-rose-200/20 to-transparent blur-3xl" />
            </div>

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 border border-red-200/70 mb-8 shadow-sm">
              <span className="h-1 w-10 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-amber-500" />
              <span className="text-[11px] md:text-xs font-black tracking-[0.25em] text-red-700">
                {language === "hindi" ? "उपलब्धियाँ एवं सेवाएँ" : "ACHIEVEMENTS & SERVICES"}
              </span>
              <span className="h-1 w-10 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
            </div>

            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-[2px] w-20 md:w-28 bg-gradient-to-r from-transparent via-orange-400 to-red-500" />
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500 opacity-25 blur-md" />
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                  <span className="text-2xl md:text-3xl font-black">ॐ</span>
                </div>
              </div>
              <div className="h-[2px] w-20 md:w-28 bg-gradient-to-l from-transparent via-orange-400 to-red-500" />
            </div>

            <h2
              className="
                text-3xl
                md:text-5xl
                font-black
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-red-700
                via-red-600
                to-orange-500
                leading-[1.1]
              "
            >
              {language === "hindi"
                ? "प्रमुख योगदान एवं कार्य"
                : "Major Contributions"}
            </h2>

          </div>

          {/* GRID — NEW UI matching section cards */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7 relative">

            {content.achievements.map((item, index) => {
              const accents = [
                "from-red-500 via-rose-500 to-orange-500",
                "from-orange-500 via-amber-500 to-yellow-500",
                "from-rose-500 via-red-500 to-orange-500",
                "from-amber-500 via-orange-500 to-red-500",
                "from-red-500 via-orange-500 to-amber-500",
                "from-orange-500 via-red-500 to-rose-500",
              ];
              const accent = accents[index % accents.length];
              const hindiLetters = ["ॐ", "श्री", "राम", "सीता", "हरि", "गुरु"];
              const letter = hindiLetters[index % hindiLetters.length];

              return (
                <div
                  key={index}
                  className="
                    group/card
                    relative
                    bg-gradient-to-br
                    from-white
                    to-orange-50/40
                    rounded-[1.7rem]
                    p-[1px]
                    hover:-translate-y-2
                    hover:rotate-[0.1deg]
                    hover:shadow-[0_30px_60px_-25px_rgba(220,38,38,0.35)]
                    transition-all
                    duration-500
                    ease-out
                    shadow-xl
                  "
                >
                  <div
                    className={`
                      absolute inset-0 rounded-[1.7rem] opacity-70 group-hover/card:opacity-100 transition-opacity duration-500
                      bg-gradient-to-br ${accent}
                    `}
                    style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}
                  />

                  <div className="relative bg-white rounded-[1.6rem] p-6 md:p-7 h-full overflow-hidden">

                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-[0.05] transition-opacity duration-700 pointer-events-none"
                      style={{ backgroundImage: 'repeating-linear-gradient(135deg, #dc2626 0, #dc2626 1px, transparent 0, transparent 14px)' }}
                    />

                    {/* ICON */}
                    <div className="relative mb-6">
                      <div
                        className={`
                          relative
                          w-16 h-16 md:w-[72px] md:h-[72px]
                          rounded-[1.4rem]
                          bg-gradient-to-br ${accent}
                          flex
                          items-center
                          justify-center
                          text-white
                          font-black
                          shadow-xl
                          group-hover/card:scale-110 group-hover/card:-rotate-6
                          transition-transform duration-500
                        `}
                      >
                        <span className="text-2xl md:text-3xl">{letter}</span>
                        <div className={`absolute -inset-1 rounded-[1.4rem] bg-gradient-to-br ${accent} opacity-50 blur-xl -z-10`} />
                      </div>
                    </div>

                    <h3
                      className={`
                        text-xl md:text-2xl
                        font-black
                        mb-4
                        leading-tight
                        text-transparent bg-clip-text
                        bg-gradient-to-r ${accent}
                      `}
                    >
                      {item.title}
                    </h3>

                    <p className="text-gray-700 text-[15px] md:text-base leading-[1.85]">
                      {item.desc}
                    </p>

                    <div className="relative mt-6 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 text-xs font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r ${accent} group-hover/card:translate-x-1 transition-transform duration-300`}>
                        श्री गुरुदेव कृपा
                        <ChevronRight size={14} />
                      </span>
                      <div className={`h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent ${accent}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= INSTITUTIONAL / संस्थागत योगदान ================= */}

        <div className="mt-28 relative">

          {/* TITLE */}

          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-full max-w-2xl h-32 rounded-full bg-gradient-to-b from-amber-200/30 via-orange-200/20 to-transparent blur-3xl" />
            </div>

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border border-orange-200/70 mb-8 shadow-sm">
              <span className="h-1 w-10 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
              <span className="text-[11px] md:text-xs font-black tracking-[0.25em] text-orange-700">
                {language === "hindi" ? "संस्थागत योगदान" : "INSTITUTIONAL LEGACY"}
              </span>
              <span className="h-1 w-10 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-amber-500" />
            </div>

            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-[2px] w-20 md:w-28 bg-gradient-to-r from-transparent via-red-500 to-orange-500" />
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 opacity-25 blur-md" />
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-amber-600 via-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                  <span className="text-2xl md:text-3xl font-black">श्री</span>
                </div>
              </div>
              <div className="h-[2px] w-20 md:w-28 bg-gradient-to-l from-transparent via-red-500 to-orange-500" />
            </div>

            <h2
              className="
                text-3xl
                md:text-5xl
                font-black
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-orange-700
                via-red-600
                to-rose-600
                leading-[1.1]
              "
            >
              {language === "hindi"
                ? "संस्थागत योगदान एवं उपलब्धियाँ"
                : "Institutional Contributions"}
            </h2>
          </div>

          {/* GRID — EXACT SAME PREMIUM ACHIEVEMENT CARD STYLE */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7 relative">

            {content.sections.slice(8).map((section, index) => {
              const accents = [
                "from-amber-500 via-orange-500 to-red-500",
                "from-red-500 via-rose-500 to-amber-500",
                "from-orange-500 via-amber-500 to-red-500",
                "from-rose-500 via-red-500 to-orange-500",
                "from-amber-500 via-red-500 to-rose-500",
                "from-orange-500 via-red-500 to-amber-500",
                "from-red-500 via-orange-500 to-amber-500",
                "from-rose-500 via-amber-500 to-red-500",
              ];
              const accent = accents[index % accents.length];
              const hindiLetters = ["स्वा", "मी", "चि", "त्र", "गुप्त", "श्री", "पीठ", "धर्म"];
              const letter = hindiLetters[index % hindiLetters.length];

              return (
                <div
                  key={index}
                  className="
                    group/card
                    relative
                    bg-gradient-to-br
                    from-white
                    via-orange-50/30
                    to-amber-50/60
                    rounded-[1.7rem]
                    p-[1px]
                    hover:-translate-y-2
                    hover:rotate-[0.1deg]
                    hover:shadow-[0_30px_60px_-25px_rgba(234,88,12,0.4)]
                    transition-all
                    duration-500
                    ease-out
                    shadow-xl
                  "
                >
                  <div
                    className={`
                      absolute inset-0 rounded-[1.7rem] opacity-70 group-hover/card:opacity-100 transition-opacity duration-500
                      bg-gradient-to-br ${accent}
                    `}
                    style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }}
                  />

                  <div className="relative bg-white rounded-[1.6rem] p-6 md:p-7 h-full overflow-hidden">

                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-[0.05] transition-opacity duration-700 pointer-events-none"
                      style={{ backgroundImage: 'repeating-linear-gradient(135deg, #ea580c 0, #ea580c 1px, transparent 0, transparent 14px)' }}
                    />

                    {/* ICON SQUARE */}
                    <div className="relative mb-6">
                      <div
                        className={`
                          relative
                          w-16 h-16 md:w-[72px] md:h-[72px]
                          rounded-[1.4rem]
                          bg-gradient-to-br ${accent}
                          flex
                          items-center
                          justify-center
                          text-white
                          font-black
                          shadow-xl
                          group-hover/card:scale-110 group-hover/card:-rotate-6
                          transition-transform duration-500
                        `}
                      >
                        <span className="text-xl md:text-2xl font-black tracking-tighter">{letter}</span>
                        <div className={`absolute -inset-1 rounded-[1.4rem] bg-gradient-to-br ${accent} opacity-50 blur-xl -z-10`} />
                      </div>
                    </div>

                    {/* TITLE */}
                    <h3
                      className={`
                        text-xl md:text-2xl
                        font-black
                        mb-4
                        leading-tight
                        text-transparent bg-clip-text
                        bg-gradient-to-r ${accent}
                      `}
                    >
                      {section.title}
                    </h3>

                    {/* POINTS LIST with gradient bullets (jo sections hai unke multiple points hain — isliye list format) */}
                    <ul className="space-y-3 relative">
                      {section.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="
                            text-gray-700
                            leading-[1.85]
                            text-[15px] md:text-base
                            flex
                            items-start
                            gap-2.5
                            group/point
                          "
                        >
                          <span
                            className={`
                              mt-[9px] inline-block w-2 h-2 rounded-full flex-shrink-0
                              bg-gradient-to-br ${accent}
                              shadow-[0_0_0_4px_rgba(251,146,60,0.1)]
                              group-hover/point:scale-150 group-hover/point:rotate-45
                              transition-all duration-300
                            `}
                          />
                          <span className="group-hover/point:text-gray-900 transition-colors duration-200">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="relative mt-7 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 text-[11px] md:text-xs font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r ${accent} group-hover/card:translate-x-1 transition-transform duration-300`}>
                        जय श्री चित्रगुप्त
                        <ChevronRight size={14} />
                      </span>
                      <div className={`h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent ${accent}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutSwami;