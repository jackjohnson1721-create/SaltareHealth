"use client";

// Owned by Section Builder C. Do not edit from other agents.
import { Reveal } from "@/components/motion/reveal";

type Card = {
  title: string;
  body: string;
};

const cards: Card[] = [
  {
    title: "Volume above proficiency",
    body: "Consistent case flow above the 30-case-per-year ECMO proficiency threshold documented by Barbaro et al.",
  },
  {
    title: "A defensible pipeline",
    body: "Clinically appropriate cases identified by published criteria — not referral-relationship lobbying.",
  },
  {
    title: "Pays for itself on case one",
    body: "Subscription economics designed so a single incremental ECMO case covers the platform cost for the year.",
  },
];

export default function CmcValue() {
  return (
    <section
      id="cmc-value"
      className="section-light min-h-screen flex items-center"
    >
      <div className="container-narrow w-full py-24">
        <Reveal delay={0}>
          <p
            className="eyebrow"
            style={{ color: "var(--color-accent)" }}
          >
            For Complex Medical Centers
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="display-lg mt-6 max-w-[22ch]"
            style={{ color: "var(--color-fg-on-light)" }}
          >
            Program volume. Pipeline quality. Paid for on the first case.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={0.08 * i}>
              <article
                className="h-full rounded-xl border p-6 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "var(--color-border-on-light)",
                  background: "var(--color-bg-light)",
                }}
              >
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-fg-on-light)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-3"
                  style={{
                    color: "var(--color-fg-muted-on-light)",
                    fontSize: "var(--text-body)",
                    lineHeight: 1.5,
                  }}
                >
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
