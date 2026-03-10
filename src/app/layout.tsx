import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";

export const metadata: Metadata = {
  title: "Lineup Solutions — AI-First Software Development",
  description:
    "Lineup Solutions combines 20+ years of software engineering with AI-powered development to deliver digital products faster and smarter. Based in El Salvador.",
  keywords: [
    "AI-first software development",
    "AI-powered software company El Salvador",
    "custom software development Central America",
    "enterprise software development AI",
    "digital transformation with AI",
  ],
  openGraph: {
    title: "Lineup Solutions — AI-First Software Development",
    description:
      "20+ years of expertise meets AI-powered delivery. Ship faster, build smarter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased grain">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
