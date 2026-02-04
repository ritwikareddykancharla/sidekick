# Architecture Decision: Bun as the AI-Native Runtime

## 1. Executive Summary

Sidekick is built on **Bun**, moving away from the legacy Node.js ecosystem. Following Anthropic's acquisition of Bun in late 2025, it has emerged as the definitive runtime for agentic workflows. For a system utilizing **Gemini 3** and **Mem0**, Bun provides the sub-millisecond execution and unified toolchain necessary to achieve "Invisible Architecture."

## 2. Technical Justification

### A. Cold Start & Reasoning Latency

AI agents are only as autonomous as they are responsive.

* **The Problem:** Node.js/V8 has a significant cold-start tax (~150ms) which compounds during the **Recursive Reasoning Loops** required by Gemini 3.
* **The Bun Advantage:** Built on **JavaScriptCore (JSC)**, Bun’s startup time is nearly instant (<10ms). This allows Sidekick to spin up "Observer" processes in the background without perceptible lag, essential for the **Autonomy (30%)** judging pillar.

### B. High-Speed Memory I/O (The Mem0 Synergy)

Sidekick relies on **Mem0** for long-term memory retrieval.

* **Performance:** Bun’s `Bun.file()` and `Bun.write()` APIs are **10x faster** than Node’s `fs` module.
* **Impact:** When Sidekick performs a "Subconscious Recall" before a task, the time spent reading local memory fragments or caching vector results is reduced to near-zero, ensuring the agent's "Thinking" phase isn't bottlenecked by disk I/O.

### C. Native TypeScript & Zero-Transpilation

In the "Architect" track, code cleanliness is paramount (**25% Technical Craft**).

* **The Node Way:** Requires `tsc`, `ts-node`, or `esbuild` configurations, adding "Toolchain Sprawl."
* **The Bun Way:** Sidekick runs `.ts` files natively. This removes hundreds of lines of configuration (Babel, Webpack, etc.), resulting in a "Graceful" and "Scalable" repository structure.

## 3. Future-Proofing: The Anthropic/Agentic Alignment

The 2025 acquisition of Bun by Anthropic has shifted the runtime's roadmap toward **Agentic SDKs**.

* **Native Installer:** Sidekick utilizes Bun's ability to compile into a **single-file binary**. This allows the agent to be deployed across diverse environments (Browser, Terminal, Cloud) with zero external dependencies.
* **Deterministic Execution:** Bun provides a more predictable execution substrate for AI-generated code, which is critical for the "Self-Healing" features of the Sidekick engine.

## 4. Infrastructure Implementation (Railway)

To maximize performance, Sidekick is deployed on **Railway** using the **Railpack** builder, ensuring the agent stays "warm" and responsive.

```json
// railway.json snippet
{
  "build": {
    "builder": "RAILPACK",
    "bunVersion": "latest"
  },
  "deploy": {
    "startCommand": "bun run src/index.ts",
    "restartPolicyType": "ON_FAILURE"
  }
}

```
