"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ElementType, type ReactNode } from "react";
import { tokens } from "@/lib/tokens";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = as as ElementType;

  if (reduced) {
    return <Component className={className}>{children}</Component>;
  }

  const MotionTag = motion(Component) as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: tokens.motion.revealDuration,
        delay,
        ease: tokens.motion.easeOutExpo as unknown as number[],
      }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
