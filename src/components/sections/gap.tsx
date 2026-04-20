// Owned by Section Builder A. Do not edit from other agents.
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";

type Tile = {
  stat: string;
  label: string;
};

const tiles: Tile[] = [
  { stat: "48%", label: "of ICUs have no intensivist coverage" },
  { stat: "16.5%", label: "average ICU nurse turnover" },
];

export default function Gap() {
  return (
    <section
      id="gap"
      className="section-warm min-h-screen flex items-center"
    >
      <div className="container-narrow w-full py-24">
        <Reveal delay={0}>
          <p
            className="eyebrow"
            style={{ color: "var(--color-accent)" }}
          >
            The gap
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 items-end">
            <div>
              <div
                className="display-lg leading-none"
                style={{ color: "var(--color-accent)" }}
              >
                <CountUp value={1000000} />
              </div>
              <p
                className="mt-4"
                style={{
                  color: "var(--color-fg-muted-on-light)",
                  fontSize: "var(--text-body-lg)",
                }}
              >
                adults per year meet ECMO criteria
              </p>
            </div>

            <div>
              <div
                className="display-lg leading-none"
                style={{ color: "var(--color-fg-muted-on-light)" }}
              >
                <CountUp value={10000} />
              </div>
              <p
                className="mt-4"
                style={{
                  color: "var(--color-fg-muted-on-light)",
                  fontSize: "var(--text-body-lg)",
                }}
              >
                receive it
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            className="display-md mt-20 text-center mx-auto max-w-[24ch]"
            style={{ color: "var(--color-fg-on-light)" }}
          >
            The barrier is not clinical knowledge. It is recognition timing
            at the bedside.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {tiles.map((tile) => (
              <div
                key={tile.stat}
                className="rounded-lg p-6"
                style={{
                  border:
                    "1px solid var(--color-border-on-light)",
                  background: "var(--color-accent-soft)",
                }}
              >
                <div
                  className="display-md"
                  style={{ color: "var(--color-accent)" }}
                >
                  {tile.stat}
                </div>
                <p
                  className="mt-3"
                  style={{
                    color: "var(--color-fg-muted-on-light)",
                    fontSize: "var(--text-body)",
                  }}
                >
                  {tile.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
