"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What does 'AI-first development' actually mean?",
    answer:
      "It means AI is embedded in every stage of our process — from architecture planning and code generation to testing and deployment. Our engineers don't just write code — they direct AI tools to multiply their output while maintaining quality through expert review.",
  },
  {
    question: "Is AI-generated code reliable?",
    answer:
      "On its own, no. That's why every line of AI-generated code goes through rigorous human review by engineers with 20+ years of experience. AI accelerates the work — our expertise ensures the quality. We know when to trust the AI and when to override it.",
  },
  {
    question: "How fast can you deliver a project?",
    answer:
      "Depending on complexity, we typically deliver 4-6x faster than traditional agencies. A project that might take 4-6 months with a conventional team can often be delivered in 4-6 weeks with our AI-first approach — without cutting corners.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "We specialize in modern stacks: Next.js, React, TypeScript, Node.js, Python, and cloud platforms like AWS and Vercel. We also integrate AI/ML services including OpenAI, custom models, and intelligent automation. We choose the best tool for each project.",
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer:
      "Both. We work with startups building their first MVP, enterprises modernizing legacy systems, and government institutions that need secure, compliant technology. Our AI-first approach scales to any project size.",
  },
  {
    question: "Where is your team based?",
    answer:
      "We're headquartered in El Salvador, Central America. Our bilingual team (English/Spanish) works with clients across the Americas and beyond. Being in a similar timezone to US clients means real-time collaboration without the overseas delay.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answerRef.current) {
      gsap.to(answerRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/5">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-6 text-left transition-colors"
      >
        <span className="pr-8 text-lg font-semibold text-white/80 transition-colors group-hover:text-white">
          {faq.question}
        </span>
        <div
          className={cn(
            "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300",
            isOpen && "rotate-45 border-brand-purple/50 bg-brand-purple/10"
          )}
        >
          <Plus className="h-4 w-4 text-white/40" />
        </div>
      </button>
      <div ref={answerRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="pb-6 text-base leading-relaxed text-white/40">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".faq-reveal") || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-item", start: "top 90%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <p className="faq-reveal mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            FAQ
          </p>
          <h2 className="faq-reveal font-display text-4xl font-black sm:text-5xl">
            Questions?
            <span className="gradient-text"> Answered.</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
