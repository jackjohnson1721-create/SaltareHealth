// Owned by Diagram Artist. Do not edit from other agents.
"use client";

export default function FirewallDiagram() {
  const titleId = "firewall-diagram-title";

  // Layout
  const leftX = 40;
  const leftW = 340;
  const rightX = 580;
  const rightW = 340;
  const boxY = 60;
  const boxH = 360;
  const barrierX = 480;

  // Left chips (identifiable)
  const leftChips = [
    { label: "Patient name", y: 140, identifiable: true },
    { label: "MRN", y: 190, identifiable: true },
    { label: "DOB", y: 240, identifiable: true },
    { label: "Full EHR", y: 290, identifiable: false },
  ];

  // Right chips (de-identified destinations)
  const rightChips = [
    { label: "De-identified vitals", y: 140 },
    { label: "Labs", y: 190 },
    { label: "Imaging findings", y: 240 },
    { label: "ELSO/Berlin/SCAI flags", y: 290 },
  ];

  const chipH = 30;
  const chipLeftX = leftX + 30;
  const chipLeftW = leftW - 60;
  const chipRightX = rightX + 30;
  const chipRightW = rightW - 60;

  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
      <svg
        viewBox="0 0 960 480"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby={titleId}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <title id={titleId}>
          Patient-identity firewall: identifiers stay on-prem; only de-identified clinical signals
          reach the Saltare cloud
        </title>

        <defs>
          <marker
            id="fw-arrow-current"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* Left box: Community hospital */}
        <rect
          x={leftX}
          y={boxY}
          width={leftW}
          height={boxH}
          rx={14}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          opacity={0.85}
        />
        <text
          x={leftX + leftW / 2}
          y={boxY + 30}
          textAnchor="middle"
          fill="currentColor"
          fontSize={15}
          fontWeight={700}
        >
          Community hospital (on-prem)
        </text>
        <text
          x={leftX + leftW / 2}
          y={boxY + 52}
          textAnchor="middle"
          fill="currentColor"
          fontSize={11}
          opacity={0.7}
        >
          Identifiable data stays here
        </text>

        {leftChips.map((c) => (
          <g key={c.label}>
            <rect
              x={chipLeftX}
              y={c.y - chipH / 2}
              width={chipLeftW}
              height={chipH}
              rx={15}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
              opacity={0.6}
            />
            <text
              x={chipLeftX + chipLeftW / 2}
              y={c.y + 4}
              textAnchor="middle"
              fill="currentColor"
              fontSize={12}
              opacity={0.85}
            >
              {c.label}
            </text>
          </g>
        ))}

        {/* Right box: Saltare cloud */}
        <rect
          x={rightX}
          y={boxY}
          width={rightW}
          height={boxH}
          rx={14}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          opacity={0.85}
        />
        <text
          x={rightX + rightW / 2}
          y={boxY + 30}
          textAnchor="middle"
          fill="currentColor"
          fontSize={15}
          fontWeight={700}
        >
          Saltare cloud
        </text>
        <text
          x={rightX + rightW / 2}
          y={boxY + 52}
          textAnchor="middle"
          fill="currentColor"
          fontSize={11}
          opacity={0.7}
        >
          De-identified clinical signals only
        </text>

        {rightChips.map((c) => (
          <g key={c.label}>
            <rect
              x={chipRightX}
              y={c.y - chipH / 2}
              width={chipRightW}
              height={chipH}
              rx={15}
              style={{ fill: "var(--color-accent-soft)" }}
              stroke="currentColor"
              strokeWidth={1.25}
              opacity={0.9}
            />
            <text
              x={chipRightX + chipRightW / 2}
              y={c.y + 4}
              textAnchor="middle"
              fill="currentColor"
              fontSize={12}
              fontWeight={500}
            >
              {c.label}
            </text>
          </g>
        ))}

        {/* Barrier — dashed vertical line in accent */}
        <line
          x1={barrierX}
          y1={boxY - 10}
          x2={barrierX}
          y2={boxY + boxH + 10}
          strokeWidth={2.5}
          strokeDasharray="8 6"
          style={{ stroke: "var(--color-accent)" }}
        />
        {/* Barrier label (rotated) */}
        <text
          x={barrierX}
          y={boxY - 22}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          style={{ fill: "var(--color-accent)" }}
        >
          Patient-identity firewall
        </text>

        {/* Identifier arrows — STOP at the barrier */}
        {leftChips
          .filter((c) => c.identifiable)
          .map((c) => {
            const startX = chipLeftX + chipLeftW;
            const stopX = barrierX - 14;
            return (
              <g key={`stop-${c.label}`}>
                <line
                  x1={startX}
                  y1={c.y}
                  x2={stopX}
                  y2={c.y}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  opacity={0.6}
                />
                {/* stop/X symbol */}
                <circle
                  cx={barrierX - 6}
                  cy={c.y}
                  r={8}
                  fill="none"
                  style={{ stroke: "var(--color-accent)" }}
                  strokeWidth={1.75}
                />
                <line
                  x1={barrierX - 11}
                  y1={c.y - 5}
                  x2={barrierX - 1}
                  y2={c.y + 5}
                  style={{ stroke: "var(--color-accent)" }}
                  strokeWidth={1.75}
                  strokeLinecap="round"
                />
                <line
                  x1={barrierX - 11}
                  y1={c.y + 5}
                  x2={barrierX - 1}
                  y2={c.y - 5}
                  style={{ stroke: "var(--color-accent)" }}
                  strokeWidth={1.75}
                  strokeLinecap="round"
                />
              </g>
            );
          })}

        {/* Full EHR → filtered → de-identified signals: one arrow crossing with filter glyph */}
        {(() => {
          const srcY = 290; // Full EHR
          const filterX = barrierX;
          const filterY = srcY;
          return (
            <g>
              {/* arrow from Full EHR to filter */}
              <line
                x1={chipLeftX + chipLeftW}
                y1={srcY}
                x2={filterX - 14}
                y2={filterY}
                stroke="currentColor"
                strokeWidth={1.75}
              />
              {/* Filter/funnel glyph on the barrier */}
              <g>
                <path
                  d={`M ${filterX - 14} ${filterY - 12} L ${filterX + 14} ${filterY - 12} L ${filterX + 4} ${filterY} L ${filterX + 4} ${filterY + 12} L ${filterX - 4} ${filterY + 12} L ${filterX - 4} ${filterY} Z`}
                  fill="none"
                  style={{ stroke: "var(--color-accent)" }}
                  strokeWidth={1.75}
                  strokeLinejoin="round"
                />
              </g>
              {/* arrows from filter out to each right chip */}
              {rightChips.map((rc) => (
                <line
                  key={`cross-${rc.label}`}
                  x1={filterX + 14}
                  y1={filterY}
                  x2={chipRightX - 2}
                  y2={rc.y}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  opacity={0.7}
                  markerEnd="url(#fw-arrow-current)"
                />
              ))}
              <text
                x={filterX}
                y={filterY + 30}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                style={{ fill: "var(--color-accent)" }}
              >
                De-identify
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}
