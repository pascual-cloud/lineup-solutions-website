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
      // Heading — word-by-word reveal
      const headingEls = headingRef.current?.querySelectorAll(".ps-reveal") || [];
      gsap.fromTo(
        headingEls,
        { y: 80, opacity: 0, rotateX: 25, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      // Cards — each card has its own entrance timeline
      const cards = cardsRef.current?.children || [];
      Array.from(cards).forEach((card, i) => {
        const icon = card.querySelector(".ps-icon");
        const problem = card.querySelector(".ps-problem");
        const solution = card.querySelector(".ps-solution");
        const desc = card.querySelector(".ps-desc");
        const statVal = card.querySelector(".ps-stat");
        const statLabel = card.querySelector(".ps-stat-label");
        const divider = card.querySelector(".ps-divider");
        const glow = card.querySelector(".ps-glow");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
          },
        });

        // Card slides up
        tl.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", delay: i * 0.12 }
        );

        // Icon bounces in
        tl.fromTo(
          icon,
          { scale: 0, rotation: -30 },
          { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" },
          0.3 + i * 0.12
        );

        // Problem strikes through then solution appears
        tl.fromTo(
          problem,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          0.4 + i * 0.12
        );

        tl.fromTo(
          solution,
          { x: -20, opacity: 0, y: 8 },
          { x: 0, opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.55 + i * 0.12
        );

        tl.fromTo(
          desc,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          0.6 + i * 0.12
        );

        // Divider draws across
        if (divider) {
          tl.fromTo(
            divider,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 0.8, ease: "power2.out" },
            0.65 + i * 0.12
          );
        }

        // Stat counter effect
        if (statVal) {
          tl.fromTo(
            statVal,
            { y: 20, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
            0.75 + i * 0.12
          );
        }

        if (statLabel) {
          tl.fromTo(
            statLabel,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            0.85 + i * 0.12
          );
        }

        // Hover glow pulses subtly
        if (glow) {
          tl.fromTo(
            glow,
            { scale: 0 },
            { scale: 1, duration: 1, ease: "power2.out" },
            0.5 + i * 0.12
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center" style={{ perspective: "1000px" }}>
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
                className="ps-icon mb-8 inline-flex rounded-2xl p-4"
                style={{
                  background: `${pillar.color}12`,
                  boxShadow: `0 0 40px ${pillar.color}08`,
                }}
              >
                <pillar.icon className="h-7 w-7" style={{ color: pillar.color }} />
              </div>

              {/* Problem → Solution */}
              <div className="mb-6">
                <p className="ps-problem mb-1 text-sm font-medium text-white/25 line-through decoration-white/10">
                  {pillar.problem}
                </p>
                <p
                  className="ps-solution text-xl font-bold"
                  style={{ color: pillar.color }}
                >
                  {pillar.solution}
                </p>
              </div>

              {/* Description */}
              <p className="ps-desc mb-8 text-sm leading-relaxed text-white/40">
                {pillar.description}
              </p>

              {/* Stat */}
              <div className="ps-divider border-t border-white/5 pt-6">
                <div
                  className="ps-stat font-display text-3xl font-black"
                  style={{
                    background: `linear-gradient(135deg, ${pillar.color}, #fff)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {pillar.stat}
                </div>
                <div className="ps-stat-label text-xs text-white/30">{pillar.statLabel}</div>
              </div>

              {/* Hover gradient */}
              <div
                className="ps-glow pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full opacity-0 blur-[50px] transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: pillar.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
