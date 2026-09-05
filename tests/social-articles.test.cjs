// Run: node --test tests/social-articles.test.cjs
// Uses the project's existing TypeScript dependency; no new test framework.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const originalLoader = require.extensions[".ts"];
require.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filename,
  });
  module._compile(outputText, filename);
};
const { createArticleManifest } = require("../lib/social/article-manifest.ts");
const handler = require("../pages/api/social/articles.ts").default;
const { getAllPosts } = require("../data/blogPosts.ts");
if (originalLoader) require.extensions[".ts"] = originalLoader;
else delete require.extensions[".ts"];
const article = (slug, date = "2026-09-06") => ({
  slug,
  date,
  title: "Article title",
  description: "Public excerpt",
  contentHtml: "<p>Do not expose full content</p>",
});

test("manifest has stable IDs, canonical URLs, and only public metadata", () => {
  const manifest = createArticleManifest([article("hello-world")]);
  assert.equal(manifest.version, 1);
  assert.deepEqual(manifest.articles[0], {
    id: "nandann:hello-world",
    url: "https://nandann.com/blog/hello-world",
    title: "Article title",
    excerpt: "Public excerpt",
    publishedAt: "2026-09-06T00:00:00.000Z",
  });
});
test("orders a batch oldest first and breaks ties deterministically", () => {
  assert.deepEqual(
    createArticleManifest([
      article("b"),
      article("a"),
      article("old", "2026-09-05"),
    ]).articles.map((a) => a.id),
    ["nandann:old", "nandann:a", "nandann:b"],
  );
});
test("rejects duplicate slugs and invalid dates", () => {
  assert.throws(() =>
    createArticleManifest([article("same"), article("same")]),
  );
  assert.throws(() => createArticleManifest([article("bad", "invalid")]));
});
test("the deployed blog index produces a valid manifest", () => {
  const posts = getAllPosts();
  const manifest = createArticleManifest(posts);
  assert.equal(manifest.articles.length, posts.length);
  assert.ok(posts.length > 0);
  for (const a of manifest.articles) {
    assert.ok(a.title.length <= 300);
    assert.ok(a.excerpt.length <= 5000);
    assert.ok(a.url.startsWith("https://nandann.com/blog/"));
  }
});
test("API permits GET, rejects writes, and disables caching", () => {
  const response = () => ({
    headers: {},
    statusCode: 0,
    body: undefined,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  });
  const get = response();
  handler({ method: "GET" }, get);
  assert.equal(get.statusCode, 200);
  assert.equal(get.headers["Cache-Control"], "no-store");
  assert.equal(get.body.version, 1);
  const post = response();
  handler({ method: "POST" }, post);
  assert.equal(post.statusCode, 405);
  assert.equal(post.headers.Allow, "GET");
});
