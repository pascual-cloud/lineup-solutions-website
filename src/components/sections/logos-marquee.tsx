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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 px-6">
      <div ref={contentRef} className="mx-auto max-w-7xl">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/20">
          Technologies we work with
        </p>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent" />

          <div className="flex animate-[marquee_25s_linear_infinite]" style={{ width: "fit-content" }}>
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={i}
                className="mx-6 flex items-center justify-center rounded-full border border-white/5 bg-white/[0.02] px-5 py-2.5 whitespace-nowrap"
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
