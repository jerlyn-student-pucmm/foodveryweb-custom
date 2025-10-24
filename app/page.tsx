import { HeroSection } from "@/components/sections/HeroSection"
import { FeaturedItemsSection } from "@/components/sections/FeaturedItemsSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { LocationHoursSection } from "@/components/sections/LocationHoursSection"
import { DownloadAppSection } from "@/components/sections/DownloadAppSection"
import { CTASection } from "@/components/sections/CTASection"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedItemsSection />
      <AboutSection />
      <LocationHoursSection />
      <DownloadAppSection />
      <CTASection />
      <Footer />
    </div>
  )
}
