"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
  id?: string;
}

const defaultLetterVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0 },
};

function GradualSpacing({
  text,
  duration = 0.52,
  delayMultiple = 0.055,
  framerProps = defaultLetterVariants,
  className,
  id,
}: GradualSpacingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.h1
      aria-label={text}
      className={cn("gradual-spacing", className)}
      id={id}
    >
      <AnimatePresence initial={!shouldReduceMotion}>
        {Array.from(text).map((char, index) => (
          <motion.span
            aria-hidden="true"
            className="gradual-spacing-letter"
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{
              duration: shouldReduceMotion ? 0 : duration,
              delay: shouldReduceMotion ? 0 : index * delayMultiple,
              ease: [0.22, 1, 0.36, 1],
            }}
            key={`${char}-${index}`}
          >
            {char === " " ? "\u00a0" : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.h1>
  );
}

export { GradualSpacing };
