// Owned by Section Builder A. Do not edit from other agents.
import { Reveal } from "@/components/motion/reveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="section-dark relative min-h-screen flex items-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-[60vh] w-[60vw] max-w-[900px] rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(closest-side, var(--color-accent-soft), transparent 70%)",
          }}
        />
      </div>

      <div className="container-narrow relative z-10 w-full py-24">
        <Reveal delay={0}>
          <p
            className="eyebrow"
            style={{ color: "var(--color-accent-on-dark)" }}
          >
            Saltare Health
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="display-xl mt-6 max-w-[16ch]">
            Catch the patient before the clinicians have time to.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            className="mt-8 max-w-[720px]"
            style={{
              color: "var(--color-fg-muted-on-dark)",
              fontSize: "var(--text-body-lg)",
              lineHeight: 1.5,
            }}
          >
            The platform identifies ECMO-eligible patients at community
            hospitals and routes them to high-volume centers before the
            bedside team recognizes it themselves.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-opacity hover:opacity-90"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-fg-on-dark)",
              }}
            >
              Partner with us
            </a>
            <a
              href="#workflow"
              className="inline-flex items-center gap-2 text-sm hover:underline"
              style={{ color: "var(--color-fg-on-dark)" }}
            >
              See how it works
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
