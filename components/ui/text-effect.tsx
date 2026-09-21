"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type React from "react";

import { cn } from "@/lib/utils";

type DataAttributes = {
  [key: `data-${string}`]: string | number | undefined;
};

type TextEffectProps = {
  children: string;
  per?: "word" | "char" | "line";
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  id?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
} & DataAttributes;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.045 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextEffect({
  children,
  per = "word",
  as = "span",
  className,
  delay = 0,
  once = true,
  amount = 0.22,
  ...elementAttributes
}: TextEffectProps) {
  const shouldReduceMotion = useReducedMotion();
  const segments =
    per === "line"
      ? children.split("\n")
      : per === "char"
        ? Array.from(children)
        : children.split(/(\s+)/);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.span;

  return (
    <MotionTag
      aria-label={children}
      className={cn("text-effect", className)}
      {...elementAttributes}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            staggerChildren: per === "char" ? 0.018 : per === "line" ? 0.11 : 0.045,
            delayChildren: shouldReduceMotion ? 0 : delay,
          },
        },
      }}
    >
      {segments.map((segment, index) => (
        <motion.span
          aria-hidden="true"
          className={per === "line" ? "text-effect-line" : "text-effect-segment"}
          key={`${segment}-${index}`}
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          {segment}
        </motion.span>
      ))}
    </MotionTag>
  );
}
