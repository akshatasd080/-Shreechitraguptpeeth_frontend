import React from "react";

const PrivacyPolicy = () => {
  return (
    <section
      id="privacy-policy"
      className="relative w-full overflow-x-hidden pt-32 pb-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-[#7f1d1d] to-[#9a3412] text-white py-12 rounded-2xl shadow-xl text-center">
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-red-100 text-sm">Last updated: November 2026</p>
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
              information. This Privacy Policy explains how we collect, use,
              store, and safeguard your data when you visit our website, make
              donations, book poojas, register for membership, or contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
              <li>Name, phone number, and email address</li>
              <li>Address and membership-related details</li>
              <li>Donation and pooja booking information</li>
              <li>Messages submitted through contact or enquiry forms</li>
              <li>Basic usage data, cookies, and device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              3. How We Use Your Information
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We use your information to process donations and bookings, respond
              to enquiries, manage membership and volunteer activities, improve
              our website experience, send important updates related to peeth
              services, and maintain the security of our systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              4. Data Security
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We take reasonable technical and organizational measures to protect
              your personal data against unauthorized access, alteration,
              disclosure, or destruction. Payment-related transactions, where
              applicable, are handled through trusted payment partners. However,
              no method of transmission over the internet is completely secure,
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              5. Cookies & Tracking
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Our website may use cookies and similar technologies to remember
              preferences, understand how visitors use the site, and improve
              performance. You can control or disable cookies through your
              browser settings. Disabling cookies may affect some website
              features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              6. Sharing of Information
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We do not sell your personal information. We may share limited data
              with trusted service providers (such as payment gateways or hosting
              partners) only as needed to operate our services, or when required
              by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              7. Your Rights
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              You may request access to, correction of, or deletion of your
              personal information that we hold, subject to applicable legal and
              operational requirements. To make such a request, please contact us
              using the details below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
              8. Contact Us
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or how your
              data is handled, please contact{" "}
              <span className="font-semibold">Shree Chitragupt Peeth</span>.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg space-y-2 text-slate-700 dark:text-slate-300">
              <p>
                <span className="font-semibold">Organization:</span> Shree
                Chitragupt Peeth
              </p>
              <p>
                <span className="font-semibold">Purpose:</span> Temple services,
                spiritual content, donations, pooja bookings, and community
                outreach
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
