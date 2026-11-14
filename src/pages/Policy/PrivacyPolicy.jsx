import React from "react";

const PrivacyPolicy = () => {
  return (
    <section
      id="privacy-policy"
      className="relative w-full overflow-x-hidden pt-32 pb-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-12 rounded-2xl shadow-xl text-center">
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-gray-300 text-sm">Last updated: November 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-10 rounded-xl shadow-lg space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              1. Introduction
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              At <span className="font-semibold">Shree Chitragupt Peeth</span>, we
              respect your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, store,
              and safeguard information when you use our website and related
              digital services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Membership, donation, or pooja booking details you submit</li>
              <li>Messages and enquiries sent through contact forms</li>
              <li>Device and usage information for improving website performance</li>
              <li>Cookies and similar technologies where enabled</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              3. How We Use Information
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We use collected information to respond to your requests, process
              bookings and donations, share updates related to peeth activities,
              improve our website experience, and maintain the security of our
              services. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              4. Data Security
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We take reasonable technical and organizational measures to protect
              your personal data against unauthorized access, loss, misuse, or
              alteration. While we strive to keep your information secure, no
              method of transmission over the internet is completely risk-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              5. Cookies & Tracking
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Our website may use cookies and similar technologies to remember
              preferences, understand how visitors use the site, and improve
              performance. You can control or disable cookies through your browser
              settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              6. Third-Party Services
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We may use trusted third-party services (such as hosting, analytics,
              payment, or messaging platforms) that process limited data only as
              needed to operate our website and services. Those providers handle
              data according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              7. Your Rights
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              You may request access to, correction of, or deletion of your
              personal information by contacting us. We will respond to reasonable
              requests in accordance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              8. Contact Us
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact{" "}
              <span className="font-semibold">Shree Chitragupt Peeth</span>.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg space-y-2 text-slate-700 dark:text-slate-300">
              <p>
                <span className="font-semibold">Organization:</span> Shree
                Chitragupt Peeth
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                shreechitraguptpeeth@gmail.com
              </p>
              <p>
                <span className="font-semibold">Phone:</span> +91-7065013874
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
