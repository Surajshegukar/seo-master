import FeatureSections from "@/src/components/web/homepage/FeatureSections";
import FinalSection from "@/src/components/web/homepage/FinalSection";
import HeroCarousel from "@/src/components/web/homepage/HeroCarousel";
import SeoScoreSection from "@/src/components/web/homepage/SeoScoreSection";
import ServicesSection from "@/src/components/web/homepage/ServiceSection";
import TargetSection from "@/src/components/web/homepage/TargetSection";
import Image from "next/image";

export const metadata = {
  title: "SEO Master - Boost Your Online Presence",
  description:
    "SEO Master helps you enhance your website's visibility and ranking on search engines with expert SEO services and tools.",
};


export default function Home() {
  return (
    <main className="">
      
      <HeroCarousel />
      <ServicesSection />
      <SeoScoreSection />
      <FeatureSections />
      <TargetSection />
      <FinalSection />
    </main>
  );
}
