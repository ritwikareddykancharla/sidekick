# The Habit Engine: Predictive Autonomy

In a standard AI assistant, the user must repeat their preferences in every session. **Sidekick** breaks this cycle by implementing a "Subconscious Memory Layer" that encodes user behaviors into permanent heuristics.

## 1. How it Works: The "Implicit Learning" Loop

Sidekick does not wait for a user to say "Save this preference." Instead, it uses a **Recursive Observation Loop**:

1. **Detection:** Sidekick observes a user’s manual correction (e.g., the user consistently changes "Double Quotes" to "Single Quotes" in a specific repo).
2. **Analysis (Gemini 3):** The agent identifies this as a "Persistent Stylistic Preference" rather than a one-off event.
3. **Encoding (Mem0):** The preference is stored in Mem0 as a **Habit Metadata** object.
4. **Retrieval:** In all future tasks, Sidekick injects these habits into the system prompt before Gemini 3 reasons about the code.

---

## 2. Implementation: The Logic

### Step A: Capturing the Habit

When Sidekick monitors your browser or terminal, it looks for "Feedback Signals."

```typescript
// Example: Capturing a habit from a user's manual correction
async function onUserCorrection(correction: string) {
  const analysis = await model.generateContent(`
    Analyze this user correction: "${correction}". 
    Is this a general preference I should remember for future tasks? 
    If yes, summarize it into a short rule.
  `);

  // Store in Mem0 subconscious
  await memory.add(analysis.response.text(), { 
    category: "user_habit",
    strength: "increasing" 
  });
}

```

### Step B: The "Silent" Application

Before every action, Sidekick fetches the "Habit Profile" to ensure its plan aligns with the user's natural workflow.

```typescript
const userHabits = await memory.search("coding style preferences", { 
  category: "user_habit" 
});

const systemPrompt = `
  You are Sidekick. You are acting on behalf of the user.
  Apply these learned habits to your current task:
  ${userHabits.map(h => `- ${h.memory}`).join("\n")}
`;

```

---

## 3. Demo Scenario: "The Invisible Handshake"

*For your 3-minute demo video, show this exact sequence:*

* **Minute 1: The Friction.** The user asks Sidekick to "Fix the alignment on this landing page." Sidekick fixes it using a standard CSS Flexbox. The user says, "Actually, I prefer using Tailwind grid for layout fixes."
* **Minute 2: The Learning.** Sidekick replies: *"Understood. I've noted that Tailwind Grid is your preferred layout architecture."* (Behind the scenes, this is pushed to Mem0).
* **Minute 3: The Payoff.** The user asks Sidekick to fix a different page. Without being told, Sidekick automatically uses Tailwind Grid.

**Judge’s Takeaway:** "This agent doesn't just work for the user; it *grows* with the user."

---

## 4. Why This Wins the "Architect" Track

* **Zero-Shot Adaptation:** It reduces "Human-in-the-loop" friction, which is the core of the **Autonomy** score.
* **Technical Elegance:** It shows a sophisticated use of **Long-Term Memory (Mem0)** integrated with **Deep Reasoning (Gemini 3)**.

---

**Would you like me to help you write the code that "watches" for these user corrections so you can film this demo tonight?**
