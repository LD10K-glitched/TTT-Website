"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Lightbulb,
  Globe,
  Shield,
  Users,
} from "lucide-react";

const reflections = [
  {
    id: "policies",
    icon: Lightbulb,
    question: "Why do political parties create policies?",
    answer:
      "Political parties create policies to translate their values and beliefs into concrete plans for governing. Policies address real community needs — like healthcare, education, and employment — and give voters clear information about what a party will do if elected. Without policies, elections would be a contest of personalities rather than ideas.",
    keyLesson: "Policies = Values in Action",
    accent: "#5fa8d3",
  },
  {
    id: "society",
    icon: Globe,
    question: "How do elections affect society?",
    answer:
      "Elections determine which party forms government and therefore which policies become law. This directly affects everyone — from school funding to hospital waiting times, from minimum wages to climate action. Elections are how democracies translate collective values into collective action. The outcomes of elections shape society for years, sometimes generations.",
    keyLesson: "Elections = Society's Choices Made Real",
    accent: "#6dbf8a",
  },
  {
    id: "voting",
    icon: Shield,
    question: "Why is voting important?",
    answer:
      "Voting is the fundamental mechanism of democratic accountability. When citizens vote, governments must listen to them to stay in power. If people don't vote, governments become less representative — decisions are made by a smaller, less diverse group. Every vote counts equally regardless of wealth, status, or background, making voting one of the purest expressions of equality.",
    keyLesson: "Every Vote = Equal Power",
    accent: "#f0a858",
  },
  {
    id: "democracy",
    icon: Users,
    question: "How does democracy work?",
    answer:
      "Democracy is a system where the people hold political power. In a representative democracy like Australia, citizens elect representatives who make decisions on their behalf. Regular elections keep representatives accountable — they must perform well or risk being voted out. Democracies also protect rights through constitutions, independent courts, and free media, ensuring no government becomes too powerful.",
    keyLesson: "Democracy = Power to the People",
    accent: "#a67ce8",
  },
];

function FlipCard({ reflection, index }: { reflection: (typeof reflections)[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = reflection.icon;

  return (
    <motion.div
      className="relative h-72 cursor-pointer"
      style={{ perspective: "1200px" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Flip card: ${reflection.question}`}
      aria-pressed={flipped}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl glass border border-white/10 p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 30% 30%, ${reflection.accent}15, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: `${reflection.accent}20`,
                border: `1px solid ${reflection.accent}40`,
              }}
            >
              <HelpCircle className="w-6 h-6" style={{ color: reflection.accent }} />
            </div>
            <div
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: reflection.accent }}
            >
              Reflection {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="text-white font-black text-base leading-snug tracking-tight">
              {reflection.question}
            </h3>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-[#bcccdc] text-xs">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5fa8d3]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#5fa8d3]/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#5fa8d3]/25" />
            </div>
            Click to reveal answer
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border p-6 flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${reflection.accent}20, #0a2540)`,
            borderColor: `${reflection.accent}40`,
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 70% 70%, ${reflection.accent}12, transparent 60%)`,
            }}
          />

          <div className="relative z-10">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: `${reflection.accent}25`,
                border: `1px solid ${reflection.accent}50`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: reflection.accent }} />
            </div>
            <p className="text-[#d9e2ec] text-xs leading-relaxed">
              {reflection.answer}
            </p>
          </div>

          <div
            className="relative z-10 inline-flex px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: `${reflection.accent}25`,
              border: `1px solid ${reflection.accent}50`,
              color: reflection.accent,
            }}
          >
            {reflection.keyLesson}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CommerceReflection() {
  return (
    <section
      id="reflection"
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="reflection-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-[#123c69]/20 blur-[100px]" />
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
              Year 9 Commerce
            </span>
            <div className="w-14 h-px bg-gradient-to-r from-[#5fa8d3] to-transparent rounded" />
          </div>
          <h2
            id="reflection-heading"
            className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6"
          >
            Commerce <span className="gradient-text">Reflection</span>
          </h2>
          <p className="text-[#bcccdc] text-lg max-w-2xl mx-auto leading-relaxed">
            Test your understanding. Click each card to flip it and reveal the
            explanation behind the question.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {reflections.map((r, i) => (
            <FlipCard key={r.id} reflection={r} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 glass rounded-2xl border border-[#5fa8d3]/20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-[#5fa8d3] text-xs font-bold tracking-widest uppercase mb-4">
            Key Takeaway
          </div>
          <p className="text-[#d9e2ec] text-base leading-relaxed max-w-2xl mx-auto">
            Democracy is not just a system — it is a responsibility. When every
            citizen understands how elections work, why policies matter, and why
            their vote counts, the whole society benefits from better, more
            representative government.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
