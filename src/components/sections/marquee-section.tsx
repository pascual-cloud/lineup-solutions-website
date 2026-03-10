"use client";

const words = [
  "AI-Powered",
  "Custom Software",
  "Platform Engineering",
  "Digital Transformation",
  "Fintech",
  "Enterprise",
  "Scalable",
  "Intelligent",
  "20+ Years",
  "El Salvador",
];

export function MarqueeSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 py-6">
      <div className="flex animate-[marquee_30s_linear_infinite]">
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className="mx-8 whitespace-nowrap font-display text-2xl font-black text-white/[0.06] sm:text-4xl"
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
