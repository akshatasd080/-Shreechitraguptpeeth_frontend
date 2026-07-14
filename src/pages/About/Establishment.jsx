import React from "react";
import { Home, Calendar, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Establishment = () => {
  const timelineItems = [
    {
      title: "दिव्य संकल्प का प्रारंभ",
      desc: "पूज्य जगतगुरु श्री चित्रगुप्ताचार्य डॉ. स्वामी सच्चिदानन्द जी के बाल्काल में ही अंकुरित हुए दिव्य संकल्प।",
      icon: "seed"
    },
    {
      title: "प्रतिष्ठा का शुभारंभ",
      desc: "गुप्त नवरात्रि के पावन अवसर पर भगवान श्री चित्रगुप्त जी की दिव्य प्रतिमा की प्रतिष्ठा सम्पन्न।",
      icon: "calendar"
    },
    {
      title: "भूमि पूजन",
      desc: "मकर संक्रांति के पावन पर्व पर ब्रज शांति कुंज आश्रम, वृन्दावन में भव्य भूमि पूजन सम्पन्न।",
      icon: "home"
    },
    {
      title: "शिला पूजन",
      desc: "अक्षय तृतीया के शुभ अवसर पर भव्य शिला पूजन और आधारशिला का स्थापन।",
      icon: "building"
    }
  ];

  return (
    <div className="w-full bg-[#fffaf7] overflow-hidden">

      {/* HERO SECTION */}
      <div
        className="
          relative
          w-full
          h-[220px]
          md:h-[280px]
          lg:h-[340px]
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: "url('/New folder/subheader1.jpg')",
        }}
      >

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-orange-900/50" />

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
            px-4
          "
        >

          {/* TITLE */}
          <h1
            className="
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-black
              drop-shadow-lg
            "
          >
            श्री चित्रगुप्त पीठ की स्थापना
          </h1>

          {/* BREADCRUMB */}
          <div
            className="
              absolute
              -bottom-6
              bg-white
              rounded-full
              shadow-xl
              px-6
              py-3
              flex
              items-center
              gap-3
              border border-orange-100
            "
          >
            <Link
              to="/"
              className="
                flex items-center gap-2
                hover:text-red-500
                transition-all
                text-gray-700
                font-semibold text-[13px]
              "
            >
              <Home size={15} />
              HOME
            </Link>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span className="font-semibold text-red-500 text-[13px]">
              ESTABLISHMENT
            </span>
          </div>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="max-w-[1350px] mx-auto px-5 lg:px-8 pt-20 pb-16">

        {/* QUOTE SECTION */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-red-50 to-orange-50 border border-orange-200 rounded-3xl px-10 py-8 shadow-2xl">
            <div className="text-6xl mb-4">ॐ</div>
            <p className="text-gray-700 text-lg font-medium leading-relaxed">
              "सत्य, धर्म, न्याय, कर्तव्य एवं करुणा" — यही हमारा मूल उद्देश्य है
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1">
            {/* SMALL TITLE */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-500 text-lg">ॐ</span>
              <span className="uppercase tracking-wide text-red-500 font-bold text-[12px]">
                ESTABLISHMENT OF SHREE CHITRAGUPT PEETH
              </span>
            </div>

            {/* HEADING */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 leading-tight mb-8">
              श्री चित्रगुप्त पीठ की स्थापना
            </h2>

            {/* MAIN TEXT */}
            <div className="space-y-6 text-gray-700 text-[15px] leading-relaxed">
              <p>
                भगवान श्री चित्रगुप्त जी, जिन्हें समस्त प्राणियों के कर्मों का निष्पक्ष लेखा-जोखा रखनेवाले, धर्मराज, बुद्धि-विधाता, लेखनी-दाता तथा न्याय के सर्वोच्च अधिष्ठाता देव के रूप में पूजा जाता है, उनकी दिव्य महिमा के प्रचार-प्रसार तथा सनातन धर्म के पुनर्जागरण के पावन उद्देश्य से श्री चित्रगुप्त पीठ की स्थापना का संकल्प चलाया गया।
              </p>

              <p>
                धार्मिक, आध्यात्मिक एवं सांस्कृतिक दृष्टि से परम पवित्र श्री वृन्दावन-गोवर्धन धाम, ब्रजभूमि स्थित ब्रज शांति कुंज आश्रम में स्थापित यह पीठ भगवान श्री चित्रगुप्त जी के समर्पित विश्व की प्रथम आध्यात्मिक एवं सांस्कृतिक पीठ के रूप में प्रतिष्ठित हो रही है।
              </p>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
                <p className="font-semibold">
                  श्री चित्रगुप्त पीठ की स्थापना का मूल उद्देश्य केवल भगवान श्री चित्रगुप्त जी की आराधना तक सीमित नहीं है, बल्कि उनके न्याय, सत्य, धर्म और कर्तव्यनिष्ठा के दिव्य संदेश को सम्पूर्ण मानव समाज तक पहुँचाना है।
                </p>
              </div>

              <p>
                यह पीठ भारतीय वैदिक एवं सनातन गुरुकुल परंपरा के संरक्षण, संवर्धन और वैश्विक प्रचार-प्रसार का भी एक सशक्त केंद्र है। इसके माध्यम से धर्म, अध्यात्म, संस्कार, शिक्षा, योग, ध्यान, पर्यावरण संरक्षण, सामाजिक समरसता तथा मानव सेवा जैसे मूल्यों को समाज में स्थापित करने का सतत प्रयास किया जा रहा है।
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="bg-white p-4 border border-orange-100 shadow-2xl rounded-3xl overflow-hidden w-full max-w-[600px]">
              <img
                src="/New folder/sec1.jpg"
                alt="Shree Chitragupt Peeth"
                className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* TIMELINE / HISTORY SECTION */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              पीठ की स्थापना का इतिहास
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8">
            <div className="space-y-8 text-gray-700 text-[15px] leading-relaxed">
              <p>
                इस दिव्य संकल्प के बीज पूज्य जगतगुरु श्री चित्रगुप्ताचार्य डॉ. स्वामी सच्चिदानन्द जी के बाल्काल में ही अंकुरित हो चुके थे। उनकी पूज्य माता श्री श्रीमती शांति देवी, जो माँ भगवती की अनन्य उपासका थीं और उन्नाव जनपद में "वीरांगना वाली माता" के नाम से विख्यात थीं, उनके आध्यात्मिक संस्कारों तथा पूज्य पिता श्री श्री बृज बहादुर सक्सेना की प्रेरणा ने इस महान संकल्प को जीवन का ध्येय बना दिया। बाल्काल से ही स्वामी जी के मन में भगवान श्री चित्रगुप्त जी की महिमा को विश्वभर में स्थापित करने तथा सनातन संस्कृति के पुनर्जागरण हेतु एक दिव्य पीठ की स्थापना का संकल्प दृढ़ होता गया।
              </p>

              <p>
                इस संकल्प को विधिवत रूप प्रदान करने के लिए गुप्त नवरात्रि के पावन अवसर पर गोविंदपुरम, गाजियाबाद में हरिश्चंद्र घाट, काशी के प्रमुख एवं श्री सत्यनाथ मठ, कादीपुर (सुल्तानपुर) के पीठाधीश्वर परम पूज्य अवधूत श्री कपाली जी महाराज के करकमलों द्वारा भगवान श्री चित्रगुप्त जी की दिव्य प्रतिमा की प्रतिष्ठा सम्पन्न हुई। उसी अवसर पर काशी से पधारे विद्वान आचार्यों, संत-महाराजों एवं धर्मराजों की साक्षी में पूर्ण वैदिक विधि-विधान से यह संकल्प कराया गया कि शीघ्र ही किसी दिव्य एवं पवित्र स्थल पर भगवान श्री चित्रगुप्त जी की प्रथम वैश्विक पीठ की स्थापना की जाएगी। इसी शुभ अवसर पर संत समाज एवं विद्वानों ने श्री संजीव सक्सेना को श्री चित्रगुप्त पीठ का प्रथम पीठाधीश्वर नियुक्त कर इस महान दायित्व को पूर्ण करने का आशीर्वाद प्रदान किया।
              </p>

              <p>
                इसके उपरांत मकर संक्रांति के पावन पर्व पर ब्रज शांति कुंज आश्रम, ग्राम जुलहेंदी, वृन्दावन में पशुपति अखाडा (नेपाल) के संतों, महर्षि महेश योगी वैदिक विश्वविद्यालय के कुलपति श्री अजय प्रकाश श्रीवास्तव, देश-विदेश से पधारे संतों, विद्वानों तथा हजारों श्रद्धालुओं की पावन उपस्थिति में श्री चित्रगुप्त पीठ का भव्य भूमि पूजन सम्पन्न हुआ, जिसके साथ इस दिव्य परियोजना का विधिवत शुभारंभ हुआ।
              </p>

              <p>
                तत्पश्चात अक्षय तृतीया के शुभ अवसर पर परम पूज्य ब्रह्मचारी गौरी शंकराचार्य जी महाराज, श्री कृष्णानन्द जी महाराज, अवधेशानन्द जी महाराज, योग गुरु सच्चिदानन्द जी महाराज, विद्रु परिषद, चिन्नार अखाडा के संतों तथा श्री सत्यनाथ मठ के पीठाधीश्वर परम पूज्य अवधूत श्री कपाली जी महाराज सहित देश-विदेश से पधारे श्रद्धालुओं की गरिमामयी उपस्थिति में भव्य शिला पूजन सम्पन्न हुआ। इसी पावन अनुष्ठान के साथ श्री चित्रगुप्त पीठ के मंदिर की आधारशिला रखी गई और निर्माण कार्य का शुभारंभ हुआ।
              </p>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-orange-200 mt-6">
                <p className="text-lg font-semibold">
                  आज श्री चित्रगुप्त पीठ के लिए एक मंदिर या धार्मिक संस्थान नहीं, बल्कि सनातन धर्म, न्याय, संस्कृति, शिक्षा, आध्यात्मिक जागृति एवं मानव सेवा का एक जीवंत केंद्र बनकर विकसित हो रहा है। यह पीठ भगवान श्री चित्रगुप्त जी के दिव्य आदेशों—सत्य, धर्म, न्याय, कर्तव्य एवं करुणा—को जन-जन तक पहुँचाने के साथ-साथ भारतीय वैदिक संस्कृति को विश्व मंच पर प्रतिष्ठित करने के अपने पावन संकल्प की ओर निरंतर अग्रसर है। जगतगुरु श्री चित्रगुप्ताचार्य डॉ. स्वामी सच्चिदानन्द जी पीठाधीश्वर के दिव्य मार्गदर्शन में यह पीठ आनेवाली पीढ़ियों के लिए धर्म, संस्कार, राष्ट्रसेवा और आध्यात्मिक चेतना का एक प्रेरणास्रोत बनने की दिशा में निरंतर कार्यरत है।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KEY MILESTONES SECTION */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-xl border border-orange-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                <span className="text-3xl">{item.icon === "seed" && "🌱"}{item.icon === "calendar" && "📅"}{item.icon === "home" && "🏡"}{item.icon === "building" && "🏛️"}</span>
              </div>
              <h4 className="text-lg font-black text-gray-800 mb-2 text-center">{item.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Establishment;
