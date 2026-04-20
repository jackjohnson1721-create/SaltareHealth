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
      {/* Mobile: vertical list */}
      <ol className="sm:hidden flex flex-col gap-5" aria-label="Why-now regulatory milestones">
        {MILESTONES.map((m) => (
          <li key={m.year} className="flex gap-4">
            <span
              className="shrink-0 inline-flex items-center justify-center rounded-full"
              style={{
                width: m.current ? 20 : 14,
                height: m.current ? 20 : 14,
                marginTop: 4,
                background: m.current ? "var(--color-accent)" : "currentColor",
              }}
              aria-hidden
            />
            <div>
              <div
                className="text-base font-bold"
                style={m.current ? { color: "var(--color-accent)" } : undefined}
              >
                {m.year}
              </div>
              <div
                className="text-sm mt-1"
                style={{ opacity: 0.85 }}
              >
                {m.desc}
              </div>
            </div>
          </li>
        ))}
      </ol>
      {/* Desktop/tablet: horizontal SVG timeline */}
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby={titleId}
        className="hidden sm:block"
        style={{ width: "100%", height: "auto" }}
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

          const isFirst = i === 0;
          const isLast = i === MILESTONES.length - 1;
          const textAnchor = isFirst ? "start" : isLast ? "end" : "middle";
          const textX = isFirst ? cx - 8 : isLast ? cx + 8 : cx;

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
                x={textX}
                y={baselineY - 26}
                textAnchor={textAnchor}
                fontSize={16}
                fontWeight={700}
                style={isCurrent ? { fill: "var(--color-accent)" } : undefined}
                fill={isCurrent ? undefined : "currentColor"}
              >
                {m.year}
              </text>

              {/* Description below — split on em-dash so long labels don't collide */}
              {(() => {
                const parts = m.desc.split(" — ");
                return (
                  <text
                    x={textX}
                    y={baselineY + 28}
                    textAnchor={textAnchor}
                    fontSize={11.5}
                    fill="currentColor"
                    opacity={0.85}
                  >
                    <tspan x={textX} dy="1em">{parts[0]}</tspan>
                    {parts[1] ? (
                      <tspan x={textX} dy="1.3em">{parts[1]}</tspan>
                    ) : null}
                  </text>
                );
              })()}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
