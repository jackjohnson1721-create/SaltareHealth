// Owned by Diagram Artist. Do not edit from other agents.
export default function FirewallDiagram() {
  const titleId = "firewall-diagram-title";

  const leftX = 40;
  const leftW = 340;
  const rightX = 580;
  const rightW = 340;
  const boxY = 60;
  const boxH = 360;
  const barrierX = 480;

  const leftChips = [
    { label: "Patient name", y: 140, identifiable: true },
    { label: "MRN", y: 190, identifiable: true },
    { label: "DOB", y: 240, identifiable: true },
    { label: "Full EHR", y: 290, identifiable: false },
  ];

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
            const stopX = barrierX - 13;
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
                {/* prohibition mark */}
                <circle
                  cx={barrierX}
                  cy={c.y}
                  r={11}
                  fill="none"
                  style={{ stroke: "var(--color-accent)" }}
                  strokeWidth={2}
                />
                <line
                  x1={barrierX - 7}
                  y1={c.y - 7}
                  x2={barrierX + 7}
                  y2={c.y + 7}
                  style={{ stroke: "var(--color-accent)" }}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </g>
            );
          })}

        {/* Full EHR → filter → de-identified signals */}
        {(() => {
          const cx = barrierX;
          const cy = 290; // Full EHR row — funnel sits on this line, input is horizontal
          return (
            <g>
              {/* horizontal arrow from Full EHR chip to funnel mouth */}
              <line
                x1={chipLeftX + chipLeftW}
                y1={cy}
                x2={cx - 18}
                y2={cy}
                stroke="currentColor"
                strokeWidth={1.75}
              />
              {/* horizontal trapezoid funnel: wide left, narrow right */}
              <path
                d={`M ${cx - 18} ${cy - 18} L ${cx + 18} ${cy - 8} L ${cx + 18} ${cy + 8} L ${cx - 18} ${cy + 18} Z`}
                fill="none"
                style={{ stroke: "var(--color-accent)" }}
                strokeWidth={1.75}
                strokeLinejoin="round"
              />
              {/* arrows from funnel throat to each right chip */}
              {rightChips.map((rc) => (
                <line
                  key={`cross-${rc.label}`}
                  x1={cx + 18}
                  y1={cy}
                  x2={chipRightX - 2}
                  y2={rc.y}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  opacity={0.7}
                  markerEnd="url(#fw-arrow-current)"
                />
              ))}
              <text
                x={cx}
                y={cy + 36}
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
