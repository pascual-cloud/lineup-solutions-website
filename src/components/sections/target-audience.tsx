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
    color: "#7B2FBE",
  },
  {
    icon: Building2,
    title: "Enterprises",
    message:
      "Modernize with confidence. AI-powered processes reduce risk and accelerate delivery.",
    description:
      "Custom platforms that integrate with existing systems and scale reliably. No disruption, no compromise.",
    color: "#E31E24",
  },
  {
    icon: Landmark,
    title: "Institutions & Government",
    message: "Trusted experience meets modern delivery. Built to last.",
    description:
      "Secure, compliant, and reliable technology. Built by a team that understands regulated environments.",
    color: "#F7941D",
  },
];

export function TargetAudience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      const headingEls = headingRef.current?.querySelectorAll(".ta-reveal") || [];
      gsap.fromTo(
        headingEls,
        { y: 50, opacity: 0, filter: "blur(5px)" },
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

      // Cards — each slides in from a different direction
      const cards = cardsRef.current?.children || [];
      Array.from(cards).forEach((card, i) => {
        const icon = card.querySelector(".ta-icon");
        const title = card.querySelector(".ta-title");
        const quote = card.querySelector(".ta-quote");
        const desc = card.querySelector(".ta-desc");
        const topLine = card.querySelector(".ta-line");

        const directions = [
          { x: -80, y: 0, rotation: -3 },
          { x: 0, y: 80, rotation: 0 },
          { x: 80, y: 0, rotation: 3 },
        ];
        const dir = directions[i] || directions[1];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
          },
        });

        tl.fromTo(
          card,
          { x: dir.x, y: dir.y, opacity: 0, rotation: dir.rotation },
          { x: 0, y: 0, opacity: 1, rotation: 0, duration: 1, ease: "power3.out" }
        );

        if (icon) {
          tl.fromTo(icon, { scale: 0, rotation: -20 }, { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }, 0.3);
        }
        if (title) {
          tl.fromTo(title, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.35);
        }
        if (quote) {
          tl.fromTo(quote, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.45);
        }
        if (desc) {
          tl.fromTo(desc, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.55);
        }
        if (topLine) {
          tl.fromTo(topLine, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.8, ease: "power2.out" }, 0.4);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div ref={headingRef} className="mb-16 text-center">
          <p className="ta-reveal mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-purple">
            Who We Serve
          </p>
          <h2 className="ta-reveal font-display text-4xl font-black sm:text-5xl">
            Built for builders at
            <span className="gradient-text"> every scale.</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/10"
            >
              <item.icon
                className="ta-icon mb-6 h-8 w-8 transition-colors group-hover:text-brand-purple"
                style={{ color: `${item.color}60` }}
              />
              <h3 className="ta-title mb-2 text-2xl font-bold">{item.title}</h3>
              <p className="ta-quote mb-4 text-sm font-medium italic" style={{ color: `${item.color}cc` }}>
                &ldquo;{item.message}&rdquo;
              </p>
              <p className="ta-desc text-sm leading-relaxed text-white/40">
                {item.description}
              </p>

              {/* Hover gradient line at top */}
              <div
                className="ta-line absolute top-0 left-0 h-[2px] w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to right, ${item.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
