// Owned by Section Builder B. Do not edit from other agents.
import { Reveal } from "@/components/motion/reveal";
import WhyNowTimeline from "@/components/diagrams/why-now-timeline";

export default function WhyNow() {
  return (
    <section
      id="why-now"
      className="section-light min-h-screen flex items-center"
    >
      <div className="container-narrow w-full py-24">
        <Reveal delay={0}>
          <p
            className="eyebrow"
            style={{ color: "var(--color-accent)" }}
          >
            Why now
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="display-lg mt-6 max-w-[18ch]"
            style={{ color: "var(--color-fg-on-light)" }}
          >
            The regulatory window just opened.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-16 w-full">
            <WhyNowTimeline />
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p
            className="mt-16 mx-auto max-w-[56ch] text-center"
            style={{
              color: "var(--color-fg-muted-on-light)",
              fontSize: "var(--text-body-lg)",
              lineHeight: 1.5,
            }}
          >
            A company building this in 2019 had no legal path. A company
            building it in 2030 is competing for ground already taken.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
