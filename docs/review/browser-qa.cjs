const { chromium } = require("playwright");
const { expect } = require("playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const fs = require("node:fs");
const assert = require("node:assert/strict");
const base = process.argv[2] || "http://127.0.0.1:3003";
const path = require("node:path");
// Output is fixed inside the repository; CLI input cannot choose a filesystem path.
const dir = path.resolve(__dirname, "../../work/browser-qa");
fs.mkdirSync(dir, { recursive: true });
const results = {
  base,
  checks: [],
  screenshots: [],
  errors: [],
  routes: [],
  a11y: [],
};
async function browserGet(page, url) {
  const data = await page.evaluate(async (url) => {
    const response = await fetch(url);
    return { status: response.status, body: await response.text() };
  }, url);
  return { status: () => data.status, text: async () => data.body };
}
async function check(name, fn) {
  try {
    const detail = await fn();
    results.checks.push({ name, pass: true, detail });
    console.log("PASS", name, JSON.stringify(detail ?? ""));
  } catch (e) {
    results.checks.push({
      name,
      pass: false,
      error: e.message.split("Call log:")[0].trim(),
    });
    console.log("FAIL", name, e.message.split("Call log:")[0].trim());
  }
}
async function settleImages(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const step = Math.max(500, innerHeight - 100);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    await Promise.all(
      [...document.images].map((img) => img.decode().catch(() => {})),
    );
    scrollTo(0, 0);
  });
  await page.waitForTimeout(150);
}
async function shot(page, name, fullPage = false) {
  const file = `${dir}/${name}.png`;
  if (!fullPage) {
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(100);
  }
  await page.screenshot({ path: file, fullPage });
  results.screenshots.push(file);
}
async function a11y(page, name) {
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const violations = scan.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  }));
  results.a11y.push({ name, violations });
  assert.equal(violations.length, 0, JSON.stringify(violations));
}
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => results.errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle", timeout: 60000 });
  const total = await page.locator(".portfolio-project-grid .card").count();
  const hrefs = await page
    .locator('.portfolio-project-grid .card-actions a[href^="/work/"]')
    .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
  results.totalProjects = total;
  await check(
    "published catalog renders and zero remote previews load initially",
    async () => {
      assert(total > 0);
      assert.equal(await page.locator("iframe").count(), 0);
      return total;
    },
  );
  await check("keyboard skip link and theme controls", async () => {
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .locator(".skip-link")
        .evaluate((e) => e === document.activeElement),
      true,
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("main").evaluate((e) => e === document.activeElement),
      true,
    );
    await page
      .getByRole("button", { name: "Use dark theme", exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload({ waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page
      .getByRole("button", { name: "Use light theme", exact: true })
      .click();
  });
  await check(
    "project search, no results, reset and trimmed case-insensitive query",
    async () => {
      const search = page.getByRole("searchbox");
      await search.fill("  PEOPLELENS  ");
      await expect(page.locator(".portfolio-project-grid .card")).toHaveCount(
        1,
      );
      assert.match(
        await page.locator(".portfolio-project-grid").innerText(),
        /PeopleLens/,
      );
      await search.fill("no-such-project-unique");
      await expect(
        page.getByRole("heading", { name: "No matching projects" }),
      ).toHaveCount(1);
      await page.getByRole("button", { name: "Show all projects" }).click();
      await expect(page.locator(".portfolio-project-grid .card")).toHaveCount(
        total,
      );
    },
  );
  await check("every category filter and combined live filter", async () => {
    const buttons = page.locator(".portfolio-category-chip");
    const count = await buttons.count();
    for (let i = 1; i < count; i++) {
      await buttons.nth(i).click();
      await expect(buttons.nth(i)).toHaveAttribute("aria-pressed", "true");
      assert((await page.locator(".portfolio-project-grid .card").count()) > 0);
    }
    await buttons.first().click();
    await page.getByRole("checkbox", { name: "Live demos only" }).check();
    await expect(
      page.getByRole("checkbox", { name: "Live demos only" }),
    ).toBeChecked();
    await page.waitForTimeout(150);
    const live = await page.locator(".portfolio-project-grid .card").count();
    assert(live > 0);
    assert.equal(
      await page
        .locator(".portfolio-project-grid .card-actions a")
        .filter({ hasText: "Live demo" })
        .count(),
      live,
    );
    await page.getByRole("searchbox").fill("PeopleLens");
    await expect(
      page.getByRole("heading", { name: "No matching projects" }),
    ).toHaveCount(1);
    await page.getByRole("button", { name: "Show all projects" }).click();
    return { categories: count, live };
  });
  await check(
    "on-demand live preview opens/closes by keyboard and retains focus",
    async () => {
      const button = page.locator(".preview-button").first();
      await button.focus();
      await page.keyboard.press("Enter");
      await expect(button).toHaveAttribute("aria-expanded", "true");
      assert.equal(await page.locator("iframe").count(), 1);
      await page.keyboard.press("Enter");
      await expect(button).toHaveAttribute("aria-expanded", "false");
      assert.equal(await page.locator("iframe").count(), 0);
      assert.equal(
        await button.evaluate((e) => document.activeElement === e),
        true,
      );
    },
  );
  for (const [width, height] of [
    [1440, 900],
    [1024, 768],
    [768, 1024],
    [390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    for (const theme of ["light", "dark"]) {
      await page
        .getByRole("button", { name: `Use ${theme} theme`, exact: true })
        .click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await settleImages(page);
      await check(
        `home ${width}px ${theme}: overflow, images and accessibility`,
        async () => {
          const info = await page.evaluate(() => ({
            width: innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            broken: [...document.images]
              .filter((i) => !i.complete || !i.naturalWidth)
              .map((i) => i.src),
          }));
          assert(info.scrollWidth <= info.width);
          assert.deepEqual(info.broken, []);
          await a11y(page, `home-${width}-${theme}`);
          return info;
        },
      );
      await shot(page, `home-${width}-${theme}`);
      if (width === 1440 || width === 390)
        await shot(page, `home-${width}-${theme}-full`, true);
    }
  }
  for (const href of hrefs) {
    await check(`route ${href}`, async () => {
      const response = await browserGet(page, base + href);
      const body = await response.text();
      assert.equal(response.status(), 200);
      assert(!body.includes("<title>404:"));
      results.routes.push({ href, status: response.status() });
      return response.status();
    });
  }
  for (const slug of ["project-handoff-hub", "peoplelens"]) {
    await page.goto(`${base}/work/${slug}`, { waitUntil: "networkidle" });
    for (const [width, height] of [
      [1440, 900],
      [1024, 768],
      [768, 1024],
      [390, 844],
    ]) {
      await page.setViewportSize({ width, height });
      for (const theme of ["light", "dark"]) {
        await page
          .getByRole("button", { name: `Use ${theme} theme`, exact: true })
          .click();
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await settleImages(page);
        await check(
          `${slug} ${width}px ${theme}: media, architecture, accessibility`,
          async () => {
            assert.equal(await page.locator("#architecture").count(), 1);
            const info = await page.evaluate(() => ({
              width: innerWidth,
              scrollWidth: document.documentElement.scrollWidth,
              broken: [...document.images]
                .filter((i) => !i.complete || !i.naturalWidth)
                .map((i) => i.src),
            }));
            assert(info.scrollWidth <= info.width);
            assert.deepEqual(info.broken, []);
            await a11y(page, `${slug}-${width}-${theme}`);
            return info;
          },
        );
        if (width === 1440 || width === 390)
          await shot(page, `${slug}-${width}-${theme}-full`, true);
      }
    }
  }
  await check(
    "reduced motion preserves visible content and stops animations",
    async () => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(base, { waitUntil: "networkidle" });
      const info = await page.evaluate(() => ({
        reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
        scroll: getComputedStyle(document.documentElement).scrollBehavior,
        animations: document
          .getAnimations()
          .filter((a) => a.playState === "running").length,
        hero: getComputedStyle(document.querySelector("h1")).opacity,
      }));
      assert.equal(info.reduced, true);
      assert.equal(info.scroll, "auto");
      assert.equal(info.animations, 0);
      assert.equal(info.hero, "1");
      return info;
    },
  );
  await check(
    "fallback remains readable when a cover image fails",
    async () => {
      await page.route("**/projects/peoplelens/cover.svg", (route) =>
        route.abort(),
      );
      await page.reload({ waitUntil: "networkidle" });
      await settleImages(page);
      const cover = page
        .locator(".recent-project")
        .filter({ hasText: "PeopleLens" })
        .locator(".project-identity");
      await expect(cover).toHaveCount(1);
      assert.match(await cover.innerText(), /PeopleLens/);
    },
  );
  await check("unknown route returns 404", async () => {
    assert.equal(
      (await browserGet(page, `${base}/work/does-not-exist-qa`)).status(),
      404,
    );
  });
  await check("no uncaught application errors", async () => {
    assert.deepEqual(results.errors, []);
  });
  await browser.close();
  fs.writeFileSync(`${dir}/results.json`, JSON.stringify(results, null, 2));
  const failed = results.checks.filter((c) => !c.pass);
  console.log(
    "SUMMARY",
    JSON.stringify({
      passed: results.checks.length - failed.length,
      failed: failed.length,
      axeScans: results.a11y.length,
      projects: total,
    }),
  );
  process.exitCode = failed.length ? 1 : 0;
})().catch((e) => {
  console.error(e);
  fs.writeFileSync(
    `${dir}/results.json`,
    JSON.stringify({ ...results, fatal: e.message }, null, 2),
  );
  process.exitCode = 1;
});
