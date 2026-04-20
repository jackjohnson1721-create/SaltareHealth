// Owned by Section Builder C. Do not edit from other agents.
import { Reveal } from "@/components/motion/reveal";

type Card = {
  title: string;
  body: string;
};

const cards: Card[] = [
  {
    title: "Financial",
    body: "Early transfer plus repatriation converts a loss under the post-acute-care-transfer rule into a margin-positive encounter.",
  },
  {
    title: "Liability",
    body: "A documented surveillance and transfer process is a defense, not an exposure.",
  },
  {
    title: "Autonomy",
    body: "Five-minute off switch. Single-purpose data use. No solicitation clauses. Joint governance seat.",
  },
];

export default function CommunityValue() {
  return (
    <section
      id="community-value"
      className="section-dark min-h-screen flex items-center"
    >
      <div className="container-narrow w-full py-24">
        <Reveal delay={0}>
          <p
            className="eyebrow"
            style={{ color: "var(--color-accent-on-dark)" }}
          >
            For community hospitals
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="display-lg mt-6 max-w-[20ch]"
            style={{ color: "var(--color-fg-on-dark)" }}
          >
            Your patient, your margin, your autonomy.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={0.08 * i}>
              <article
                className="h-full rounded-xl border p-6 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "var(--color-border-on-dark)",
                  background: "var(--color-bg-dark)",
                }}
              >
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-fg-on-dark)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-3"
                  style={{
                    color: "var(--color-fg-muted-on-dark)",
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
