const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function loadModule(file, imports, env = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  vm.runInNewContext(
    code,
    {
      exports,
      require: (name) => imports[name],
      process: { env },
      console: { error() {} },
    },
    { filename: file },
  );
  return exports;
}
const fallback = loadModule("data/projects.ts", {});
function portfolio(answer, configured = true) {
  return loadModule(
    "lib/portfolio.ts",
    {
      "../data/projects": fallback,
      "@neondatabase/serverless": {
        neon:
          () =>
          async (strings, ...values) =>
            answer(strings.join("?"), values),
      },
    },
    configured ? { DATABASE_URL: "mock://test-only" } : {},
  );
}
function homeQuery(query, { published = [], registered = [] } = {}) {
  if (query.includes("SELECT p.*")) return published;
  if (query.includes("SELECT slug"))
    return registered.map((slug) => ({ slug }));
  return [];
}

test("local development retains the complete code-backed catalog without Neon", async () => {
  const result = await portfolio(() => {
    throw Error("must not query");
  }, false).getPortfolioHomeData();
  assert.equal(result.projects.length, fallback.projects.length);
});
test("Neon title, status and publication take precedence over local content", async () => {
  const result = await portfolio((query) =>
    homeQuery(query, {
      published: [
        {
          slug: "peoplelens",
          title: "Neon title",
          status: "Neon status",
          sort_order: 1,
        },
      ],
      registered: fallback.projects.map((p) => p.slug),
    }),
  ).getPortfolioHomeData();
  assert.equal(result.projects.length, 1);
  assert.equal(result.projects[0].title, "Neon title");
  assert.equal(result.projects[0].status, "Neon status");
});
test("an empty published catalog never resurrects any registered unpublished project", async () => {
  const result = await portfolio((query) =>
    homeQuery(query, { registered: fallback.projects.map((p) => p.slug) }),
  ).getPortfolioHomeData();
  assert.equal(result.projects.length, 0);
});
test("only unregistered code-backed projects supplement a successful Neon response", async () => {
  const result = await portfolio((query) =>
    homeQuery(query, {
      registered: fallback.projects
        .filter((p) => p.slug !== "peoplelens")
        .map((p) => p.slug),
    }),
  ).getPortfolioHomeData();
  assert.deepEqual(
    Array.from(result.projects, (p) => p.slug),
    ["peoplelens"],
  );
});
test("Neon outage withholds projects and credentials instead of publishing fallback", async () => {
  const result = await portfolio(() => {
    throw Error("outage");
  }).getPortfolioHomeData();
  assert.equal(result.projects.length, 0);
  assert.equal(result.certificates.length, 0);
  assert.equal(result.dataUnavailable, true);
});
test("unpublished case studies return no project even with a code fallback", async () => {
  const result = await portfolio(() => [
    { slug: "peoplelens", published: false },
  ]).getPortfolioProject("peoplelens");
  assert.equal(result, undefined);
});
test("case study database failure cannot bypass publication controls", async () => {
  await assert.rejects(
    portfolio(() => {
      throw Error("outage");
    }).getPortfolioProject("peoplelens"),
    /temporarily unavailable/,
  );
});
test("gallery query requires publication and outage returns no fallback images", async () => {
  const api = portfolio((query) => {
    assert.match(query, /p.published = true/);
    throw Error("outage");
  });
  assert.equal((await api.getProjectImages("peoplelens")).length, 0);
});
