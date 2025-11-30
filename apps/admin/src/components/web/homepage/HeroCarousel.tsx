"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  layout: "left-right" | "right-left" | "top-bottom"; // layout type
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/social-media.png",
    title: "Social Media Marketing Services",
    description:
      "An effective social strategy can help you grow your business, maintain your social presence and engage with the audience.",
    layout: "left-right",
  },
  {
    id: 2,
    image: "/images/seo.png",
    title: "SEO Optimization Services",
    description:
      "We help you improve your website visibility on search engines and attract more organic traffic with proven SEO strategies.",
       layout: "left-right",
  },
  {
    id: 3,
    image: "/images/content-marketing.png",
    title: "Content Marketing Strategy",
    description:
      "Create and distribute valuable content to attract and engage your target audience effectively through content marketing.",
      layout: "left-right",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setFade(false);
    }, 400);
  };

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setFade(false);
    }, 400);
  };

  const slide = slides[current];

  // Layout-based rendering
  const renderSlideContent = (layout: Slide["layout"]) => {
    switch (layout) {
      case "left-right":
        return (
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <Image
              src={slide.image}
              alt={slide.title}
              width={500}
              height={400}
              className="object-contain w-full md:w-1/2"
              priority
            />
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-8">
                {slide.description}
              </p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center md:justify-start">
                <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                  LEARN MORE
                </button>
                <button className="text-white border-b border-white hover:opacity-80 font-medium">
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
        );

      case "right-left":
        return (
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10">
            <Image
              src={slide.image}
              alt={slide.title}
              width={500}
              height={400}
              className="object-contain w-full md:w-1/2"
              priority
            />
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-8">
                {slide.description}
              </p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center md:justify-start">
                <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                  LEARN MORE
                </button>
                <button className="text-white border-b border-white hover:opacity-80 font-medium">
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
        );

      case "top-bottom":
        return (
          <div className="flex flex-col items-center text-center gap-10">
            <Image
              src={slide.image}
              alt={slide.title}
              width={500}
              height={400}
              className="object-contain w-full md:w-3/5"
              priority
            />
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-8">
                {slide.description}
              </p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
                <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                  LEARN MORE
                </button>
                <button className="text-white border-b border-white hover:opacity-80 font-medium">
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative bg-[#f25c27] text-white overflow-hidden">
      <div
        className={`max-w-7xl mx-auto px-6 md:px-12 py-20 transition-all duration-500 ${
          fade ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {renderSlideContent(slide.layout)}
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 hover:text-white transition text-3xl"
        aria-label="Previous Slide"
      >
        <Image src="/icons/left-arrow.png" alt="Left Arrow" width={100} height={90} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-900 hover:text-white transition text-3xl"
        aria-label="Next Slide"
      >
        <Image src="/icons/right-arrow.png" alt="Right Arrow" width={100} height={90} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-gray-700"
            } transition`}
          />
        ))}
      </div>
    </section>
  );
}
