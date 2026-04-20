// Playwright QA runner for Saltare Health marketing site.
// Uses global playwright install at /opt/node22/lib/node_modules/playwright.
import { createRequire } from "module";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const require = createRequire(import.meta.url);
const { chromium } = require("/opt/node22/lib/node_modules/playwright");

const BASE = "http://localhost:3000";
const QA_DIR = "/home/user/SaltareHealth/qa";
const SHOTS = path.join(QA_DIR, "screenshots");

const DEV_NOISE_PATTERNS = [
  /React DevTools/i,
  /Download the React DevTools/i,
  /\[Fast Refresh\]/i,
  /Fast Refresh/i,
  /hot[- ]reload/i,
  /sourcemap/i,
  /source map/i,
  /webpack-hmr/i,
  /HMR/i,
  /\[webpack\]/i,
  /\[HMR\]/i,
  /\[next-auth\]/i,
  /\[next\]/i,
];

function isDevNoise(msg) {
  return DEV_NOISE_PATTERNS.some((re) => re.test(msg));
}

function isFaviconUrl(u) {
  return /favicon|apple-touch-icon|icon\.(png|svg|ico)/i.test(u);
}

async function main() {
  await mkdir(SHOTS, { recursive: true });

  const results = {
    started: new Date().toISOString(),
    tests: {},
  };

  const browser = await chromium.launch({ headless: true });
  // =====================
  // 1. HTTP + console + network health (desktop default)
  // =====================
  const ctxMain = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const pageMain = await ctxMain.newPage();

  const consoleMessages = [];
  pageMain.on("console", (m) => {
    try {
      consoleMessages.push({ type: m.type(), text: m.text() });
    } catch {}
  });
  const pageErrors = [];
  pageMain.on("pageerror", (err) => {
    pageErrors.push(String(err));
  });
  const networkRequests = [];
  pageMain.on("response", async (res) => {
    try {
      networkRequests.push({
        url: res.url(),
        status: res.status(),
        method: res.request().method(),
      });
    } catch {}
  });

  const resp = await pageMain.goto(BASE, { waitUntil: "networkidle" });
  const initialStatus = resp ? resp.status() : 0;

  // Let the page settle
  await pageMain.waitForTimeout(800);

  const filteredErrors = consoleMessages.filter(
    (m) => m.type === "error" && !isDevNoise(m.text)
  );
  const allErrors = consoleMessages.filter((m) => m.type === "error");
  const badNetwork = networkRequests.filter(
    (r) => r.status >= 400 && !isFaviconUrl(r.url)
  );
  const faviconBad = networkRequests.filter(
    (r) => r.status >= 400 && isFaviconUrl(r.url)
  );
  results.tests.health = {
    initialStatus,
    consoleErrorCount: filteredErrors.length,
    consoleErrors: filteredErrors.slice(0, 20),
    pageErrors,
    badNetwork,
    faviconBad,
    pass:
      initialStatus === 200 &&
      filteredErrors.length === 0 &&
      pageErrors.length === 0 &&
      badNetwork.length === 0,
  };

  // =====================
  // 2. Three-viewport full-page screenshots
  // =====================
  results.tests.screenshots = { viewports: {} };
  const viewports = [
    { name: "mobile", width: 390, height: 844 },
    { name: "tablet", width: 834, height: 1194 },
    { name: "desktop", width: 1440, height: 900 },
  ];
  for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    // Let animations settle
    await p.waitForTimeout(1500);
    const out = path.join(SHOTS, `${vp.name}.png`);
    await p.screenshot({ path: out, fullPage: true });
    results.tests.screenshots.viewports[vp.name] = { path: out, ok: true };
    await ctx.close();
  }
  results.tests.screenshots.pass = true;

  // =====================
  // 3. Nav anchors (desktop)
  // =====================
  const navTargets = [
    "gap",
    "workflow",
    "why-now",
    "outcomes",
    "cmc-value",
    "community-value",
    "technology",
  ];
  results.tests.navAnchors = { details: [] };
  // Use dedicated context so no leftover scroll state
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.waitForTimeout(800);
    for (const target of navTargets) {
      // scroll to top first
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.waitForTimeout(200);
      // Click the nav link in the header (desktop nav is visible at 1440)
      const link = p.locator(`header a[href="#${target}"]`).first();
      const exists = (await link.count()) > 0;
      if (!exists) {
        results.tests.navAnchors.details.push({
          target,
          pass: false,
          reason: "Nav link not found",
        });
        continue;
      }
      try {
        await link.click();
      } catch (e) {
        results.tests.navAnchors.details.push({
          target,
          pass: false,
          reason: "Click failed: " + String(e),
        });
        continue;
      }
      await p.waitForTimeout(700);
      const info = await p.evaluate((id) => {
        const el = document.getElementById(id);
        if (!el) return { exists: false };
        const r = el.getBoundingClientRect();
        return {
          exists: true,
          top: r.top,
          scrollY: window.scrollY,
        };
      }, target);
      const pass =
        info.exists &&
        info.scrollY > 0 &&
        Math.abs(info.top) <= 150;
      results.tests.navAnchors.details.push({
        target,
        pass,
        top: info.top,
        scrollY: info.scrollY,
        exists: info.exists,
      });
    }
    await ctx.close();
  }
  results.tests.navAnchors.pass = results.tests.navAnchors.details.every(
    (d) => d.pass
  );

  // =====================
  // 4. Contact form happy path
  // =====================
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    const apiRequests = [];
    p.on("response", async (r) => {
      if (r.url().includes("/api/contact")) {
        apiRequests.push({ url: r.url(), status: r.status() });
      }
    });
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.evaluate(() => document.getElementById("contact")?.scrollIntoView());
    await p.waitForTimeout(500);

    await p.fill("#name", "Jane Doe");
    await p.fill("#organization", "Test Health System");
    await p.fill("#role", "Chief Medical Officer");
    await p.fill("#email", "jane@test.health");
    await p.fill("#message", "Reaching out to partner with Saltare.");
    // Click the "Clinical partner" segmented option
    await p.locator('button[aria-pressed]:has-text("Clinical partner")').click();

    // Submit
    await p.locator('button[type="submit"]').click();

    let successVisible = false;
    let successText = "";
    try {
      const succ = p.locator("text=We'll be in touch within two business days.");
      await succ.waitFor({ timeout: 6000 });
      successVisible = true;
      successText = (await succ.first().textContent()) || "";
    } catch {
      successVisible = false;
    }
    results.tests.contactHappy = {
      apiRequests,
      successVisible,
      successText: successText.trim(),
      pass: successVisible && apiRequests.some((r) => r.status === 200),
    };
    await ctx.close();
  }

  // =====================
  // 5. Contact form email validation
  // =====================
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.evaluate(() => document.getElementById("contact")?.scrollIntoView());
    await p.waitForTimeout(500);

    await p.fill("#name", "Jane Doe");
    await p.fill("#organization", "Test Health System");
    await p.fill("#role", "CMO");
    await p.fill("#email", "not-an-email");
    await p.fill("#message", "bad email test");

    // Intercept whether /api/contact is hit
    let apiHit = false;
    p.on("request", (req) => {
      if (req.url().includes("/api/contact")) apiHit = true;
    });

    await p.locator('button[type="submit"]').click();
    await p.waitForTimeout(800);

    // The form uses noValidate so the browser native validation is disabled.
    // The client-side `!email.includes('@')` check should fail -> error state.
    // But email contains no `@`, so we expect "Please enter a valid email address."
    const errorLocator = p.locator('[role="alert"]');
    const hasError = (await errorLocator.count()) > 0;
    const errorText = hasError ? (await errorLocator.first().textContent()) || "" : "";

    // Also check that the success state did NOT appear
    const successLocator = p.locator("text=We'll be in touch within two business days.");
    const successAppeared = (await successLocator.count()) > 0;

    // Determine which path blocked: native validation would usually prevent submission;
    // with noValidate=true, client-side check fires.
    let path_ = "unknown";
    if (!apiHit && hasError && errorText.includes("valid email address")) {
      path_ = "client-side check (noValidate is set on form)";
    } else if (!apiHit && !hasError) {
      path_ = "native browser validation (form not submitted)";
    } else if (apiHit) {
      path_ = "request was made (server-side validation)";
    }
    results.tests.emailValidation = {
      apiHit,
      hasError,
      errorText: errorText.trim(),
      successAppeared,
      path: path_,
      pass: !successAppeared && (hasError || !apiHit),
    };
    await ctx.close();
  }

  // =====================
  // 6. Reduced motion
  // =====================
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.waitForTimeout(1200);

    // Check the matchMedia value
    const mm = await p.evaluate(() =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    // With reduced motion, the Reveal component bypasses framer-motion and renders
    // children inside a plain <Component>. Verify: selected reveal nodes have
    // computed opacity 1 and no transform (no initial animation applied).
    // We check a few known hero+section elements by sampling several <p>/<h2> at top.
    const sampleData = await p.evaluate(() => {
      const sections = [
        "hero",
        "gap",
        "workflow",
        "why-now",
        "outcomes",
        "cmc-value",
        "community-value",
        "technology",
        "contact",
      ];
      const results = [];
      for (const id of sections) {
        const sec = document.getElementById(id);
        if (!sec) {
          results.push({ id, exists: false });
          continue;
        }
        // Find an eyebrow or heading inside the section
        const candidate =
          sec.querySelector(".eyebrow, h1, h2, p");
        if (!candidate) {
          results.push({ id, exists: true, sampled: false });
          continue;
        }
        const cs = window.getComputedStyle(candidate);
        results.push({
          id,
          exists: true,
          sampled: true,
          tag: candidate.tagName,
          opacity: cs.opacity,
          transform: cs.transform,
          transition: cs.transition,
        });
      }
      return results;
    });

    // Pass criteria: matches=true AND all sampled have opacity === '1'
    const sampled = sampleData.filter((s) => s.sampled);
    const allOpaque = sampled.every((s) => parseFloat(s.opacity) === 1);
    // Transform should be 'none' or identity matrix (no Y translation)
    const noTransforms = sampled.every(
      (s) =>
        s.transform === "none" ||
        s.transform === "matrix(1, 0, 0, 1, 0, 0)"
    );

    await p.screenshot({
      path: path.join(SHOTS, "reduced-motion.png"),
      fullPage: false,
    });

    results.tests.reducedMotion = {
      matchMediaMatches: mm,
      sampleData,
      allOpaque,
      noTransforms,
      pass: mm && allOpaque && noTransforms,
    };
    await ctx.close();
  }

  // =====================
  // 7. axe-core accessibility
  // =====================
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    await p.waitForTimeout(1500);
    // Inject axe-core from local node_modules (CDN blocked by allowlist)
    await p.addScriptTag({
      path: "/home/user/SaltareHealth/node_modules/axe-core/axe.min.js",
    });
    const axeResult = await p.evaluate(async () => {
      // @ts-ignore
      const res = await axe.run(document, {
        resultTypes: ["violations"],
      });
      return {
        violations: res.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          helpUrl: v.helpUrl,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            html: n.html.slice(0, 200),
          })),
        })),
      };
    });
    const seriousCritical = axeResult.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );
    results.tests.axe = {
      totalViolations: axeResult.violations.length,
      seriousCriticalCount: seriousCritical.length,
      seriousCritical,
      allViolations: axeResult.violations,
      pass: seriousCritical.length === 0,
    };
    await ctx.close();
  }

  await ctxMain.close();
  await browser.close();

  results.finished = new Date().toISOString();
  await writeFile(
    path.join(QA_DIR, "results.json"),
    JSON.stringify(results, null, 2)
  );
  console.log("DONE");
  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error("QA runner failed:", err);
  process.exit(1);
});
