"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "OpenAI",
  "Vercel",
  "Tailwind",
  "GraphQL",
  "Redis",
  "Terraform",
];

export function LogosMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fades down
      gsap.fromTo(
        labelRef.current,
        { y: -20, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%" },
        }
      );

      // Track slides in from right with blur
      gsap.fromTo(
        trackRef.current,
        { x: 100, opacity: 0, filter: "blur(6px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%" },
        }
      );

      // Individual pills pop in with stagger
      const pills = trackRef.current?.querySelectorAll(".tech-pill") || [];
      gsap.fromTo(
        pills,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <p ref={labelRef} className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/20">
          Technologies we work with
        </p>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent" />

          <div ref={trackRef} className="flex animate-[marquee_25s_linear_infinite]" style={{ width: "fit-content" }}>
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={i}
                className="tech-pill mx-6 flex items-center justify-center rounded-full border border-white/5 bg-white/[0.02] px-5 py-2.5 whitespace-nowrap transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05]"
              >
                <span className="text-sm font-medium text-white/30">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
