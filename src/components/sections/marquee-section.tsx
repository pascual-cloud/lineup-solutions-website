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
      // Row 1 scrolls left with speed variation
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

      // Row 2 scrolls right
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

      // Rows fade/scale in when entering viewport
      [row1Ref.current, row2Ref.current].forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, scale: 0.95, filter: "blur(10px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
          }
        );
      });

      // Scrub-driven opacity: text gets brighter as you scroll through center
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0.4 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      gsap.to(sectionRef.current, {
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 70%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1 = ["AI-First Development", "/", "Custom Software", "/", "20+ Years", "/", "Platform Engineering", "/", "El Salvador", "/"];
  const row2 = ["Scale Intelligently", "/", "Digital Transformation", "/", "Build Smarter", "/", "AI Integration", "/", "Build Faster", "/"];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20">
      {/* Row 1 — outline text */}
      <div ref={row1Ref} className="mb-4 flex whitespace-nowrap" style={{ transform: "translateX(50px)" }}>
        {[...row1, ...row1].map((word, i) => (
          <span
            key={i}
            className={`mx-4 font-display text-5xl font-black sm:text-7xl lg:text-8xl ${
              word === "/"
                ? "text-white/[0.04] text-4xl sm:text-6xl"
                : ""
            }`}
            style={
              word !== "/"
                ? {
                    WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                    WebkitTextFillColor: "transparent",
                  }
                : undefined
            }
          >
            {word}
          </span>
        ))}
      </div>
      {/* Row 2 — filled but very dim */}
      <div ref={row2Ref} className="flex whitespace-nowrap" style={{ transform: "translateX(-200px)" }}>
        {[...row2, ...row2].map((word, i) => (
          <span
            key={i}
            className={`mx-4 font-display text-5xl font-black text-white/[0.03] sm:text-7xl lg:text-8xl ${
              word === "/" ? "text-4xl sm:text-6xl" : ""
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
