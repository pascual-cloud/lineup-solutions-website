"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleEnter = () => {
      gsap.to(cursor, { scale: 0.5, opacity: 0.5, duration: 0.3 });
      gsap.to(follower, { scale: 1.8, opacity: 1, duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 0.4, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    // Re-scan for new interactive elements periodically
    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll("a, button, [data-cursor]");
      newEls.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="h-3 w-3 rounded-full bg-white mix-blend-difference" />
      </div>
      {/* Follower ring */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997] hidden lg:block"
        style={{ transform: "translate(-50%, -50%)", opacity: 0.4 }}
      >
        <div className="h-10 w-10 rounded-full border border-white/50 mix-blend-difference" />
      </div>
    </>
  );
}
