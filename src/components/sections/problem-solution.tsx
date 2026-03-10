"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, DollarSign, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Clock,
    problem: "Months of development",
    solution: "Weeks with AI",
    description:
      "Traditional agencies take 4-6 months for what we deliver in 4-6 weeks. AI accelerates every phase — from architecture to deployment.",
    color: "#7B2FBE",
    stat: "4-6x",
    statLabel: "faster delivery",
  },
  {
    icon: DollarSign,
    problem: "Bloated budgets",
    solution: "Efficient investment",
    description:
      "AI eliminates waste in boilerplate, documentation, and QA cycles. You get enterprise-grade output without enterprise-grade costs.",
    color: "#E31E24",
    stat: "40%",
    statLabel: "cost reduction",
  },
  {
    icon: Shield,
    problem: "Risky AI output",
    solution: "Expert-guided AI",
    description:
      "AI without experience is dangerous. Our 20+ years of expertise means every AI decision is validated by engineers who've seen it all.",
    color: "#F7941D",
    stat: "20+",
    statLabel: "years guiding AI",
  },
];

export function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".ps-reveal") || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      const cards = cardsRef.current?.children || [];
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <p className="ps-reveal mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-purple">
            The Problem
          </p>
          <h2 className="ps-reveal mb-6 font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Speed. Cost. Quality.
            <br />
            <span className="text-white/30">Pick all three.</span>
          </h2>
          <p className="ps-reveal mx-auto max-w-2xl text-lg text-white/40">
            Traditional development forces tradeoffs. AI-first development eliminates them.
          </p>
        </div>

        {/* Three Pillars */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.solution}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/10"
            >
              {/* Icon */}
              <div
                className="mb-8 inline-flex rounded-2xl p-4"
                style={{
                  background: `${pillar.color}12`,
                  boxShadow: `0 0 40px ${pillar.color}08`,
                }}
              >
                <pillar.icon className="h-7 w-7" style={{ color: pillar.color }} />
              </div>

              {/* Problem → Solution */}
              <div className="mb-6">
                <p className="mb-1 text-sm font-medium text-white/25 line-through decoration-white/10">
                  {pillar.problem}
                </p>
                <p
                  className="text-xl font-bold"
                  style={{ color: pillar.color }}
                >
                  {pillar.solution}
                </p>
              </div>

              {/* Description */}
              <p className="mb-8 text-sm leading-relaxed text-white/40">
                {pillar.description}
              </p>

              {/* Stat */}
              <div className="border-t border-white/5 pt-6">
                <div
                  className="font-display text-3xl font-black"
                  style={{
                    background: `linear-gradient(135deg, ${pillar.color}, #fff)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {pillar.stat}
                </div>
                <div className="text-xs text-white/30">{pillar.statLabel}</div>
              </div>

              {/* Hover gradient */}
              <div
                className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full opacity-0 blur-[50px] transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: pillar.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
