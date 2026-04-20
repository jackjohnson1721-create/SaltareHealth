// Owned by Diagram Artist. Do not edit from other agents.
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function WorkflowDiagram() {
  const reduced = useReducedMotion();
  const titleId = "workflow-diagram-title";

  const cx = 480;
  const cy = 220;
  const rx = 340;
  const ry = 140;

  const leftX = cx - rx; // 140
  const rightX = cx + rx; // 820

  // Outbound (upper) arc: community -> CMC
  const upperArc = `M ${leftX} ${cy} A ${rx} ${ry} 0 0 1 ${rightX} ${cy}`;
  // Return (lower) arc: CMC -> community
  const lowerArc = `M ${rightX} ${cy} A ${rx} ${ry} 0 0 1 ${leftX} ${cy}`;

  // Waypoints on the upper arc at angles 150°, 90°, 30°
  const waypoints = [
    { n: 1, label: "Surveillance", x: 186, y: 150 },
    { n: 2, label: "Confirmation", x: 480, y: 80 },
    { n: 3, label: "Transfer", x: 774, y: 150 },
  ];

  const pillH = 36;
  const pillLeftW = 150;
  const pillRightW = 120;

  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
      <svg
        viewBox="0 0 960 420"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby={titleId}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <title id={titleId}>
          Saltare clinical workflow: surveillance, confirmation, transfer from community hospital to CMC, and repatriation back
        </title>

        <defs>
          <marker
            id="wf-arrow-current"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
          <marker
            id="wf-arrow-accent"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: "var(--color-accent)" }} />
          </marker>
        </defs>

        {/* Outbound arc (solid, currentColor) */}
        {reduced ? (
          <path
            d={upperArc}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          />
        ) : (
          <motion.path
            d={upperArc}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          />
        )}

        {/* Return arc (dashed, accent — repatriation) */}
        <path
          d={lowerArc}
          fill="none"
          style={{ stroke: "var(--color-accent)" }}
          strokeWidth={2}
          strokeDasharray="6 5"
        />

        {/* Outbound flow arrow — mid-arc, between Confirmation and Transfer */}
        <g transform="translate(650, 99) rotate(13.4)">
          <path d="M 0 0 L -11 -5 L -11 5 Z" fill="currentColor" />
        </g>

        {/* Return flow arrow — mid-arc on lower arc, heading back to Community */}
        <g transform="translate(186, 290) rotate(-144.6)">
          <path d="M 0 0 L -11 -5 L -11 5 Z" style={{ fill: "var(--color-accent)" }} />
        </g>

        {/* Repatriation label (below lower arc) */}
        <text
          x={cx}
          y={cy + ry + 40}
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          style={{ fill: "var(--color-accent)" }}
        >
          Repatriation
        </text>

        {/* Left endpoint pill — Community hospital */}
        <g>
          <rect
            x={leftX - pillLeftW / 2}
            y={cy - pillH / 2}
            width={pillLeftW}
            height={pillH}
            rx={pillH / 2}
            fill="var(--color-bg-light)"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <text
            x={leftX}
            y={cy + 4}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill="currentColor"
          >
            Community hospital
          </text>
        </g>

        {/* Right endpoint pill — CMC */}
        <g>
          <rect
            x={rightX - pillRightW / 2}
            y={cy - pillH / 2}
            width={pillRightW}
            height={pillH}
            rx={pillH / 2}
            fill="var(--color-bg-light)"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <text
            x={rightX}
            y={cy + 4}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill="currentColor"
          >
            CMC
          </text>
        </g>

        {/* Waypoints on the outbound arc */}
        {waypoints.map((wp) => (
          <g key={wp.n}>
            <text
              x={wp.x}
              y={wp.y - 26}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              fill="currentColor"
            >
              {wp.label}
            </text>
            <circle
              cx={wp.x}
              cy={wp.y}
              r={16}
              fill="var(--color-bg-light)"
              stroke="currentColor"
              strokeWidth={1.5}
            />
            <text
              x={wp.x}
              y={wp.y + 4}
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill="currentColor"
            >
              {wp.n}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
