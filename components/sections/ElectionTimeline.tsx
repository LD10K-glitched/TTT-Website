"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lightbulb,
  Megaphone,
  Vote,
  Calculator,
  Building2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Policy Development",
    description:
      "Political parties research community needs, consult experts, and draft policies that address real problems — from healthcare and education to the economy and environment.",
    detail:
      "Parties conduct surveys, hold public forums, and commission economic modelling to ensure policies are practical, affordable, and effective.",
    accent: "#5fa8d3",
  },
  {
    icon: Megaphone,
    number: "02",
    title: "Campaigning",
    description:
      "Parties promote their vision through advertising, public events, social media, debates, and door-knocking. Candidates meet voters and explain why their policies are best for the nation.",
    detail:
      "The campaign period is regulated — parties must declare their funding sources and follow advertising rules. Australian Electoral Commission (AEC) oversees the process.",
    accent: "#d9e2ec",
  },
  {
    icon: Vote,
    number: "03",
    title: "Voting Day",
    description:
      "Eligible Australians (citizens aged 18+) attend a polling booth or vote by post. Australia uses preferential voting — voters rank candidates in order of preference.",
    detail:
      "Voting is compulsory in Australia. The Australian Electoral Commission runs over 7,500 polling places nationwide, staffed by independent officials.",
    accent: "#6dbf8a",
  },
  {
    icon: Calculator,
    number: "04",
    title: "Vote Counting",
    description:
      "Ballots are counted by independent electoral officials. In preferential voting, if no candidate wins a majority, preferences are distributed until a winner emerges.",
    detail:
      "Each electorate (or 'seat') elects one member. A party needs to win 76 of 151 House of Representatives seats to form a majority government.",
    accent: "#f0a858",
  },
  {
    icon: Building2,
    number: "05",
    title: "Government Formation",
    description:
      "The party or coalition with the most seats forms government. The leader becomes Prime Minister and appoints a Cabinet — the senior ministers who run each area of government.",
    detail:
      "If no party wins a majority, a minority government may form with support from independents or smaller parties. This requires negotiation and formal agreements.",
    accent: "#a67ce8",
  },
];

function TimelineStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 ${isEven ? "flex-row" : "flex-row-reverse"} items-start`}
    >
      <div className="flex flex-col items-center gap-0 flex-shrink-0">
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg z-10"
          style={{
            background: `${step.accent}22`,
            border: `2px solid ${step.accent}50`,
            boxShadow: isInView ? `0 0 30px ${step.accent}30` : "none",
          }}
          initial={{ scale: 0, rotate: -20 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <Icon className="w-6 h-6" style={{ color: step.accent }} />
        </motion.div>
      </div>

      <motion.div
        className={`flex-1 pb-12 ${isEven ? "pr-8" : "pl-8"}`}
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-black tracking-widest"
              style={{ color: step.accent }}
            >
              STEP {step.number}
            </span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight mb-3">
            {step.title}
          </h3>
          <p className="text-[#bcccdc] text-sm leading-relaxed mb-4">
            {step.description}
          </p>
          <div
            className="p-3 rounded-xl text-xs text-[#d9e2ec]/70 leading-relaxed"
            style={{ background: `${step.accent}10`, border: `1px solid ${step.accent}20` }}
          >
            {step.detail}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AnimatedPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!pathRef.current || !svgRef.current) return;

    const pathLength = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const ctx = gsap.context(() => {
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute left-[27px] top-0 w-0.5"
      style={{ height: "100%" }}
      viewBox="0 0 2 800"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M1 0 L1 800"
        stroke="#1a3f6e"
        strokeWidth="2"
        fill="none"
      />
      <path
        ref={pathRef}
        d="M1 0 L1 800"
        stroke="#5fa8d3"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ElectionTimeline() {
  return (
    <section
      id="elections"
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="elections-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#5fa8d3]/5 blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto">
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
              How Democracy Works
            </span>
            <div className="w-14 h-px bg-gradient-to-r from-[#5fa8d3] to-transparent rounded" />
          </div>
          <h2
            id="elections-heading"
            className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6"
          >
            How Elections <span className="gradient-text">Work</span>
          </h2>
          <p className="text-[#bcccdc] text-lg max-w-xl mx-auto leading-relaxed">
            From policy ideas to government formation — the five-stage process
            that turns your vote into real change.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatedPath />
          <div className="space-y-0">
            {steps.map((step, i) => (
              <TimelineStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        <motion.div
          className="mt-8 p-6 glass rounded-2xl border border-[#5fa8d3]/15 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#d9e2ec] text-sm leading-relaxed">
            <span className="text-[#5fa8d3] font-semibold">
              Australian democracy
            </span>{" "}
            uses a preferential voting system in the House of Representatives
            and proportional representation in the Senate — giving citizens both
            strong local representation and fair national outcomes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
