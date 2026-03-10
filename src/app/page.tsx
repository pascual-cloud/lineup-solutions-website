import { Hero } from "@/components/sections/hero";
import { LogosMarquee } from "@/components/sections/logos-marquee";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { WhyAIFirst } from "@/components/sections/why-ai-first";
import { HorizontalShowcase } from "@/components/sections/horizontal-showcase";
import { AboutSnapshot } from "@/components/sections/about-snapshot";
import { TargetAudience } from "@/components/sections/target-audience";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { VideoSection } from "@/components/sections/video-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <main>
      {/* 1. Hook them */}
      <Hero />
      <LogosMarquee />

      {/* 2. Show the problem & solution */}
      <ProblemSolution />

      {/* 3. Why AI-first (the 6 value props) */}
      <WhyAIFirst />

      {/* 4. Services — horizontal scroll showcase */}
      <HorizontalShowcase />

      {/* 5. Who we are */}
      <AboutSnapshot />
      <TargetAudience />

      {/* 6. Big text break */}
      <MarqueeSection />

      {/* 7. Video + social proof */}
      <VideoSection />

      {/* 8. FAQ */}
      <FAQSection />

      {/* 9. Final CTA */}
      <CTASection />
    </main>
  );
}
