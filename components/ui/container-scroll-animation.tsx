"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0.06, 0.94], [18, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0.06, 0.94],
    isMobile ? [0.78, 0.96] : [0.94, 1],
  );
  const translate = useTransform(scrollYProgress, [0.06, 0.94], [0, -44]);

  return (
    <div
      ref={containerRef}
      className="container-scroll-shell relative flex items-start justify-center px-2 md:px-10"
    >
      <div className="container-scroll-sticky relative w-full pb-8 pt-5 md:pb-12 md:pt-7" style={{ perspective: "1200px" }}>
        <ScrollHeader translate={translate}>{titleComponent}</ScrollHeader>
        <ScrollCard rotate={rotate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
}

function ScrollHeader({
  translate,
  children,
}: {
  translate: MotionValue<number>;
  children: React.ReactNode;
}) {
  return <motion.div style={{ translateY: translate }}>{children}</motion.div>;
}

function ScrollCard({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="mx-auto w-full max-w-[1480px] origin-center will-change-transform"
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #00000018, 0 9px 20px #00000014, 0 37px 37px #00000012, 0 84px 50px #0000000d, 0 149px 60px #00000008",
      }}
    >
      {children}
    </motion.div>
  );
}
