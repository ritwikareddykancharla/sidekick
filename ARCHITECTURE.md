# Architecture Decision Record (ADR): Infrastructure Selection

## Context: The Agentic Lifecycle

Most modern deployment platforms (like Vercel) are optimized for the **Request-Response** cycle. However, an autonomous agent like **Sidekick** operates on a **Reason-Act** cycle. This fundamental difference in workload necessitated a move away from serverless architectures in favor of **Railway’s Containerized Infrastructure.**

## The Decision: Railway over Serverless (Vercel/AWS Lambda)

### 1. Persistent State vs. Ephemeral Functions

* **The Problem:** Serverless functions are stateless and suffer from "Cold Starts." For an agent using **Mem0**, the latency introduced by re-establishing database connections and loading model contexts every few minutes creates a fragmented experience.
* **The Railway Solution:** By deploying as a persistent container, Sidekick maintains a "Warm State." This allows for faster retrieval of long-term memories and maintains a continuous logic stream, which is essential for the "Invisible Architecture" Vetrox demands.

### 2. Overcoming the "Timeout Ceiling"

* **The Problem:** Gemini 3 is capable of deep, recursive reasoning. Complex tasks—such as self-healing a codebase or performing multimodal audits—can frequently exceed the 30-60 second execution limits of standard serverless providers.
* **The Railway Solution:** Railway allows for **long-running processes.** Sidekick can take the time it needs to "think" through a problem without being terminated by the infrastructure. This is the difference between a "toy" that times out and a "species" that completes its mission.

### 3. Native WebSocket Support for Real-Time Autonomy

* **The Problem:** To prove **Autonomy (30%)**, the user needs to see the agent's "stream of consciousness" in real-time. Serverless environments struggle with persistent WebSockets.
* **The Railway Solution:** Railway’s support for traditional server-side environments allows Sidekick to maintain a constant bi-directional socket with the browser. This provides a live, zero-latency feed of the agent’s reasoning steps, proving it is acting independently in the background.

### 4. Co-Location of Memory (The "Canvas" Advantage)

* **The Problem:** High-performance agents require low-latency access to their memory vector stores.
* **The Railway Solution:** Using Railway's "Project Canvas," we co-locate the **Sidekick Engine** with its **Redis/PostgreSQL** memory layer. This reduces network hops to near-zero, ensuring that Sidekick’s "subconscious" (Mem0) is as fast as its "consciousness" (Gemini 3).

## Summary

Choosing Railway was a deliberate move to prioritize **Agent Longevity** over **Frontend Optimization.** It provides the stable, scalable environment required for an agent to move beyond a chatbot and become a truly autonomous software entity.
