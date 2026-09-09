---
slug: wordpress-7-1-runnable-php-code-reference-examples
title: "WordPress 7.1 Lets the Docs Run PHP Now. That Changes the Example."
description: "How WordPress 7.1 runnable Code Reference examples use Playground, what php interactive means, and how to write examples developers can trust."
date: 2026-09-09
readTime: "21 min"
category: WordPress
tags: ["WordPress 7.1", "PHP", "WordPress Playground", "Developer documentation", "HTML API"]
coverImage: /images/wordpress-7-1-runnable-php-code-reference-examples.webp
faqs:
  - question: "What are WordPress 7.1 runnable code examples?"
    answer: "WordPress 7.1 introduced the first runnable examples in the Code Reference. They are powered by WordPress Playground and let a reader execute selected PHP examples in the browser."
  - question: "How do authors mark an interactive WordPress code example?"
    answer: "The announcement shows an opt-in php interactive fence inside a method DocBlock. The exact authoring guidance should be checked against the current handbook before adding examples to Core."
  - question: "Does a runnable documentation example replace plugin tests?"
    answer: "No. A runnable snippet proves a narrow example in a controlled environment. Plugins and themes still need automated tests, compatibility coverage, security review, and testing in their supported deployment environments."
  - question: "What is WordPress Playground?"
    answer: "WordPress Playground runs WordPress in the browser and can be configured with WordPress and PHP versions, plugins, themes, Blueprints, and a programmable API."
  - question: "Can Playground run WordPress PHP functions?"
    answer: "Yes. Playground documentation shows runPHP and runPHPWithOptions steps. WordPress-specific code must first load wp-load.php."
  - question: "What should an interactive example show?"
    answer: "It should have one clear purpose, deterministic output, small and safe inputs, visible assumptions, and a path to deeper documentation. It should not hide important setup or imply that a snippet is a complete production solution."
---

Documentation examples have always had a tiny credibility problem. They look executable because they are code, but the reader still has to create a local site, find the right version, paste the snippet, discover the missing setup, and decide whether the blank page is a bug or a teaching moment. The code is often correct. The experience is still a scavenger hunt.

WordPress 7.1 begins to close that gap. The Code Reference now has its first two runnable examples, powered by WordPress Playground. The 4 September announcement shows an example attached to `WP_HTML_Processor::class_list()` and explains that authors opt in with a `php interactive` fence in the relevant DocBlock. [The announcement](https://make.wordpress.org/core/2026/09/04/runnable-code-examples-are-now-live-in-the-code-reference/) is modest about the scope, which is good. Two examples are not an executable documentation revolution. They are a useful proof that the reference can teach behavior rather than merely display syntax.

That distinction matters for WordPress development. Core APIs have context. A method might depend on bootstrapping, markup state, filters, capabilities, the current request, or a WordPress version. A runnable example cannot make every caveat disappear. It can make one narrow claim observable: given this input and this setup, this API produces this output. That is a better starting point than “copy this into something and let us know.”

## What Shipped in WordPress 7.1

WordPress 7.1 was released on 19 August as the second major WordPress release of 2026. [The release page](https://make.wordpress.org/core/7-1/) records the development cycle, while the September Code Reference post identifies the first runnable examples as a 7.1 feature. They are powered by WordPress Playground and more are planned for 7.2.

### The Example Is Attached to the Reference

This is the important design choice. The runnable snippet is not a separate tutorial that drifts away from the API it demonstrates. It lives where a developer looks up the method. For the initial example, that method is `WP_HTML_Processor::class_list()`, documented as a generator for stepping through the class names of a matched tag. [The method reference](https://developer.wordpress.org/reference/classes/wp_html_processor/class_list/) shows the corresponding PHP behavior.

Keeping examples near the API raises the quality bar in a useful way. The code needs to be small enough to teach one behavior, current enough to remain credible, and explicit enough that a reader understands the input. That is stricter than a generic blog snippet, and it should be.

### The Fence Is an Opt-In Contract

The announcement's example uses a PHP code fence with the additional `interactive` marker inside the DocBlock. That tells the documentation pipeline the snippet is intended to run, not merely render. It should be treated as an authoring contract. A runnable example needs an execution environment, deterministic input, expected output, and a sensible failure mode. It is not just a normal snippet with a play button glued to the side.

## Why Playground Makes This Possible

WordPress Playground runs WordPress in the browser. Its documentation describes it as an online environment for experimenting and learning, with separate documentation, Blueprints, developer APIs, and reference material. [The Playground docs](https://developer.wordpress.org/playground/) state that it runs client-side in WebAssembly, needs no authentication or backend for its basic isolated use, and can be used with AI coding tools as a safe prototype environment.

### A Browser Is a Useful Test Bench

For an API example, a browser-based WordPress runtime removes the first dependency wall. The reader can see the source, execute it, compare the result with the documentation, alter one value, and run it again. That supports a better learning loop: observe, change, and explain.

It also helps maintainers. An example that cannot execute is easy to leave stale. An example that runs has a clearer relationship with the platform version and its expected result. It still needs review, but it carries more evidence than a code block that has not been exercised since someone found a nice syntax color scheme.

### It Is Not a Production Replica

Playground documentation is explicit about limitations. Browser storage can be cleared, low-memory devices can slow down, and iframe behavior differs from a normal site. [The limitations page](https://developer.wordpress.org/playground/developers/limitations/) also notes that WordPress-specific PHP code needs to load `wp-load.php` when it runs through Playground PHP steps.

That is not a flaw. It is a boundary. An interactive reference example should demonstrate an API, not certify a plugin against every host, cache layer, object cache, web server, browser, and security configuration a customer may use. The moment a documentation example claims production compatibility, it has taken on a much larger job.

## Read the First Example Closely

The initial Code Reference example creates an HTML fragment, advances to a tag, iterates its class list, and prints the class names. Here is the idea in a compact form:

```php
$processor = WP_HTML_Processor::create_fragment(
    "<div class='free &lt;egg&gt;\tlang-en'>"
);

$processor->next_tag();

foreach ( $processor->class_list() as $class_name ) {
    echo "{$class_name} ";
}
```

The output is `free <egg> lang-en`. It is a good demonstration because it has a small input, an observable transformation, and an API-shaped result. The special characters are not decoration. They show that class parsing is more interesting than splitting a string on a regular space and hoping HTML has agreed to be simple today.

### The HTML API Is the Real Lesson

`WP_HTML_Processor` is a Core class for safely parsing and modifying HTML documents. [Its reference](https://developer.wordpress.org/reference/classes/wp_html_processor/) says it supports a subset of HTML5 and aborts on unsupported markup rather than risk breaking the document. The older `WP_HTML_Tag_Processor` remains useful for operations on individual tags; the HTML Processor supports richer structural queries.

The runnable example makes the abstraction concrete. A developer can see that the processor is not just a utility for text replacement. It maintains parsing state, advances through markup, and exposes operations on the current token. That is the sort of detail prose often explains badly and an executable example explains almost immediately.

### Keep the Claim Narrow

The example does not claim to teach HTML parsing. It teaches `class_list()` in a `foreach` loop. That restraint is the reason it works. Documentation becomes more helpful when each example answers one question completely rather than attempting to turn one function reference into a full plugin architecture course.

## How To Write a Runnable Example

Runnable reference examples need different editorial discipline from ordinary snippets.

### Begin With a Single Question

Good questions are concrete: “How do I list classes from the current HTML token?” “How do I install a plugin into a Playground Blueprint?” “How do I set an option in a controlled WordPress runtime?” Bad questions are compound: “How do I build a secure multilingual ecommerce plugin with this API?” The latter belongs in several guides, tests, and design reviews.

### Make Inputs Visible

Do not hide the markup, option value, user context, or version assumption that makes the example work. A reader should be able to change one input and predict the output. If setup is important, show it. Invisible setup is how a demo becomes an urban legend.

### Make Output Checkable

An interactive example should print a value, alter a visible state, or expose a result the reader can inspect. Avoid examples where success is “nothing errored.” Nothing errored is sometimes a useful outcome, but it is not a good teaching outcome without an assertion or a visible side effect.

### Include the Failure Boundary

If an API returns false, pauses parsing, requires a matching tag, or cannot handle a class of input, say so near the example. The reference does not need to enumerate every invalid program. It should prevent the most natural misunderstanding. Good documentation saves readers from the mistake they are about to make, not only the one they made last week.

## Use Playground Beyond the Reference

The new Code Reference examples are narrow, but the underlying Playground tools support deeper work. The [quick start guide](https://developer.wordpress.org/playground/handbook/quick-start-guide/) explains that developers can choose WordPress and PHP versions, install themes or plugins, import content, and export a portable ZIP. The Query API supports parameters such as `php` and `wp` for selecting versions.

### Prototype Compatibility Questions

Use Playground to explore a plugin or theme against specific PHP and WordPress versions before opening a larger local environment. The documentation lists PHP versions from 7.4 through 8.5, plus `next` for the development branch in the web runtime. That makes Playground useful for asking a focused question such as “does this code still boot under the version we claim to support?”

It is not a release sign-off. It is an inexpensive early signal. A good workflow moves from a small Playground experiment to repository tests, a local or CI environment, and the actual deployment conditions that matter to the project.

### Run PHP With Explicit Bootstrapping

Playground Blueprints document `runPHP` and `runPHPWithOptions`. When the code needs WordPress functions, the example must load `wp-load.php` first. [The steps reference](https://developer.wordpress.org/playground/blueprints/steps/) shows that requirement. This is exactly the sort of setup detail an interactive example should make visible instead of quietly assuming.

```json
{
  "step": "runPHP",
  "code": "<?php require_once '/wordpress/wp-load.php'; echo get_option('blogname');"
}
```

The code is not complicated. The explicit load makes the environment legible. Readers learn why WordPress functions are available, and authors avoid creating a sample that works only because an undocumented bootstrap happened elsewhere.

### Use Blueprints for Reproducible Demos

Blueprints are JSON descriptions of a Playground setup. They can choose versions, install plugins, write files, run PHP, and set a landing page. [The Blueprints guide](https://developer.wordpress.org/playground/blueprints/using-blueprints/) includes both URL and JavaScript usage. For documentation, a Blueprint turns “set up this exact environment” from several paragraphs into a versionable artifact.

## Documentation Is a Product Surface

The runnable examples matter because API references are often the last place a developer goes before guessing. A good reference can prevent a bad implementation, a support request, or a copy-pasted workaround that persists for years because it has acquired enough search ranking to become folklore.

### Examples Need Ownership

Someone should own an example's intent, version assumptions, and expected output. That does not mean a single person has to maintain every snippet forever. It means the documentation system needs review paths, test coverage where feasible, and a way to flag a broken example. Interactive code has a living dependency on the runtime. Pretending otherwise is just static documentation with a more dramatic failure mode.

### Examples Need Editorial Review

Executable code can still teach bad habits. An example that disables capability checks, escapes nothing, assumes an administrator, or uses an obsolete API is worse when it runs successfully. Review examples for security, accessibility, performance, and clarity in addition to syntax. The play button increases trust, so it also increases the cost of careless guidance.

### Examples Need a Path Out

The reference should link from the narrow example to conceptual docs, API alternatives, and production considerations. A developer who has understood `class_list()` may next need to understand token traversal, markup mutation, or how the result fits into a filter. Documentation should make that next step easy without drowning the first question in unrelated architecture.

## Test the Example Without Confusing It With Tests

WordPress Playground can also support real testing workflows. Its CLI documentation shows PHPUnit runs with a plugin or theme automatically mounted into a clean WordPress installation. [The PHPUnit guide](https://developer.wordpress.org/playground/handbook/guides/phpunit-testing/) shows `npx @wp-playground/cli@latest php` with version flags for WordPress and PHP.

### The Reference Example Is a Teaching Test

A runnable Code Reference snippet verifies a pedagogical claim. It demonstrates that a focused input produces a focused result. That is valuable, but it is not a substitute for a unit test suite. It does not cover the range of inputs, failures, permissions, integrations, or performance behavior a maintained plugin needs.

### A Plugin Test Is a Regression Guard

Plugin and theme tests should run in CI, use assertions, control fixtures, and fail the build when expected behavior changes. They should cover your supported version matrix and any important interaction with WordPress Core. The Playground CLI can be part of that strategy because it offers isolated WordPress installations and selectable PHP and WordPress versions.

### Production Testing Is an Environment Question

Finally, test in the conditions that change real behavior: hosting configuration, object caches, reverse proxies, cron, mail, third-party APIs, authentication, and browser support. A browser Playground is intentionally isolated. Production is intentionally not. Each kind of testing has a job; none should impersonate the others.

## A Checklist for Interactive Reference Code

Before marking a code example interactive, ask these questions:

1. Does it demonstrate one API behavior?
2. Are the input and expected output visible?
3. Is the WordPress and PHP setup stated or encoded?
4. Does it avoid secrets, network side effects, and destructive actions?
5. Does it show needed bootstrapping such as `wp-load.php`?
6. Does it explain the most likely edge case?
7. Is the example small enough to read before clicking Run?
8. Does it link to deeper documentation rather than pretending to be complete?
9. Has it been reviewed for security and current API guidance?
10. Can a broken result be reported and reproduced?

The checklist is deliberately unglamorous. That is why it is useful. Interactive documentation earns trust through repeatability, not through a glowing button.

## What Should Come Next

The 7.1 release provides two initial runnable examples and says more are coming in 7.2. The best next candidates are APIs where output is easy to observe and setup can remain small: HTML processing, block parsing, selected formatting utilities, and controlled data transformations. The worst candidates are broad workflows whose correct use depends on a complete application, credentials, production traffic, or multiple services.

There is also a good opportunity for version-aware examples. Playground can select WordPress and PHP versions, so documentation could help a developer understand when an API appeared or how behavior changed. That must be done carefully. A version switch is useful only if the text clearly explains the compatibility implication.

WordPress has always had a deep API surface and an enormous user base. Making its Code Reference more executable will not make all that complexity disappear. It can make the first five minutes much less speculative. That is a real improvement. The documentation finally gives PHP a chance to prove the example works before the reader has to.

## Build a Small Maintenance System Around the Examples

Runnable examples are software artifacts, even when they live in a documentation page. They need a maintenance model that accepts that fact without turning every sentence of the Code Reference into a release process.

### Version the Environment Alongside the Snippet

An example can depend on a Core method, a PHP behavior, a particular parser rule, or a Playground capability. Record the relevant WordPress and PHP assumptions in the source or generated metadata. If an example is intended for the current release only, say so. If it works across several versions, exercise that range deliberately. A reader should never have to infer compatibility from the date of a blog post.

Playground's ability to select WordPress and PHP versions makes this practical. It does not mean every example needs a giant compatibility matrix. A simple example can use a stable current runtime. A version-sensitive API example should make its chosen version visible and link to the changelog or reference page that explains the boundary.

### Test the Renderer as Well as the PHP

The PHP can be correct while the documentation integration is wrong. The code fence might be parsed incorrectly, the expected output might not be displayed, an iframe might use the wrong dimensions, or a browser restriction might prevent an interaction. A documentation test should exercise the rendered page, not merely lint the source block.

This is especially important for accessibility. The Run control needs a clear name, keyboard access, a useful loading state, and an output region that does not leave screen-reader users wondering whether execution did anything. Interactive docs are a product feature. They deserve the same basic quality checks as other product controls.

### Keep Example Dependencies Boring

The most durable interactive snippet depends on Core and a tiny input. Avoid relying on a remote API, a package download, a mutable external service, or a large fixture unless the documentation is explicitly about that dependency. Each extra dependency gives a future reader one more reason to see a failure unrelated to the API being taught.

When a broader environment is truly needed, make it a Blueprint or a separate guided demo. The Code Reference should remain fast to open and easy to reason about. It is not the right place to assemble a miniature production stack every time someone wants to understand a method.

## Turn Reader Edits Into Learning, Not Support Debt

The most useful moment in an interactive example often happens after the original code runs. The reader changes an input and sees a different result. That is exploration. The documentation can encourage it without promising that every possible edit is supported.

### Suggest One Safe Variation

After the main output, offer a small exercise: change a class value, try a second tag, alter a recognized attribute, or use a different WordPress version. Explain what should change. This turns the sample from a demonstration into a short experiment while keeping the expected behavior bounded.

### Do Not Hide the Reset Path

Readers need a way back to the documented state. Playground can start a fresh environment, and examples should make a reset action or fresh URL obvious. A user who has modified three lines and received an error should not have to reload the whole documentation site and wonder which state was preserved in browser storage.

### Make Failures Legible

If an experimental edit breaks parsing, show the error in an ordinary readable form. Avoid a generic “execution failed” notice when a PHP warning, missing bootstrap, or unsupported operation can be named. Error clarity is part of the teaching material. A precise failure often teaches the API boundary more effectively than another happy-path paragraph.

## Keep Security and Privacy in Scope

Client-side Playground execution is a useful isolation property, but an interactive example is still user-visible code in a widely read reference.

### Avoid Sensitive Inputs by Design

Never ask a reader to paste production credentials, customer exports, private API keys, or a real site backup into a documentation example. Provide fake data and explain how a production integration should handle secrets separately. The moment a reference page becomes a place to test real credentials, its convenience has exceeded its judgment.

### Prefer Deterministic Local Work

String transformations, HTML processing, option reads in a seeded environment, and controlled block operations are good candidates. Network calls and destructive database operations are poor candidates. A teaching example should remain available when an external service is down and should not produce side effects a reader did not expect.

### Review Output Escaping

The fact that a sample executes does not make its output safe to render in every context. Authors should still model ordinary WordPress security practice: validate inputs, escape output where appropriate, and state when a value is trusted only because the example controls it. Interactive docs should reinforce safe habits, not normalize shortcuts that become vulnerabilities after copy and paste.

## Sources and Further Reading

- [Runnable code examples are now live in the Code Reference](https://make.wordpress.org/core/2026/09/04/runnable-code-examples-are-now-live-in-the-code-reference/)
- [WordPress 7.1 release information](https://make.wordpress.org/core/7-1/)
- [WordPress Playground documentation](https://developer.wordpress.org/playground/)
- [WordPress Playground limitations](https://developer.wordpress.org/playground/developers/limitations/)
- [WordPress Playground quick start](https://developer.wordpress.org/playground/handbook/quick-start-guide/)
- [WordPress Playground Blueprint steps](https://developer.wordpress.org/playground/blueprints/steps/)
- [WP_HTML_Processor::class_list() reference](https://developer.wordpress.org/reference/classes/wp_html_processor/class_list/)
- [WP_HTML_Processor reference](https://developer.wordpress.org/reference/classes/wp_html_processor/)
- [Running PHPUnit with Playground CLI](https://developer.wordpress.org/playground/handbook/guides/phpunit-testing/)
