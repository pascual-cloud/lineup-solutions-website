"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = containerRef.current.querySelectorAll(".particle");
    const ctx = gsap.context(() => {
      particles.forEach((particle, i) => {
        const delay = i * 0.3;
        const duration = 4 + Math.random() * 4;

        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-50, 50)",
          opacity: "random(0.1, 0.5)",
          duration,
          delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute h-1 w-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor:
              i % 3 === 0
                ? "#7B2FBE"
                : i % 3 === 1
                  ? "#E31E24"
                  : "#F7941D",
            opacity: 0.15,
          }}
        />
      ))}
    </div>
  );
}
