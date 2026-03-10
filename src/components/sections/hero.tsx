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
  const meshRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Mesh gradient blobs animate in
      const blobs = meshRef.current?.children;
      if (blobs) {
        tl.fromTo(
          blobs,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.5, stagger: 0.2, ease: "elastic.out(1, 0.6)" }
        );
      }

      // Rotating ring
      tl.fromTo(
        ringRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 2, ease: "power3.out" },
        0.3
      );

      // Badge
      tl.fromTo(
        badgeRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1 },
        0.8
      );

      // Characters cascade in
      tl.fromTo(
        headlineRef.current?.querySelectorAll(".char") || [],
        { y: 120, opacity: 0, rotateX: 50, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.02,
          ease: "power4.out",
        },
        0.9
      );

      // Subheadline
      tl.fromTo(
        subRef.current,
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 },
        1.6
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2 },
        1.9
      );

      // Continuous mesh animation — blobs drift
      if (blobs) {
        Array.from(blobs).forEach((blob, i) => {
          gsap.to(blob, {
            x: `random(-80, 80)`,
            y: `random(-80, 80)`,
            scale: `random(0.8, 1.2)`,
            duration: 8 + i * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      // Ring slowly rotates forever
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      // Mouse parallax on mesh
      const handleMouse = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        if (meshRef.current) {
          gsap.to(meshRef.current, { x, y, duration: 1.5, ease: "power2.out" });
        }
        if (ringRef.current) {
          gsap.to(ringRef.current, { x: -x * 0.3, y: -y * 0.3, duration: 2, ease: "power2.out" });
        }
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
      {/* Animated gradient mesh */}
      <div
        ref={meshRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="absolute h-[500px] w-[500px] rounded-full bg-brand-purple/20 blur-[120px]" style={{ top: "20%", left: "25%" }} />
        <div className="absolute h-[400px] w-[400px] rounded-full bg-brand-red/15 blur-[100px]" style={{ top: "40%", left: "50%" }} />
        <div className="absolute h-[450px] w-[450px] rounded-full bg-brand-orange/15 blur-[110px]" style={{ top: "25%", right: "20%" }} />
        <div className="absolute h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[90px]" style={{ bottom: "20%", left: "35%" }} />
      </div>

      {/* Decorative rotating ring */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-[600px] w-[600px] rounded-full border border-white/[0.03] lg:h-[750px] lg:w-[750px]" />
        {/* Dot on the ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-2 w-2 rounded-full bg-brand-purple shadow-[0_0_12px_rgba(123,47,190,0.8)]" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="h-2 w-2 rounded-full bg-brand-orange shadow-[0_0_12px_rgba(247,148,29,0.8)]" />
        </div>
      </div>

      {/* Subtle radial grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
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
            AI-First Development &middot; 20+ Years &middot; El Salvador
          </span>
        </div>

        {/* Headline */}
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
                className="char inline-block text-white/25"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        {/* Decorative line with experience badge */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-brand-purple/40" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/25">
            Two Decades of Expertise
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-brand-orange/40" />
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/40 sm:text-xl"
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

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/15">
            Scroll
          </span>
          <div className="relative h-12 w-[1px] overflow-hidden">
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute top-0 h-4 w-[1px] animate-[scrollIndicator_2s_ease-in-out_infinite] bg-gradient-to-b from-brand-purple to-brand-orange" />
          </div>
        </div>
      </div>
    </section>
  );
}
