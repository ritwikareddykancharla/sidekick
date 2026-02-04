## 1. The Core Reasoning Engine: Gemini 3

Gemini 3 introduced features specifically for the "Invisible Architecture" Vetrox is looking for.

* **Controlled Thinking (`thinking_level`):** For complex debugging, set this to `"high"`. This forces the model to generate an internal chain-of-thought (CoT) before outputting code, significantly reducing hallucinations in DevOps tasks.
* **Thought Signatures:** When Sidekick makes a tool call (e.g., to fix a bug), Gemini 3 generates a `thoughtSignature`. You **must** pass this back in the subsequent API call to maintain "contextual fidelity." This ensures the agent remembers *why* it made a choice across multi-step deployments.
* **Agentic Vision:** Since Sidekick is a browser assistant, use **Media Resolution: High** when sending screenshots of broken UIs. This allows Gemini 3 to perform pixel-perfect OCR and element detection without needing brittle CSS selectors.

---

## 2. The Subconscious: Mem0 Memory Layer

Mem0 is not just a database; it is an **Adaptive Personalization** layer. For Sidekick, you should use the **Hybrid Retrieval** strategy:

| Memory Type | Implementation in Sidekick | Technical Goal |
| --- | --- | --- |
| **Episodic** | Stores the history of a specific debugging session. | Prevents the agent from repeating failed fixes. |
| **Semantic** | Stores user coding standards (e.g., "Always use functional components"). | Ensures "Stylistic Elegance" in generated patches. |
| **Procedural** | Encodes "Habits"—how you prefer to deploy to Railway. | Automates the "Invisible Handshake" between agent and infra. |

---

## 3. High-Performance Agent Patterns

Implement these three patterns to hit the **25% Technical Craft** and **30% Autonomy** pillars:

### A. The Reflection Pattern (Self-Correction)

Never let Sidekick deploy on its first try. Build a **"Critic Agent"** loop where Gemini 3 reviews its own generated code against the console logs before executing the Railway push.

> *“Does this fix actually address the 500 error found in the previous step?”*

### B. Self-Healing DevOps Loop

1. **Monitor:** Use Playwright to "watch" the staging URL on Railway.
2. **Diagnose:** If a crash is detected, ingest the logs and screenshot via Gemini 3.
3. **Heal:** Generate a patch, search Mem0 for previous similar fixes, and apply the update.
4. **Verify:** Re-check the staging URL. If it's still broken, trigger a **Recursive Debug** until it passes.

### C. The "Subconscious" Habit Sync

Use **Mem0 MCP (Model Context Protocol)**. This allows Sidekick to share "learned habits" across different environments (e.g., it learns a preference in the browser and automatically applies it when you use the agent in the terminal).

---

## 4. Technical File: `railway.json`

To prove your "Architect" chops, include a custom configuration to handle the long-running agent processes.

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "sleepApplication": false,
    "restartPolicyType": "ON_FAILURE",
    "healthcheckPath": "/health"
  }
}

```

*Note: Setting `sleepApplication` to `false` is critical for ensuring Sidekick’s background "Observer" loops don't get killed.*

---

Would you like me to generate the **"System Prompt"** that utilizes **Thought Signatures** and **Mem0 Context** to make Sidekick act like a senior DevOps engineer?

[Build an AI Agent with Gemini 3](https://www.youtube.com/watch?v=9EGtawwvlNs)

This video provides a practical walkthrough on setting up Gemini 3 with the Agent Development Kit (ADK), which is perfect for structuring your Sidekick project.
