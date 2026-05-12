import { Navigation } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { CoffeeSection } from "@/components/sections/CoffeeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TropicalBitesSection } from "@/components/sections/TropicalBitesSection";
import { VisitSection } from "@/components/sections/VisitSection";
import { Footer } from "@/components/sections/Footer";
import { DarkModeToggle } from "@/components/DarkModeToggle";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CoffeeSection />
      <AboutSection />
      <TropicalBitesSection />
      <VisitSection />
      <ServicesSection />
      <Footer />
      <DarkModeToggle />
    </div>
  );
}
