"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type DiaTextProps = {
  text: string;
  colors?: string[];
  textColor?: string;
  duration?: number;
  delay?: number;
  repeat?: boolean;
  repeatDelay?: number;
  className?: string;
};

const DEFAULT_COLORS = ["#e973a5", "#f17303", "#ffd824", "#318457", "#4b7fe8"];
const BAND_HALF = 20;

function buildGradient(position: number, colors: string[], textColor: string) {
  const start = position - BAND_HALF;
  const end = position + BAND_HALF;

  if (end <= 0 || start >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`;
  }

  const stops = [`${textColor} 0%`, `${textColor} ${Math.max(0, start).toFixed(2)}%`];
  colors.forEach((color, index) => {
    const point = start + (index / Math.max(1, colors.length - 1)) * BAND_HALF * 2;
    stops.push(`${color} ${Math.min(100, Math.max(0, point)).toFixed(2)}%`);
  });
  stops.push(`${textColor} ${Math.min(100, end).toFixed(2)}%`, `${textColor} 100%`);

  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

export function DiaText({
  text,
  colors = DEFAULT_COLORS,
  textColor = "#11110f",
  duration = 1.55,
  delay = 0,
  repeat = true,
  repeatDelay = 1.8,
  className,
}: DiaTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const shouldReduceMotion = useReducedMotion();
  const sweep = useMotionValue(-BAND_HALF);
  const backgroundImage = useTransform(sweep, (position) =>
    buildGradient(position, colors, textColor),
  );

  useEffect(() => {
    if (!inView || shouldReduceMotion) return;

    const controls = animate(sweep, 100 + BAND_HALF, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      repeat: repeat ? Number.POSITIVE_INFINITY : 0,
      repeatDelay,
    });

    return () => controls.stop();
  }, [delay, duration, inView, repeat, repeatDelay, shouldReduceMotion, sweep]);

  return (
    <motion.span
      aria-label={text}
      className={cn("dia-text", className)}
      ref={ref}
      style={{ backgroundImage }}
    >
      <span aria-hidden="true">{text}</span>
    </motion.span>
  );
}
