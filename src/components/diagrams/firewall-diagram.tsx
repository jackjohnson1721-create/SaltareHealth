// Owned by Diagram Artist. Do not edit from other agents.
export default function FirewallDiagram() {
  const titleId = "firewall-diagram-title";

  const vaultX = 40;
  const vaultY = 60;
  const vaultW = 320;
  const vaultH = 360;

  const cloudX = 600;
  const cloudY = 60;
  const cloudW = 320;
  const cloudH = 360;

  const pipeY = vaultY + vaultH / 2; // 240
  const pipeLeft = vaultX + vaultW; // 360
  const pipeRight = cloudX; // 600
  const pipeTop = pipeY - 18;
  const pipeBot = pipeY + 18;
  const filterLeft = 440;
  const filterRight = 520;

  const identifiers = ["Patient name", "MRN", "DOB", "Full EHR"];
  const signals = [
    "De-identified vitals",
    "Labs",
    "Imaging findings",
    "ELSO/Berlin/SCAI flags",
  ];

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
          Patient-identity firewall: identifiers stay on-prem in the community hospital; only
          de-identified clinical signals pass through the de-identification filter to the Saltare cloud
        </title>

        <defs>
          <marker
            id="fw-arrow-current"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* LEFT — vault (solid tint) */}
        <g>
          <rect
            x={vaultX}
            y={vaultY}
            width={vaultW}
            height={vaultH}
            rx={10}
            fill="currentColor"
            fillOpacity={0.04}
            stroke="currentColor"
            strokeWidth={1.5}
          />

          {/* Lock emblem — top-right of vault */}
          <g transform={`translate(${vaultX + vaultW - 34}, ${vaultY + 28})`}>
            <path
              d="M -7 0 A 7 7 0 0 1 7 0"
              fill="none"
              style={{ stroke: "var(--color-accent)" }}
              strokeWidth={1.75}
            />
            <rect
              x={-10}
              y={0}
              width={20}
              height={14}
              rx={2}
              fill="var(--color-bg-light)"
              style={{ stroke: "var(--color-accent)" }}
              strokeWidth={1.75}
            />
            <circle cx={0} cy={7} r={1.75} style={{ fill: "var(--color-accent)" }} />
          </g>

          {/* Heading */}
          <text
            x={vaultX + 24}
            y={vaultY + 40}
            fontSize={15}
            fontWeight={700}
            fill="currentColor"
          >
            Community hospital
          </text>
          <text
            x={vaultX + 24}
            y={vaultY + 60}
            fontSize={11}
            fill="currentColor"
            opacity={0.7}
          >
            Identifiable data — stays on-prem
          </text>

          {/* Identifier items */}
          {identifiers.map((label, i) => {
            const itemY = vaultY + 130 + i * 52;
            return (
              <g key={label}>
                <line
                  x1={vaultX + 24}
                  y1={itemY}
                  x2={vaultX + 40}
                  y2={itemY}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  opacity={0.5}
                />
                <text
                  x={vaultX + 50}
                  y={itemY + 4}
                  fontSize={13}
                  fill="currentColor"
                  opacity={0.9}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>

        {/* PIPE with filter */}
        <g>
          {/* De-identify label */}
          <text
            x={(pipeLeft + pipeRight) / 2}
            y={pipeY - 34}
            textAnchor="middle"
            fontSize={12}
            fontWeight={700}
            style={{ fill: "var(--color-accent)" }}
          >
            De-identify
          </text>

          {/* Pipe body — two parallel lines */}
          <line
            x1={pipeLeft}
            y1={pipeTop}
            x2={pipeRight}
            y2={pipeTop}
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <line
            x1={pipeLeft}
            y1={pipeBot}
            x2={pipeRight}
            y2={pipeBot}
            stroke="currentColor"
            strokeWidth={1.5}
          />

          {/* Filter housing */}
          <rect
            x={filterLeft}
            y={pipeTop - 4}
            width={filterRight - filterLeft}
            height={pipeBot - pipeTop + 8}
            fill="var(--color-bg-light)"
            style={{ stroke: "var(--color-accent)" }}
            strokeWidth={1.75}
            rx={4}
          />

          {/* Mesh lines — vertical */}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={i}
              x1={filterLeft + 10 + i * 10}
              y1={pipeTop - 1}
              x2={filterLeft + 10 + i * 10}
              y2={pipeBot + 1}
              style={{ stroke: "var(--color-accent)" }}
              strokeWidth={1}
              opacity={0.55}
            />
          ))}

          {/* Arrow head entering the cloud */}
          <line
            x1={filterRight}
            y1={pipeY}
            x2={pipeRight - 2}
            y2={pipeY}
            stroke="currentColor"
            strokeWidth={2}
            markerEnd="url(#fw-arrow-current)"
          />
        </g>

        {/* RIGHT — cloud (dashed outline + cloud emblem) */}
        <g>
          <rect
            x={cloudX}
            y={cloudY}
            width={cloudW}
            height={cloudH}
            rx={10}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeDasharray="6 5"
            opacity={0.85}
          />

          {/* Cloud emblem — top-right */}
          <g transform={`translate(${cloudX + cloudW - 70}, ${cloudY + 30})`}>
            <path
              d="M 6 14 C -2 14 -2 4 6 3 C 7 -5 21 -7 25 1 C 29 -6 44 -3 43 6 C 50 6 50 14 44 14 Z"
              fill="var(--color-bg-light)"
              style={{ stroke: "var(--color-accent)" }}
              strokeWidth={1.75}
              strokeLinejoin="round"
            />
          </g>

          {/* Heading */}
          <text
            x={cloudX + 24}
            y={cloudY + 40}
            fontSize={15}
            fontWeight={700}
            fill="currentColor"
          >
            Saltare cloud
          </text>
          <text
            x={cloudX + 24}
            y={cloudY + 60}
            fontSize={11}
            fill="currentColor"
            opacity={0.7}
          >
            De-identified clinical signals
          </text>

          {/* Signal items */}
          {signals.map((label, i) => {
            const itemY = cloudY + 130 + i * 52;
            return (
              <g key={label}>
                <line
                  x1={cloudX + 24}
                  y1={itemY}
                  x2={cloudX + 40}
                  y2={itemY}
                  style={{ stroke: "var(--color-accent)" }}
                  strokeWidth={1.75}
                />
                <text
                  x={cloudX + 50}
                  y={itemY + 4}
                  fontSize={13}
                  fill="currentColor"
                  fontWeight={500}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
