import React from "react";

const CookiePolicy = () => {
  return (
  <section
  id="cookies"
  className="relative w-full overflow-x-hidden pt-32 pb-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
>

  {/* Header */}
  <div className="max-w-7xl mx-auto px-6 mb-16">

    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-12 rounded-2xl shadow-xl text-center">

      <h1 className="text-4xl font-bold mb-3">
        Cookie Policy
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
          1. What Are Cookies
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Cookies are small text files stored on your device when you
          visit a website. These cookies help websites remember user
          preferences and improve the overall browsing experience.
        </p>

      </section>

      {/* Section 2 */}
      <section>

        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          2. How We Use Cookies
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          At <span className="font-semibold">Immortal Technovation</span>,
          we use cookies to enhance website performance, understand user
          behavior, and deliver intelligent digital experiences.
        </p>

      </section>

      {/* Section 3 */}
      <section>

        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          3. Types of Cookies
        </h2>

        <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
          <li>Essential cookies required for website functionality</li>
          <li>Analytics cookies used to understand user interaction</li>
          <li>Preference cookies that store user settings</li>
        </ul>

      </section>

      {/* Section 4 */}
      <section>

        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          4. Managing Cookies
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          You can manage or disable cookies through your browser settings.
          Please note that disabling cookies may affect certain features
          of our website and digital services.
        </p>

      </section>

      {/* Section 5 */}
      <section>

        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          5. Contact Us
        </h2>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          If you have any questions about this Cookie Policy or our
          services, please contact the team at
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
            <span className="font-semibold">Services:</span> AI-Infused Web Development,
            Custom Software Solutions, Mobile Apps, E-Commerce, Cloud & DevOps
          </p>

          <p>
            <span className="font-semibold">Mission:</span> Innovate. Transform.
            Immortalize the Digital Future.
          </p>

        </div>

      </section>

    </div>

  </div>

</section>
  );
};

export default CookiePolicy;