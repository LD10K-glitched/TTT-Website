import { Navigation } from "@/components/navigation/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { PolicyHub } from "@/components/sections/PolicyHub";
import { Candidates } from "@/components/sections/Candidates";
import { ElectionTimeline } from "@/components/sections/ElectionTimeline";
import { ElectionSimulator } from "@/components/sections/ElectionSimulator";
import { CampaignJourney } from "@/components/sections/CampaignJourney";
import { CommerceReflection } from "@/components/sections/CommerceReflection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#5fa8d3] focus:text-[#0a2540] focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        <Hero />
        <About />
        <PolicyHub />
        <Candidates />
        <ElectionTimeline />
        <ElectionSimulator />
        <CampaignJourney />
        <CommerceReflection />
      </main>

      <Footer />
    </>
  );
}
