import React from "react";

const Privacy = () => {
  return (
   <section
  id="privacy"
  className="relative w-full overflow-x-hidden pt-32 pb-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
>

  {/* Header */}
  <div className="max-w-7xl mx-auto px-6 mb-16">

    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-12 rounded-2xl shadow-xl text-center">

      <h1 className="text-4xl font-bold mb-3">
        Privacy Policy
      </h1>

      <p className="text-gray-300 text-sm">
        Last updated: March 2026
      </p>

    </div>

  </div>

  {/* Content */}
  <div className="max-w-5xl mx-auto px-6">

    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-10 rounded-xl shadow-lg space-y-10">

      {/* Section 1 */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          1. Introduction
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          At <span className="font-semibold">Immortal Technovation</span>, we value your privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and safeguard your data when you use our digital products and services.
        </p>
      </section>

      {/* Section 2 */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          2. Information We Collect
        </h2>

        <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
          <li>Name and contact information</li>
          <li>Email address and communication details</li>
          <li>Usage analytics and interaction data</li>
          <li>Cookies and tracking technologies</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          3. How We Use Information
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          We use the collected information to improve our services, personalize user experiences,
          enhance security, and deliver intelligent digital solutions powered by modern technology.
        </p>
      </section>

      {/* Section 4 */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          4. Cookies & Tracking
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Cookies help us understand user behavior and optimize performance across our websites
          and applications. This allows us to deliver better experiences and smarter digital workflows.
        </p>
      </section>

      {/* Section 5 */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          5. Contact Us
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          If you have any questions regarding this Privacy Policy or our services, please contact the team at
          <span className="font-semibold"> Immortal Technovation</span>.
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg space-y-2 text-slate-700 dark:text-slate-300">

          <p>
            <span className="font-semibold">Company:</span> Immortal Technovation
          </p>

          <p>
            <span className="font-semibold">Email:</span> support@immortaltechnovation.com
          </p>

          <p>
            <span className="font-semibold">Services:</span> AI-Infused Web Development, Custom Software Solutions,
            Mobile Apps, E-Commerce, Cloud & DevOps
          </p>

          <p>
            <span className="font-semibold">Mission:</span> Innovate. Transform. Immortalize the Digital Future.
          </p>

        </div>

      </section>

    </div>

  </div>

</section>
  );
};

export default Privacy;