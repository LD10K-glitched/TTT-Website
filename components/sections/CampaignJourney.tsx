"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Rocket,
  FileText,
  MessageSquare,
  Megaphone,
  Vote,
  Star,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    phase: "Phase I",
    date: "January 2025",
    title: "Party Launch",
    description:
      "Triple T officially launched in Melbourne with 2,000 founding members signing our founding charter. The three pillars — Trust, Teamwork, Tomorrow — were announced alongside our core policy commitments.",
    icon: Rocket,
    accent: "#5fa8d3",
    highlight: "2,000 founding members",
  },
  {
    phase: "Phase II",
    date: "March–June 2025",
    title: "Policy Creation",
    description:
      "Our policy working groups — comprising economists, healthcare professionals, educators, and environmental scientists — developed the five pillars over six months of intensive research and expert consultation.",
    icon: FileText,
    accent: "#d9e2ec",
    highlight: "5 pillars, 30+ commitments",
  },
  {
    phase: "Phase III",
    date: "July–September 2025",
    title: "Community Consultation",
    description:
      "We held 140 town hall meetings across every state and territory, listening to Australians from Darwin to Hobart. Community feedback directly shaped our final policy platform.",
    icon: MessageSquare,
    accent: "#6dbf8a",
    highlight: "140 town halls, 8 states",
  },
  {
    phase: "Phase IV",
    date: "October–November 2025",
    title: "Campaign Period",
    description:
      "Our nationwide campaign reached over 4 million voters through community events, digital outreach, and media engagement. Volunteers in every electorate championed the Triple T message.",
    icon: Megaphone,
    accent: "#f0a858",
    highlight: "4 million voters reached",
  },
  {
    phase: "Phase V",
    date: "14 December 2025",
    title: "Election Day",
    description:
      "Polling opened at 8am across Australia. Millions of citizens exercised their democratic right. Our election day volunteers staffed booths in every electorate, handing out how-to-vote cards.",
    icon: Vote,
    accent: "#a67ce8",
    highlight: "National Election Day",
  },
  {
    phase: "Phase VI",
    date: "15 December 2025",
    title: "Results Night",
    description:
      "As results came in, Triple T secured a historic result — winning 84 seats in the House of Representatives and forming a majority government committed to delivering every promise made to the Australian people.",
    icon: Star,
    accent: "#5fa8d3",
    highlight: "84 seats won — majority government",
  },
];

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = milestone.icon;
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative flex items-center"
      style={{ minHeight: "180px" }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{
          background: `radial-gradient(circle at center, ${milestone.accent}30, #0a2540)`,
          border: `2px solid ${milestone.accent}60`,
          boxShadow: isInView ? `0 0 40px ${milestone.accent}40` : "none",
          transition: "box-shadow 0.6s ease",
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <Icon className="w-6 h-6" style={{ color: milestone.accent }} />
        </motion.div>
      </div>

      <motion.div
        className={`w-[calc(50%-36px)] ${isLeft ? "pr-8 text-right" : "ml-auto pl-8 text-left"}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-colors">
          <div
            className="text-xs font-black tracking-widest uppercase mb-1"
            style={{ color: milestone.accent }}
          >
            {milestone.phase}
          </div>
          <div className="text-[#bcccdc] text-xs mb-2">{milestone.date}</div>
          <h3 className="text-white font-black text-lg tracking-tight mb-2">
            {milestone.title}
          </h3>
          <p className="text-[#bcccdc] text-xs leading-relaxed mb-3">
            {milestone.description}
          </p>
          <div
            className="inline-flex px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: `${milestone.accent}18`,
              border: `1px solid ${milestone.accent}35`,
              color: milestone.accent,
            }}
          >
            {milestone.highlight}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TimelineTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fillRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#1a3f6e] z-10"
    >
      <div
        ref={fillRef}
        className="absolute top-0 left-0 right-0 h-full origin-top"
        style={{
          background:
            "linear-gradient(180deg, #5fa8d3 0%, #d9e2ec 30%, #6dbf8a 50%, #f0a858 70%, #a67ce8 90%, #5fa8d3 100%)",
          transform: "scaleY(0)",
        }}
      />
    </div>
  );
}

export function CampaignJourney() {
  return (
    <section
      id="journey"
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="journey-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#5fa8d3]/4 blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="section-divider" />
            <span className="text-[#5fa8d3] text-sm font-semibold tracking-widest uppercase px-2">
              Our Story
            </span>
            <div className="w-14 h-px bg-gradient-to-r from-[#5fa8d3] to-transparent rounded" />
          </div>
          <h2
            id="journey-heading"
            className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6"
          >
            Campaign <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-[#bcccdc] text-lg max-w-2xl mx-auto leading-relaxed">
            From a founding idea to a majority government — the story of how
            Triple T went from vision to victory.
          </p>
        </motion.div>

        <div className="relative hidden md:block">
          <TimelineTrack />
          <div className="space-y-12 py-4">
            {milestones.map((milestone, i) => (
              <MilestoneCard key={milestone.phase} milestone={milestone} index={i} />
            ))}
          </div>
        </div>

        <div className="md:hidden space-y-4">
          {milestones.map((milestone, i) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={milestone.phase}
                className="glass rounded-2xl p-5 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${milestone.accent}20`,
                      border: `1px solid ${milestone.accent}40`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: milestone.accent }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-black tracking-widest uppercase"
                      style={{ color: milestone.accent }}
                    >
                      {milestone.phase}
                    </div>
                    <div className="text-[#bcccdc] text-xs">{milestone.date}</div>
                  </div>
                </div>
                <h3 className="text-white font-black text-base mb-2 tracking-tight">
                  {milestone.title}
                </h3>
                <p className="text-[#bcccdc] text-xs leading-relaxed mb-3">
                  {milestone.description}
                </p>
                <span
                  className="inline-flex px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `${milestone.accent}18`,
                    border: `1px solid ${milestone.accent}35`,
                    color: milestone.accent,
                  }}
                >
                  {milestone.highlight}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
