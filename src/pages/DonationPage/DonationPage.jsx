import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Home,
  IndianRupee,
  User,
  Phone,
  Mail,
  MessageSquare,
  Check,
  Sparkles,
  Smartphone,
  CreditCard,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/api/axios";

const PRESET_AMOUNTS = [101, 501, 1001];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState(501);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("upi"); // upi | card
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const activeAmount = isCustom
    ? Number(customAmount) || 0
    : selectedAmount;

  const handlePresetClick = (amount) => {
    setIsCustom(false);
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    setSelectedAmount(null);
  };

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

  const resetForm = () => {
    setFormData({ name: "", email: "", mobile: "", message: "" });
    setSelectedAmount(501);
    setIsCustom(false);
    setCustomAmount("");
    setPaymentMode("upi");
  };

  const openRazorpayCheckout = (orderPayload) =>
    new Promise((resolve, reject) => {
      const preferUpi = orderPayload.preferred_method === "upi";
      const methodBlock = preferUpi
        ? {
            upi: {
              name: "Pay with UPI Apps",
              instruments: [{ method: "upi" }],
            },
          }
        : {
            card: {
              name: "Pay with Credit or Debit Card",
              instruments: [{ method: "card" }],
            },
          };

      const options = {
        key: orderPayload.key,
        amount: orderPayload.amount,
        currency: orderPayload.currency || "INR",
        name: "Shri Chitragupta Peeth",
        description: preferUpi
          ? "Temple Donation via UPI"
          : "Temple Donation via Card",
        order_id: orderPayload.order_id,
        prefill: {
          name: orderPayload.prefill?.name || "",
          email: orderPayload.prefill?.email || "",
          contact: orderPayload.prefill?.contact || "",
        },
        theme: { color: "#dc2626" },
        config: {
          display: {
            blocks: methodBlock,
            sequence: [preferUpi ? "block.upi" : "block.card"],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
        handler: (response) => resolve(response),
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled")),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        reject(
          new Error(
            response?.error?.description ||
              response?.error?.reason ||
              "Payment failed"
          )
        );
      });
      rzp.open();
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!activeAmount || activeAmount < 1) {
      toast.error("Please select or enter a valid donation amount");
      return;
    }
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (formData.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    try {
      const { data: order } = await api.post("/donations/create-order", {
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        mobile: formData.mobile,
        amount: activeAmount,
        amount_type: isCustom ? "custom" : "preset",
        message: formData.message.trim() || null,
        preferred_method: paymentMode,
      });

      const scriptOk = await loadRazorpayScript();
      if (!scriptOk) {
        toast.error("Unable to load payment gateway. Please try again.");
        return;
      }

      let paymentResponse;
      try {
        paymentResponse = await openRazorpayCheckout(order);
      } catch (payErr) {
        toast.error(payErr?.message || "Payment was cancelled");
        return;
      }

      await api.post("/donations/verify", {
        donation_id: order.donation_id,
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
      });

      toast.success("Payment successful! Thank you for your donation.");
      resetForm();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to complete donation payment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf7]">
      <div
        className="relative w-full h-[180px] md:h-[220px] bg-cover bg-center"
        style={{ backgroundImage: "url('/gallery/g5.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/85 to-orange-900/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-2"
          >
            <Heart className="w-6 h-6 text-white fill-current" />
            <span className="text-white/90 text-sm font-bold uppercase tracking-[3px]">
              Seva & Support
            </span>
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
            Donate Now
          </h1>
          <div className="absolute -bottom-5 max-w-[calc(100%-1.5rem)] bg-white rounded-full shadow-lg px-4 sm:px-6 py-2.5 flex items-center gap-2 sm:gap-3 border text-sm flex-wrap justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 text-sm font-medium hover:text-red-500"
            >
              <Home size={16} /> Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-red-500 text-sm font-semibold">Donate</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <p className="text-red-500 font-bold text-sm uppercase tracking-[3px] mb-2">
            श्री चित्रगुप्त पीठ
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
            Your Contribution Makes a Difference
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Support temple seva with UPI apps or pay securely by credit/debit
            card through Razorpay.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {PRESET_AMOUNTS.map((amount, index) => {
            const active = !isCustom && selectedAmount === amount;
            return (
              <motion.button
                key={amount}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePresetClick(amount)}
                className={`relative rounded-2xl border-2 p-5 sm:p-6 text-center transition-all ${
                  active
                    ? "border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg shadow-red-100"
                    : "border-gray-200 bg-white hover:border-red-300 hover:shadow-md"
                }`}
              >
                {active && (
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                    <Check size={14} />
                  </span>
                )}
                <div
                  className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    active ? "bg-red-500 text-white" : "bg-red-50 text-red-500"
                  }`}
                >
                  <IndianRupee size={18} />
                </div>
                <p
                  className={`text-2xl sm:text-3xl font-black ${
                    active ? "text-red-600" : "text-gray-800"
                  }`}
                >
                  {amount}
                </p>
                <p className="text-xs text-gray-500 mt-1 font-medium">INR</p>
              </motion.button>
            );
          })}

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCustomClick}
            className={`relative rounded-2xl border-2 p-5 sm:p-6 text-center transition-all ${
              isCustom
                ? "border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg shadow-orange-100"
                : "border-dashed border-gray-300 bg-white hover:border-orange-300 hover:shadow-md"
            }`}
          >
            {isCustom && (
              <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center">
                <Check size={14} />
              </span>
            )}
            <div
              className={`w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center ${
                isCustom
                  ? "bg-orange-500 text-white"
                  : "bg-orange-50 text-orange-500"
              }`}
            >
              <Sparkles size={18} />
            </div>
            <p
              className={`text-lg sm:text-xl font-black ${
                isCustom ? "text-orange-600" : "text-gray-800"
              }`}
            >
              Custom
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium">Any amount</p>
          </motion.button>
        </div>

        {isCustom && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8"
          >
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Enter custom amount (₹)
            </label>
            <div className="relative max-w-xs">
              <IndianRupee
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
              />
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="e.g. 2100"
                className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-orange-200 bg-white text-black placeholder:text-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-lg font-bold"
                autoFocus
              />
            </div>
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-orange-100 shadow-xl p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <h3 className="text-lg font-black text-gray-900">Your Details</h3>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-bold">
              <IndianRupee size={14} />
              {activeAmount > 0 ? activeAmount.toLocaleString("en-IN") : "—"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500"
              />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name *"
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-black placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"
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
                required
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile (10 digits) *"
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-black placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-black placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Payment method */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Payment method
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMode("upi")}
                className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition ${
                  paymentMode === "upi"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-gray-50 hover:border-red-300"
                }`}
              >
                <Smartphone
                  className={
                    paymentMode === "upi" ? "text-red-600" : "text-gray-500"
                  }
                  size={22}
                />
                <span>
                  <span className="block font-bold text-gray-900">
                    UPI Apps
                  </span>
                  <span className="text-xs text-gray-500">
                    GPay, PhonePe, Paytm, BHIM and other UPI apps
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode("card")}
                className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition ${
                  paymentMode === "card"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 bg-gray-50 hover:border-orange-300"
                }`}
              >
                <CreditCard
                  className={
                    paymentMode === "card" ? "text-orange-600" : "text-gray-500"
                  }
                  size={22}
                />
                <span>
                  <span className="block font-bold text-gray-900">
                    Credit / Debit Card
                  </span>
                  <span className="text-xs text-gray-500">
                    Secure card payment through Razorpay
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="relative">
            <MessageSquare
              size={16}
              className="absolute left-3.5 top-3.5 text-red-500"
            />
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Message / prayer request (optional)"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 py-3 text-sm text-black placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-red-500 hover:brightness-110 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-200 transition disabled:opacity-60"
          >
            <Heart size={18} className="fill-current" />
            {loading
              ? "Processing payment..."
              : paymentMode === "upi"
                ? `Pay ₹${activeAmount > 0 ? activeAmount.toLocaleString("en-IN") : "—"} with UPI`
                : `Pay ₹${activeAmount > 0 ? activeAmount.toLocaleString("en-IN") : "—"} with Razorpay`}
          </button>

          <p className="text-center text-xs text-gray-500">
            Secure payment via Razorpay. Enable UPI and Cards in Razorpay
            Dashboard → Account &amp; Settings → Payment Methods.
          </p>
        </motion.form>
      </div>

    </div>
  );
}
