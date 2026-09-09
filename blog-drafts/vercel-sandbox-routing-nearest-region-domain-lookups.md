---
slug: vercel-sandbox-routing-nearest-region-domain-lookups
title: "Vercel Sandbox Routing Got Faster. Your Agent Still Has Work To Do."
description: "What Vercel Sandbox's regional domain routing changes, what it does not, and how to measure the latency that matters for agent workloads."
date: 2026-09-09
readTime: "22 min"
category: Engineering
tags: ["Vercel", "AI agents", "Edge computing", "Performance", "Developer infrastructure"]
coverImage: /images/vercel-sandbox-routing-nearest-region-domain-lookups.webp
faqs:
  - question: "What changed in Vercel Sandbox routing?"
    answer: "Public domains created with sandbox.domain() are now resolved from region-local replicas instead of one centralized store. Vercel reports that median domain lookup latency fell from 62 ms to 3.4 ms."
  - question: "Does the 18x routing improvement make an agent 18x faster?"
    answer: "No. The figure applies to a domain lookup before a request reaches the Sandbox process. Model inference, cold starts, tool execution, database calls, and response streaming remain separate parts of end-to-end latency."
  - question: "Which workloads benefit most from regional Sandbox domain lookup?"
    answer: "Interactive previews, browser-driven coding agents, remote development environments, and human-in-the-loop approval flows can benefit when users are far from the formerly centralized lookup path."
  - question: "Do applications need code changes for this routing update?"
    answer: "Vercel says the improvement applies automatically to every request to a Sandbox domain. Teams should still measure their own user-facing flows because the routing lookup is only one latency component."
  - question: "What is Vercel Sandbox?"
    answer: "Vercel Sandbox is an ephemeral compute primitive for running untrusted or user-generated code. Each Sandbox runs in a Firecracker microVM with its own filesystem and network."
  - question: "What should teams monitor after adopting Sandbox domains?"
    answer: "Measure lookup time, time to first byte, first streamed token or event, command completion, failure rate, cold-start incidence, and the latency of downstream services. Segment those measurements by user and Sandbox region."
---

Vercel says requests to public domains created by `sandbox.domain()` now resolve from region-local replicas instead of a single centralized store. Its reported median lookup time moved from 62 ms to 3.4 ms. That is a useful infrastructure improvement. It is also exactly the sort of number that can turn a routing-table fix into a fictional 18x speedup for an entire agent.

It is not that. The change is narrower and more interesting: the request reaches the process inside the Sandbox sooner. For an interactive preview, that removes a little dead air before anything meaningful happens. For a browser-driven coding agent, it removes one small wait from a chain already containing model calls, tool execution, package installation, build time, page loads, and occasionally a test suite that has chosen violence.

The useful question is not whether 3.4 ms is good. It plainly is. The useful question is where domain lookup lives in a real agent request, which workloads notice it, and what should be measured before a platform team declares victory. This post uses Vercel's 8 September routing announcement as the starting point, then connects it to the practical details of running isolated, public-facing agent environments.

## The Change Is a Lookup Change

Vercel's announcement is specific. A public domain created through `sandbox.domain()` was previously resolved from a centralized store. It is now resolved from the nearest regional replica. Vercel reports a median lookup reduction from 62 ms to 3.4 ms, with the largest p99 reductions in regions far from the prior store: up to 112x in Sydney and 146x in Cape Town. The update applies automatically and Vercel says it does not change pricing. [That scope matters.](https://vercel.com/changelog/vercel-sandbox-routing-is-now-18x-faster-globally)

### A Domain Lookup Is Not a Request Handler

The lookup answers a routing question: where should traffic for this Sandbox domain go? It is completed before the application process handles the request. It is not the same as a cold start, a TLS handshake, a model response, an npm install, a database query, or a browser paint.

That distinction sounds pedantic until a dashboard combines every stage into one bar named “latency.” It then becomes very difficult to tell whether a 300 ms regression came from routing, a fresh Sandbox, an overloaded provider, a slow application route, or a tool call that tried to index `node_modules` with the enthusiasm of a small mammal.

### Why Region Locality Changes the Tail

The median result is easy to quote. The regional p99 numbers explain why this work exists. A centralized metadata lookup adds more distance for users and workloads far from that control-plane location. A local replica shortens that dependency. The improvement is especially valuable when it removes an avoidable long-distance hop from every first request to an otherwise local execution environment.

This does not guarantee that the Sandbox itself is in the same place as the user. It means the domain-resolution path is no longer needlessly centralized. Treat that as one better segment in the request path, not a magic declaration that every byte in a session is local.

## Why Sandboxes Need Public Domains

Vercel describes Sandbox as ephemeral compute for untrusted or user-generated code, AI agents, code generation, and development experimentation. Each environment is isolated in a Firecracker microVM with its own filesystem and network. [The platform documentation](https://vercel.com/docs/sandbox) also lists Node.js and Python runtimes, SDK and CLI control, snapshotting, and live previews.

### Agent Work Is Often Visible Work

An agent that edits a repository still has to show someone the result. It may start a development server, expose a preview, run an app in a browser, or wait for a human to approve a change. A stable public domain is the bridge between an isolated process and a browser outside that process.

In that workflow, latency before the preview route is reachable is not decorative. It affects the rhythm of review. A user clicks a preview link, waits, notices nothing, clicks again, and now the agent has two identical requests to explain. Tiny delays do not create all bad experiences, but repeated opaque delays are remarkably good at making people distrust a system that is otherwise working.

### Isolation Is Still the Point

It is tempting to make performance the entire story. Sandbox exists first because running generated or untrusted code beside production systems is a bad bargain. The Firecracker microVM boundary, separate filesystem, and separate network are the important architectural properties. Faster public-domain routing improves how an isolated workload is reached. It does not relax the boundary and should not be used as an argument to give an agent broader access.

### A Domain Is an Interface Contract

Once a Sandbox has a public address, it becomes a small service boundary. That means normal service questions apply: What is authenticated? Which headers are accepted? Can a URL be guessed? How long does it remain valid? What happens when the Sandbox is recycled? Where are logs recorded? The routing announcement does not answer those questions, and it should not. Teams still need a deliberate domain lifecycle.

## Draw the Full Latency Budget

The simplest way to avoid exaggerated claims is to put each wait on paper. A browser request to an agent preview might look like this:

```text
Browser navigation
  -> DNS and connection setup
  -> Sandbox domain lookup
  -> request reaches the Sandbox process
  -> app-server work
  -> database, package registry, or model/tool calls
  -> first byte or first streamed event
  -> browser render
```

The routing change improves the third line. It may make the entire sequence feel better, especially when the rest is already efficient. It cannot make a five-second build a 270 ms build. No responsible performance review should pretend otherwise.

### Measure First Useful Output

For an agent, “response complete” is often the wrong user metric. The first useful output could be a preview page, a streamed status update, a screenshot, a file diff, or a test result. Record the time to that event. If the workflow streams progress immediately and completes later, the user may perceive it as responsive even when total work takes minutes.

### Separate Warm and Fresh Environments

Vercel documents snapshotting as a way to save the state of a running Sandbox and resume it later, potentially avoiding repeated dependency installation. That is a different performance lever from domain lookup. A routing benchmark should state whether environments were newly created, restored from snapshots, or already warm. Otherwise the numbers are accurate but unhelpful.

### Keep the Units Honest

Use milliseconds for lookup and network stages. Use seconds for build and command stages. Use request counts and error rates for reliability. A single “agent speed” score hides the decision someone needs to make. A small table is more honest:

| Stage | Example metric | Why it exists |
| --- | --- | --- |
| Domain path | lookup latency | Detects control-plane distance |
| Runtime | time to first byte | Detects process or application delay |
| Agent feedback | first status event | Represents perceived responsiveness |
| Tool work | command completion | Finds slow builds and tests |
| Reliability | errors by region | Catches a fast but broken path |

## A Practical Sandbox Preview Pattern

The exact SDK surface evolves, so confirm the current `@vercel/sandbox` API before copying code into production. The pattern is stable: create an isolated environment, start the preview process, obtain a public domain, and record enough context to join browser events to Sandbox logs.

```ts
import { Sandbox } from "@vercel/sandbox";

const sandbox = await Sandbox.create({
  runtime: "node24",
});

await sandbox.runCommand({
  cmd: "npm",
  args: ["run", "dev", "--", "--host", "0.0.0.0"],
});

// Check the current SDK reference for the exact domain API and port options.
const preview = await sandbox.domain({ port: 3000 });
console.info({ sandboxId: sandbox.id, preview });
```

### Keep a Correlation ID From Click to Command

Attach one request or session ID to the preview URL, the agent job, the Sandbox ID, application logs, and any downstream model request. A routing improvement is difficult to validate when telemetry ends at the load balancer and tool logs begin in a separate universe with a different clock.

### Start With a Narrow Exposure Model

Use preview domains for the people and systems that need them. Do not turn every tool process into a permanent public service. Ephemeral domains, short-lived credentials, and explicit teardown make a much cleaner default for agent-created environments.

### Plan for Teardown Before You Plan for Scale

An abandoned Sandbox can become a cost problem, a security problem, or a debugging problem. Record the owner, purpose, creation time, and expiry when it is created. Make teardown idempotent. If the agent retries, it should not leave a small museum of old preview environments behind it.

## Where the Faster Route Helps Most

The benefit grows when the route lookup is on an interaction path and the user is distant from the former centralized lookup location. Four common cases are worth separating.

### Browser-Based Coding Agents

An agent changes code, launches a development server, and opens a preview. The human evaluates UI behavior in a browser and sends a new instruction. The faster route helps each preview navigation reach the environment sooner. The larger wins may still come from caching dependencies, preserving browser state, and keeping model instructions precise.

### Interactive Code Playgrounds

In a teaching or support tool, a user runs small snippets repeatedly. Each operation is short, so fixed routing overhead becomes more visible. It is reasonable to expect a local lookup improvement to matter more here than in a ten-minute batch migration.

### Human Approval Gates

Many good agent systems pause for a person before a deployment, a destructive command, or a sensitive tool call. A preview link at that point is part of the approval interface. Fast availability encourages actual review. Slow availability encourages people to approve based on a summary, which is precisely how “looks fine” becomes an incident report.

### Durable Backends

If a Sandbox is primarily a worker behind a queue, no person is waiting on a public domain. The routing update may still reduce a dependency, but it is less likely to change product perception. Focus instead on queue wait, runtime duration, retry behavior, and downstream capacity.

## The Routing Update Does Not Solve These Problems

Infrastructure releases are easier to use when their boundary is explicit. This one does not solve model choice, prompt quality, access control, cost attribution, or application performance.

### It Does Not Make Untrusted Code Safe by Itself

Sandbox isolation is a useful control. It is not a replacement for authentication, authorization, dependency hygiene, output validation, secret scoping, or a review process. A public preview that exposes a real customer database is still a bad design, even if it resolves in 3.4 ms.

### It Does Not Erase Cold Starts

Vercel documents fast Sandbox startup and snapshotting, but workload startup still includes your own process, dependencies, and initialization. Measure them independently. If package installation dominates, regional domain replicas are not the next optimization.

### It Does Not Make Every Region Equivalent

Nearby lookup metadata helps traffic begin the right trip. Your model provider, database, artifact registry, and third-party APIs may still be elsewhere. A request can start locally and then immediately travel around the world for a dependency. The next bottleneck is often not glamorous, but it is usually measurable.

## A Small Benchmark Plan That Won't Lie

Run a controlled test before and after an application change, then keep Vercel's platform change as context rather than proof of your own result.

### Pick Real Scenarios

Test a simple health endpoint, a warm preview navigation, a fresh preview navigation, a route that calls a database, and one full agent task. Those five scenarios isolate progressively more of the stack. Do not benchmark only a health check and call it an agent result.

### Sample From Relevant Locations

Vercel called out Sydney and Cape Town because distance mattered. Run synthetic probes from regions your users occupy. Pair them with real-user monitoring when possible. A global median is comforting but can conceal the exact office, customer, or contractor whose browser keeps waiting.

### Preserve Failure Data

Keep DNS failures, timeout categories, retry counts, and status codes with the latency distribution. A low p50 beside a spiky failure rate is not a successful routing story. It is an attractive graph that needs one more graph.

## Operational Details Worth Keeping

The most durable value from this release is not a benchmark screenshot. It is a cleaner operational model for public agent environments.

### Treat Preview URLs as Observability Entry Points

The URL should lead to enough context to find its Sandbox, deployment revision, agent run, and logs. That reduces the old ritual of asking someone to “send the link again, but the one from the right run.”

### Make Region a First-Class Field

Store user region, Sandbox region, lookup timing, and downstream region where they are available. A future regression will not respect your dashboard's existing dimensions. Capture locality while things are healthy.

### Put a Ceiling on Retry Enthusiasm

Agent runners love retries because they are trying to be helpful. Routing failures, connection failures, and application failures have different causes. Retry each deliberately, add backoff, and stop where a person should be asked. Faster routing should never become an excuse to create faster loops of the same failed request.

## What To Do This Week

If you already use Vercel Sandbox domains, no migration is required for the routing update. Vercel says it is automatic. The practical work is measurement: establish a user-facing latency budget, label warm and fresh runs, compare regions, and find the actual slowest stage in your workflow.

If you are evaluating Sandboxes for agent execution, start from isolation and lifecycle design. Decide what code may run, what it may access, how previews are authenticated, how long environments live, and what evidence a reviewer gets. Then make them fast. The order is less dramatic than a giant throughput claim, but it is how an agent platform becomes useful without becoming alarming.

The routing table has indeed stopped taking the scenic route. It has not removed the rest of the journey. That is good news. The rest of the journey is where the engineering still is.

## How To Review a Sandbox Routing Claim

There is a predictable pattern in infrastructure performance announcements. A component gets faster, the improvement is real, and the number is then used as an adjective for everything nearby. “The agent platform is 18x faster” is more memorable than “one metadata lookup became region local.” It is also not a statement the announcement makes.

### Ask What Is Being Timed

The Vercel number refers to domain lookup latency. That is a clear boundary. When a vendor or an internal team reports a speedup, ask for the start event and end event in ordinary language. Does the clock begin when a browser clicks a link, when an edge receives a request, when a Sandbox is allocated, or when a process starts? Does it end at a routing decision, the first HTTP byte, a rendered page, or a completed task?

None of those choices is inherently wrong. They answer different questions. The problem starts when one answer is silently treated as another. A 3.4 ms lookup can sit inside a two-second preview launch. The lookup may be excellent and the preview may still be too slow. Both things can be true at once, which is inconvenient only for slide titles.

### Ask Which Path Was Previously Remote

Regional replicas help when the original dependency was geographically distant. If a team only tests from one region close to the prior store, it might see a modest change. If it tests from a distant location, the improvement can be dramatic. That is why the announcement's Sydney and Cape Town p99 results are more useful than an unqualified global slogan.

This is also a reminder to avoid treating a cloud region name as a user location. An employee in one country can connect through a corporate network in another. A browser test might originate in a monitoring region that none of your users occupy. Add a region field to your data, but validate that it represents the decision you are making.

### Ask What Gets Better for a Person

For a preview workflow, faster lookup might mean the initial page begins loading sooner. For an approval flow, it might mean a reviewer reaches a screen before their attention moves to the next notification. For an automated queue, it might not change anything a person sees. The best product metric is the one that describes the actual moment of value, not merely the lowest-level timer available.

## A Reference Dashboard for Agent Previews

You do not need an enormous observability program to begin. A few well-named events make a Sandbox workflow much easier to improve.

### Emit Creation and Readiness Events

Record `sandbox_created`, `runtime_ready`, `preview_domain_requested`, `preview_domain_ready`, and `preview_first_request`. Include a run ID and region where the platform exposes one. These events let an operator separate a slow domain path from a slow application boot without reconstructing the timeline from prose in agent logs.

```ts
type PreviewEvent = {
  runId: string;
  sandboxId: string;
  event:
    | "sandbox_created"
    | "runtime_ready"
    | "preview_domain_ready"
    | "preview_first_request";
  at: string;
  region?: string;
};

function emitPreviewEvent(event: PreviewEvent) {
  console.log(JSON.stringify(event));
}
```

This is deliberately boring. Boring events win incidents. A clever tracing system that no one can query at 2 AM is less useful than five structured lines with consistent identifiers.

### Track the Difference Between Availability and Health

A domain can resolve while the application behind it is still compiling, fetching a dependency, or returning a startup error. Make a readiness endpoint tell the truth about the application state. Do not mark a preview “ready” just because a reverse proxy has a destination. A review link that returns an attractive 502 is still not ready, even if the routing chart looks fantastic.

### Keep Application and Platform Ownership Separate

Platform teams own the execution boundary, domain lifecycle, shared metrics, and incident playbooks. Application teams own build size, query behavior, feature flags, and their route handlers. Agent teams own prompt design, tool permissions, retries, and status reporting. All three can affect a preview's time to usefulness. Naming that ownership prevents every slow request becoming a slightly tense group chat.

## Design for a Slow Downstream Dependency

The best use of a faster routing hop is not to hide the remaining waits. It is to make them obvious and manageable.

### Stream a Real Status, Not a Fake Spinner

If an agent is installing dependencies, say that. If it is running tests, say which test phase is in progress. If it is waiting for a model or a queue, say that too. A status stream does not shorten the work, but it changes an opaque pause into an understandable one. It also gives operators a timestamp for every phase.

### Cache Only What You Can Explain

Snapshotting can reduce repeated initialization. Dependency caches can reduce repeated downloads. Both can help interactive workflows. They also create questions about freshness, credentials, and test isolation. Cache an immutable toolchain or dependency layer before caching mutable project state. If a preview behaves differently after a warm restore, the saved seconds will become expensive very quickly.

### Use Timeouts as Product Decisions

Every stage needs a limit: domain availability, server startup, test execution, model tool call, and browser navigation. A timeout should lead somewhere useful, such as a retry with a new environment, a diagnostic bundle, or a request for human input. It should not lead to an agent silently continuing for an hour because no one specified an alternative.

## Sources and Further Reading

- [Vercel Sandbox routing is now 18x faster globally](https://vercel.com/changelog/vercel-sandbox-routing-is-now-18x-faster-globally)
- [Vercel Sandbox documentation](https://vercel.com/docs/sandbox)
- [Vercel Sandbox concepts and SDK](https://vercel.com/docs/sandbox)
- [Vercel Observability Insights](https://vercel.com/docs/observability/insights)
- [Vercel Sandbox pricing and limits](https://vercel.com/docs/sandbox)
- [Vercel Sandbox authentication](https://vercel.com/docs/sandbox)
