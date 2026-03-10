"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading — words fade in
      const headingEls = headingRef.current?.querySelectorAll(".vid-reveal") || [];
      gsap.fromTo(
        headingEls,
        { y: 40, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      // Video container — cinematic scale reveal with parallax
      gsap.fromTo(
        videoRef.current,
        { y: 100, opacity: 0, scale: 0.88, borderRadius: "3rem" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          borderRadius: "1.5rem",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 85%",
          },
        }
      );

      // Corner accents stagger in
      const corners = videoRef.current?.querySelectorAll(".vid-corner") || [];
      gsap.fromTo(
        corners,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 70%",
          },
        }
      );

      // Play button pulse entrance
      const playBtn = videoRef.current?.querySelector(".vid-play");
      if (playBtn) {
        gsap.fromTo(
          playBtn,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: videoRef.current,
              start: "top 65%",
            },
          }
        );
      }

      // Parallax on scroll — video lifts slightly
      gsap.to(videoRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Grid overlay subtle fade in
      const grid = videoRef.current?.querySelector(".vid-grid");
      if (grid) {
        gsap.fromTo(
          grid,
          { opacity: 0 },
          {
            opacity: 0.03,
            duration: 2,
            scrollTrigger: {
              trigger: videoRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 text-center">
          <h2 className="vid-reveal mb-4 font-display text-3xl font-black sm:text-4xl">
            See what AI-first development
          </h2>
          <h2 className="vid-reveal mb-4 font-display text-3xl font-black sm:text-4xl">
            <span className="gradient-text">looks like in action.</span>
          </h2>
          <p className="vid-reveal text-lg text-white/40">
            Hit play. Crank the volume. See what we&apos;re building.
          </p>
        </div>

        {/* Video Container */}
        <div
          ref={videoRef}
          className="group relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]"
        >
          {/* Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-brand-red/5 to-brand-orange/10" />

          {/* Grid overlay */}
          <div
            className="vid-grid absolute inset-0 opacity-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Play Button */}
          <button className="absolute inset-0 flex items-center justify-center">
            <div className="vid-play relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-white/10" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                <Play className="ml-1 h-8 w-8 text-white" fill="white" />
              </div>
            </div>
          </button>

          {/* Corner accents */}
          <div className="vid-corner absolute top-4 left-4 h-8 w-8 border-t border-l border-white/10" />
          <div className="vid-corner absolute top-4 right-4 h-8 w-8 border-t border-r border-white/10" />
          <div className="vid-corner absolute bottom-4 left-4 h-8 w-8 border-b border-l border-white/10" />
          <div className="vid-corner absolute bottom-4 right-4 h-8 w-8 border-b border-r border-white/10" />
        </div>
      </div>
    </section>
  );
}
