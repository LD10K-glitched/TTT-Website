"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  Leaf,
  Briefcase,
  TrainFront,
  X,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

const policies = [
  {
    id: "education",
    icon: GraduationCap,
    title: "Education",
    tagline: "Investing in every learner",
    color: "#5fa8d3",
    summary:
      "Equitable, high-quality education for every student — from early childhood through tertiary study and vocational training.",
    commitments: [
      "Increase per-student school funding by 20% over four years",
      "Universal access to free early childhood education for ages 3–5",
      "Subsidised technology programs ensuring every student has a device",
      "Expanded career readiness pathways in Years 9–12",
      "New curriculum standards embedding digital literacy and financial skills",
      "Recruit 5,000 additional qualified teachers with competitive salaries",
    ],
    whyItMatters:
      "Education is the single greatest lever for social mobility. When we invest in classrooms, we invest in engineers, nurses, entrepreneurs, and community leaders. Triple T believes no child's future should be limited by their postcode or family income.",
    impact: "850,000 students directly benefited annually",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    tagline: "Healthy people, healthy nation",
    color: "#e87a6b",
    summary:
      "A public health system that is funded, staffed, and equipped to serve every Australian — with particular focus on mental health and rural access.",
    commitments: [
      "Build 12 new regional hospitals and upgrade 40 rural health centres",
      "Triple Medicare rebates for psychology and mental health consultations",
      "Free dental care for all Australians under 18 and over 65",
      "National nurse-to-patient ratio legislation",
      "Telehealth expansion to reach remote and underserved communities",
      "Pharmaceutical cost cap of $15 per script on essential medications",
    ],
    whyItMatters:
      "A healthy population is a productive, thriving one. Healthcare is not a luxury — it is a right. Triple T will invest in prevention and early intervention, reducing long-term costs and improving quality of life across the board.",
    impact: "3.2 million Australians gain better access to services",
  },
  {
    id: "environment",
    icon: Leaf,
    title: "Environment",
    tagline: "Protecting what we inherited",
    color: "#6dbf8a",
    summary:
      "Ambitious, science-led climate and conservation policy that transitions Australia to a sustainable economy while protecting biodiversity.",
    commitments: [
      "Net zero emissions target by 2045 with transparent milestone reporting",
      "$8 billion Renewable Energy Investment Fund over five years",
      "Phase out coal power by 2038 with transition support for workers",
      "Protect 30% of Australia's land and marine environments by 2030",
      "National Plastics Elimination Plan targeting single-use plastics",
      "Green Building Code requiring all new homes to meet 7-star energy ratings",
    ],
    whyItMatters:
      "Climate change is the defining challenge of this generation. Triple T will lead a just transition — one that builds clean industries, creates jobs, and leaves future Australians with a liveable, biodiverse world.",
    impact: "40% reduction in emissions within first term",
  },
  {
    id: "employment",
    icon: Briefcase,
    title: "Employment",
    tagline: "Opportunity for every worker",
    color: "#f0a858",
    summary:
      "A dynamic jobs market with strong protections, meaningful training pathways, and investment in the industries of the future.",
    commitments: [
      "100,000 new apprenticeships in green energy, construction, and tech",
      "Raise the minimum wage to a genuine living wage indexed to inflation",
      "Expand paid parental leave to 26 weeks for both parents",
      "New small business startup grants of up to $50,000",
      "National Skills Passport recognising all qualifications and training",
      "Anti-wage-theft legislation with enforceable civil and criminal penalties",
    ],
    whyItMatters:
      "Work gives people dignity, purpose, and economic security. Triple T will build an economy where hard work is rewarded fairly, where skills are recognised, and where opportunity isn't confined to capital cities.",
    impact: "240,000 new jobs created in the first term",
  },
  {
    id: "transport",
    icon: TrainFront,
    title: "Transport",
    tagline: "Connected communities",
    color: "#a67ce8",
    summary:
      "Modern, affordable public transport and infrastructure that connects cities, towns, and regions — reducing emissions and travel times.",
    commitments: [
      "$25 billion High-Speed Rail investment linking Sydney, Melbourne, and Brisbane",
      "Free public transport for under-18s and full-time students nationally",
      "Electric bus fleet transition in all major metropolitan areas by 2035",
      "National active transport network expanding cycling and walking paths",
      "Regional freight rail upgrade reducing truck pressure on highways",
      "Smart city traffic management systems in 20 major urban centres",
    ],
    whyItMatters:
      "How people move shapes how communities function. Investment in public transport reduces emissions, eases housing pressure, and gives people back time. Triple T will build the infrastructure Australia needs for the next 50 years.",
    impact: "1.1 million fewer car trips per day by 2035",
  },
];

function PolicyPillar({
  policy,
  index,
  onOpen,
}: {
  policy: (typeof policies)[0];
  index: number;
  onOpen: () => void;
}) {
  const [hovered, setIsHovered] = useState(false);
  const Icon = policy.icon;

  return (
    <motion.button
      className="relative w-full text-left rounded-2xl p-6 glass border border-white/10 overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5fa8d3]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onOpen}
      aria-label={`Learn more about ${policy.title} policy`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, ${policy.color}18, transparent 70%)`,
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${policy.color}, transparent)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
          style={{
            background: `${policy.color}20`,
            border: `1px solid ${policy.color}40`,
            boxShadow: hovered ? `0 0 25px ${policy.color}35` : "none",
          }}
        >
          <Icon className="w-6 h-6" style={{ color: policy.color }} />
        </div>

        <div
          className="text-xs font-semibold tracking-widest uppercase mb-2"
          style={{ color: policy.color }}
        >
          {policy.tagline}
        </div>
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
          {policy.title}
        </h3>
        <p className="text-[#bcccdc] text-sm leading-relaxed mb-5">
          {policy.summary}
        </p>

        <div className="flex items-center gap-2" style={{ color: policy.color }}>
          <span className="text-sm font-semibold">View Policy Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.button>
  );
}

function PolicyModal({ policy }: { policy: (typeof policies)[0] }) {
  const Icon = policy.icon;

  return (
    <Dialog.Portal>
      <Dialog.Overlay asChild>
        <motion.div
          className="fixed inset-0 z-50 bg-[#0a2540]/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </Dialog.Overlay>
      <Dialog.Content asChild>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-dark border border-white/10 shadow-2xl"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${policy.color}18, transparent 60%)`,
              }}
            />

            <div className="relative z-10 p-8">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `${policy.color}22`,
                      border: `1px solid ${policy.color}50`,
                      boxShadow: `0 0 30px ${policy.color}30`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: policy.color }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-semibold tracking-widest uppercase mb-1"
                      style={{ color: policy.color }}
                    >
                      {policy.tagline}
                    </div>
                    <Dialog.Title className="text-3xl font-black text-white tracking-tight">
                      {policy.title} Policy
                    </Dialog.Title>
                  </div>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="p-2 rounded-xl text-[#bcccdc] hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close policy details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              </div>

              <div
                className="p-4 rounded-xl mb-6 text-sm font-semibold"
                style={{
                  background: `${policy.color}15`,
                  border: `1px solid ${policy.color}30`,
                  color: policy.color,
                }}
              >
                Impact: {policy.impact}
              </div>

              <p className="text-[#bcccdc] leading-relaxed mb-8">
                {policy.whyItMatters}
              </p>

              <div>
                <h4 className="text-white font-bold text-lg mb-4 tracking-tight">
                  Key Commitments
                </h4>
                <ul className="space-y-3">
                  {policy.commitments.map((c, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-[#d9e2ec] text-sm leading-relaxed"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <CheckCircle2
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        style={{ color: policy.color }}
                      />
                      {c}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function PolicyHub() {
  const [openPolicy, setOpenPolicy] = useState<string | null>(null);
  const activePolicy = policies.find((p) => p.id === openPolicy);

  return (
    <section
      id="policies"
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="policies-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] rounded-full bg-[#123c69]/20 blur-[120px]" />
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
              Our Platform
            </span>
            <div className="w-14 h-px bg-gradient-to-r from-[#5fa8d3] to-transparent rounded" />
          </div>
          <h2
            id="policies-heading"
            className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6"
          >
            Policy <span className="gradient-text">Command Centre</span>
          </h2>
          <p className="text-[#bcccdc] text-lg max-w-2xl mx-auto leading-relaxed">
            Five pillars of genuine change. Click any policy to explore our
            detailed commitments, the evidence behind them, and the difference
            they will make to your community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {policies.map((policy, i) => (
            <Dialog.Root
              key={policy.id}
              open={openPolicy === policy.id}
              onOpenChange={(open) =>
                setOpenPolicy(open ? policy.id : null)
              }
            >
              <PolicyPillar
                policy={policy}
                index={i}
                onOpen={() => setOpenPolicy(policy.id)}
              />
              <AnimatePresence>
                {openPolicy === policy.id && (
                  <PolicyModal policy={policy} />
                )}
              </AnimatePresence>
            </Dialog.Root>
          ))}

          <motion.div
            className="glass rounded-2xl p-6 border border-[#5fa8d3]/15 flex flex-col justify-between"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div>
              <div className="text-[#5fa8d3] text-xs font-semibold tracking-widest uppercase mb-3">
                Our Commitment
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight leading-tight">
                Evidence-Based Policy. Always.
              </h3>
              <p className="text-[#bcccdc] text-sm leading-relaxed">
                Every Triple T commitment is grounded in independent research,
                community consultation, and rigorous cost-benefit analysis.
                We govern for outcomes — not headlines.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between text-xs text-[#bcccdc]">
                <span>5 Policy Areas</span>
                <span>30+ Commitments</span>
                <span>Fully Costed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
