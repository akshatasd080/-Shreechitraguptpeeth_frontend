import {
  Calendar,
  Clock3,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

import { useState } from "react";

import { toast } from "react-hot-toast";

export default function PoojaBookingDialog({ poojaName = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pooja: poojaName,
    date: "",
    time: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "poojaRequests"), {
        ...formData,
        createdAt: new Date(),
        status: "pending",
      });

      toast.success("Pooja Request Submitted Successfully");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        pooja: poojaName,
        date: "",
        time: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const poojaList = [
    "महा मृत्युंजय जाप",
    "रुद्राभिषेक पूजा",
    "श्री सत्यनारायण कथा",
    "हनुमान पाठ",
    "शिव पूजा",
    "ऑनलाइन विवाह पूजा",
    "गृह प्रवेश पूजा",
    "नवग्रह शांति पूजा",
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      {/* LEFT SIDE */}
      <div
        className="
              bg-gradient-to-br
              from-red-500
              to-red-700
              text-white
              p-8 lg:p-10
              lg:w-2/5
              flex
              flex-col
              justify-center
            "
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">ॐ</span>
          <p className="uppercase tracking-[4px] font-bold">Online Pooja</p>
        </div>
        <h2
          className="
                text-3xl md:text-4xl lg:text-5xl
                font-black
                leading-tight
              "
        >
          Book Your Sacred Pooja
        </h2>
        <p className="mt-6 text-base lg:text-lg leading-[2] text-white/90">
          Participate in divine poojas and spiritual rituals online from your
          home with blessings from temple priests.
        </p>
        <div className="space-y-4 mt-8 lg:mt-12">
          <div className="flex items-center gap-4">
            <div
              className="
                    w-12 h-12 lg:w-14 lg:h-14
                    rounded-full
                    bg-white/20
                    flex
                    items-center
                    justify-center
                  "
            >
              <Calendar size={20} className="lg:w-6 lg:h-6" />
            </div>
            <div>
              <h3 className="font-bold lg:font-black text-base lg:text-xl">
                Select Date
              </h3>
              <p className="text-white/80 mt-1 text-sm lg:text-base">
                Choose your preferred pooja date.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="
                    w-12 h-12 lg:w-14 lg:h-14
                    rounded-full
                    bg-white/20
                    flex
                    items-center
                    justify-center
                  "
            >
              <Clock3 size={20} className="lg:w-6 lg:h-6" />
            </div>
            <div>
              <h3 className="font-bold lg:font-black text-base lg:text-xl">
                Flexible Timing
              </h3>
              <p className="text-white/80 mt-1 text-sm lg:text-base">
                Select your suitable timing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="bg-white p-6 md:p-8 lg:p-10 lg:w-3/5">
        <h2
          className="
                  text-2xl md:text-3xl lg:text-4xl
                  font-black
                  text-red-500
                  text-center
                "
        >
          Pooja Request Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {/* NAME */}
          <div className="relative">
            <User
              size={20}
              className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-red-500
                  "
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="
                    w-full
                    h-16
                    rounded-2xl
                    border
                    border-gray-200
                    pl-14
                    pr-5
                    outline-none
                    focus:border-red-500
                  "
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail
              size={20}
              className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-red-500
                  "
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                    w-full
                    h-16
                    rounded-2xl
                    border
                    border-gray-200
                    pl-14
                    pr-5
                    outline-none
                    focus:border-red-500
                  "
            />
          </div>

          {/* MOBILE */}
          <div className="relative">
            <Phone
              size={20}
              className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-red-500
                  "
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="
                    w-full
                    h-16
                    rounded-2xl
                    border
                    border-gray-200
                    pl-14
                    pr-5
                    outline-none
                    focus:border-red-500
                  "
            />
          </div>

          {/* SELECT */}
          <select
            name="pooja"
            value={formData.pooja}
            onChange={handleChange}
            required
            className="
                  w-full
                  h-16
                  rounded-2xl
                  border
                  border-gray-200
                  px-5
                  outline-none
                  focus:border-red-500
                "
          >
            <option value="">Select Pooja</option>
            {poojaList.map((pooja, index) => (
              <option key={index} value={pooja}>
                {pooja}
              </option>
            ))}
          </select>

          {/* DATE TIME */}
          <div className="grid grid-cols-2 gap-5">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="
                    h-16
                    rounded-2xl
                    border
                    border-gray-200
                    px-5
                    outline-none
                    focus:border-red-500
                  "
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="
                    h-16
                    rounded-2xl
                    border
                    border-gray-200
                    px-5
                    outline-none
                    focus:border-red-500
                  "
            />
          </div>

          {/* MESSAGE */}
          <div className="relative">
            <MessageSquare
              size={20}
              className="
                    absolute
                    left-5
                    top-6
                    text-red-500
                  "
            />
            <textarea
              rows="5"
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    pl-14
                    pr-5
                    pt-5
                    outline-none
                    focus:border-red-500
                  "
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
                  w-full
                  h-16
                  rounded-full
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  text-lg
                  font-black
                  transition-all
                  disabled:opacity-50
                "
          >
            {loading ? "Submitting..." : "Submit Pooja Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
