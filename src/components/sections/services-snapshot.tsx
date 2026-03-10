"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Custom Software Development",
    description:
      "Tailored systems built from the ground up — SaaS, internal tools, enterprise platforms.",
    color: "#7B2FBE",
  },
  {
    number: "02",
    title: "Platform Engineering",
    description:
      "Scalable digital platforms from marketplaces to fintech, built for real-world complexity.",
    color: "#9333EA",
  },
  {
    number: "03",
    title: "AI Integration & Automation",
    description:
      "Embed AI into existing products and workflows — from automation to custom AI features.",
    color: "#E31E24",
  },
  {
    number: "04",
    title: "Technology Consulting",
    description:
      "Right architecture, right stack, right strategy. Build the right thing the right way.",
    color: "#F43F5E",
  },
  {
    number: "05",
    title: "Digital Transformation",
    description:
      "Modernize legacy systems with AI-assisted technology — without disrupting operations.",
    color: "#F7941D",
  },
];

export function ServicesSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".svc-reveal") || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      // Rows slide in from alternating sides
      const rows = rowsRef.current?.querySelectorAll(".service-row") || [];
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="svc-reveal mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Services
            </p>
            <h2 className="svc-reveal font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              What we build.
            </h2>
          </div>
          <Link
            href="/services"
            className="svc-reveal group flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
          >
            View all services
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Service Rows */}
        <div ref={rowsRef} className="divide-y divide-white/5">
          {services.map((service) => (
            <Link
              key={service.number}
              href="/services"
              className="service-row group relative flex flex-col gap-4 py-8 transition-all duration-500 md:flex-row md:items-center md:gap-8"
            >
              {/* Background sweep on hover */}
              <div
                className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(to right, ${service.color}08, transparent)`,
                }}
              />

              <span
                className="relative font-mono text-sm transition-colors duration-300"
                style={{ color: `${service.color}50` }}
              >
                {service.number}
              </span>
              <h3 className="relative flex-1 text-xl font-bold text-white/70 transition-colors duration-300 group-hover:text-white md:text-2xl">
                {service.title}
              </h3>
              <p className="relative max-w-sm text-sm text-white/30 transition-colors duration-300 group-hover:text-white/50">
                {service.description}
              </p>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/5">
                <ArrowUpRight
                  className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:text-white group-hover:rotate-45"
                />
              </div>

              {/* Bottom line that draws on hover */}
              <div
                className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(to right, ${service.color}60, transparent)`,
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
