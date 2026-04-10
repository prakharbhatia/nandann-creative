# Automating Tech Blog Content: The Practical Architecture

You want an AI system that researches, plans, writes, and reviews tech blogs every day. You want to cover programming updates, AI, Agentic AI, Voice AI, Salesforce, Python, Rust, and Next.js.

This is entirely doable. But most people build it wrong. 

They write one massive prompt, feed it to an LLM, and end up with generic garbage. The secret isn't better prompting. The secret is architecture. You need isolated agents doing specific jobs.

Here are four ways to build this pipeline. No affiliate links. Just raw, working architectures based on what actually ships to production today.

## The Core Pipeline

Before picking the tools, understand the non-negotiable pipeline. If you merge these steps, the output degrades instantly.

1. **Discovery Engine**: Runs daily. Scrapes HackerNews, Reddit, or specific RSS feeds. Picks three trending topics.
2. **The Architect**: Takes a topic and returns a strict, bulleted outline. Nothing else.
3. **The Writer**: Takes the outline. Writes the draft. It is strictly instructed to avoid buzzwords.
4. **The Editor (QA)**: Reads the draft. Looks for fluff, hallucinated APIs, or marketing speak. If it fails, it sends it back to the Writer.

## Option 1: The Modern Orchestrator (n8n + Claude 3.5 + Exa)

This is the sweet spot for control and speed. You don't need to write custom Python state machines.

**How it works:**
You run a daily cron job via n8n (an open-source workflow tool). The first node hits the Exa API (formerly Metaphor) or Tavily. These are neural search engines built for AI. They don't just return links; they return clean content.

The data passes to Claude 3.5 Sonnet. Claude is currently much better at writing code and adhering to strict tone guidelines than GPT-4o. You define a multi-step workflow in n8n where different Claude prompts handle planning, drafting, and QA. 

**Cost:** Low. You pay wholesale API prices.
**Pros:** Easy to visualize and fix when a step breaks.
**Cons:** n8n can get messy if your workflow branches too much.

## Option 2: The Code-First Agent State Machine (LangGraph + Python)

If you are a developer, this is the most reliable option for production.

**How it works:**
You build a strict state machine using Python and LangGraph. You define nodes: `researcher_node`, `planner_node`, `writer_node`, and `qa_node`. 

The system loops. The QA node acts as a gatekeeper. If the Writer node outputs the word "leverage", the QA node catches it. It flags the error and forces the Writer node to run again. This prevents bad output from ever hitting your CMS.

**Cost:** Medium. Requires hosting a Python server or serverless functions.
**Pros:** Highly reliable. You control the exact state and retry logic.
**Cons:** Steep learning curve if you haven't used LangGraph.

## Option 3: The High-Level Roleplay Framework (CrewAI)

This is the easiest to set up, but the hardest to keep consistent.

**How it works:**
You use a Python framework like CrewAI and literally define job descriptions. 
You create an "Aggressive Tech Editor" agent. You create a "Senior Rust Developer" agent. You tell them to work together to produce a post.

You use OpenAI's API. The agents talk to each other in the background. The Developer writes. The Editor criticizes. They iterate until the Editor is satisfied.

**Cost:** Can spike. Agents talking to agents burns through API tokens fast.
**Pros:** Setup takes an hour.
**Cons:** It's a black box. Sometimes the agents get stuck in an endless loop agreeing with each other.

## Option 4: The Completely Open-Source Local Stack (Ollama + Llama 3)

You want zero API costs and full data privacy.

**How it works:**
You run Ollama locally on a Mac Studio or rent a bare-metal GPU server. You pull Llama 3 (70B if your hardware can handle it, 8B if not).

Your script uses SearXNG (an open-source meta-search engine) to find trends without getting IP banned by Google. You pass the search results to your local Llama 3 instance to outline and write.

**Cost:** High upfront (hardware) or monthly (GPU rental), but zero per-token cost.
**Pros:** You own the entire pipeline. Perfect privacy.
**Cons:** Open-source models currently trail Claude 3.5 and GPT-4o in following strict, multi-step tone constraints. Expect more manual editing.

## The Golden Rules for AI Writing 

Whichever option you choose, the models will default to corporate speak. You have to beat it out of them in the system prompt.

**Enforce tone aggressively.** Tell the AI: "Use short sentences. Avoid words like 'leverage', 'cutting-edge', or 'paradigm'. Do not write marketing copy. Sound like an engineer who has seen real production incidents."

**Ban long paragraphs.** Set a hard constraint: "No paragraph may exceed 4 lines." If it violates this, the QA agent rejects it.

**Force genuine comparisons.** Instruct the planner agent to explicitly note the downsides of a technology. If the post is about Next.js, the agent must highlight server costs or caching issues. Do not let it act like a salesperson.

**No affiliate links.** Hardcode a rule that it cannot generate promotional links. Genuine reviews only.

Pick Option 1 (n8n + Claude + Exa) to start. It will prove the concept in a weekend. Once you hit its limits, rewrite it in LangGraph (Option 2).
