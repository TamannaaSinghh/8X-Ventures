import { ClosingCta } from "@/components/home/ClosingCta";
import { FounderJourney } from "@/components/home/FounderJourney";
import { Hero } from "@/components/home/Hero";
import { LpDaySection } from "@/components/home/LpDaySection";
import { ManifestoBanner } from "@/components/home/ManifestoBanner";
import { PortfolioCarousel } from "@/components/home/PortfolioCarousel";
import { StatsSection } from "@/components/home/StatsSection";
import { TeamCarousel } from "@/components/home/TeamCarousel";
import { VisionSection } from "@/components/home/VisionSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ManifestoBanner />
      <VisionSection />
      <StatsSection />
      <PortfolioCarousel />
      <FounderJourney />
      <TeamCarousel />
      <LpDaySection />
      <ClosingCta />
    </>
  );
}
