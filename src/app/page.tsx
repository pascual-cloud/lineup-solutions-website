import { Hero } from "@/components/sections/hero";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { WhyAIFirst } from "@/components/sections/why-ai-first";
import { AboutSnapshot } from "@/components/sections/about-snapshot";
import { ServicesSnapshot } from "@/components/sections/services-snapshot";
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
      <ServicesSnapshot />
      <TargetAudience />
      <VideoSection />
      <CTASection />
    </main>
  );
}
