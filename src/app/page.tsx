import { Hero } from "@/components/sections/hero";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { WhyAIFirst } from "@/components/sections/why-ai-first";
import { AboutSnapshot } from "@/components/sections/about-snapshot";
import { HorizontalShowcase } from "@/components/sections/horizontal-showcase";
import { TargetAudience } from "@/components/sections/target-audience";
import { VideoSection } from "@/components/sections/video-section";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeSection />
      <WhyAIFirst />
      <AboutSnapshot />
      <HorizontalShowcase />
      <TargetAudience />
      <VideoSection />
      <CTASection />
    </main>
  );
}
