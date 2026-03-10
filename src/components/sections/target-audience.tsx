"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Building2, Landmark } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  {
    icon: Rocket,
    title: "Startups",
    message: "Launch faster. Spend smarter. Build the right thing from day one.",
    description:
      "Build your first product fast without burning your runway. AI-first development is the competitive advantage you need.",
  },
  {
    icon: Building2,
    title: "Enterprises",
    message:
      "Modernize with confidence. AI-powered processes reduce risk and accelerate delivery.",
    description:
      "Custom platforms that integrate with existing systems and scale reliably. No disruption, no compromise.",
  },
  {
    icon: Landmark,
    title: "Institutions & Government",
    message: "Trusted experience meets modern delivery. Built to last.",
    description:
      "Secure, compliant, and reliable technology. Built by a team that understands regulated environments.",
  },
];

export function TargetAudience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".audience-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-purple">
            Who We Serve
          </p>
          <h2 className="font-display text-4xl font-black sm:text-5xl">
            Built for builders at
            <span className="gradient-text"> every scale.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="audience-card group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/10"
            >
              <item.icon className="mb-6 h-8 w-8 text-white/20 transition-colors group-hover:text-brand-purple" />
              <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
              <p className="mb-4 text-sm font-medium italic text-brand-purple/80">
                &ldquo;{item.message}&rdquo;
              </p>
              <p className="text-sm leading-relaxed text-white/40">
                {item.description}
              </p>

              {/* Hover gradient line at top */}
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-brand-purple via-brand-red to-brand-orange opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
