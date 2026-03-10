"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        orbRef.current,
        { scale: 0, opacity: 0, rotation: -90 },
        { scale: 1, opacity: 1, rotation: 0, duration: 2.5, ease: "elastic.out(1, 0.5)" }
      )
        .fromTo(
          orb2Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2, ease: "elastic.out(1, 0.8)" },
          0.3
        )
        .fromTo(
          linesRef.current?.children || [],
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 1.5, stagger: 0.05, ease: "power2.out" },
          0.2
        )
        .fromTo(
          badgeRef.current,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1 },
          0.6
        )
        .fromTo(
          headlineRef.current?.querySelectorAll(".char") || [],
          { y: 140, opacity: 0, rotateX: 60, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.4,
            stagger: 0.02,
            ease: "power4.out",
          },
          0.7
        )
        .fromTo(
          subRef.current,
          { y: 40, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 },
          1.4
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2 },
          1.7
        );

      // Continuous floating animation on orbs
      gsap.to(orbRef.current, {
        y: -30,
        x: 15,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        y: 20,
        x: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax on mouse move
      const handleMouse = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to(orbRef.current, { x, y, duration: 1.5, ease: "power2.out" });
        gsap.to(orb2Ref.current, { x: -x * 0.7, y: -y * 0.7, duration: 1.5, ease: "power2.out" });
      };
      window.addEventListener("mousemove", handleMouse);

      return () => window.removeEventListener("mousemove", handleMouse);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline = "We Build Software with AI";
  const subtitle = "Faster. Smarter. Better.";

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background Orbs */}
      <div
        ref={orbRef}
        className="pointer-events-none absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-br from-brand-purple/25 via-brand-red/10 to-transparent blur-[100px]" />
      </div>
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute right-1/4 top-2/3"
      >
        <div className="h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-brand-orange/20 via-brand-red/5 to-transparent blur-[100px]" />
      </div>

      {/* Animated vertical lines in background */}
      <div
        ref={linesRef}
        className="pointer-events-none absolute inset-0 flex justify-between px-[10%] opacity-[0.04]"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-full w-[1px] origin-top"
            style={{
              background: `linear-gradient(to bottom, ${i % 2 === 0 ? "#7B2FBE" : "#F7941D"}, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div ref={badgeRef} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-purple opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-purple" />
          </span>
          <span className="text-xs font-medium tracking-wide text-white/60">
            AI-First Development Company &middot; El Salvador
          </span>
        </div>

        {/* Headline — character by character reveal */}
        <h1
          ref={headlineRef}
          className="mb-4 font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl lg:text-[5.5rem]"
          style={{ perspective: "1200px" }}
        >
          {headline.split("").map((char, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " "
                ? "\u00A0"
                : char === "A" && headline[i + 1] === "I"
                  ? <span className="gradient-text">{char}</span>
                  : char === "I" && headline[i - 1] === "A"
                    ? <span className="gradient-text">{char}</span>
                    : char}
            </span>
          ))}
          <br />
          <span className="mt-2 block">
            {subtitle.split("").map((char, i) => (
              <span
                key={`sub-${i}`}
                className="char inline-block text-white/30"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        {/* Experience badge inline */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-purple/50" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30">
            20+ Years of Experience
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-orange/50" />
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/45 sm:text-xl"
        >
          Lineup Solutions combines two decades of software engineering
          experience with AI-powered development to deliver digital products
          faster and more reliably than traditional agencies.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(123,47,190,0.5)]"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
              Start a Project
            </span>
            <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-brand-purple via-brand-red to-brand-orange transition-transform duration-500 group-hover:translate-y-0" />
          </Link>
          <Link
            href="/how-we-work"
            className="group flex items-center gap-2 rounded-full border border-white/10 px-8 py-4 text-sm font-medium text-white/60 transition-all duration-500 hover:border-brand-purple/30 hover:text-white hover:shadow-[0_0_30px_rgba(123,47,190,0.15)]"
          >
            <span>See How We Work</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator with animated dot */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/20">
            Scroll
          </span>
          <div className="relative h-14 w-[1px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
            <div className="absolute top-0 h-4 w-[1px] animate-[scrollIndicator_2s_ease-in-out_infinite] bg-gradient-to-b from-brand-purple to-brand-orange" />
          </div>
        </div>
      </div>
    </section>
  );
}
