"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Shield, ExternalLink } from "lucide-react";

const FooterLogo = dynamic(
  () => import("@/components/three/FooterLogo").then((m) => ({ default: m.FooterLogo })),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const footerNav = [
  {
    heading: "Campaign",
    links: [
      { label: "About Triple T", href: "#about" },
      { label: "Our Policies", href: "#policies" },
      { label: "Leadership Team", href: "#candidates" },
      { label: "Campaign Journey", href: "#journey" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "How Elections Work", href: "#elections" },
      { label: "Vote in Simulator", href: "#simulator" },
      { label: "Commerce Reflection", href: "#reflection" },
    ],
  },
  {
    heading: "Pillars",
    links: [
      { label: "Education Policy", href: "#policies" },
      { label: "Healthcare Policy", href: "#policies" },
      { label: "Environment Policy", href: "#policies" },
      { label: "Employment Policy", href: "#policies" },
      { label: "Transport Policy", href: "#policies" },
    ],
  },
];

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  return (
    <footer
      className="relative pt-24 pb-10 px-6 overflow-hidden border-t border-white/10"
      role="contentinfo"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5fa8d3]/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[#5fa8d3]/4 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#5fa8d3] flex items-center justify-center shadow-lg shadow-[#5fa8d3]/30">
                <Shield className="w-8 h-8 text-[#0a2540]" />
              </div>
              <div>
                <div className="text-3xl font-black text-white tracking-tighter">
                  TRIPLE T
                </div>
                <div className="text-[#5fa8d3] text-sm font-medium tracking-[0.15em]">
                  Trust &bull; Teamwork &bull; Tomorrow
                </div>
              </div>
            </div>

            <div className="w-32 h-32">
              <FooterLogo />
            </div>

            <p className="text-[#bcccdc] text-sm leading-relaxed max-w-sm mt-6">
              Building a stronger Australia through transparent governance,
              genuine cooperation, and forward-thinking policy. Together, we
              shape tomorrow.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {footerNav.map((section) => (
              <div key={section.heading}>
                <div className="text-white font-bold text-sm mb-4 tracking-tight">
                  {section.heading}
                </div>
                <ul className="space-y-2.5" role="list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-[#bcccdc] text-xs hover:text-[#5fa8d3] transition-colors duration-200 leading-relaxed"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="p-6 glass rounded-2xl border border-[#5fa8d3]/15 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <ExternalLink className="w-4 h-4 text-[#5fa8d3] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[#5fa8d3] text-xs font-bold tracking-widest uppercase mb-2">
                Educational Disclaimer
              </div>
              <p className="text-[#bcccdc] text-xs leading-relaxed">
                This project is a{" "}
                <strong className="text-white">
                  Year 9 Commerce educational activity
                </strong>{" "}
                demonstrating how political parties, elections, and democratic
                systems operate. Triple T is a fictional political party created
                for educational purposes. All candidates, policies, and election
                results depicted are entirely fictional and designed to
                illustrate concepts in political science and civics.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-[#bcccdc]/50 text-xs text-center sm:text-left">
              &copy; {new Date().getFullYear()} Triple T Educational Project.
              Year 9 Commerce Activity.
            </div>
            <div className="flex items-center gap-4 text-[#bcccdc]/50 text-xs">
              <span>Built with Next.js, Three.js &amp; GSAP</span>
              <span>&bull;</span>
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, "#hero")}
                className="hover:text-[#5fa8d3] transition-colors"
              >
                Back to top
              </a>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-[#bcccdc]/30 text-xs text-center leading-relaxed max-w-2xl mx-auto">
              Accessibility: This site supports keyboard navigation, screen
              readers, and respects reduced-motion preferences. For accessibility
              concerns, please refer to{" "}
              <span className="text-[#5fa8d3]/50">WCAG 2.1 AA guidelines</span>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
