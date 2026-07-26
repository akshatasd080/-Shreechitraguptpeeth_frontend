import {
  Calendar,
  Clock3,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/api/axios";

const FALLBACK_POOJAS = [
  "महा मृत्युंजय जाप",
  "रुद्राभिषेक पूजा",
  "श्री सत्यनारायण कथा",
  "हनुमान पाठ",
  "शिव पूजा",
  "गृह प्रवेश पूजा",
  "नवग्रह शांति पूजा",
];

export default function PoojaBookingDialog({ poojaName = "", onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pooja: poojaName || "",
    date: "",
    time: "",
    message: "",
  });
  const [poojaList, setPoojaList] = useState(FALLBACK_POOJAS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      pooja: poojaName || prev.pooja,
    }));
  }, [poojaName]);

  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        const res = await api.get("/poojas?active=true");
        const titles = (res.data?.poojas || [])
          .map((p) => p.title)
          .filter(Boolean);
        if (titles.length > 0) {
          const merged = [...new Set([...(poojaName ? [poojaName] : []), ...titles, ...FALLBACK_POOJAS])];
          setPoojaList(merged);
        }
      } catch (_) {
        // keep fallback
      }
    };
    fetchPoojas();
  }, [poojaName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      setFormData((prev) => ({
        ...prev,
        mobile: value.replace(/\D/g, "").slice(0, 10),
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      await api.post("/pooja-bookings", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile,
        pooja: formData.pooja,
        date: formData.date,
        time: formData.time,
        message: formData.message.trim() || null,
      });

      toast.success("Pooja request submitted successfully");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        pooja: poojaName || "",
        date: "",
        time: "",
        message: "",
      });
      onSuccess?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to submit request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white overflow-hidden">
      {/* Compact header */}
      <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-500 px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/25 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[2px] font-bold text-white/90">
              Online Pooja
            </p>
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              Book Your Sacred Pooja
            </h2>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/90">
          <span className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1">
            <Calendar size={12} /> Select date
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1">
            <Clock3 size={12} /> Flexible timing
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-900 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile (10 digits) *"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-900 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div className="relative sm:col-span-2">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-900 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
          </div>
        </div>

        <select
          name="pooja"
          value={formData.pooja}
          onChange={handleChange}
          required
          className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"
        >
          <option value="">Select Pooja *</option>
          {poojaList.map((pooja) => (
            <option key={pooja} value={pooja}>
              {pooja}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">
              Time *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
          </div>
        </div>

        <div className="relative">
          <MessageSquare
            size={16}
            className="absolute left-3.5 top-3.5 text-red-500"
          />
          <textarea
            rows={3}
            name="message"
            placeholder="Write your message (optional)..."
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 py-3 text-sm text-gray-900 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-200 transition disabled:opacity-50"
        >
          {loading ? (
            "Submitting..."
          ) : (
            <>
              <Send size={16} />
              Submit Pooja Request
            </>
          )}
        </button>
      </form>
    </div>
  );
}
