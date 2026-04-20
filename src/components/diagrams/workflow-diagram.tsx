// Owned by Diagram Artist. Do not edit from other agents.
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function WorkflowDiagram() {
  const reduced = useReducedMotion();
  const titleId = "workflow-diagram-title";

  const y = 140;
  const n1x = 140;
  const n2x = 480;
  const n3x = 820;
  const r = 48;

  // Primary arrow path (node1 -> node2 -> node3 edges)
  const primaryPath = `M ${n1x + r} ${y} L ${n2x - r} ${y} M ${n2x + r} ${y} L ${n3x - r} ${y}`;

  // Loop-back arrow from node3 down and back to node1 (below)
  const loopPath = `M ${n3x} ${y + r} C ${n3x} ${y + 140}, ${n1x} ${y + 140}, ${n1x} ${y + r}`;

  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
      <svg
        viewBox="0 0 960 320"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby={titleId}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <title id={titleId}>
          Saltare clinical workflow: surveillance, confirmation, transfer and repatriation
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

        {/* Node 1 — Surveillance (EHR/monitor glyph) */}
        <g>
          <circle
            cx={n1x}
            cy={y}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            opacity={0.9}
          />
          {/* monitor body */}
          <rect
            x={n1x - 22}
            y={y - 16}
            width={44}
            height={28}
            rx={3}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          {/* screen lines */}
          <line x1={n1x - 14} y1={y - 6} x2={n1x + 14} y2={y - 6} stroke="currentColor" strokeWidth={1.2} />
          <line x1={n1x - 14} y1={y} x2={n1x + 8} y2={y} stroke="currentColor" strokeWidth={1.2} />
          <line x1={n1x - 14} y1={y + 6} x2={n1x + 12} y2={y + 6} stroke="currentColor" strokeWidth={1.2} />
          {/* stand */}
          <line x1={n1x} y1={y + 12} x2={n1x} y2={y + 20} stroke="currentColor" strokeWidth={1.5} />
          <line x1={n1x - 8} y1={y + 20} x2={n1x + 8} y2={y + 20} stroke="currentColor" strokeWidth={1.5} />
          <text
            x={n1x}
            y={y + r + 28}
            textAnchor="middle"
            fill="currentColor"
            fontSize={14}
            fontWeight={600}
          >
            Surveillance
          </text>
        </g>

        {/* Node 2 — Confirmation (doctor/check glyph) */}
        <g>
          <circle
            cx={n2x}
            cy={y}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            opacity={0.9}
          />
          {/* inner circle */}
          <circle cx={n2x} cy={y} r={26} fill="none" stroke="currentColor" strokeWidth={1.5} />
          {/* checkmark */}
          <path
            d={`M ${n2x - 12} ${y + 1} L ${n2x - 3} ${y + 10} L ${n2x + 14} ${y - 10}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={n2x}
            y={y + r + 28}
            textAnchor="middle"
            fill="currentColor"
            fontSize={14}
            fontWeight={600}
          >
            Confirmation
          </text>
        </g>

        {/* Node 3 — Transfer + repatriation (hospital + arrow glyph) */}
        <g>
          <circle
            cx={n3x}
            cy={y}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            opacity={0.9}
          />
          {/* hospital building */}
          <rect
            x={n3x - 20}
            y={y - 14}
            width={26}
            height={28}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          {/* cross on building */}
          <line x1={n3x - 7} y1={y - 8} x2={n3x - 7} y2={y + 2} stroke="currentColor" strokeWidth={1.5} />
          <line x1={n3x - 12} y1={y - 3} x2={n3x - 2} y2={y - 3} stroke="currentColor" strokeWidth={1.5} />
          {/* arrow out (transfer) */}
          <line
            x1={n3x + 8}
            y1={y + 4}
            x2={n3x + 22}
            y2={y + 4}
            stroke="currentColor"
            strokeWidth={2}
            markerEnd="url(#wf-arrow-current)"
          />
          <text
            x={n3x}
            y={y + r + 28}
            textAnchor="middle"
            fill="currentColor"
            fontSize={14}
            fontWeight={600}
          >
            Transfer + repatriation
          </text>
        </g>

        {/* Primary flow arrows */}
        {reduced ? (
          <path
            d={primaryPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            markerEnd="url(#wf-arrow-current)"
          />
        ) : (
          <motion.path
            d={primaryPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            markerEnd="url(#wf-arrow-current)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          />
        )}

        {/* Loop-back repatriation arrow (accent) */}
        <path
          d={loopPath}
          fill="none"
          style={{ stroke: "var(--color-accent)" }}
          strokeWidth={2}
          strokeDasharray="6 5"
          markerEnd="url(#wf-arrow-accent)"
        />
        <text
          x={(n1x + n3x) / 2}
          y={y + 150}
          textAnchor="middle"
          fontSize={13}
          fontWeight={600}
          style={{ fill: "var(--color-accent)" }}
        >
          Repatriation
        </text>
      </svg>
    </div>
  );
}
