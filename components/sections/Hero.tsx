"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => <div className="w-full h-full bg-[#0a2540]" /> }
);

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -60,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "40% top",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      aria-label="Hero section — Triple T Political Party"
    >
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a2540]/30 via-transparent to-[#0a2540]" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <motion.div
          ref={contentRef}
          className="text-center max-w-4xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#5fa8d3] flex items-center justify-center shadow-lg shadow-[#5fa8d3]/30">
              <Shield className="w-5 h-5 text-[#0a2540]" />
            </div>
            <span className="text-[#5fa8d3] text-sm font-semibold tracking-[0.25em] uppercase">
              Political Party
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none mb-4"
          >
            <span className="gradient-text hero-glow">TRIPLE T</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl sm:text-2xl font-light text-[#5fa8d3] tracking-[0.2em] mb-6"
          >
            Trust &bull; Teamwork &bull; Tomorrow
          </motion.p>

          <motion.p
            variants={item}
            className="text-base sm:text-lg text-[#bcccdc] max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Building a stronger future through cooperation, responsibility, and innovation.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleExplore}
              className="group relative px-8 py-4 rounded-full bg-[#5fa8d3] text-[#0a2540] font-semibold text-base hover:bg-white transition-all duration-300 shadow-lg shadow-[#5fa8d3]/30 hover:shadow-[#5fa8d3]/50 hover:scale-105"
              aria-label="Explore the Triple T campaign"
            >
              Explore The Campaign
            </button>
            <button
              onClick={() =>
                document.querySelector("#simulator")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 rounded-full border border-[#5fa8d3]/40 text-[#5fa8d3] font-semibold text-base hover:border-[#5fa8d3] hover:bg-[#5fa8d3]/10 transition-all duration-300"
              aria-label="Cast your vote in the election simulator"
            >
              Cast Your Vote
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[#5fa8d3] text-xs tracking-widest uppercase font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#5fa8d3]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
