import React, { useState } from "react";
import {
  Home,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  MessageSquare,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";

const Member = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    profession: "",
    experience: "",
    skills: "",
    message: "",
    image: null,
  });

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Membership Request Submitted Successfully!");
  };

  return (
    <div className="w-full bg-[#f8f8f8] overflow-hidden">

      {/* =========================================
                  HERO SECTION
      ========================================= */}
      <div
        className="
          relative
          w-full
          h-[320px]
          md:h-[430px]
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
            Join Our Team
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
            Become A Member
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
              MEMBER REQUEST
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
                  MAIN SECTION
      ========================================= */}
      <div className="max-w-[1650px] mx-auto px-5 lg:px-10 pt-32 pb-24">

        <div className="grid xl:grid-cols-5 gap-10 items-start">

          {/* =========================================
                    LEFT CONTENT
          ========================================= */}
          <div className="xl:col-span-2">

            {/* TAG */}
            <span
              className="
                inline-flex
                items-center
                gap-2
                px-5 py-3
                rounded-full
                bg-red-50
                border border-red-100
                text-red-500
                font-bold
                tracking-[2px]
                text-sm
              "
            >
              ✨ JOIN OUR FAMILY
            </span>

            {/* TITLE */}
            <h2
              className="
                mt-7
                text-[40px]
                md:text-[65px]
                font-black
                text-[#ff3300]
                leading-tight
              "
            >
              Become A
              <br />
              Team Member
            </h2>

            {/* DESC */}
            <p
              className="
                mt-8
                text-gray-600
                leading-[2]
                text-[18px]
              "
            >
              श्री चित्रगुप्त पीठ के साथ जुड़कर धर्म,
              संस्कृति एवं समाज सेवा के दिव्य कार्यों में
              अपना योगदान दें।
            </p>

            {/* INFO CARDS */}
            <div className="mt-12 space-y-6">

              {/* CARD */}
              <div
                className="
                  flex
                  items-start
                  gap-5
                  bg-white
                  rounded-[28px]
                  p-7
                  border border-gray-100
                  shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                "
              >

                <div
                  className="
                    w-16 h-16
                    rounded-2xl
                    bg-gradient-to-r
                    from-[#ff3300]
                    to-[#ff7a00]
                    text-white
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <User size={28} />
                </div>

                <div>

                  <h3
                    className="
                      text-[28px]
                      font-black
                      text-[#ff3300]
                    "
                  >
                    Trusted Community
                  </h3>

                  <p
                    className="
                      mt-3
                      text-gray-600
                      leading-[1.9]
                    "
                  >
                    आध्यात्मिक एवं सामाजिक सेवा के लिए समर्पित
                    दिव्य परिवार।
                  </p>
                </div>
              </div>

              {/* CARD */}
              <div
                className="
                  flex
                  items-start
                  gap-5
                  bg-white
                  rounded-[28px]
                  p-7
                  border border-gray-100
                  shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                "
              >

                <div
                  className="
                    w-16 h-16
                    rounded-2xl
                    bg-gradient-to-r
                    from-[#ff3300]
                    to-[#ff7a00]
                    text-white
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Briefcase size={28} />
                </div>

                <div>

                  <h3
                    className="
                      text-[28px]
                      font-black
                      text-[#ff3300]
                    "
                  >
                    Volunteer Work
                  </h3>

                  <p
                    className="
                      mt-3
                      text-gray-600
                      leading-[1.9]
                    "
                  >
                    समाज सेवा, धार्मिक आयोजन एवं आध्यात्मिक
                    गतिविधियों में भाग लें।
                  </p>
                </div>
              </div>

              {/* CARD */}
              <div
                className="
                  flex
                  items-start
                  gap-5
                  bg-white
                  rounded-[28px]
                  p-7
                  border border-gray-100
                  shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                "
              >

                <div
                  className="
                    w-16 h-16
                    rounded-2xl
                    bg-gradient-to-r
                    from-[#ff3300]
                    to-[#ff7a00]
                    text-white
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <MessageSquare size={28} />
                </div>

                <div>

                  <h3
                    className="
                      text-[28px]
                      font-black
                      text-[#ff3300]
                    "
                  >
                    Spiritual Mission
                  </h3>

                  <p
                    className="
                      mt-3
                      text-gray-600
                      leading-[1.9]
                    "
                  >
                    सनातन संस्कृति एवं धर्म प्रचार में योगदान दें।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
                    RIGHT FORM
          ========================================= */}
          <div className="xl:col-span-3">

            <form
              onSubmit={handleSubmit}
              className="
                bg-white
                rounded-[40px]
                p-8 md:p-12
                shadow-[0_20px_80px_rgba(0,0,0,0.08)]
                border border-gray-100
              "
            >

              {/* FORM TITLE */}
              <div className="mb-12">

                <span
                  className="
                    inline-flex
                    px-5 py-2
                    rounded-full
                    bg-red-50
                    text-red-500
                    font-bold
                    border border-red-100
                    tracking-[2px]
                    text-sm
                  "
                >
                  MEMBER APPLICATION
                </span>

                <h2
                  className="
                    mt-6
                    text-[36px]
                    md:text-[55px]
                    font-black
                    text-[#ff3300]
                  "
                >
                  Submit Your Request
                </h2>
              </div>

              {/* FORM GRID */}
              <div className="grid md:grid-cols-2 gap-8">

                {/* FULL NAME */}
                <div>

                  <label className="font-bold text-gray-700">
                    Full Name
                  </label>

                  <div className="relative mt-3">

                    <User
                      size={20}
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter Full Name"
                      className="
                        w-full
                        h-[65px]
                        rounded-2xl
                        border
                        border-gray-200
                        bg-[#fafafa]
                        pl-14
                        pr-5
                        outline-none
                        focus:border-[#ff3300]
                        transition-all
                        text-gray-900
                      "
                    />
                  </div>
                </div>

                {/* MOBILE */}
                <div>

                  <label className="font-bold text-gray-700">
                    Mobile Number
                  </label>

                  <div className="relative mt-3">

                    <Phone
                      size={20}
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                      className="
                        w-full
                        h-[65px]
                        rounded-2xl
                        border
                        border-gray-200
                        bg-[#fafafa]
                        pl-14
                        pr-5
                        outline-none
                        focus:border-[#ff3300]
                        text-gray-900
                      "
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>

                  <label className="font-bold text-gray-700">
                    Email Address
                  </label>

                  <div className="relative mt-3">

                    <Mail
                      size={20}
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      className="
                        w-full
                        h-[65px]
                        rounded-2xl
                        border
                        border-gray-200
                        bg-[#fafafa]
                        pl-14
                        pr-5
                        outline-none
                        focus:border-[#ff3300]
                        text-gray-900
                      "
                    />
                  </div>
                </div>

                {/* CITY */}
                <div>

                  <label className="font-bold text-gray-700">
                    City / State
                  </label>

                  <div className="relative mt-3">

                    <MapPin
                      size={20}
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter City / State"
                      className="
                        w-full
                        h-[65px]
                        rounded-2xl
                        border
                        border-gray-200
                        bg-[#fafafa]
                        pl-14
                        pr-5
                        outline-none
                        focus:border-[#ff3300]
                        text-gray-900
                      "
                    />
                  </div>
                </div>

                {/* PROFESSION */}
                <div>

                  <label className="font-bold text-gray-700">
                    Profession
                  </label>

                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Enter Profession"
                    className="
                      mt-3
                      w-full
                      h-[65px]
                      rounded-2xl
                      border
                      border-gray-200
                      bg-[#fafafa]
                      px-5
                      outline-none
                      focus:border-[#ff3300]
                      text-gray-900
                    "
                  />
                </div>

                {/* EXPERIENCE */}
                <div>

                  <label className="font-bold text-gray-700">
                    Experience
                  </label>

                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Volunteer Experience"
                    className="
                      mt-3
                      w-full
                      h-[65px]
                      rounded-2xl
                      border
                      border-gray-200
                      bg-[#fafafa]
                      px-5
                      outline-none
                      focus:border-[#ff3300]
                      text-gray-900
                    "
                  />
                </div>
              </div>

              {/* SKILLS */}
              <div className="mt-8">

                <label className="font-bold text-gray-700">
                  Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Your Skills"
                  className="
                    mt-3
                    w-full
                    h-[65px]
                    rounded-2xl
                    border
                    border-gray-200
                    bg-[#fafafa]
                    px-5
                    outline-none
                    focus:border-[#ff3300]
                    text-gray-900
                  "
                />
              </div>

              {/* MESSAGE */}
              <div className="mt-8">

                <label className="font-bold text-gray-700">
                  Message
                </label>

                <textarea
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write Your Message"
                  className="
                    mt-3
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-[#fafafa]
                    p-5
                    outline-none
                    focus:border-[#ff3300]
                    resize-none
                    text-gray-900
                  "
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div className="mt-8">

                <label className="font-bold text-gray-700">
                  Upload Photo
                </label>

                <label
                  className="
                    mt-3
                    w-full
                    min-h-[180px]
                    rounded-[30px]
                    border-2
                    border-dashed
                    border-gray-300
                    bg-[#fafafa]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    cursor-pointer
                    hover:border-[#ff3300]
                    transition-all
                    p-5
                  "
                >

                  <Upload
                    size={45}
                    className="text-[#ff3300]"
                  />

                  <h3
                    className="
                      mt-5
                      text-[24px]
                      font-bold
                      text-[#ff3300]
                    "
                  >
                    Upload Member Photo
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Click here to upload image
                  </p>

                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    hidden
                  />
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  mt-10
                  w-full
                  h-[70px]
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#ff3300]
                  to-[#ff7a00]
                  text-white
                  text-[20px]
                  font-black
                  shadow-[0_20px_60px_rgba(255,80,0,0.35)]
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                "
              >
                Submit Membership Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;