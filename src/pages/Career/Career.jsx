import React from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Send,
  Users,
  Rocket,
  TrendingUp,
} from "lucide-react";
import ApplyJobDialog from "@/components/ui/ApplyDialog";
import ApplyDialog from "@/components/ui/ApplyDialog";

const jobs = [
  {
    title: "Frontend Developer (React)",
    location: "Remote / On-site",
    type: "Full Time",
    experience: "2+ Years",
  },
  {
    title: "Backend Developer (Node.js)",
    location: "On-site",
    type: "Full Time",
    experience: "3+ Years",
  },
  {
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
    experience: "2+ Years",
  },
];

const Career = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Navbar Spacer */}
      <div className="h-[120px]" />

      {/* ================= HERO ================= */}
   
      {/* ================= OPEN POSITIONS ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Open Positions
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-100"
            >
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-[#FF2E63] transition">
                {job.title}
              </h3>

              <div className="space-y-3 text-slate-600 mb-6">
                <p className="flex items-center gap-2">
                  <MapPin size={18} /> {job.location}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={18} /> {job.type}
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase size={18} /> {job.experience}
                </p>
              </div>

             <ApplyDialog/>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Why Join Immortal IT?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition border border-slate-100">
              <h3 className="text-xl font-semibold mb-4">
                🚀 Growth Opportunities
              </h3>
              <p className="text-slate-600">
                Continuous mentorship, learning sessions, and real project
                exposure.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition border border-slate-100">
              <h3 className="text-xl font-semibold mb-4">🌍 Flexible Work</h3>
              <p className="text-slate-600">
                Hybrid & remote-friendly culture with flexible hours.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition border border-slate-100">
              <h3 className="text-xl font-semibold mb-4">
                💰 Competitive Compensation
              </h3>
              <p className="text-slate-600">
                Performance-based bonuses and attractive salary packages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-[#FF2E63] to-[#FF477E] py-16 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Didn’t Find Your Role?
        </h2>
        <p className="mb-8 opacity-90">
          Send us your resume and we’ll get in touch when a matching role opens.
        </p>
        <button className="bg-white text-[#FF2E63] px-8 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg">
          Submit Resume
        </button>
      </section>
    </div>
  );
};

export default Career;
