"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollLines() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll<SVGPathElement>(".scroll-line");

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      });

      // Animate the glow dots along the paths
      const dots = svgRef.current!.querySelectorAll<SVGCircleElement>(".glow-dot");
      dots.forEach((dot, i) => {
        const path = paths[i];
        if (!path) return;
        const length = path.getTotalLength();

        gsap.to(
          { progress: 0 },
          {
            progress: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "main",
              start: "top top",
              end: "bottom bottom",
              scrub: 1.5,
              onUpdate: (self) => {
                const point = path.getPointAtLength(self.progress * length);
                gsap.set(dot, { attr: { cx: point.x, cy: point.y } });
              },
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed top-0 left-0 z-30 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1440 6000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7B2FBE" />
          <stop offset="40%" stopColor="#E31E24" />
          <stop offset="100%" stopColor="#F7941D" />
        </linearGradient>
        <linearGradient id="line-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F7941D" />
          <stop offset="50%" stopColor="#E31E24" />
          <stop offset="100%" stopColor="#7B2FBE" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="dot-glow-1">
          <stop offset="0%" stopColor="#7B2FBE" stopOpacity="1" />
          <stop offset="100%" stopColor="#7B2FBE" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dot-glow-2">
          <stop offset="0%" stopColor="#F7941D" stopOpacity="1" />
          <stop offset="100%" stopColor="#F7941D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Left flowing line */}
      <path
        className="scroll-line"
        d="M 200 0
           C 200 300, 100 500, 150 800
           C 200 1100, 50 1300, 120 1600
           C 190 1900, 80 2100, 160 2400
           C 240 2700, 100 2900, 180 3200
           C 260 3500, 120 3700, 200 4000
           C 280 4300, 140 4500, 220 4800
           C 300 5100, 160 5300, 240 5600
           C 320 5800, 200 5900, 200 6000"
        stroke="url(#line-gradient-1)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Right flowing line */}
      <path
        className="scroll-line"
        d="M 1240 0
           C 1240 300, 1340 500, 1290 800
           C 1240 1100, 1390 1300, 1320 1600
           C 1250 1900, 1360 2100, 1280 2400
           C 1200 2700, 1340 2900, 1260 3200
           C 1180 3500, 1320 3700, 1240 4000
           C 1160 4300, 1300 4500, 1220 4800
           C 1140 5100, 1280 5300, 1200 5600
           C 1120 5800, 1240 5900, 1240 6000"
        stroke="url(#line-gradient-2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Glow dots that travel along the lines */}
      <circle className="glow-dot" r="12" fill="url(#dot-glow-1)" filter="url(#glow)" opacity="0.8" cx="200" cy="0" />
      <circle className="glow-dot" r="12" fill="url(#dot-glow-2)" filter="url(#glow)" opacity="0.8" cx="1240" cy="0" />

      {/* Small accent dot on left line */}
      <circle className="glow-dot" r="4" fill="#7B2FBE" filter="url(#glow)" cx="200" cy="0" style={{ display: "none" }} />
    </svg>
  );
}
