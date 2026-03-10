"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", number: "01" },
  { href: "/services", label: "Services", number: "02" },
  { href: "/how-we-work", label: "How We Work", number: "03" },
  { href: "/about", label: "About", number: "04" },
  { href: "/industries", label: "Industries", number: "05" },
  { href: "/contact", label: "Contact", number: "06" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!menuRef.current || !linksRef.current || !ctaRef.current) return;

    const links = linksRef.current.children;
    const cta = ctaRef.current;

    if (mobileOpen) {
      // Kill previous timeline
      tlRef.current?.kill();

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.fromTo(
        menuRef.current,
        { clipPath: "circle(0% at calc(100% - 40px) 32px)" },
        {
          clipPath: "circle(150% at calc(100% - 40px) 32px)",
          duration: 0.8,
          ease: "power4.inOut",
        }
      );

      tl.fromTo(
        links,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.3
      );

      tl.fromTo(
        cta,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        0.6
      );
    } else {
      tlRef.current?.kill();
      gsap.set(menuRef.current, { clipPath: "circle(0% at calc(100% - 40px) 32px)" });
    }
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-[60]">
          <Image
            src="/images/logo-white.png"
            alt="Lineup Solutions"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-white/60 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(123,47,190,0.3)] lg:block"
        >
          Start a Project
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-all duration-500",
              mobileOpen && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-4 bg-white transition-all duration-500",
              mobileOpen ? "w-6 opacity-0" : "ml-2 self-end"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-all duration-500",
              mobileOpen && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* Mobile Menu — Full Screen with Clip-Path Reveal */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-50 bg-[#050505] lg:hidden",
          !mobileOpen && "pointer-events-none"
        )}
        style={{ clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
      >
        {/* Background accent */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[15%] right-[-10%] h-[400px] w-[400px] rounded-full bg-brand-purple/10 blur-[120px]" />
          <div className="absolute bottom-[20%] left-[-10%] h-[300px] w-[300px] rounded-full bg-brand-orange/8 blur-[100px]" />
        </div>

        <div className="flex h-full flex-col justify-between px-8 pt-24 pb-12">
          {/* Links */}
          <div ref={linksRef} className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="group flex items-center gap-4 border-b border-white/5 py-5 transition-colors"
              >
                <span className="text-xs font-medium text-white/15 transition-colors group-hover:text-brand-purple">
                  {link.number}
                </span>
                <span className="font-display text-3xl font-black text-white/80 transition-colors group-hover:text-white sm:text-4xl">
                  {link.label}
                </span>
                <svg
                  className="ml-auto h-5 w-5 -translate-x-2 text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ))}
          </div>

          {/* Bottom CTA + Info */}
          <div ref={ctaRef} className="flex flex-col gap-6">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="group relative overflow-hidden rounded-2xl bg-white px-8 py-4 text-center text-lg font-semibold text-black transition-all duration-500 hover:scale-[1.02]"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                Start a Project
              </span>
              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-brand-purple via-brand-red to-brand-orange transition-transform duration-500 group-hover:translate-y-0" />
            </Link>
            <div className="flex items-center justify-between text-xs text-white/20">
              <span>pascual@lineup.solutions</span>
              <span>El Salvador, C.A.</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
