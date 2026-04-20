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

## Known limitations this session

- **Playwright MCP** won't activate until a Claude Code restart, so I can't do automated visual QA in this session. You'll review the Vercel preview URL in a browser instead, or we do Playwright-based QA in a follow-up session.
- **Superpowers plugin** also activates on restart; its skills aren't available here. We don't need them for this build.

## Rough time/token budget

This is a multi-hour build involving ~15 React components, custom SVG diagrams, Tailwind styling, animation polish, a form + API route, and deployment. I'll work in phases, commit each phase, and show you the preview URL after the first deploy so you can redirect if the direction is off.

## First-phase deliverable (before asking for more decisions)

Scaffold + hero + gap + workflow sections + nav + footer + contact stub, deployed to a Vercel preview URL. You review. We iterate from there.
