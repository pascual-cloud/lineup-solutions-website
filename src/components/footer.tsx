import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/industries", label: "Industries" },
    { href: "/how-we-work", label: "How We Work" },
  ],
  Services: [
    { href: "/services", label: "Custom Software" },
    { href: "/services", label: "Platform Engineering" },
    { href: "/services", label: "AI Integration" },
    { href: "/services", label: "Consulting" },
  ],
  Connect: [
    { href: "/contact", label: "Contact Us" },
    { href: "mailto:hello@lineupsolutions.com", label: "Email" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#030303]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo-white.png"
              alt="Lineup Solutions"
              width={140}
              height={35}
              className="mb-6 h-7 w-auto"
            />
            <p className="text-sm leading-relaxed text-white/40">
              AI-first software development.
              <br />
              20+ years of expertise.
              <br />
              Based in El Salvador.
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Lineup Solutions. All rights
            reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with AI. Guided by experience.
          </p>
        </div>
      </div>
    </footer>
  );
}
