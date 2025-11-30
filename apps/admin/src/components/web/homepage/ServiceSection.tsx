"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaAnchor, FaBullseye, FaEnvelope } from "react-icons/fa";
import { BsLightbulb, BsMap } from "react-icons/bs";

type Tab = {
  id: number;
  title: string;
  subtitle: string;
  color: string;
};

const tabs: Tab[] = [
  { id: 1, title: "Search Engine Optimization", subtitle: "", color: "bg-gray-100" },
  { id: 2, title: "Local SEO", subtitle: "Mirum est notare quam littera.", color: "bg-teal-500" },
  { id: 3, title: "Social Media Marketing", subtitle: "", color: "bg-orange-500" },
  { id: 4, title: "Email Marketing", subtitle: "", color: "bg-yellow-400" },
  { id: 5, title: "Pay Per Click Management", subtitle: "", color: "bg-green-500" },
];

const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(2);

  return (
    <section className="w-full">
      {/* Tabs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-5 text-center text-white font-semibold">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${tab.color} cursor-pointer p-6 relative transition-all duration-300 hover:opacity-90 ${
              activeTab === tab.id ? "brightness-110" : "brightness-90"
            }`}
          >
            <div className="relative z-10">
              <h3 className="text-lg font-bold">{tab.title}</h3>
              {tab.subtitle && (
                <p className="text-sm opacity-90 mt-1">{tab.subtitle}</p>
              )}
            </div>
            <span className="absolute text-[120px] font-bold text-white/20 right-4 top-2">
              {tab.id.toString().padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <ServiceCard
          icon={<FaMapMarkerAlt className="text-red-500 text-4xl" />}
          title="Local Search Strategy"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod."
        />
        <ServiceCard
          icon={<BsMap className="text-yellow-500 text-4xl" />}
          title="Maps SEO"
          desc="Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium."
        />
        <ServiceCard
          icon={<FaAnchor className="text-teal-500 text-4xl" />}
          title="Link Building & Content"
          desc="Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius notare."
        />
        <ServiceCard
          icon={<FaBullseye className="text-teal-500 text-4xl" />}
          title="Paid Search Advertising"
          desc="Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium."
        />
        <ServiceCard
          icon={<BsLightbulb className="text-sky-500 text-4xl" />}
          title="Custom Website Design"
          desc="Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius notare."
        />
        <ServiceCard
          icon={<FaEnvelope className="text-yellow-300 text-4xl" />}
          title="Custom Email Design"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod."
        />
      </div>
    </section>
  );
};

type CardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const ServiceCard: React.FC<CardProps> = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="bg-gray-100 rounded-full p-4">{icon}</div>
    <div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default ServicesSection;
