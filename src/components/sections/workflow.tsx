"use client";

// Owned by Section Builder B. Do not edit from other agents.
import { Reveal } from "@/components/motion/reveal";
import WorkflowDiagram from "@/components/diagrams/workflow-diagram";

type Step = {
  number: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Continuous surveillance",
    body: "Reads the EHR in the community hospital, applies published ELSO, Berlin ARDS, and SCAI criteria.",
  },
  {
    number: "02",
    title: "Clinical confirmation",
    body: "Saltare's board-certified intensivist confirms. The community physician is never paged speculatively.",
  },
  {
    number: "03",
    title: "Coordinated transfer + repatriation",
    body: "Confirmed bed before the call. The patient returns for step-down and rehab.",
  },
];

export default function Workflow() {
  return (
    <section
      id="workflow"
      className="section-dark min-h-screen flex items-center"
    >
      <div className="container-narrow w-full py-24">
        <Reveal delay={0}>
          <p
            className="eyebrow"
            style={{ color: "var(--color-accent)" }}
          >
            How Saltare works
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="display-lg mt-6 max-w-[20ch]">
            Three steps, one clinical workflow.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-16 w-full">
            <WorkflowDiagram />
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={0.08 * i}>
              <div
                className="h-full rounded-lg"
                style={{
                  border: "1px solid var(--color-border-on-dark)",
                  padding: "24px",
                }}
              >
                <p
                  className="eyebrow"
                  style={{ color: "var(--color-accent)" }}
                >
                  {step.number}
                </p>
                <h3
                  className="mt-4 font-semibold"
                  style={{
                    fontSize: "var(--text-body-lg)",
                    color: "var(--color-fg-on-dark)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3"
                  style={{
                    color: "var(--color-fg-muted-on-dark)",
                    fontSize: "var(--text-body)",
                    lineHeight: 1.5,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
