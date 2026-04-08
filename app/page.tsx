import { Navigation } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { CoffeeSection } from "@/components/sections/CoffeeSection";
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
      <TropicalBitesSection />
      <VisitSection />
      <Footer />
      <DarkModeToggle />
    </div>
  );
}
