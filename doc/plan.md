
# Sidekick: Implementation Guide

## 1. The Core Tech Stack

* **Reasoning Engine:** `gemini-3-pro-preview` (specifically utilizing **Thought Signatures** and **Thinking Levels**).
* **Memory Layer:** `mem0` (via the Mem0 API or MCP server).
* **Environment:** Node.js/TypeScript (deployed on **Railway**).
* **Browser Control:** Playwright (for DOM interaction and vision).

---

## 2. Project Structure (The "Architect" View)

Keep your code modular. Judges hate "spaghetti" agents.

```text
sidekick/
├── src/
│   ├── agent/
│   │   ├── orchestrator.ts   <-- The main Observe-Decide-Act loop
│   │   ├── memory.ts         <-- Mem0 integration logic
│   │   └── tools.ts          <-- Browser & DevOps tool definitions
│   ├── browser/
│   │   └── controller.ts     <-- Playwright wrapper
│   └── index.ts              <-- Entry point
├── .env                      <-- GEMINI_API_KEY, MEM0_API_KEY
├── railway.json              <-- Railway config
└── README.md

```

---

## 3. Step 1: Initialize Gemini 3 with "High Thinking"

For the **Architect** track, you need Gemini to reason deeply about code and errors. We use the new `thinking_level` parameter.

```typescript
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-3-pro-preview" 
});

async function getReasoning(prompt: string) {
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      // @ts-ignore - Gemini 3 specific parameter
      thinkingConfig: { thinkingLevel: "high" } 
    }
  });
  return result.response;
}

```

---

## 4. Step 2: The "Subconscious" (Mem0 Memory)

Mem0 is what makes Sidekick "learn." Every time the agent encounters a bug or a user preference, we store it.

```typescript
import { Memory } from "mem0ai";

const memory = new Memory({ apiKey: process.env.MEM0_API_KEY });

export async function rememberAction(userId: string, observation: string) {
  await memory.add(observation, { user_id: userId });
}

export async function getContext(userId: string, query: string) {
  const memories = await memory.search(query, { user_id: userId });
  return memories.map((m: any) => m.memory).join("\n");
}

```

---

## 5. Step 3: The "Self-Healing" Loop

This is the heart of your hackathon entry. It’s a recursive loop where the agent checks its work.

### The Observe-Decide-Act Loop

1. **Observe:** Capture the browser's DOM and Console Logs.
2. **Recall:** Fetch relevant memories from Mem0 (e.g., "User prefers Rust over Go for backend fixes").
3. **Decide:** Ask Gemini 3 to plan the next step.
4. **Act:** Use Playwright to click, type, or refactor.
5. **Reflect:** Check if the action fixed the error. **(Critical for Autonomy score!)**

```typescript
async function autonomousLoop(goal: string) {
  let isFinished = false;
  
  while (!isFinished) {
    // 1. Observe
    const screenshot = await browser.getScreenshot();
    const logs = await browser.getConsoleLogs();
    
    // 2. Recall from Mem0
    const history = await getContext("user_123", goal);
    
    // 3. Decide with Gemini 3 (Vision + Text)
    const response = await model.generateContent([
      goal, 
      { inlineData: { data: screenshot, mimeType: "image/png" } },
      `Logs: ${logs}`,
      `Previous Memory: ${history}`
    ]);

    // 4. Act (using Thought Signatures to ensure continuity)
    const action = parseAction(response.text);
    await executeAction(action);
    
    // 5. Reflect
    isFinished = await verifySuccess(goal);
  }
}

```

---

## 6. Pro-Tip: The "Thought Signature" Advantage

In Gemini 3, if your agent calls a tool (like "Click Button"), it generates a **`thoughtSignature`**. In your next prompt, **send that signature back.**

* **Why?** This keeps the model's internal "train of thought" perfectly consistent across multiple steps.
* **Judging Impact:** This shows you are using the cutting-edge features of the model, maximizing your **Technical Craft** score.

---

