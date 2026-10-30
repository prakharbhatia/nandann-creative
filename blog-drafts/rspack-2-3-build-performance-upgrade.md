---
slug: rspack-2-3-build-performance-upgrade
title: "Rspack 2.3 Upgrade: Measure Build Memory and Cache"
description: "Evaluate Rspack 2.3 with repeatable build benchmarks, memory measurements, loader-cache checks, output validation, and a controlled rollout for frontend teams."
date: 2026-10-30
readTime: "20 min"
category: Engineering
tags: [Rspack, JavaScript, Build Tools, Performance, CI/CD]
coverImage: /images/rspack-2-3-build-performance-upgrade.webp
coverImageAlt: "Frontend engineers comparing build charts beside a Rspack 2.3 upgrade panel"
coverImageAspectRatio: "1200/630"
faqs:
  - question: "What changed in Rspack 2.3?"
    answer: "The 29 October 2026 release integrates the SWC Next parser, introduces an experimental cache with per-loader caching, and includes build-memory, optimization, and CSS improvements."
  - question: "Is the new Rspack 2.3 cache enabled by default?"
    answer: "No. The release documentation describes the new cache as experimental and disabled by default. Qualify it separately from the basic version upgrade."
  - question: "Will Rspack 2.3 reduce my build memory by the published percentage?"
    answer: "That is not guaranteed. The published figures describe the Rspack team's benchmark project. Measure your dependency graph, loaders, build modes, and runner limits before changing capacity."
  - question: "Can the new cache make warm builds slower?"
    answer: "Yes. Rspack's release notes report slightly longer warm builds in its new-cache benchmark despite improvements in disk use and cold-build peak memory. Test the workload that dominates your own pipeline."
  - question: "Should I change Node and Rspack in the same benchmark?"
    answer: "Keep the first comparison narrow. Hold Node, the package manager, application code, and runner resources constant while measuring the Rspack change. Test a runtime move as a separate variable."
  - question: "How can I export Rspack build statistics?"
    answer: "The official stats documentation supports rspack build --json stats.json through the Rspack CLI. Confirm the command against the CLI version and build configuration used in your project."
  - question: "What should I test besides build speed?"
    answer: "Check output correctness, dynamic imports, CSS behavior, loader invalidation, cache reuse, source maps, development updates, and the production application. A faster build that serves stale or incorrect output fails the upgrade."
---

Rspack 2.3, released on 29 October 2026, gives frontend teams a reason to revisit build capacity as well as build time. The [official announcement](https://www.rspack.dev/blog/announcing-2-3) introduces the SWC Next parser and an experimental cache, alongside memory and CSS work. Evaluate how those changes behave in your repository and on your actual CI runners.

A build upgrade can affect installation, cache reuse, emitted assets, and development feedback. Treat the version change as a measured experiment. Keep a baseline, change one variable at a time, and verify the output before using a benchmark to justify smaller machines or more concurrent jobs.

This guide was checked on 30 October 2026. Vendor measurements are attributed below. The evaluation plan, sample result format, and acceptance criteria are recommendations for your own testing; they are not benchmarks run by Nandann on a customer application.

## Read The Release Claims At Their Actual Scope

The release integrates SWC Next's parser and adds an experimental cache with loader-level reuse. In the team's reported project, peak build RSS fell from 28.3 GiB to 20.5 GiB. Its separate new-cache benchmark reduced disk use and cold-build peak memory, while warm builds took slightly longer.

### Keep The Benchmark Attached To Its Workload

Those results are evidence that the implementation changed, not a capacity guarantee for every application. A repository dominated by a slow JavaScript loader can respond differently from one dominated by parsing or asset processing. The size of the dependency graph also changes how much work the bundler performs.

Record why the release matters to your team. Perhaps builds approach a memory limit, development servers compete with other work, or CI cache storage is expensive. Pick the constraint you want to improve before selecting the benchmark. Otherwise it is easy to optimize the number that looks best in the release notes while missing the problem that slows your team.

### Separate The Two Upgrade Decisions

First qualify Rspack 2.3 using your existing cache strategy. Then evaluate the new cache in a separate candidate. This preserves a useful comparison when an experimental feature helps one workload but hurts another.

The announcement describes the new cache as disabled by default. Do not assume an installation of 2.3 automatically uses it. Read the [experiments reference](https://www.rspack.dev/config/experiments) alongside the [cache configuration](https://rspack.rs/config/cache), and record which settings were active in each run.

## Establish A Reproducible Baseline

A build comparison needs a known source state and a stable environment. Save the application commit, dependency lockfile, Node version, package-manager version, operating system, architecture, and runner limits. Retain the baseline output until the candidate is accepted.

### Identify The Build You Are Timing

A command named build can include type checking, code generation, linting, uploads, and other tasks around the bundler. Measure the full pipeline for user impact, but also identify the bundler's contribution so that an unrelated network upload does not distort the result.

```bash
node --version
npm --version
npm ls @rspack/core @rspack/cli
```

Use your package manager's equivalent where needed. Inspect the scripts in package.json and document the command actually used. If production builds through Rsbuild or another wrapper, keep that integration in the test rather than replacing it with a bare bundler command that omits important plugins.

### Keep The First Diff Small

Upgrade compatible Rspack packages together according to their supported version relationship, and review the lockfile. Avoid upgrading every loader and framework at the same time. If a dependency change is required, record it as part of the candidate instead of silently treating it as a runtime-free improvement.

Our [Node.js 26 LTS migration guide](/blog/nodejs-26-lts-migration-guide) covers runtime qualification separately. Keeping Node fixed during the first Rspack comparison makes it easier to explain the result. You can test the combined candidate after both individual changes are understood.

## Define Cold, Warm, And Incremental Runs

These words need explicit definitions in your test record. A cold runner with no restored cache is different from a fresh process that reads an existing filesystem cache. A development rebuild after one edit is different again.

### Use A Matrix With Named States

| Scenario | Starting state | What it helps answer |
| --- | --- | --- |
| Cold production build | Fresh workspace and no bundler cache restored | First-run resource and time cost |
| Warm production build | New process with the intended reusable cache | CI reuse value |
| Development startup | Development command from a documented cache state | Time to usable local environment |
| Development edit | Running server and a fixed source edit | Feedback latency and output freshness |
| Configuration change | Existing cache with a relevant config change | Whether invalidation preserves correctness |

Keep package downloads separate when you want to measure the bundler alone. Also measure full job duration when deciding whether the change saves developer time. Both numbers are useful, provided the report says which one it presents.

### Make Cache Preparation Explicit

Create separate disposable workspaces or cache directories for the baseline and candidate. A candidate should not accidentally consume cache state produced by a different tool version unless that compatibility is part of the test. Use the documented configuration paths and the CI cache's real restore behavior.

Avoid broad cleanup commands pointed at an uncertain directory. Name the scratch workspace and cache location, then remove only the test-owned state when a cold run requires it. A reproducible preparation step is safer and easier to review than an instruction to clear everything until the result looks cold.

## Measure Memory Beyond The JavaScript Heap

RSS describes resident memory at the process level. JavaScript heap limits cover only part of a build's memory. Rspack includes native work, and loaders or supporting tools can introduce additional processes. A heap graph alone can therefore miss the reason the operating system kills a job.

### Choose A Measurement Boundary

Use the same boundary for both versions. On Linux, a process measurement can be useful for a simple single-process command, while container or job-level metrics better represent a pipeline with child processes. Record the unit and collection method with every value.

For a Linux runner with GNU time, a basic shell measurement can look like this:

```bash
/usr/bin/time -v npm run build
```

The flags and output differ on other operating systems. Do not compare a Linux maximum-resident-set field directly with a differently defined local metric without checking units and process scope. Keep the operating system's record or CI metric as evidence rather than copying only the lowest number into a slide.

### Observe The Failure Margin

If the runner has a hard memory limit, measure the distance between that limit and representative peaks. A successful run close to the ceiling can still fail when another loader processes an unusually large file or a concurrent job changes the resource pattern.

Retain enough margin for observed variation and normal workload growth. Do not reduce runner size directly from the vendor's percentage. First test the candidate at the proposed limit, including the largest realistic application graph and the pipeline's normal concurrency.

## Enable The Experimental Cache As A Separate Candidate

Use a small configuration change that can be switched independently. The following example shows the settings documented for Rspack 2.3; integrate them with the configuration your application already uses.

```javascript
export default {
  cache: { type: 'persistent' },
  experiments: { newCache: true }
};
```

### Preserve A Stable-Control Candidate

Keep one 2.3 configuration with the current cache and another with the experimental cache. If output changes, compare these before attributing the difference to the parser or the entire release. A separate switch also gives you a smaller recovery action if the experiment fails.

Document where cache state lives, whether CI restores it, and when it is discarded. A persistent cache that never survives the runner has a different economic value from one reused across repeated jobs. Include restore and upload time when calculating the effect on the full build pipeline.

### Test More Than An Unchanged Warm Build

An unchanged second build is the easiest reuse case. Also change a source file, an imported dependency, a loader option, and a relevant configuration file in controlled test runs. Confirm the output reflects each change.

Some cache improvements trade storage or memory for extra bookkeeping. The vendor's warm-build result makes that trade-off explicit. If your workflow mostly runs warm builds with small changes, a cold-build improvement alone may not justify enabling the new implementation yet.

## Validate Loader Caching With Real Inputs

The [loader guide](https://rspack.rs/guide/features/loader) explains the transformation layer, while [module rules](https://rspack.rs/config/module-rules) define which modules reach a loader. Review both when identifying where your build spends time.

### Cache Only Work You Can Invalidate Correctly

A loader's output may depend on more than its input file. Configuration, imported resources, environment-dependent behavior, or external generation steps can matter. Establish those dependencies before declaring the cached result safe to reuse.

For an expensive loader supported by your setup, the release documents loader-level caching with the new cache. A minimal illustrative fragment is:

```javascript
module: {
  rules: [{
    test: /\.[cm]?[jt]sx?$/,
    use: [{ loader: 'babel-loader', cache: true }]
  }]
}
```

Treat that as a fragment, not a complete replacement configuration. Preserve your existing includes, excludes, options, and other transformations. Verify the feature against the exact installed release and wrapper before relying on it in CI.

### Compare A Changed Input With Its Emitted Result

Choose a test source change with an observable output effect. Build once, change the source, build again, and confirm the expected behavior in the produced application. Repeat with a loader configuration change that should alter output.

A stale result can be faster than a correct rebuild. That makes correctness tests essential for caching work. Keep the test simple enough that a reviewer can understand why the output should change, and save the relevant result rather than relying on a visual impression of the build log.

## Check Production Output Before Celebrating Speed

A bundler upgrade changes how source becomes deployable assets. Validate the runtime application, including paths that load after the initial page. A successful compilation tells you that the bundler completed, not that every route, style, and import still behaves as intended.

### Inspect Chunks And Asset References

The [stats reference](https://rspack.rs/config/stats) documents JSON output from the CLI. Where your project uses that CLI directly, capture statistics with:

```bash
npx rspack build --json stats.json
```

Use the locally installed, locked CLI rather than allowing an unpinned download in a measurement job. Compare entrypoints, dynamic chunks, warnings, and asset references. Byte-for-byte identity is not always required, but an unexpected large change needs an explanation before deployment.

### Test Routes That Exercise Different Assets

Open a route with a dynamic import, a view with significant styling, and a flow that requests images or other emitted files. Check the production asset base path and a reload on a nested route. A development server can hide deployment-path problems by serving files differently.

For libraries, test the published package shape and the import forms supported by consumers. Keep the compatibility check close to a real consumer rather than only importing the package from inside its own source tree. That catches missing files or packaging assumptions a repository-local test can overlook.

## Review CSS And Optimization Changes In Context

Rspack's [CSS documentation](https://rspack.rs/guide/languages/css) and [optimization reference](https://rspack.rs/config/optimization) explain the configuration surface. Use those references to inspect behavior your application depends on, especially if it has a customized loader chain or chunking strategy.

### Check Styles At Application Boundaries

Test shared layouts, lazy-loaded components, themes, and responsive states. A stylesheet can be emitted correctly and still load in an unexpected order. Compare a representative set of pages using the same browser, viewport, and content fixture for both candidates.

Include CSS Modules or library styling conventions where used. Review custom workarounds that may have been added for an older bundler version. Remove a workaround only after confirming why it existed and verifying the replacement behavior; the version upgrade alone is not proof that every old setting is obsolete.

### Avoid Tuning Several Optimizations At Once

Keep your current split-chunk and minimization settings for the first comparison. If the new release creates an opportunity to simplify them, run that as a follow-up experiment. Otherwise a bundle-size change can be difficult to attribute to the version, a configuration edit, or a new dependency.

The same discipline applies to source maps. Preserve the production policy and verify the expected debugging workflow. Do not trade away useful error diagnosis simply to obtain a faster number without discussing that cost with the people who support the application.

## Profile Before Rewriting The Configuration

If the first benchmark misses expectations, identify the expensive work. Rspack's [build profiling guide](https://rspack.rs/guide/diagnostics/profile) and [memory diagnostics](https://www.rspack.dev/guide/diagnostics/memory) provide supported starting points. Use a representative test and record whether profiling itself changes the measurement.

### Separate Parsing From Transformation And I/O

An improved parser cannot remove every loader cost. A slow filesystem, remote generation step, or repeated expensive transform may dominate the command. Measure enough of the pipeline to know which operation deserves attention before replacing the build system or increasing parallelism.

For a team considering a move from webpack, use the official [migration guide](https://rspack.rs/guide/migration/webpack). A migration has a larger compatibility scope than a 2.2-to-2.3 update. Keep separate records so that a simple version upgrade is not used as evidence that every webpack plugin will work unchanged.

### Inspect Plugin And Loader Ownership

List custom plugins and loaders, the repository that owns them, and the last release your application uses. A third-party compatibility issue needs a maintainer-supported path or a bounded workaround. An internal tool needs someone who can explain its assumptions and test its output.

If the same diagnostic appears across several applications, improve the shared build package rather than copying unreviewed configuration into every repository. Our [build-graph ownership article](/blog/bazel-build-graph-ownership) discusses the broader maintenance problem: shared tooling still needs explicit responsibility when failures cross team boundaries.

## Turn Measurements Into A Capacity Decision

A lower memory peak can allow more concurrency or a smaller runner, but these are separate operational changes. Test the proposed resource plan rather than multiplying a benchmark percentage by the infrastructure bill. Include the whole job and the workloads that compete for the machine.

### Calculate The Bottleneck You Pay For

If total CI time is dominated by queueing, a small speed improvement inside the bundler may have little visible effect. Lower memory could still help if it permits another safe concurrent build. Conversely, cache upload time can offset faster compilation on a network-constrained runner.

Use a result table that includes build duration, peak memory, cache transfer time, failure count, and application validation. Add sample count and environment information. Leave values blank until measured; a report template should never look like a benchmark that was already performed.

| Candidate | Cold time | Warm time | Peak job memory | Output tests | Decision |
| --- | --- | --- | --- | --- | --- |
| Current baseline | Measure | Measure | Measure | Run | Retain reference |
| 2.3, current cache | Measure | Measure | Measure | Run | Compare |
| 2.3, new cache | Measure | Measure | Measure | Run | Accept or defer separately |

### Account For Developer Workstations

Local development can involve several repositories and services running together. Test the combination people actually use, with permission and a repeatable setup. An isolated production build may not represent a laptop with an editor, browser, application server, and background tools competing for memory.

Ask whether the candidate improves the interruption people notice: startup, the first page request, or feedback after a common edit. Keep anecdotal reports alongside measured runs rather than treating either as a complete answer. A worthwhile upgrade can improve one workflow while leaving another unchanged.

## Roll Out With A Small Recovery Surface

Ship the version upgrade and the cache experiment as independently reversible changes where practical. Preserve the old lockfile and deployable build configuration. If a problem appears, the team should know whether it can disable the experiment or must restore the entire previous toolchain.

### Observe A Real Delivery Cycle

Run the candidate through the normal preview, production build, deployment, and error-diagnosis path. Include a developer change after deployment so that cache invalidation gets exercised beyond the first clean build. Record the artifact and configuration associated with each result.

Set a short owner-reviewed observation period with explicit failure signals. A stale chunk, missing style, or loader exception deserves a concrete report and a bounded rollback decision. Do not normalize new intermittent failures merely because the average build time improved.

### Publish A Decision Others Can Reproduce

Keep the accepted configuration, the benchmark command, the environment, and the reason for accepting or deferring the cache. Note which results came from the vendor and which came from your own runs. That makes the next toolchain update easier to assess.

## Test Cache Invalidation As A Product Requirement

A cache configuration is correct when it reuses valid work and discards work whose inputs changed. Build speed measures only the first half of that contract. Write a short invalidation fixture for the transformations that are expensive or customized in your repository.

### Choose Changes With Observable Consequences

For a source transformation, use a harmless exported value that appears in a test page. Change the value, rebuild using the warm cache, and check the resulting application behavior. Then change a loader option that is supposed to affect output and repeat the check. Keep the fixture under review so that its expected behavior stays understandable.

For a stylesheet transformation, change a class used by a representative component and check the rendered state. For a generated file, identify the generator's input and ensure the build sees the new generated output. A cache test should follow the dependency that matters instead of relying only on timestamps in the build log.

Some transformations depend on external configuration. If your build uses a theme file, localization data, or a compilation target outside the source module, include that input in the test plan. Confirm that the loader and cache integration know when it changes. Do not assume the bundler can infer arbitrary external dependencies from custom code.

Record whether the expected change appears after a warm build and after a clean build. If only the clean build is correct, the candidate has an invalidation problem to investigate. Keep the failing cache state where appropriate for diagnosis, while preventing it from being restored into unrelated production jobs.

### Include A Cross-Branch Reuse Scenario

CI systems often restore caches using keys that span several commits or branches. Test the restore policy you actually use, including whether a feature branch can read a cache created by a base branch. Record the relationship between the lockfile, build configuration, tool version, and cache key.

A very narrow key can eliminate useful reuse, while a broad key can increase the amount of state that needs validation. The right choice depends on the cache implementation and dependency tracking. Use supported settings and avoid treating a cache-key convention from another tool as a guaranteed correctness model for Rspack.

Keep trust boundaries in view. An untrusted pull request should not be able to populate a shared artifact or cache in a way that your deployment process treats as trusted output. Follow the CI provider's cache permissions and your repository's workflow policy. A performance improvement should preserve the existing separation between test work and production publication.

## Compare Developer Feedback With The CI Result

A build tool serves at least two different schedules: a developer waiting after an edit and a delivery pipeline producing a release. Measure both if both matter to the team. A production build with good cache reuse can improve while a development interaction becomes less predictable.

### Use A Repeatable Edit Sequence

Choose a common source edit, a style edit, and a change that affects a shared module. Start each test from the same application state, perform the edit, and record when the updated result becomes usable. Include a check that the visible application really reflects the change.

For a large application, distinguish time to start the server from time to load the first representative route. If work is deferred, a quick startup log may shift the wait to the first interaction. The user-facing measure is when a developer can use the page they came to inspect.

Ask one or two engineers to repeat the normal workflow on a representative workstation and report interruptions. Treat their observations as qualitative evidence. Pair them with the repeatable measurements instead of converting a favorable comment into an invented productivity percentage.

Also test recovery after an error. Introduce an ordinary syntax error in the test fixture, confirm the diagnostic is understandable, then fix it and check that development output recovers. A tool that is fast on successful edits but requires frequent manual restarts can still cost the team time.

### Review The Decision With The People Who Own Failures

The engineer maintaining CI, the frontend team using the development server, and the person handling production errors may value different outcomes. Put their relevant requirements in the acceptance record. This is especially useful when the new cache reduces memory but slightly increases a frequently used warm-build path.

If the stable 2.3 upgrade passes and the experimental cache does not, ship the accepted part and keep the experiment deferred. Record the specific missing result needed to reconsider it. That is a useful decision, and it avoids treating a release as a single all-or-nothing bundle.

Keep a follow-up date for deferred features only when someone owns the work. A configuration comment saying revisit later can remain for years. A small ticket with the measured problem, current limitation, and reproduction gives a maintainer something concrete to evaluate when a later release arrives.

Nandann can help profile a frontend build, review custom loaders, and qualify a Rspack migration against delivery requirements. Send the current build command, tool versions, and the constraint you are hitting through our [contact page](/contact). Start with the workload that is expensive for your team.

## Sources And Benchmark Boundaries

The release facts and published benchmark observations come from the [Rspack 2.3 announcement](https://www.rspack.dev/blog/announcing-2-3). Configuration references include [experiments](https://www.rspack.dev/config/experiments), [cache](https://rspack.rs/config/cache), [module rules](https://rspack.rs/config/module-rules), [loaders](https://rspack.rs/guide/features/loader), [CSS](https://rspack.rs/guide/languages/css), [optimization](https://rspack.rs/config/optimization), and [stats](https://rspack.rs/config/stats). Diagnostic references are [profiling](https://rspack.rs/guide/diagnostics/profile), [memory analysis](https://www.rspack.dev/guide/diagnostics/memory), and [webpack migration](https://rspack.rs/guide/migration/webpack).

These maintained documentation pages were checked on 30 October 2026. The examples are configuration fragments and measurement procedures; they are not a tested application fixture or a promise of the vendor's performance gains on your project.
