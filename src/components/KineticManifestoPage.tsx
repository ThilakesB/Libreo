import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

interface ManifestoItem {
  line: string;
  tag?: string;
}

const manifestoItems: ManifestoItem[] = [
  {
    line: "Libreo is where we build",
    tag: "[01]",
  },
  {
    line: "real things that satisfy the soul.",
    tag: "[02]",
  },
  {
    line: "Every project we create",
    tag: "[03]",
  },
  {
    line: "carries meaning, creativity, & purpose.",
    tag: "[04]",
  },
];

const STAGGER = 0.025;

interface TextRollProps {
  children: string;
  className?: string;
  center?: boolean;
}

const TextRoll: React.FC<TextRollProps> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden cursor-pointer select-none py-1", className)}
      style={{
        lineHeight: 0.95,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const char = l === " " ? "\u00A0" : l;
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                duration: 0.35,
                ease: [0.33, 1, 0.68, 1],
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0 py-1">
        {children.split("").map((l, i) => {
          const char = l === " " ? "\u00A0" : l;
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                duration: 0.35,
                ease: [0.33, 1, 0.68, 1],
                delay,
              }}
              className="inline-block text-white"
              key={i}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export const KineticManifesto = () => {
  return (
    <section className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-6 py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-body text-white/50 tracking-widest uppercase mb-12">
          <span>Our Manifesto</span>
        </div>

        {/* Kinetic Typography Lines */}
        <ul className="flex flex-col items-center justify-center gap-3 md:gap-5 w-full">
          {manifestoItems.map((item, index) => (
            <li
              className="relative flex flex-col items-center group"
              key={index}
            >
              <div className="relative flex items-center justify-center">
                <TextRoll
                  center
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading italic text-white/90 group-hover:text-white transition-colors duration-300 tracking-tight"
                >
                  {item.line}
                </TextRoll>
              </div>
            </li>
          ))}
        </ul>

        {/* Bottom Subtext */}
        <p className="mt-14 text-white/40 font-body text-xs md:text-sm font-light max-w-md mx-auto">
          Hover over each line to interact with the kinetic typography.
        </p>
      </div>
    </section>
  );
};

export default KineticManifesto;
