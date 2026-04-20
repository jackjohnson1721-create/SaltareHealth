"use client";

// Owned by Section Builder B. Do not edit from other agents.
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";

type PairedStat = {
  positive: number;
  negative: number;
  label: string;
};

type SoloStat = {
  value: number;
  label: string;
};

const pairedStats: PairedStat[] = [
  {
    positive: 35,
    negative: 46,
    label: "sixty-day mortality — EOLIA, severe ARDS",
  },
  {
    positive: 43,
    negative: 7,
    label: "survival to discharge — ARREST, refractory cardiac arrest",
  },
];

const soloStat: SoloStat = {
  value: 39,
  label:
    "mortality reduction at ECMO centers performing >30 cases/year (Barbaro et al., ELSO Registry)",
};

export default function Outcomes() {
  return (
    <section
      id="outcomes"
      className="section-dark min-h-screen flex items-center"
    >
      <div className="container-narrow w-full py-24">
        <Reveal delay={0}>
          <p
            className="eyebrow"
            style={{ color: "var(--color-accent)" }}
          >
            Outcomes that matter
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="display-lg mt-6 max-w-[22ch]">
            The evidence is settled. The platform closes the delivery gap.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-10">
          {pairedStats.map((pair, i) => (
            <Reveal key={pair.label} delay={0.08 * i}>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span
                    className="display-md"
                    style={{ color: "var(--color-accent)" }}
                  >
                    <CountUp value={pair.positive} suffix="%" />
                  </span>
                  <span
                    className="eyebrow"
                    style={{ color: "var(--color-fg-muted-on-dark)" }}
                  >
                    vs
                  </span>
                  <span
                    className="display-md"
                    style={{ color: "var(--color-fg-muted-on-dark)" }}
                  >
                    <CountUp value={pair.negative} suffix="%" />
                  </span>
                </div>
                <p
                  className="mt-4"
                  style={{
                    color: "var(--color-fg-muted-on-dark)",
                    fontSize: "var(--text-body)",
                    lineHeight: 1.5,
                  }}
                >
                  {pair.label}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.16}>
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span
                  className="display-md"
                  style={{ color: "var(--color-accent)" }}
                >
                  <CountUp value={soloStat.value} suffix="%" />
                </span>
              </div>
              <p
                className="mt-4"
                style={{
                  color: "var(--color-fg-muted-on-dark)",
                  fontSize: "var(--text-body)",
                  lineHeight: 1.5,
                }}
              >
                {soloStat.label}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.32}>
          <p
            className="mt-16"
            style={{
              color: "var(--color-fg-muted-on-dark)",
              fontSize: "var(--text-eyebrow)",
              letterSpacing: "0.02em",
            }}
          >
            Sources: EOLIA (NEJM 2018); ARREST (Lancet 2020); Barbaro et al.,
            ELSO Registry.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
