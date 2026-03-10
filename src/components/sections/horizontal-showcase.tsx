"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Cpu, Globe, Layers, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    icon: Code2,
    title: "Custom Software",
    description: "Tailored systems from the ground up. SaaS, internal tools, enterprise platforms — all AI-accelerated.",
    color: "#7B2FBE",
    stat: "60%",
    statLabel: "Faster delivery",
  },
  {
    icon: Layers,
    title: "Platform Engineering",
    description: "Scalable digital platforms for marketplaces, fintech, and complex business systems.",
    color: "#9333EA",
    stat: "10x",
    statLabel: "Iteration speed",
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    description: "Embed AI into existing products — intelligent automation, custom models, smart features.",
    color: "#E31E24",
    stat: "24/7",
    statLabel: "AI-powered QA",
  },
  {
    icon: Cpu,
    title: "Tech Consulting",
    description: "Right architecture, right stack, right strategy. We help you build the right thing, the right way.",
    color: "#F43F5E",
    stat: "20+",
    statLabel: "Years experience",
  },
  {
    icon: Globe,
    title: "Digital Transformation",
    description: "Modernize legacy systems with AI-assisted technology — without disrupting your operations.",
    color: "#F7941D",
    stat: "0",
    statLabel: "Downtime migrations",
  },
];

export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      // Heading entrance
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".hs-reveal") || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      // Horizontal scroll
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Cards reveal as they enter viewport
      const cards = track.querySelectorAll(".showcase-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.9, rotateY: 5 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById?.("hscroll") || undefined,
              start: "left 80%",
              end: "left 30%",
              scrub: true,
              horizontal: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Heading — shows before pin */}
      <div ref={headingRef} className="px-6 pt-32 pb-12">
        <div className="mx-auto max-w-7xl">
          <p className="hs-reveal mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
            Services
          </p>
          <h2 className="hs-reveal font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            What we build.
          </h2>
          <p className="hs-reveal mt-4 max-w-lg text-lg text-white/40">
            Every service is delivered through our AI-first process. Scroll to explore.
          </p>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-stretch gap-6 px-6 pb-32"
        style={{ width: "fit-content" }}
      >
        {showcaseItems.map((item) => (
          <div
            key={item.title}
            className="showcase-card group relative flex h-[420px] w-[380px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/10 sm:w-[440px]"
            style={{ perspective: "800px" }}
          >
            {/* Top glow */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: item.color }}
            />

            <div>
              <div
                className="mb-6 inline-flex rounded-2xl p-3.5"
                style={{ background: `${item.color}15`, boxShadow: `0 0 30px ${item.color}10` }}
              >
                <item.icon className="h-6 w-6" style={{ color: item.color }} />
              </div>
              <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/40">
                {item.description}
              </p>
            </div>

            {/* Stat */}
            <div className="flex items-end justify-between">
              <div>
                <div
                  className="font-display text-4xl font-black"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, #fff)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {item.stat}
                </div>
                <div className="text-xs text-white/30">{item.statLabel}</div>
              </div>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/5"
              >
                <svg className="h-4 w-4 text-white/20 transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Bottom gradient line */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
              style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
            />
          </div>
        ))}

        {/* CTA card at end */}
        <div className="flex h-[420px] w-[380px] flex-shrink-0 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 sm:w-[440px]">
          <p className="mb-4 text-lg font-bold text-white/60">Have a project in mind?</p>
          <a
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(123,47,190,0.4)]"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </section>
  );
}
