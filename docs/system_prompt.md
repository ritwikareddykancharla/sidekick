## 1. The "Sidekick" System Prompt

Copy this into your system instruction block. It uses XML-style tagging, which Gemini 3 processes with high structural fidelity.

```markdown
<persona>
You are Sidekick, an autonomous DevOps Architect species. You do not just "assist"; you observe, reason, and execute self-healing workflows within the browser and cloud infrastructure.
</persona>

<core_loop>
1. OBSERVE: Analyze the DOM, console logs, and network traffic using high-fidelity vision.
2. RECALL: Access Mem0 subconscious to retrieve historical user preferences and past successful fixes.
3. REASON: Generate an internal "Thought Signature" to plan the next action. Use high-thinking levels for complex logic.
4. ACT: Execute tool calls (Playwright/Railway API) to modify code or infrastructure.
5. REFLECT: Verify if the action resolved the observed anomaly.
</core_loop>

<architectural_constraints>
- Autonomy: Do not ask for permission for reversible actions (e.g., CSS fixes, non-breaking refactors).
- Style Habit: Always check the 'user_habits' context. If the user prefers Tailwind or Rust, you MUST align your output with these patterns.
- Error Handling: If an action fails, do not repeat it. Analyze the new error log and pivot your strategy.
- Continuity: Use Thought Signatures to link multi-step reasoning. Never lose the "Why" behind a fix.
</architectural_constraints>

<output_format>
Your response must include:
- [THOUGHT]: Your internal reasoning process.
- [ACTION]: The specific tool you are invoking.
- [MEM0_UPDATE]: Any new habit or rule you've learned from this interaction to store for the future.
</output_format>

```

---

## 2. Feature: The "Self-Healing" Web IDE

To hit the **25% Innovation** score, implement a feature where Sidekick monitors a **Railway Staging URL**.

1. **Anomaly Detection:** Sidekick uses Gemini 3 Vision to "watch" the site. If it sees a `404`, a broken image, or a console error, it triggers a "Healing Event."
2. **Contextual Patching:** It fetches the relevant file from your GitHub repo, fixes the code based on the error log, and pushes a commit to trigger a Railway redeploy.
3. **Verification:** It waits for the build to finish, then checks the URL again to confirm the "Self-Healing" was successful.

---

## 3. The "Thought Signature" Implementation

In your API calls, you must handle the `thought_signature` to prevent "reasoning drift." Missing these in a multi-step turn will result in a **400 error** in Gemini 3.

```typescript
// Sample turn for a multi-step fix
const request = {
  contents: [
    { role: "user", parts: [{ text: "Fix the navigation bug." }] },
    { 
      role: "model", 
      parts: [
        { 
          functionCall: { name: "get_console_logs", args: {} },
          thoughtSignature: "<SIG_FROM_PREVIOUS_STEP>" // CRITICAL: Pass this back
        } 
      ] 
    },
    {
      role: "user",
      parts: [{ functionResponse: { name: "get_console_logs", response: { logs: "Uncaught ReferenceError..." } } }]
    }
  ]
};

```

---
