"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Users, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust",
    tagline: "Accountable Government",
    description:
      "Triple T believes governments should be transparent, accountable, and honest with every citizen. We commit to open budgets, independent oversight, and decisions made in the public interest — not behind closed doors.",
    detail:
      "Transparency isn't just a policy — it's a promise. From local councils to federal parliament, every decision should be explainable to those it affects.",
    accent: "#5fa8d3",
    gradient: "from-[#5fa8d3]/20 to-[#123c69]/20",
    border: "border-[#5fa8d3]/30",
    glow: "shadow-[#5fa8d3]/20",
  },
  {
    icon: Users,
    title: "Teamwork",
    tagline: "Stronger Together",
    description:
      "Communities, businesses, and governments achieve far more through cooperation than competition. Triple T champions collaboration across sectors to solve complex social and economic challenges.",
    detail:
      "No single group holds all the answers. When communities, industry, and public services work in partnership, outcomes improve for everyone — especially the most vulnerable.",
    accent: "#d9e2ec",
    gradient: "from-[#d9e2ec]/15 to-[#123c69]/20",
    border: "border-[#d9e2ec]/25",
    glow: "shadow-[#d9e2ec]/15",
  },
  {
    icon: TrendingUp,
    title: "Tomorrow",
    tagline: "Long-Term Vision",
    description:
      "Long-term planning helps future generations succeed. Triple T commits to policies that balance today's needs with the environmental, economic, and social health of tomorrow.",
    detail:
      "Short-term thinking has real long-term costs. Our policies are built on evidence, sustainability, and genuine care for the Australia our children will inherit.",
    accent: "#bcccdc",
    gradient: "from-[#bcccdc]/15 to-[#123c69]/20",
    border: "border-[#bcccdc]/25",
    glow: "shadow-[#bcccdc]/15",
  },
];

function TiltCard({
  value,
  index,
}: {
  value: (typeof values)[0];
  index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const Icon = value.icon;

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-default"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`glass rounded-2xl p-8 h-full border ${value.border} shadow-2xl ${isHovered ? value.glow : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(ellipse at 50% 0%, ${value.accent}18, transparent 70%)`,
          }}
        />

        <div
          className="relative z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg"
            style={{
              background: `${value.accent}22`,
              border: `1px solid ${value.accent}40`,
              boxShadow: isHovered ? `0 0 30px ${value.accent}30` : "none",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <Icon className="w-7 h-7" style={{ color: value.accent }} />
          </div>

          <div className="text-[#5fa8d3] text-xs font-semibold tracking-widest uppercase mb-2">
            {value.tagline}
          </div>
          <h3 className="text-3xl font-black text-white mb-4 tracking-tight">
            {value.title}
          </h3>

          <div className="section-divider mb-6" />

          <p className="text-[#bcccdc] text-sm leading-relaxed mb-4">
            {value.description}
          </p>

          <p className="text-[#d9e2ec]/60 text-xs leading-relaxed italic">
            {value.detail}
          </p>
        </div>

        {isHovered && (
          <div
            className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl"
            style={{
              background: `linear-gradient(90deg, transparent, ${value.accent}, transparent)`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section
      id="about"
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#5fa8d3]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#123c69]/30 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="section-divider" />
            <span className="text-[#5fa8d3] text-sm font-semibold tracking-widest uppercase px-2">
              Our Foundation
            </span>
            <div className="w-14 h-px bg-gradient-to-r from-[#5fa8d3] to-transparent rounded" />
          </div>
          <h2
            id="about-heading"
            className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6"
          >
            About{" "}
            <span className="gradient-text">Triple T</span>
          </h2>
          <p className="text-[#bcccdc] text-lg max-w-2xl mx-auto leading-relaxed">
            Three principles. One vision. An unwavering commitment to building
            a government that works for every Australian — now and for
            generations to come.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <TiltCard key={value.title} value={value} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 glass rounded-2xl border border-[#5fa8d3]/15 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-[#d9e2ec] text-base leading-relaxed max-w-3xl mx-auto">
            <span className="text-[#5fa8d3] font-semibold">Triple T</span> was
            founded on the belief that modern government should be as
            dynamic, responsive, and forward-thinking as the communities it
            serves. We reject divisive politics in favour of practical,
            evidence-based solutions that bring people together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
