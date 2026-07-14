import React from "react";

const TermsService = () => {
  return (
    <section
  id="terms"
  className="relative w-full overflow-x-hidden pt-32 pb-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
>

  {/* Header Card */}
  <div className="max-w-7xl mx-auto px-6 mb-16">

    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-12 rounded-2xl shadow-xl text-center">

      <h1 className="text-4xl font-bold mb-3">
        Terms of Service
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
          1. Acceptance of Terms
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          By accessing and using our website and services, you agree to be
          bound by these Terms of Service. If you do not agree with any
          part of these terms, you must not use our services.
        </p>

      </section>

      {/* Section 2 */}
      <section>

        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          2. User Responsibilities
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Users agree to use the platform responsibly and comply with
          all applicable laws and regulations while using our services.
        </p>

      </section>

      {/* Section 3 */}
      <section>

        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          3. Account Rules
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          You are responsible for maintaining the confidentiality of
          your account credentials and for all activities that occur
          under your account.
        </p>

      </section>

      {/* Section 4 */}
      <section>

        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          4. Service Availability
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          We reserve the right to modify, suspend, or discontinue any
          part of our services at any time without prior notice.
        </p>

      </section>

      {/* Section 5 */}
      <section>

        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          5. Termination
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          We may terminate or suspend your access to the platform
          if you violate these terms or misuse our services.
        </p>

      </section>

      {/* Section 6 */}
      <section>

        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          6. Contact
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          If you have any questions about these Terms of Service,
          please contact us at support@yourwebsite.com.
        </p>

      </section>

    </div>

  </div>

  {/* Footer */}
  <div className="text-center text-slate-500 dark:text-slate-400 text-sm mt-20">
  </div>

</section>
  );
};

export default TermsService;