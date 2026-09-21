"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "framer-motion";

type GradientVariant = "home" | "projects" | "campaigns" | "visuals" | "about";

const gradientColours: Record<GradientVariant, string[]> = {
  home: ["#1aeadc", "#13b0be"],
  projects: ["#ff7300"],
  campaigns: ["#98cfae", "#d7efcf"],
  visuals: ["#ffda24", "#feca4f"],
  about: ["#ffda24"],
};

export function AnimatedGrainGradient({ variant }: { variant: GradientVariant }) {
  const reduceMotion = useReducedMotion();
  const isHome = variant === "home";
  const isAbout = variant === "about";

  return (
    <div className={`gradient-shader-layer gradient-shader-${variant}`} aria-hidden="true">
      <GrainGradient
        width={1280}
        height={720}
        colors={gradientColours[variant]}
        colorBack="#ffffff"
        softness={isHome ? 0.57 : isAbout ? 0.19 : 0.62}
        intensity={isHome ? 0.81 : isAbout ? 0.61 : 0.35}
        noise={isHome ? 0.21 : 0}
        shape={isHome || isAbout ? "corners" : "wave"}
        speed={reduceMotion ? 0 : isHome ? 0.76 : isAbout ? 1 : 1.4}
        scale={isHome ? 1.32 : isAbout ? 0.92 : 1.2}
        rotation={isHome ? 48 : isAbout ? 208 : 0}
        offsetX={isHome ? -1 : isAbout ? 0 : 0.18}
        offsetY={isHome ? 0.34 : isAbout ? 0 : 0.16}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
