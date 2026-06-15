"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  Briefcase,
  Leaf,
  Users,
  MapPin,
} from "lucide-react";

const candidates = [
  {
    name: "Rife",
    initials: "R.B",
    position: "Party Leader & Prime Minister Candidate",
    electorate: "Greenfield, Victoria",
    bio: "Former community organiser with 15 years in local government, Amara built her career advocating for transparent public services and equitable resource distribution across Melbourne's outer west. She holds a Masters in Public Policy from Melbourne University and is known for her ability to build unlikely coalitions between business, unions, and community groups.",
    focus: ["Education", "Healthcare"],
    focusIcons: [GraduationCap, HeartPulse],
    accent: "#5fa8d3",
    bg: "from-[#5fa8d3]/20 to-[#123c69]/10",
    years: "15 years public service",
  },
  {
    name: "Bonnie",
    initials: "W.K",
    position: "Deputy Leader & Economic Policy Spokesperson",
    electorate: "Bayside, New South Wales",
    bio: "An economist turned politician, James spent a decade advising non-profits on sustainable funding models before entering public service in 2018. He believes passionately in evidence-based, long-term fiscal policy that invests in people. Outside parliament, he mentors young people from lower-income backgrounds pursuing careers in finance and economics.",
    focus: ["Employment", "Transport"],
    focusIcons: [Briefcase, Users],
    accent: "#d9e2ec",
    bg: "from-[#d9e2ec]/15 to-[#123c69]/10",
    years: "8 years in policy",
  },
  {
    name: "Sahil",
    initials: "S.S",
    position: "Shadow Minister for Health & Environment",
    electorate: "Riverstone, Queensland",
    bio: "A practising physician and environmental scientist, Dr. Nambiar bridges scientific expertise with compassionate, community-centred policy. She founded the Healthy Futures Foundation in 2015, which has provided free medical care to over 12,000 Queenslanders in rural and remote areas. She holds dual PhDs in Medicine and Environmental Science.",
    focus: ["Healthcare", "Environment"],
    focusIcons: [HeartPulse, Leaf],
    accent: "#6dbf8a",
    bg: "from-[#6dbf8a]/15 to-[#123c69]/10",
    years: "12 years clinical practice",
  },
  {
    name: "Sanjana",
    initials: "S.R",
    position: "Youth Affairs & Digital Economy Spokesperson",
    electorate: "North Harbour, Western Australia",
    bio: "At 28, Lachlan is the youngest member of Triple T's leadership team. A former software engineer and digital literacy advocate, he spent four years running tech education workshops in underserved schools before standing for election. He connects technology policy to real community needs, and his campaign slogan — 'Future-proof, not just future-ready' — captured a generation.",
    focus: ["Education", "Employment"],
    focusIcons: [GraduationCap, Briefcase],
    accent: "#a67ce8",
    bg: "from-[#a67ce8]/15 to-[#123c69]/10",
    years: "4 years youth advocacy",
  },
];

function CandidateCard({
  candidate,
  index,
}: {
  candidate: (typeof candidates)[0];
  index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  return (
    <motion.div
      className="relative"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setHovered(false);
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-400"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(ellipse at 50% 0%, ${candidate.accent}15, transparent 70%)`,
          }}
        />

        <div
          className={`relative p-6 bg-gradient-to-br ${candidate.bg}`}
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${candidate.accent}40, ${candidate.accent}15)`,
                border: `2px solid ${candidate.accent}50`,
                color: candidate.accent,
                boxShadow: hovered ? `0 0 30px ${candidate.accent}35` : `0 0 15px ${candidate.accent}20`,
                transition: "box-shadow 0.3s ease",
              }}
            >
              {candidate.initials}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-black text-lg leading-tight tracking-tight truncate">
                {candidate.name}
              </h3>
              <p
                className="text-xs font-semibold mt-1 leading-tight"
                style={{ color: candidate.accent }}
              >
                {candidate.position}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-4 text-[#bcccdc]">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-xs">{candidate.electorate}</span>
          </div>
        </div>

        <div className="p-6 relative z-10">
          <p className="text-[#bcccdc] text-sm leading-relaxed mb-5">
            {candidate.bio}
          </p>

          <div className="flex items-center gap-2 mb-3 text-[#d9e2ec]/60 text-xs">
            <div className="w-4 h-px bg-[#5fa8d3]/50" />
            {candidate.years}
          </div>

          <div>
            <div className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
              Policy Focus
            </div>
            <div className="flex flex-wrap gap-2">
              {candidate.focus.map((f, i) => {
                const Icon = candidate.focusIcons[i];
                return (
                  <span
                    key={f}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: `${candidate.accent}18`,
                      border: `1px solid ${candidate.accent}35`,
                      color: candidate.accent,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {f}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Candidates() {
  return (
    <section
      id="candidates"
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="candidates-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#5fa8d3]/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#123c69]/30 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto">
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
              Leadership Team
            </span>
            <div className="w-14 h-px bg-gradient-to-r from-[#5fa8d3] to-transparent rounded" />
          </div>
          <h2
            id="candidates-heading"
            className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6"
          >
            Meet The <span className="gradient-text">Candidates</span>
          </h2>
          <p className="text-[#bcccdc] text-lg max-w-2xl mx-auto leading-relaxed">
            Experienced, passionate, and community-driven leaders who will work
            tirelessly to deliver Triple T&apos;s vision for Australia.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {candidates.map((candidate, i) => (
            <CandidateCard key={candidate.name} candidate={candidate} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-12 p-6 glass rounded-2xl border border-[#5fa8d3]/15 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#5fa8d315", border: "1px solid #5fa8d340" }}
          >
            <Users className="w-6 h-6 text-[#5fa8d3]" />
          </div>
          <div>
            <p className="text-[#d9e2ec] text-sm leading-relaxed">
              Triple T&apos;s diverse leadership team reflects the Australia we want
              to serve — regional and urban, young and experienced, with
              expertise spanning health, economics, environment, and technology.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
