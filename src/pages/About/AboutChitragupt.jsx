import React from "react";
import { Home, Scale, Feather, BookOpen, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

const qualities = [
  {
    title: "धर्मराज",
    desc: "समस्त प्राणियों के कर्मों का निष्पक्ष लेखा-जोखा रखने वाले न्याय के अधिष्ठाता देव।",
    icon: Scale,
  },
  {
    title: "लेखनी-दाता",
    desc: "ब्रह्मा के अंशस्वरूप लेखनी-दाता, बुद्धि एवं विद्या के प्रदाता भगवान श्री चित्रगुप्त जी।",
    icon: Feather,
  },
  {
    title: "कर्म-विधाता",
    desc: "प्रत्येक जीव के कर्मों के अनुसार फल देने वाले दिव्य विधाता।",
    icon: BookOpen,
  },
  {
    title: "करुणा स्वरूप",
    desc: "सत्य, धर्म, न्याय, कर्तव्य एवं करुणा के दिव्य संदेश के प्रतीक।",
    icon: HeartHandshake,
  },
];

const AboutChitragupt = () => {
  return (
    <div className="w-full overflow-hidden bg-[#fffaf7]">
      {/* HERO */}
      <div
        className="relative h-[220px] w-full bg-cover bg-center bg-no-repeat md:h-[280px] lg:h-[340px]"
        style={{
          backgroundImage: "url('/New folder/subheader1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/55 to-orange-900/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-white">
          <h1 className="text-center text-3xl font-black drop-shadow-lg md:text-4xl lg:text-5xl">
            भगवान श्री चित्रगुप्त जी
          </h1>

          <div className="absolute -bottom-6 max-w-[calc(100%-1.5rem)] flex items-center gap-2 sm:gap-3 rounded-full border border-orange-100 bg-white px-4 sm:px-6 py-2.5 sm:py-3 shadow-xl text-xs sm:text-sm flex-wrap justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-[13px] font-semibold text-gray-700 transition-all hover:text-red-500"
            >
              <Home size={15} />
              HOME
            </Link>
            <div className="h-1 w-1 rounded-full bg-gray-400" />
            <span className="text-[13px] font-semibold text-red-500">
              ABOUT SHRI CHITRAGUPT JI
            </span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="mx-auto max-w-[1350px] px-5 pb-16 pt-20 lg:px-8">
        {/* Quote */}
        <div className="mb-16 text-center">
          <div className="inline-block rounded-3xl border border-orange-200 bg-gradient-to-r from-red-50 to-orange-50 px-10 py-8 shadow-2xl">
            <div className="mb-4 text-6xl text-red-500">ॐ</div>
            <p className="text-lg font-medium leading-relaxed text-gray-700">
              ॐ श्री चित्रगुप्ताय नमः — सत्य, धर्म, न्याय, कर्तव्य एवं करुणा
            </p>
          </div>
        </div>

        <div className="mb-20 grid items-start gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg text-red-500">ॐ</span>
              <span className="text-[12px] font-bold uppercase tracking-wide text-red-500">
                About Shri Chitragupt Ji
              </span>
            </div>

            <h2 className="mb-8 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-2xl font-black leading-tight text-transparent md:text-3xl lg:text-4xl">
              ब्रह्मा लेखनी-दाता भगवान श्री चित्रगुप्त जी
            </h2>

            <div className="space-y-6 text-[15px] leading-relaxed text-gray-700">
              <p>
                भगवान श्री चित्रगुप्त जी समस्त प्राणियों के कर्मों का निष्पक्ष
                लेखा-जोखा रखने वाले धर्मराज, बुद्धि-विधाता, लेखनी-दाता तथा न्याय
                के सर्वोच्च अधिष्ठाता देव के रूप में पूजे जाते हैं। धार्मिक
                ग्रंथों में उन्हें ब्रह्मा के अंशस्वरूप तथा कर्मफल के दिव्य
                निर्णायक के रूप में वर्णित किया गया है।
              </p>

              <p>
                समस्त प्राणियों को उनके कर्मों के आधार पर फल देने वाले देवता
                ब्रह्मा लेखनी-दाता भगवान श्री चित्रगुप्त की महिमा वेद, पुराण एवं
                सनातन परंपरा में विशेष रूप से प्रतिष्ठित है। वे सत्य, धर्म और
                न्याय की दिव्य चेतना के प्रतीक हैं।
              </p>

              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-red-50 p-6">
                <p className="font-semibold text-gray-800">
                  श्री वृन्दावन धाम की पावन भूमि पर स्थापित हो रही श्री चित्रगुप्त
                  पीठ भगवान श्री चित्रगुप्त जी को समर्पित विश्व की प्रथम
                  आध्यात्मिक, सांस्कृतिक एवं वैदिक पीठ है — धर्म, न्याय, संस्कार
                  एवं सनातन संस्कृति के संरक्षण और वैश्विक प्रचार हेतु समर्पित।
                </p>
              </div>

              <p>
                यह पीठ केवल मंदिर निर्माण तक सीमित नहीं है, अपितु भगवान श्री
                चित्रगुप्त जी के दिव्य संदेश — सत्य, धर्म, न्याय, कर्तव्य एवं
                करुणा — को जन-जन तक पहुँचाने तथा सनातन संस्कृति की अमूल्य विरासत
                को आने वाली पीढ़ियों तक संरक्षित रखने का पावन संकल्प है।
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="w-full max-w-[560px] overflow-hidden rounded-3xl border border-orange-100 bg-white p-4 shadow-2xl">
              <img
                src="/About/about1.jpg"
                alt="भगवान श्री चित्रगुप्त जी"
                className="h-full w-full rounded-2xl object-cover transition-all duration-700 hover:scale-105"
              />
              <p className="mt-4 text-center text-sm font-semibold text-stone-600">
                भगवान श्री चित्रगुप्त जी — धर्मराज एवं लेखनी-दाता
              </p>
            </div>
          </div>
        </div>

        {/* Qualities */}
        <div className="mb-16">
          <div className="mb-10 text-center">
            <h3 className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-2xl font-black text-transparent md:text-3xl">
              दिव्य स्वरूप एवं महिमा
            </h3>
            <p className="mt-3 text-gray-600">
              भगवान श्री चित्रगुप्त जी के शाश्वत गुण एवं दिव्य भूमिका
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {qualities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-orange-100 bg-white p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="mb-2 text-center text-lg font-black text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-center text-sm leading-relaxed text-gray-600">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing highlight */}
        <div className="rounded-3xl border border-orange-200 bg-white p-8 shadow-xl md:p-10">
          <h3 className="mb-5 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-xl font-black text-transparent md:text-2xl">
            पीठ का पावन उद्देश्य
          </h3>
          <div className="space-y-5 text-[15px] leading-relaxed text-gray-700">
            <p>
              श्री चित्रगुप्त पीठ की स्थापना का मूल उद्देश्य केवल भगवान श्री
              चित्रगुप्त जी की आराधना तक सीमित नहीं है, बल्कि उनके न्याय, सत्य,
              धर्म और कर्तव्यनिष्ठा के दिव्य संदेश को सम्पूर्ण मानव समाज तक
              पहुँचाना है।
            </p>
            <p>
              यहाँ नियमित पूजा-अर्चना, यज्ञ, ध्यान, सत्संग एवं कथा के साथ-साथ
              शिक्षा, सेवा, योग, पर्यावरण संरक्षण तथा पारिवारिक मूल्यों के
              संवर्धन का सतत प्रयास किया जा रहा है — ताकि सनातन संस्कृति विश्व
              मंच पर प्रतिष्ठित हो।
            </p>
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-red-50 to-orange-50 p-6 md:p-8">
              <p className="text-lg font-semibold text-gray-800">
                जगद्गुरु श्री चित्रगुप्ताचार्य डॉ. स्वामी सच्चिदानन्द जी के दिव्य
                मार्गदर्शन में यह पीठ धर्म, संस्कार, राष्ट्रसेवा और आध्यात्मिक
                चेतना का प्रेरणास्रोत बनने की दिशा में निरंतर कार्यरत है।
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/about-peeth"
              className="rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:brightness-110"
            >
              About Peeth
            </Link>
            <Link
              to="/establishment"
              className="rounded-xl border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-orange-50"
            >
              Establishment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutChitragupt;
