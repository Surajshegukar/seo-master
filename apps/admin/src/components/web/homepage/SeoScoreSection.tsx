"use client";
import React, { useState } from "react";

const SeoScoreSection: React.FC = () => {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!website || !email) {
      alert("Please enter both your website URL and email address.");
      return;
    }
    alert(`Checking SEO score for: ${website} (Email: ${email})`);
  };

  return (
    <section className="bg-[#1E1C1E] py-20 my-10 flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl md:text-5xl font-semibold text-white mb-10">
        Your SEO Score?
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-[90%] max-w-3xl"
      >
        {/* Website Input */}
        <input
          type="url"
          placeholder="Type in your Website URL"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="flex-1 bg-[#2A282A] text-gray-300 placeholder-gray-500 px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-[#2A282A] text-gray-300 placeholder-gray-500 px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
      </form>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-8 bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 rounded-full shadow-md transition-transform hover:scale-105"
      >
        CHECK UP!
      </button>
    </section>
  );
};

export default SeoScoreSection;
