"use client";

// Owned by Backend. Do not edit from other agents.
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/reveal";

type InquiryType = "Investor" | "Health system" | "Clinical partner" | "Other";

const INQUIRY_OPTIONS: InquiryType[] = [
  "Investor",
  "Health system",
  "Clinical partner",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("Investor");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    // Minimal client-side validation; server is the real validator.
    if (
      !name.trim() ||
      !organization.trim() ||
      !role.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    if (!email.includes("@")) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          organization,
          role,
          email,
          message,
          inquiryType,
          website,
        }),
      });

      let data: { ok?: boolean } = {};
      try {
        data = await res.json();
      } catch {}

      if (res.ok && data.ok === true) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(
          "Something went wrong. Please try again or email us directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Something went wrong. Please try again or email us directly."
      );
    }
  }

  const labelClass = "eyebrow block mb-2";
  const labelStyle = { color: "var(--color-fg-muted-on-dark)" } as const;
  const inputClass =
    "w-full rounded-md bg-transparent px-4 py-3 outline-none focus:ring-2 transition";
  const inputBorder = "rgba(255, 255, 255, 0.24)";
  const inputStyle = {
    border: `1px solid ${inputBorder}`,
    color: "var(--color-fg-on-dark)",
  } as React.CSSProperties;

  function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.boxShadow = `0 0 0 2px var(--color-accent)`;
    e.currentTarget.style.borderColor = "var(--color-accent)";
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.borderColor = inputBorder;
  }

  return (
    <section
      id="contact"
      className="section-dark min-h-screen flex items-center py-24"
    >
      <div className="container-narrow w-full">
        <Reveal delay={0}>
          <p className="eyebrow" style={{ color: "var(--color-accent-on-dark)" }}>
            Contact
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="display-lg mt-6 max-w-[16ch]">Partner with us.</h2>
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
            Health systems, clinical partners, and mission-aligned investors —
            we respond within two business days.
          </p>
        </Reveal>

        <div className="mt-16">
          {status === "success" ? (
            <Reveal delay={0}>
              <div
                className="flex min-h-[320px] items-center justify-center text-center"
                style={{ color: "var(--color-fg-on-dark)" }}
              >
                <p
                  className="max-w-[40ch]"
                  style={{
                    fontSize: "var(--text-body-lg)",
                    lineHeight: 1.5,
                  }}
                >
                  We&apos;ll be in touch within two business days. — The Saltare
                  team
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.24}>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="w-full max-w-[880px]"
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-10000px",
                    top: "auto",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <fieldset className="mb-8">
                  <legend className={labelClass} style={labelStyle}>
                    I am a…
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_OPTIONS.map((opt) => {
                      const selected = inquiryType === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setInquiryType(opt)}
                          aria-pressed={selected}
                          className="rounded-full px-4 py-2 text-sm transition"
                          style={{
                            border: "1px solid var(--color-border-on-dark)",
                            background: selected
                              ? "var(--color-accent)"
                              : "transparent",
                            color: "var(--color-fg-on-dark)",
                            borderColor: selected
                              ? "var(--color-accent)"
                              : "var(--color-border-on-dark)",
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass} style={labelStyle}>
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      className={inputClass}
                      style={inputStyle}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="organization"
                      className={labelClass}
                      style={labelStyle}
                    >
                      Organization
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      required
                      maxLength={150}
                      className={inputClass}
                      style={inputStyle}
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      autoComplete="organization"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className={labelClass} style={labelStyle}>
                      Role
                    </label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      required
                      maxLength={100}
                      className={inputClass}
                      style={inputStyle}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      autoComplete="organization-title"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass} style={labelStyle}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      className={inputClass}
                      style={inputStyle}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className={labelClass} style={labelStyle}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={2000}
                    rows={5}
                    className={inputClass}
                    style={{ ...inputStyle, resize: "vertical" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                <div className="mt-8 flex flex-col items-start gap-3">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-full px-6 py-3 font-medium transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "var(--color-accent)",
                      color: "var(--color-fg-on-dark)",
                    }}
                  >
                    {status === "sending" ? "Sending…" : "Send"}
                  </button>
                  {status === "error" && errorMsg ? (
                    <p
                      role="alert"
                      className="text-sm"
                      style={{ color: "#FF5A5A" }}
                    >
                      {errorMsg}
                    </p>
                  ) : null}
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
