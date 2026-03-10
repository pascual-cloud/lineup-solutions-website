"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-black sm:text-4xl">
            See what AI-first development
            <br />
            <span className="gradient-text">looks like in action.</span>
          </h2>
          <p className="text-lg text-white/40">
            Hit play. Crank the volume. See what we&apos;re building.
          </p>
        </div>

        {/* Video Container */}
        <div
          ref={videoRef}
          className="group relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]"
        >
          {/* Placeholder - replace with actual video */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-brand-red/5 to-brand-orange/10" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Play Button */}
          <button className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-white/10" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <Play className="ml-1 h-8 w-8 text-white" fill="white" />
              </div>
            </div>
          </button>

          {/* Corner accents */}
          <div className="absolute top-4 left-4 h-8 w-8 border-t border-l border-white/10" />
          <div className="absolute top-4 right-4 h-8 w-8 border-t border-r border-white/10" />
          <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-white/10" />
          <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-white/10" />
        </div>
      </div>
    </section>
  );
}
