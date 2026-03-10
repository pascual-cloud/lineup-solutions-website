"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Brain,
  DollarSign,
  Shield,
  RefreshCw,
  Globe,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Zap,
    title: "Build Faster",
    description:
      "Ship in weeks, not months. AI accelerates code generation, testing, and iteration cycles dramatically.",
    gradient: "from-brand-purple to-violet-600",
    color: "#7B2FBE",
  },
  {
    icon: Brain,
    title: "Build Smarter",
    description:
      "AI-assisted architecture catches issues early. Smarter code reviews. More consistent output.",
    gradient: "from-violet-600 to-brand-red",
    color: "#8B5CF6",
  },
  {
    icon: DollarSign,
    title: "Build More Efficiently",
    description:
      "AI reduces overhead in repetitive tasks, boilerplate, and QA. More value per dollar invested.",
    gradient: "from-brand-red to-rose-500",
    color: "#E31E24",
  },
  {
    icon: Shield,
    title: "Build with Confidence",
    description:
      "20 years of experience guiding every AI decision. We know when to trust the AI and when to override it.",
    gradient: "from-rose-500 to-brand-orange",
    color: "#F43F5E",
  },
  {
    icon: RefreshCw,
    title: "Iterate Without Friction",
    description:
      "Changes that used to take days now take hours. Pivot, experiment, and improve with speed.",
    gradient: "from-brand-orange to-amber-500",
    color: "#F7941D",
  },
  {
    icon: Globe,
    title: "Scale Intelligently",
    description:
      "AI-assisted architectures that are modular, scalable, and ready for growth from day one.",
    gradient: "from-amber-500 to-brand-purple",
    color: "#F59E0B",
  },
];

function TiltCard({
  card,
}: {
  card: (typeof cards)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - 100,
          y: y - 100,
          opacity: 1,
          duration: 0.3,
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-white/10 hover:bg-white/[0.04]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0"
        style={{
          background: `radial-gradient(circle, ${card.color}20, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className={`ai-icon mb-6 inline-flex rounded-xl bg-gradient-to-br ${card.gradient} p-3 shadow-lg`}
        style={{ boxShadow: `0 8px 30px ${card.color}30` }}
      >
        <card.icon className="h-5 w-5 text-white" />
      </div>

      {/* Content */}
      <h3 className="ai-title mb-3 text-xl font-bold">{card.title}</h3>
      <p className="ai-desc text-sm leading-relaxed text-white/40">
        {card.description}
      </p>

      {/* Bottom gradient line on hover */}
      <div
        className="ai-line absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{
          background: `linear-gradient(to right, ${card.color}, transparent)`,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute -top-px -right-px h-16 w-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(225deg, ${card.color}15, transparent 70%)`,
        }}
      />
    </div>
  );
}

export function WhyAIFirst() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated line that draws across
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
          },
        }
      );

      // Heading reveal with blur + rotateX
      const headingEls = headingRef.current?.querySelectorAll(".reveal") || [];
      gsap.fromTo(
        headingEls,
        { y: 80, opacity: 0, rotateX: 25, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards — individual entrance with timeline per card
      const cards = cardsRef.current?.children || [];
      Array.from(cards).forEach((card, i) => {
        const icon = card.querySelector(".ai-icon");
        const title = card.querySelector(".ai-title");
        const desc = card.querySelector(".ai-desc");
        const bottomLine = card.querySelector(".ai-line");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });

        tl.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", delay: i * 0.06 }
        );

        if (icon) {
          tl.fromTo(
            icon,
            { scale: 0, rotation: -15 },
            { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" },
            0.2 + i * 0.06
          );
        }

        if (title) {
          tl.fromTo(
            title,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            0.3 + i * 0.06
          );
        }

        if (desc) {
          tl.fromTo(
            desc,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            0.4 + i * 0.06
          );
        }

        if (bottomLine) {
          tl.fromTo(
            bottomLine,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 0.6, ease: "power2.out" },
            0.35 + i * 0.06
          );
        }
      });

      // Heading parallax — subtle lift on scroll
      gsap.to(headingRef.current, {
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
    <section ref={sectionRef} className="relative py-32 px-6">
      {/* Section connector line */}
      <div
        ref={lineRef}
        className="mx-auto mb-20 h-[1px] max-w-7xl origin-left bg-gradient-to-r from-brand-purple via-brand-red/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-20 max-w-3xl" style={{ perspective: "800px" }}>
          <p className="reveal mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-purple">
            Why AI-First
          </p>
          <h2 className="reveal mb-6 font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            The future of software
            <br />
            <span className="gradient-text">is already here.</span>
          </h2>
          <p className="reveal text-lg leading-relaxed text-white/40">
            Every advantage compounds. AI doesn&apos;t just make us faster — it
            makes the entire product lifecycle smarter.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <TiltCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
