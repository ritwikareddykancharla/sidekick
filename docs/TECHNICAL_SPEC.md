# ⚙️ Technical Implementation Spec: The Backend Flow

This document details the precise data flow and API interactions that occur when a user queries Sidekick.

## 🔄 The Interaction Loop: A Deep Dive

### Phase 1: Context Ingress (Client-Side)
**Trigger**: User opens Side Panel or clicks "Refresh Context".

1.  **Side Panel (SP)** sends message `GET_CONTEXT` to **Content Script (CS)**.
2.  **CS** logic (`entrypoints/content.ts`):
    ```typescript
    // Simplified Logic
    const selection = window.getSelection()?.toString();
    const url = window.location.href;
    const domSignal = document.title; // simplified
    return { type: 'CONTEXT_rESPONSE', selection, url, domSignal };
    ```
3.  **SP** receives payload and stores it in React State (`useContext`).

### Phase 2: Memory Retrieval (Mem0)
**Trigger**: User sends a prompt (e.g., "Optimize this code").

1.  **SP** calls `utils/mem0.ts`:
    *   **Function**: `mem0.search(userQuery, { user_id: 'local-user', limit: 3 })`
    *   **Video Vectorization**: Mem0 embeds the query.
    *   **Retrieval**: Finds relevant past memories (e.g., "User prefers dark mode css", "User uses PyTorch").
    *   **Output**: `Array<MemoryItem>`

### Phase 3: Prompt Construction (The "Mega-Prompt")
**Location**: `entrypoints/sidepanel/hooks/useGemini.ts`

The prompt sent to Gemini is a concatenation of multiple sources:

```text
[SYSTEM]
You are Sidekick, a helpful coding assistant.
- Adhere to user preferences found in MEMORIES.
- Output MARKDOWN.

[MEMORIES]
- User prefers PyTorch over TensorFlow.
- User likes concise comments.

[CONTEXT]
URL: kaggle.com/competition/ titanic
Code: import pandas as pd...

[USER QUERY]
Optimize this code for memory usage.
```

### Phase 4: Inference (Gemini 3 Flash)
**Location**: `utils/gemini.ts`

1.  **Call**: `model.generateContentStream(megaPrompt)`
2.  **Model**: `gemini-1.5-flash` (or 2.0/3.0 when available).
3.  **Stream Handling**: The React UI updates token-by-token for low latency perception.

### Phase 5: Memory Consolidation (Post-Turn)
**Trigger**: Response completion.

1.  **SP** calls `mem0.add(interaction, { user_id: 'local-user' })`.
    *   **Payload**: The user's query + specific metadata.
    *   **Purpose**: To remember this interaction for the *next* query.

---

## 📡 API Surface

### External APIs
1.  **Google Generative AI**:
    *   Endpoint: `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent`
    *   Auth: `x-goog-api-key` (from `.env`).
2.  **Mem0**:
    *   Endpoint: `POST https://api.mem0.ai/v1/memories`
    *   Auth: `Authorization: Token <key>` (from `.env`).

### Internal Messaging (WXT)
*   `browser.runtime.sendMessage`: Used for async tasks if offloading to Background (optional).
*   `browser.tabs.sendMessage`: Used to command the Content Script to apply mutations.
