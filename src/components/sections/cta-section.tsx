"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div
          ref={contentRef}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] px-8 py-20 text-center sm:px-16"
        >
          {/* Background orbs */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-brand-purple/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-brand-orange/10 blur-[100px]" />

          <h2 className="relative mb-6 font-display text-4xl font-black sm:text-5xl lg:text-6xl">
            Ready to build
            <br />
            <span className="gradient-text">something great?</span>
          </h2>
          <p className="relative mx-auto mb-10 max-w-xl text-lg text-white/40">
            Let&apos;s talk about your project. We&apos;ll show you what
            AI-first development can do for your timeline and budget.
          </p>
          <Link
            href="/contact"
            className="relative inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-semibold text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(123,47,190,0.4)]"
          >
            Start the Conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
