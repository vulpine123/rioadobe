import { motion } from "motion/react";

const ART = String.raw`
        ____  _         ___        __      __
       / __ \(_)___    /   |  ____/ /___  / /_  ___
      / /_/ / / __ \  / /| | / __  / __ \/ __ \/ _ \
     / _, _/ / /_/ / / ___ |/ /_/ / /_/ / /_/ /  __/
    /_/ |_/_/\____/ /_/  |_|\__,_/\____/_.___/\___/
                  S O U T H W E S T   C A F É
`;

export function AsciiBanner({ className = "" }: { className?: string }) {
  return (
    <motion.pre
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-hidden="true"
      className={`font-mono text-primary/70 text-[8px] xs:text-[9px] sm:text-[11px] md:text-[13px] leading-tight whitespace-pre overflow-hidden select-none ${className}`}
    >
      {ART}
    </motion.pre>
  );
}

const PEPPER = String.raw`
   .--.
  /    \
 |  ()  |    "Made with fire,
  \____/      served with soul."
   |__|
   /  \
  /____\
`;

export function AsciiPepper({ className = "" }: { className?: string }) {
  return (
    <pre
      aria-hidden="true"
      className={`font-mono text-[10px] md:text-xs leading-tight text-primary/60 whitespace-pre select-none ${className}`}
    >
      {PEPPER}
    </pre>
  );
}
