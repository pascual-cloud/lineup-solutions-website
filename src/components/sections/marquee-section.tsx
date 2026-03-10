"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(row1Ref.current, {
        x: -300,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(row2Ref.current, {
        x: 200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1 = ["AI-First Development", "\u2022", "Custom Software", "\u2022", "20+ Years", "\u2022", "Platform Engineering", "\u2022", "El Salvador", "\u2022"];
  const row2 = ["Scale Intelligently", "\u2022", "Digital Transformation", "\u2022", "Build Smarter", "\u2022", "AI Integration", "\u2022", "Build Faster", "\u2022"];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16">
      {/* Row 1 */}
      <div ref={row1Ref} className="mb-3 flex whitespace-nowrap" style={{ transform: "translateX(50px)" }}>
        {[...row1, ...row1].map((word, i) => (
          <span
            key={i}
            className={`mx-4 font-display text-5xl font-black sm:text-7xl lg:text-8xl ${
              word === "\u2022"
                ? "gradient-text text-3xl sm:text-5xl"
                : "text-white/[0.04]"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
      {/* Row 2 — opposite direction */}
      <div ref={row2Ref} className="flex whitespace-nowrap" style={{ transform: "translateX(-200px)" }}>
        {[...row2, ...row2].map((word, i) => (
          <span
            key={i}
            className={`mx-4 font-display text-5xl font-black sm:text-7xl lg:text-8xl ${
              word === "\u2022"
                ? "gradient-text text-3xl sm:text-5xl"
                : "text-white/[0.04]"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
