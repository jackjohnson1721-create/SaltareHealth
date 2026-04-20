# Saltare Health — Investor Website Plan

## Objective

Build a modern, Apple-inspired, public-facing marketing site for **Saltare Health** that sells the service (patient-to-program matching for ECMO-eligible patients) and doubles as an investor-friendly landing page. Deploy to Vercel at a production URL.

**Source material**: The seed investment memorandum you pasted. We will use the "public-friendly" parts — clinical problem, solution, why now, value to CMCs and community hospitals, technology, and a contact CTA. We will NOT publish: the specific raise size, use-of-funds table, 5-year financial projections with dollar figures per year, unit economics tables, competitive vendor names, or the detailed risks section. Those live in a gated data room if you want one later.

## Decisions already made

| Decision | Choice |
|---|---|
| Scope | Public marketing site that sells the service; soft on raise/financial specifics |
| Framework | Next.js 15 (App Router) + TypeScript + Tailwind v4 + Framer Motion |
| Components | shadcn/ui primitives where useful |
| Deployment | Vercel |
| Branding | Design from scratch, Apple-inspired |
| CTA | Investor/partnership contact form (no calendar embed, no gated data room for now) |

## Visual direction (Apple-inspired, not Apple-copied)

- **Typography**: Large, confident type. Geist or Inter with tight tracking on display sizes (80–140px hero); comfortable body at 17–19px.
- **Palette**: Near-black background (`#0A0A0B`) with pure white text on dark sections; pure white background with near-black text on light sections. **One** accent color: a saturated medical-grade blue (`#0066FF` range) used sparingly — CTA buttons, key stat highlights, inline emphasis. No gradients as the primary design mechanic; one or two subtle aurora/glow effects max.
- **Layout**: Alternating full-viewport sections, generous whitespace, centered content with a ~1200px max-width. Every section has a single idea.
- **Motion**: Subtle scroll-driven reveals (Framer Motion `whileInView`), number count-ups on key stats, parallax-light on hero. No gimmicks, no carousels.
- **Imagery**: No stock photography of patients or clinicians (HIPAA optics + generic stock reads as cheap). Instead: custom SVG diagrams for the workflow, the patient-identity firewall, and the regulatory timeline. Abstract geometric compositions for section dividers.
- **Density**: Error on the side of less content per screen. Each section gets 1–2 numbers, 1 headline, 2–3 sentences of body.

## Site structure

Single long-scroll page with a sticky, minimal top nav. Anchor links to each section.

1. **Hero** — full viewport
   - Eyebrow: "Saltare Health"
   - Headline: "Catch the patient before the clinicians have time to."
   - Sub: One sentence — the platform identifies ECMO-eligible patients at community hospitals and routes them to high-volume centers before the bedside team recognizes it themselves.
   - Primary CTA: "Partner with us" → contact form
   - Secondary link: "See how it works" → scrolls to workflow

2. **The gap** — the 1M vs. 10K stat
   - Giant number: **~1,000,000** adults per year meet ECMO criteria.
   - Counter-number: **~10,000** receive it.
   - One line: "The barrier is not clinical knowledge. It is recognition timing at the bedside."
   - Small supporting stat tiles: 48% of ICUs have no intensivist coverage; average ICU nurse turnover 16.5%.

3. **How Saltare works** — the 3-step workflow
   - Step 1: Continuous surveillance (reads EHR in the community hospital, applies published ELSO + Berlin ARDS + SCAI criteria)
   - Step 2: Clinical confirmation (Saltare's board-certified intensivist confirms; community physician is never paged speculatively)
   - Step 3: Coordinated transfer + repatriation (confirmed bed before the call; patient returns for step-down/rehab)
   - Animated 3-column diagram, each column reveals on scroll.

4. **Why now** — the regulatory window
   - Four pillars as a stacked timeline:
     - **2021** — VBE safe harbor (42 CFR 1001.952(ee)) makes the arrangement legal.
     - **2023** — Information Blocking Rule penalties active (up to $1M per violation).
     - **2024** — TEFCA/QHIN infrastructure reaches production scale.
     - **2025–2026** — Active enforcement across all three.
   - One line framing: "A company building this in 2019 had no legal path. A company building it in 2030 is competing for ground already taken."

5. **Outcomes that matter** — the clinical case
   - Two paired stats: **35% vs 46%** sixty-day mortality (EOLIA — severe ARDS) and **43% vs 7%** survival to discharge (ARREST — refractory cardiac arrest).
   - **39%** mortality reduction at ECMO centers performing >30 cases/year (Barbaro et al., ELSO Registry).
   - One line: "The evidence is settled. The platform closes the delivery gap."

6. **Value to Complex Medical Centers**
   - Three plain-spoken cards: Program volume above the 30-case proficiency threshold; A defensible pipeline of clinically appropriate cases; A subscription that pays for itself on the first incremental case.
   - No subscription tier table (that's data-room material).

7. **Value to community hospitals**
   - Three cards: Financial (early transfer + repatriation converts a loss to a margin under the post-acute-care-transfer rule); Liability (documented surveillance and transfer process is a defense); Autonomy (five-minute off switch, single-purpose data use, no solicitation clauses, joint governance seat).

8. **Technology & privacy**
   - Centerpiece: the **patient-identity firewall** diagram. Data that enters the Saltare cloud vs. data that never does. Emphasize: we cannot lose what we never had.
   - Supporting bullets: HIPAA minimum necessary, on-prem agent, tamper-evident audit log, Azure Confidential Ledger, five-minute shutdown.

9. **Contact** — investor/partnership inquiry form
   - Fields: Name, Organization, Role, Email, Message (plus an "I am a…" segmented control: Investor / Health system / Clinical partner / Other).
   - Submit posts to a Next.js Route Handler at `/api/contact`.
   - Backend behavior: validate with Zod, then email via Resend if `RESEND_API_KEY` is set in Vercel env; otherwise log to console and return success (dev fallback). I will add a clear `.env.example` so you know which env var to set on Vercel.
   - Success state: in-place message ("We'll be in touch within two business days. — The Saltare team").

10. **Footer**
    - Lightweight. Copyright, "Saltare Health", a one-line disclaimer that the site is informational and does not constitute an offer to sell securities (important for a company that's actively raising).

## File/component layout

```
src/
  app/
    layout.tsx                # root layout, font loading, metadata
    page.tsx                  # composes all sections
    globals.css               # Tailwind + CSS vars for palette
    api/contact/route.ts      # POST handler, Zod validation, Resend
  components/
    nav.tsx
    sections/
      hero.tsx
      gap.tsx
      workflow.tsx
      why-now.tsx
      outcomes.tsx
      cmc-value.tsx
      community-value.tsx
      technology.tsx
      contact.tsx
      footer.tsx
    ui/                       # shadcn primitives (button, input, textarea)
    motion/
      reveal.tsx              # shared whileInView fade-up wrapper
      count-up.tsx            # number count-up on scroll
    diagrams/
      workflow-diagram.tsx
      firewall-diagram.tsx
      why-now-timeline.tsx
  lib/
    cn.ts                     # tailwind-merge helper
public/
  favicon.svg                 # minimal S mark
.env.example                  # RESEND_API_KEY, CONTACT_TO_EMAIL
```

## Agent team strategy

The build is parallelizable: ~15 components, mostly disjoint files, with clear handoff points. Rather than a single linear pass by the main agent, dispatch a team of subagents in four batches, with quality-gate skills between them.

### Team composition

| Agent | Owns | Subagent type | Phase |
|---|---|---|---|
| Scaffolder | `package.json`, Tailwind v4 config, `src/app/layout.tsx`, `src/app/globals.css` (design tokens), `src/lib/cn.ts`, `src/components/motion/{reveal,count-up}.tsx`, `src/components/nav.tsx` skeleton | general-purpose | 1 — sequential, blocks all others |
| Section Builder A | `hero.tsx`, `gap.tsx` | general-purpose | 2 — parallel |
| Section Builder B | `workflow.tsx`, `why-now.tsx`, `outcomes.tsx` | general-purpose | 2 — parallel |
| Section Builder C | `cmc-value.tsx`, `community-value.tsx`, `technology.tsx` | general-purpose | 2 — parallel |
| Diagram Artist | `workflow-diagram.tsx`, `firewall-diagram.tsx`, `why-now-timeline.tsx` | general-purpose | 2 — parallel |
| Backend | `contact.tsx`, `src/app/api/contact/route.ts`, `.env.example` | general-purpose | 2 — parallel |
| Integrator | `src/app/page.tsx`, `footer.tsx`, runs `npm run build`, fixes type errors | main agent (no subagent) | 3 — sequential |
| Playwright QA | Runs against `npm run dev`; writes screenshots/report to `qa/` | general-purpose with playwright MCP | 4 — parallel |
| Deployer | Calls Vercel MCP `deploy_to_vercel` | main agent | 4 — parallel |

### Coordination rules

- **One source of truth for design tokens.** Scaffolder writes the palette, type scale, spacing, and motion easings as CSS custom properties in `globals.css` plus a typed `src/lib/tokens.ts` mirror. Section agents import or use the CSS vars. **No agent invents new colour or spacing values.**
- **No shared-file collisions by construction.** Each Section Builder owns a disjoint set of files. Only the Integrator touches `page.tsx`. Only the Scaffolder + Integrator touch `globals.css`. Worktree isolation is off — disjoint ownership makes it unnecessary and merging would waste a phase.
- **Self-contained briefs.** Each Section Builder gets: (a) the verbatim subsection of this plan as copy, (b) the file paths it owns, (c) the design-tokens contract (which CSS vars exist, which Tailwind utilities are blessed), (d) the motion convention (wrap blocks in `<Reveal>`; numbers use `<CountUp>`), (e) an explicit "do not touch" list. Briefs include enough context that the agent never needs to read PLAN.md or explore the repo.
- **No exploration agents.** Greenfield repo; nothing to discover. Subagents must not run Glob/Grep over an empty `src/`.

### Parallelization plan

- **Batch 1 — 1 agent, sequential.** Scaffolder. Output: a buildable Next.js 15 app with empty section files exporting placeholder components, design tokens established, nav skeleton in place. Verifies with `npm run build`.
- **Batch 2 — 5 agents, dispatched in a single message.** Section Builder A/B/C + Diagram Artist + Backend. Each writes only its own files.
- **Batch 3 — main agent, sequential.** Integrator wires section imports into `page.tsx`, adds the footer, runs `npm run build` and `npm run lint`, fixes any TypeScript or lint errors directly (does not re-dispatch).
- **Batch 4 — 2 agents, dispatched in a single message.** Playwright QA against the local dev server; Deployer pushes to a Vercel preview URL. Independent, so they parallelize cleanly.

### Quality gates (using already-loaded skills)

- After Batch 2, before Batch 3: invoke `/simplify` on the changed files to catch cross-section duplication, dead helpers, and over-abstraction.
- After Batch 3, before Batch 4: invoke `/security-review` scoped to `src/app/api/contact/route.ts` (Zod schema strictness, no email-header injection in the Resend payload, no env-var leakage in error responses, rate-limit consideration).
- After Batch 4, before requesting merge: invoke `/review` on the PR diff.

### Playwright QA contract

The Playwright QA agent verifies, against `http://localhost:3000`:

1. Root route returns 200; no console errors; no 4xx/5xx network requests on initial paint.
2. Three viewport screenshots saved to `qa/screenshots/{mobile,tablet,desktop}.png` at widths 390 / 834 / 1440.
3. Each nav anchor scrolls to its section and the target is within the viewport after scroll settles.
4. Contact form: submits successfully with valid input and shows the success state; rejects an obviously invalid email client-side or via API 400.
5. `prefers-reduced-motion: reduce` disables `<Reveal>` transitions (no transform/opacity tween applied).
6. axe-core injected via `browser_run_code` reports zero serious or critical violations.

Output: a one-page `qa/report.md` punch list. Pass = ship; fail = dispatch one fix agent per discrete punch-list item rather than re-running the whole pipeline.

### Failure handling

- If a Section Builder ships a token violation (inline hex, off-scale spacing, ad-hoc font weight), the Integrator rejects and re-prompts that one agent citing the specific lines.
- If Playwright finds a console error or layout break, file a single-line punch item and dispatch a targeted fix agent. Do not re-run upstream batches.
- If the Vercel deploy fails, the Deployer reads `get_deployment_build_logs` and either fixes locally and redeploys (build error) or surfaces the runtime issue back to the Integrator (runtime error).

## Content guardrails (what I will NOT put on the public site)

- Specific raise size ($2–4M)
- Use-of-funds percentages
- Year-by-year financial projections
- LTV/CAC figures
- Subscription tier price points
- Named competitive vendors
- The "what we do not yet know" risks section
- Any language that could read as a securities solicitation

Where a number appears on the public site, it's a *clinical* or *market-structure* number cited to a public source (EOLIA, ARREST, Barbaro/ELSO, Kaufman Hall, Sheps Center, CFR sections). The financial/raise story stays private.

## Deployment

1. Commit progress incrementally to `claude/implement-mcp-server-k2BkJ` (existing PR #1 — I'll rename the PR to reflect the new scope, or open a follow-up PR).
2. Deploy via Vercel MCP (`deploy_to_vercel`). This will give a production `*.vercel.app` URL.
3. After initial deploy, you can add a custom domain in the Vercel dashboard.
4. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` as Vercel env vars so the contact form works in prod.

## What I need from you to finish

- **Email destination** for contact-form submissions (e.g., `founders@saltarehealth.com`). If you don't have one yet, I'll stub it to log-only and you can add the env var later.
- **Resend API key** (or I'll use a free-tier-friendly alternative like Formspree with a stub). Optional at this stage.
- **Vercel account** — do you have an existing Vercel team/project I should deploy into, or should I create a new project under your Vercel account via the MCP? (The MCP deploy tool will ask for team/project targeting.)
- **Custom domain** — optional; the `*.vercel.app` preview URL works for initial review.

## Rough time/token budget

This is a multi-hour build involving ~15 React components, custom SVG diagrams, Tailwind styling, animation polish, a form + API route, and deployment. I'll work in phases, commit each phase, and show you the preview URL after the first deploy so you can redirect if the direction is off.

## First-phase deliverable (before asking for more decisions)

Scaffold + hero + gap + workflow sections + nav + footer + contact stub, deployed to a Vercel preview URL. You review. We iterate from there.
