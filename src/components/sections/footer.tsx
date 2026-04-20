// Owned by Integrator. Do not edit from other agents.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="section-dark border-t"
      style={{ borderColor: "var(--color-border-on-dark)" }}
    >
      <div className="container-narrow flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <p
          className="text-sm font-semibold tracking-tight"
          style={{ color: "var(--color-fg-on-dark)" }}
        >
          Saltare Health
        </p>
        <p
          className="max-w-[64ch] text-xs leading-relaxed"
          style={{ color: "var(--color-fg-muted-on-dark)" }}
        >
          This site is informational and does not constitute an offer to sell
          or a solicitation of an offer to buy any securities.
        </p>
        <p
          className="text-xs"
          style={{ color: "var(--color-fg-muted-on-dark)" }}
        >
          © {year} Saltare Health
        </p>
      </div>
    </footer>
  );
}
