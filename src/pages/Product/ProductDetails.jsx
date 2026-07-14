import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

const products = {
  hrms: {
    title: "Immortal HRMS",
    description:
      "Complete HRMS solution including payroll automation, attendance tracking, employee lifecycle management, and performance analytics.",
    features: [
      "Employee Lifecycle Management",
      "Automated Payroll System",
      "Attendance & Leave Tracking",
      "Performance Analytics Dashboard",
    ],
  },
  "sales-visits": {
    title: "Immortal Sales Visits",
    description:
      "Track field sales representatives with real-time GPS tracking, visit logging, smart analytics dashboards, and performance insights.",
    features: [
      "Live GPS Tracking",
      "Visit Logging",
      "Analytics Dashboard",
      "Sales Performance Insights",
    ],
  },
  crm: {
    title: "Immortal CRM",
    description:
      "Manage leads, automate workflows, monitor pipelines, and improve customer engagement with intelligent CRM tools.",
    features: [
      "Lead Management",
      "Pipeline Tracking",
      "Workflow Automation",
      "Customer Insights",
    ],
  },
  kiosk: {
    title: "KIOSK (IoT Device)",
    description:
      "Advanced IoT-based KIOSK featuring QR-based smart printing, fingerprint authentication, integrated security camera, charging ports, and outdoor display system.",
    features: [
      "QR Smart Printing",
      "Fingerprint Authentication",
      "Security Camera",
      "Outdoor Monitoring Display",
    ],
  },
};

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products[slug];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-[150px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden text-slate-100">
      {/* Animated Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF2E63]/10 blur-[120px] rounded-full"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Back Buttons */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-[#FF2E63] text-white px-6 py-2 rounded-full hover:bg-[#FF477E] transition shadow-md"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-[#FF2E63] transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </button>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {product.title}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {product.description}
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {product.features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-3xl bg-white shadow-lg border border-slate-100 hover:border-[#FF2E63]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-[#FF2E63]" size={20} />
                <h3 className="text-lg font-semibold text-slate-800">
                  Feature {index + 1}
                </h3>
              </div>
              <p className="text-slate-600">{feature}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-[#FF2E63] to-pink-500 text-white rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-6 text-lg opacity-90">
              Transform your business with {product.title}.
            </p>
            <button
              onClick={() => navigate("/#contact")}
              className="bg-white text-[#FF2E63] px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Request Demo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
