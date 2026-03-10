"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "20+", label: "Years of Experience", color: "#7B2FBE" },
  { value: "AI", label: "First Development", color: "#E31E24" },
  { value: "SV", label: "Based in El Salvador", color: "#F7941D" },
  { value: "∞", label: "Global Clients", color: "#8B5CF6" },
];

export function AboutSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated line draws from center
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
          },
        }
      );

      // Text reveal — each line slides up with blur
      const textEls = textRef.current?.querySelectorAll(".about-reveal") || [];
      gsap.fromTo(
        textEls,
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );

      // Stats — each card has individual entrance
      const statItems = statsRef.current?.children || [];
      Array.from(statItems).forEach((stat, i) => {
        const value = stat.querySelector(".stat-value");
        const label = stat.querySelector(".stat-label");
        const topLine = stat.querySelector(".stat-line");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
          },
        });

        // Card entrance — alternating scale/rotate
        tl.fromTo(
          stat,
          { y: 60, opacity: 0, scale: 0.8, rotateY: i % 2 === 0 ? 15 : -15 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.9,
            ease: "back.out(1.2)",
            delay: i * 0.1,
          }
        );

        // Value punches in
        if (value) {
          tl.fromTo(
            value,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" },
            0.3 + i * 0.1
          );
        }

        if (label) {
          tl.fromTo(
            label,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            0.5 + i * 0.1
          );
        }

        if (topLine) {
          tl.fromTo(
            topLine,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 0.6, ease: "power2.out" },
            0.4 + i * 0.1
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      {/* Animated divider line */}
      <div
        ref={lineRef}
        className="mx-auto mb-20 h-[1px] max-w-7xl origin-center bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <div ref={textRef}>
            <p className="about-reveal mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
              About Us
            </p>
            <h2 className="about-reveal mb-6 font-display text-4xl font-black leading-tight sm:text-5xl">
              Two decades of expertise.
              <br />
              <span className="text-white/40">One bold new approach.</span>
            </h2>
            <p className="about-reveal mb-6 text-lg leading-relaxed text-white/40">
              We&apos;ve been building software for over 20 years. When AI
              arrived, we didn&apos;t add it as a feature — we rebuilt our entire
              process around it. The result: faster delivery, fewer mistakes, and
              products that scale from day one.
            </p>
            <p className="about-reveal text-lg leading-relaxed text-white/40">
              Based in El Salvador, building for the world. Our bilingual team
              bridges Central American talent with global ambition.
            </p>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4" style={{ perspective: "600px" }}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.color}10, transparent 70%)`,
                  }}
                />
                <div
                  className="stat-value mb-2 font-display text-4xl font-black sm:text-5xl"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, #fff)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="stat-label text-sm text-white/40">{stat.label}</div>

                {/* Top line accent */}
                <div
                  className="stat-line absolute top-0 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(to right, ${stat.color}, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
