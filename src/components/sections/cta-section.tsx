"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card scales up from small with rotation
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, scale: 0.9, rotateX: 5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Inner elements stagger
      const reveals = cardRef.current?.querySelectorAll(".cta-reveal") || [];
      gsap.fromTo(
        reveals,
        { y: 40, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Background orbs float continuously
      const orbs = orbsRef.current?.children || [];
      Array.from(orbs).forEach((orb, i) => {
        gsap.to(orb, {
          x: `random(-40, 40)`,
          y: `random(-40, 40)`,
          scale: `random(0.8, 1.3)`,
          duration: 6 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Parallax on the whole card
      gsap.to(cardRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6" style={{ perspective: "1200px" }}>
      <div className="mx-auto max-w-7xl">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] px-8 py-20 text-center sm:px-16"
        >
          {/* Background orbs */}
          <div ref={orbsRef} className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-brand-purple/10 blur-[100px]" />
            <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-brand-orange/10 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-60 rounded-full bg-brand-red/5 blur-[80px]" />
          </div>

          <h2 className="cta-reveal relative mb-6 font-display text-4xl font-black sm:text-5xl lg:text-6xl">
            Ready to build
          </h2>
          <h2 className="cta-reveal relative mb-6 font-display text-4xl font-black sm:text-5xl lg:text-6xl">
            <span className="gradient-text">something great?</span>
          </h2>
          <p className="cta-reveal relative mx-auto mb-10 max-w-xl text-lg text-white/40">
            Let&apos;s talk about your project. We&apos;ll show you what
            AI-first development can do for your timeline and budget.
          </p>
          <div className="cta-reveal">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-10 py-4 text-sm font-semibold text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(123,47,190,0.4)]"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                Start the Conversation
              </span>
              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-brand-purple via-brand-red to-brand-orange transition-transform duration-500 group-hover:translate-y-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
