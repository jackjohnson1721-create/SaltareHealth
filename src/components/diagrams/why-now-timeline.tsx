// Owned by Diagram Artist. Do not edit from other agents.
"use client";

import { motion, useReducedMotion } from "framer-motion";

type Milestone = {
  year: string;
  desc: string;
  current?: boolean;
};

const MILESTONES: Milestone[] = [
  { year: "2021", desc: "VBE safe harbor — legal path" },
  { year: "2023", desc: "Information Blocking Rule — penalties active" },
  { year: "2024", desc: "TEFCA/QHIN — production infrastructure" },
  { year: "2025\u20132026", desc: "Active enforcement — ground to take", current: true },
];

export default function WhyNowTimeline() {
  const reduced = useReducedMotion();
  const titleId = "why-now-timeline-title";

  const vbW = 960;
  const vbH = 200;
  const baselineY = 100;
  const paddingX = 80;
  const usableW = vbW - paddingX * 2;
  const stepX = usableW / (MILESTONES.length - 1);

  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby={titleId}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <title id={titleId}>
          Why now: regulatory milestones from 2021 through 2025 to 2026 that make the business
          buildable today
        </title>

        {/* Baseline */}
        {reduced ? (
          <line
            x1={paddingX}
            y1={baselineY}
            x2={vbW - paddingX}
            y2={baselineY}
            stroke="currentColor"
            strokeWidth={1.5}
            opacity={0.7}
          />
        ) : (
          <motion.line
            x1={paddingX}
            y1={baselineY}
            x2={vbW - paddingX}
            y2={baselineY}
            stroke="currentColor"
            strokeWidth={1.5}
            opacity={0.7}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          />
        )}

        {MILESTONES.map((m, i) => {
          const cx = paddingX + stepX * i;
          const isCurrent = !!m.current;
          const radius = isCurrent ? 12 : 7;

          const Dot = reduced ? (
            <circle
              cx={cx}
              cy={baselineY}
              r={radius}
              fill={isCurrent ? "var(--color-accent)" : "currentColor"}
              stroke={isCurrent ? "var(--color-accent)" : "currentColor"}
              strokeWidth={1.5}
              style={isCurrent ? { fill: "var(--color-accent)", stroke: "var(--color-accent)" } : undefined}
            />
          ) : (
            <motion.circle
              cx={cx}
              cy={baselineY}
              r={radius}
              fill={isCurrent ? undefined : "currentColor"}
              stroke={isCurrent ? undefined : "currentColor"}
              strokeWidth={1.5}
              style={isCurrent ? { fill: "var(--color-accent)", stroke: "var(--color-accent)" } : undefined}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.15,
                ease: [0.19, 1, 0.22, 1],
              }}
            />
          );

          return (
            <g key={m.year}>
              {/* Pulse ring for current */}
              {isCurrent && !reduced && (
                <motion.circle
                  cx={cx}
                  cy={baselineY}
                  r={radius}
                  fill="none"
                  style={{ stroke: "var(--color-accent)" }}
                  strokeWidth={1.5}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              {Dot}

              {/* Year label above */}
              <text
                x={cx}
                y={baselineY - 26}
                textAnchor="middle"
                fontSize={16}
                fontWeight={700}
                style={isCurrent ? { fill: "var(--color-accent)" } : undefined}
                fill={isCurrent ? undefined : "currentColor"}
              >
                {m.year}
              </text>

              {/* Description below */}
              <text
                x={cx}
                y={baselineY + 34}
                textAnchor="middle"
                fontSize={11.5}
                fill="currentColor"
                opacity={0.85}
              >
                {m.desc}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
