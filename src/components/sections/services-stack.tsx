"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Cpu, Globe, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    number: "01",
    title: "Custom Software Development",
    description:
      "We design and build tailored software systems from the ground up — SaaS platforms, internal tools, enterprise systems, and fintech solutions. Every project is delivered using our AI-first process.",
    features: ["SaaS Platforms", "Enterprise Systems", "Internal Tools", "Fintech Solutions"],
    color: "#7B2FBE",
  },
  {
    icon: Layers,
    number: "02",
    title: "Platform Engineering",
    description:
      "From marketplaces to financial platforms to mobile apps, we architect scalable digital platforms built to handle real-world complexity and millions of users.",
    features: ["Marketplaces", "Mobile Apps", "Financial Platforms", "Scalable Architecture"],
    color: "#9333EA",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "AI Integration & Automation",
    description:
      "We help companies embed AI into their existing products and workflows — from intelligent automation to custom AI features that give your product a competitive edge.",
    features: ["Custom AI Features", "Intelligent Automation", "ML Pipelines", "AI-Powered UX"],
    color: "#E31E24",
  },
  {
    icon: Cpu,
    number: "04",
    title: "Technology Consulting",
    description:
      "Not sure where to start? We help organizations choose the right architecture, technology stack, and product strategy — so you build the right thing, the right way.",
    features: ["Architecture Design", "Tech Stack Selection", "Product Strategy", "Code Audits"],
    color: "#F43F5E",
  },
  {
    icon: Globe,
    number: "05",
    title: "Digital Transformation",
    description:
      "We modernize legacy systems and outdated processes with modern, AI-assisted technology — without disrupting your operations or losing your data.",
    features: ["Legacy Modernization", "Cloud Migration", "Process Automation", "Zero Downtime"],
    color: "#F7941D",
  },
];

export function ServicesStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".stack-reveal") || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      const totalCards = cards.length;

      if (isMobile) {
        // Mobile: simple staggered fade-in with slide-up for each card
        cards.forEach((card, i) => {
          const inner = card.querySelector<HTMLElement>(".stack-card-inner");
          if (!inner) return;

          gsap.fromTo(
            inner,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        });
      } else {
        // Desktop: full sticky card stacking
        cards.forEach((card, i) => {
          const inner = card.querySelector<HTMLElement>(".stack-card-inner");
          if (!inner) return;

          const isLast = i === totalCards - 1;

          if (!isLast) {
            ScrollTrigger.create({
              trigger: card,
              start: () => `top ${80 + i * 12}px`,
              endTrigger: cardsContainerRef.current,
              end: "bottom bottom",
              pin: true,
              pinSpacing: false,
            });

            gsap.to(inner, {
              scale: 0.9 - i * 0.01,
              opacity: 0,
              filter: "blur(6px)",
              ease: "power1.in",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top 40%",
                end: "top 10%",
                scrub: 0.5,
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative pb-32">
      {/* Heading */}
      <div ref={headingRef} className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-7xl">
          <p className="stack-reveal mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
            Services
          </p>
          <div className="stack-reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              What we build.
            </h2>
            <Link
              href="/services"
              className="group flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-white"
            >
              Explore all services
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Stacking Cards */}
      <div ref={cardsContainerRef} className="relative px-6">
        <div className="mx-auto max-w-7xl">
          {services.map((service) => (
            <div key={service.number} className="stack-card mb-8 md:mb-8">
              <div
                className="stack-card-inner overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a] md:rounded-3xl"
              >
                <div
                  className="relative p-6 sm:p-10 lg:p-12"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}08, transparent 50%)`,
                  }}
                >
                  {/* Top row: icon + number */}
                  <div className="mb-6 flex items-start justify-between sm:mb-8">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14 sm:rounded-2xl"
                      style={{ background: `${service.color}15` }}
                    >
                      <service.icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: service.color }} />
                    </div>
                    <span
                      className="font-display text-6xl font-black leading-none sm:text-8xl lg:text-9xl"
                      style={{
                        background: `linear-gradient(180deg, ${service.color}12, transparent)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {service.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    <div>
                      <h3 className="mb-3 font-display text-xl font-black sm:mb-4 sm:text-3xl lg:text-4xl">
                        {service.title}
                      </h3>
                      <p className="max-w-lg text-sm leading-relaxed text-white/40 sm:text-base">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 lg:justify-end lg:self-end">
                      {service.features.map((feat) => (
                        <span
                          key={feat}
                          className="rounded-full border px-3 py-1.5 text-[10px] font-medium sm:px-4 sm:py-2 sm:text-xs"
                          style={{
                            borderColor: `${service.color}25`,
                            color: `${service.color}`,
                          }}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-full"
                    style={{
                      background: `linear-gradient(to right, ${service.color}50, transparent 60%)`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
