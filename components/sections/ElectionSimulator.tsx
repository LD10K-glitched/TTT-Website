"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  Leaf,
  Briefcase,
  TrainFront,
  CheckCircle2,
  Vote,
  BarChart3,
  RefreshCw,
  Info,
} from "lucide-react";

const policyOptions = [
  {
    id: "education",
    icon: GraduationCap,
    label: "Education Reform",
    description: "Increase school funding, tech programs, and teacher recruitment.",
    color: "#5fa8d3",
    party: "Triple T",
    opponent: "Progress Alliance",
    opponentDesc: "Streamline curriculum and redirect funding to STEM only.",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    label: "Universal Healthcare",
    description: "Expand Medicare, mental health services, and regional hospitals.",
    color: "#e87a6b",
    party: "Triple T",
    opponent: "Progress Alliance",
    opponentDesc: "Encourage private health growth and reduce wait times via market incentives.",
  },
  {
    id: "environment",
    icon: Leaf,
    label: "Climate Action",
    description: "Net zero by 2045, renewable energy investment, and conservation.",
    color: "#6dbf8a",
    party: "Triple T",
    opponent: "Progress Alliance",
    opponentDesc: "Balance economic growth with gradual emissions reduction targets.",
  },
  {
    id: "employment",
    icon: Briefcase,
    label: "Jobs & Wages",
    description: "Living wage, apprenticeships, and new green economy jobs.",
    color: "#f0a858",
    party: "Triple T",
    opponent: "Progress Alliance",
    opponentDesc: "Tax cuts for businesses to incentivise hiring and private job creation.",
  },
  {
    id: "transport",
    icon: TrainFront,
    label: "Public Transport",
    description: "High-speed rail, free student travel, and electric bus fleets.",
    color: "#a67ce8",
    party: "Triple T",
    opponent: "Progress Alliance",
    opponentDesc: "Road infrastructure investment and freight deregulation.",
  },
];

type Vote = "triple-t" | "opponent" | null;
type Votes = Record<string, Vote>;

function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const end = start + duration * 1000;
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (now < end) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{display}</>;
}

function PieChart({ ttPct, oppPct }: { ttPct: number; oppPct: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const tDash = (ttPct / 100) * circumference;
  const oDash = (oppPct / 100) * circumference;
  const tOffset = 0;
  const oOffset = -tDash;

  return (
    <div className="relative w-40 h-40 mx-auto" aria-hidden="true">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#1a3f6e" strokeWidth="22" />
        {ttPct > 0 && (
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#5fa8d3"
            strokeWidth="22"
            strokeLinecap="butt"
            strokeDasharray={`${tDash} ${circumference - tDash}`}
            strokeDashoffset={`${tOffset}`}
            transform="rotate(-90 80 80)"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${tDash} ${circumference - tDash}` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}
        {oppPct > 0 && (
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#e87a6b"
            strokeWidth="22"
            strokeDasharray={`${oDash} ${circumference - oDash}`}
            strokeDashoffset={`${oOffset}`}
            transform="rotate(-90 80 80)"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${oDash} ${circumference - oDash}` }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="text-white font-black text-xl leading-none">
          <AnimatedCounter value={ttPct} />%
        </div>
        <div className="text-[#5fa8d3] text-xs mt-0.5">Triple T</div>
      </div>
    </div>
  );
}

export function ElectionSimulator() {
  const [votes, setVotes] = useState<Votes>({});
  const [submitted, setSubmitted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const castVote = (policyId: string, choice: Vote) => {
    if (submitted) return;
    setVotes((v) => ({ ...v, [policyId]: v[policyId] === choice ? null : choice }));
  };

  const totalVoted = Object.values(votes).filter(Boolean).length;
  const ttVotes = Object.values(votes).filter((v) => v === "triple-t").length;
  const oppVotes = Object.values(votes).filter((v) => v === "opponent").length;

  const handleSubmit = () => {
    if (totalVoted === 0) return;
    setSubmitted(true);
    setAnimateIn(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  const handleReset = () => {
    setVotes({});
    setSubmitted(false);
    setAnimateIn(false);
  };

  const ttPct = totalVoted > 0 ? Math.round((ttVotes / 5) * 100) : 0;
  const oppPct = totalVoted > 0 ? Math.round((oppVotes / 5) * 100) : 0;

  return (
    <section
      id="simulator"
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="simulator-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#123c69]/10 to-transparent" />
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
              Interactive
            </span>
            <div className="w-14 h-px bg-gradient-to-r from-[#5fa8d3] to-transparent rounded" />
          </div>
          <h2
            id="simulator-heading"
            className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6"
          >
            Election <span className="gradient-text">Simulator</span>
          </h2>
          <p className="text-[#bcccdc] text-lg max-w-2xl mx-auto leading-relaxed">
            Experience the voting process. For each policy area, choose which
            party&apos;s position you prefer, then submit your ballot to see the
            results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 p-4 glass rounded-xl border border-[#5fa8d3]/15 mb-6">
              <Info className="w-4 h-4 text-[#5fa8d3] flex-shrink-0" />
              <p className="text-[#bcccdc] text-sm leading-relaxed">
                <span className="text-[#5fa8d3] font-semibold">What is voting?</span>{" "}
                Voting is how citizens in a democracy choose who represents them in
                government. Each vote carries equal weight — your voice matters as
                much as anyone else&apos;s. Elections are held regularly so governments
                remain accountable to the people.
              </p>
            </div>

            {policyOptions.map((policy, i) => {
              const Icon = policy.icon;
              const myVote = votes[policy.id];

              return (
                <motion.div
                  key={policy.id}
                  className="glass rounded-2xl border border-white/10 overflow-hidden"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="p-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${policy.color}20`,
                          border: `1px solid ${policy.color}40`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: policy.color }} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm">{policy.label}</h3>
                        <p className="text-[#bcccdc] text-xs mt-0.5">{policy.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-0">
                    <button
                      onClick={() => castVote(policy.id, "triple-t")}
                      disabled={submitted}
                      className={`relative p-4 text-left transition-all duration-200 border-r border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5fa8d3] ${
                        myVote === "triple-t"
                          ? "bg-[#5fa8d3]/20 border-b-2 border-b-[#5fa8d3]"
                          : "hover:bg-white/5"
                      } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                      aria-label={`Vote Triple T on ${policy.label}`}
                      aria-pressed={myVote === "triple-t"}
                    >
                      <div className="flex items-start gap-2">
                        {myVote === "triple-t" && (
                          <CheckCircle2 className="w-4 h-4 text-[#5fa8d3] flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="text-[#5fa8d3] text-xs font-bold uppercase tracking-wide mb-1">
                            Triple T
                          </div>
                          <p className="text-[#d9e2ec] text-xs leading-relaxed">
                            {policy.description}
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => castVote(policy.id, "opponent")}
                      disabled={submitted}
                      className={`relative p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e87a6b] ${
                        myVote === "opponent"
                          ? "bg-[#e87a6b]/15 border-b-2 border-b-[#e87a6b]"
                          : "hover:bg-white/5"
                      } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                      aria-label={`Vote Progress Alliance on ${policy.label}`}
                      aria-pressed={myVote === "opponent"}
                    >
                      <div className="flex items-start gap-2">
                        {myVote === "opponent" && (
                          <CheckCircle2 className="w-4 h-4 text-[#e87a6b] flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="text-[#e87a6b] text-xs font-bold uppercase tracking-wide mb-1">
                            Progress Alliance
                          </div>
                          <p className="text-[#d9e2ec] text-xs leading-relaxed">
                            {policy.opponentDesc}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {!submitted ? (
              <motion.button
                onClick={handleSubmit}
                disabled={totalVoted === 0}
                className={`w-full mt-4 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 ${
                  totalVoted > 0
                    ? "bg-[#5fa8d3] text-[#0a2540] hover:bg-white shadow-lg shadow-[#5fa8d3]/30 hover:scale-[1.01]"
                    : "bg-[#1a3f6e] text-[#5fa8d3]/40 cursor-not-allowed"
                }`}
                whileTap={totalVoted > 0 ? { scale: 0.98 } : {}}
                aria-label="Submit your ballot"
              >
                <Vote className="w-5 h-5" />
                {totalVoted === 0
                  ? "Select at least one policy to vote"
                  : `Submit Ballot (${totalVoted}/5 policies selected)`}
              </motion.button>
            ) : (
              <motion.button
                onClick={handleReset}
                className="w-full mt-4 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 glass border border-white/10 text-[#bcccdc] hover:text-white hover:border-white/20 transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw className="w-5 h-5" />
                Reset Ballot
              </motion.button>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="glass rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <BarChart3 className="w-5 h-5 text-[#5fa8d3]" />
                  <h3 className="text-white font-bold text-base">Live Tally</h3>
                </div>

                {!submitted ? (
                  <div className="space-y-4">
                    {policyOptions.map((p) => {
                      const v = votes[p.id];
                      return (
                        <div key={p.id} className="flex items-center gap-3">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: v ? (v === "triple-t" ? "#5fa8d3" : "#e87a6b") : "#1a3f6e" }}
                          />
                          <span className="text-[#bcccdc] text-xs flex-1 truncate">{p.label}</span>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: v === "triple-t" ? "#5fa8d3" : v === "opponent" ? "#e87a6b" : "#1a3f6e" }}
                          >
                            {v === "triple-t" ? "TT" : v === "opponent" ? "PA" : "--"}
                          </span>
                        </div>
                      );
                    })}

                    <div className="pt-4 border-t border-white/10 text-center text-[#bcccdc] text-sm">
                      {totalVoted}/5 policies voted
                    </div>
                  </div>
                ) : null}
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    ref={resultRef}
                    className="glass rounded-2xl border border-[#5fa8d3]/20 p-6"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    role="region"
                    aria-label="Election results"
                    aria-live="polite"
                  >
                    <div className="text-center mb-6">
                      <div className="text-[#5fa8d3] text-xs font-bold tracking-widest uppercase mb-2">
                        Results
                      </div>
                      <div className="text-white font-black text-xl">
                        {ttVotes > oppVotes
                          ? "Triple T Wins!"
                          : oppVotes > ttVotes
                          ? "Progress Alliance Wins"
                          : "Dead Heat"}
                      </div>
                    </div>

                    <PieChart ttPct={ttPct} oppPct={oppPct} />

                    <div className="space-y-3 mt-6">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-[#5fa8d3] font-semibold">Triple T</span>
                          <span className="text-[#5fa8d3]">
                            <AnimatedCounter value={ttVotes} /> / 5
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-[#1a3f6e] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-[#5fa8d3]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(ttVotes / 5) * 100}%` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-[#e87a6b] font-semibold">Progress Alliance</span>
                          <span className="text-[#e87a6b]">
                            <AnimatedCounter value={oppVotes} /> / 5
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-[#1a3f6e] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-[#e87a6b]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(oppVotes / 5) * 100}%` }}
                            transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      {5 - ttVotes - oppVotes > 0 && (
                        <div>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-[#bcccdc]">Abstained</span>
                            <span className="text-[#bcccdc]">
                              {5 - ttVotes - oppVotes} / 5
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-[#1a3f6e] overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-[#bcccdc]/40"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${((5 - ttVotes - oppVotes) / 5) * 100}%`,
                              }}
                              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 p-3 rounded-xl bg-[#5fa8d3]/10 border border-[#5fa8d3]/20">
                      <p className="text-[#bcccdc] text-xs leading-relaxed text-center">
                        In a real election, results across all electorates are counted
                        together. Your vote contributes to the total national count.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="glass rounded-2xl border border-white/10 p-5">
                <div className="text-[#5fa8d3] text-xs font-bold tracking-widest uppercase mb-3">
                  Why Voting Matters
                </div>
                <p className="text-[#bcccdc] text-xs leading-relaxed">
                  In a democracy, elected governments are accountable to citizens.
                  Voting gives you the power to shape policies on healthcare,
                  education, and the environment. When people don&apos;t vote,
                  decisions are made without their voice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
