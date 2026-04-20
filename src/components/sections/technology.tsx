"use client";

// Owned by Section Builder C. Do not edit from other agents.
import { Reveal } from "@/components/motion/reveal";
import FirewallDiagram from "@/components/diagrams/firewall-diagram";

type Bullet = {
  title: string;
  body: string;
};

const bullets: Bullet[] = [
  {
    title: "HIPAA minimum necessary",
    body: "No data leaves the community hospital that is not required for the specific clinical decision.",
  },
  {
    title: "On-prem agent",
    body: "The surveillance container runs inside the community hospital's network. It does not phone home with identifiers.",
  },
  {
    title: "Tamper-evident audit log",
    body: "Every query, every decision, every transfer is recorded in Azure Confidential Ledger.",
  },
  {
    title: "Azure Confidential Ledger",
    body: "Blockchain-backed, append-only, cryptographically verifiable by the hospital.",
  },
  {
    title: "Five-minute shutdown",
    body: "The hospital can revoke access unilaterally without involving Saltare engineering.",
  },
];

export default function Technology() {
  return (
    <section
      id="technology"
      className="section-light min-h-screen flex items-center"
    >
      <div className="container-narrow w-full py-24">
        <Reveal delay={0}>
          <p
            className="eyebrow"
            style={{ color: "var(--color-accent)" }}
          >
            Technology & privacy
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="display-lg mt-6 max-w-[18ch]"
            style={{ color: "var(--color-fg-on-light)" }}
          >
            We cannot lose what we never had.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            className="mt-8 max-w-[720px]"
            style={{
              color: "var(--color-fg-muted-on-light)",
              fontSize: "var(--text-body-lg)",
              lineHeight: 1.5,
            }}
          >
            Data that enters the Saltare cloud is separated from data that
            identifies the patient. The firewall is architectural, not
            administrative.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-16 w-full">
            <FirewallDiagram />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            {bullets.map((bullet) => (
              <li
                key={bullet.title}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--color-border-on-light)" }}
              >
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-fg-on-light)" }}
                >
                  {bullet.title}
                </p>
                <p
                  className="mt-2"
                  style={{
                    color: "var(--color-fg-muted-on-light)",
                    fontSize: "var(--text-body)",
                    lineHeight: 1.5,
                  }}
                >
                  {bullet.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
