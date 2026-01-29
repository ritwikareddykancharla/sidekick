# Feature: Kaggle Competition Companion

**Status:** Proposed
**Created:** 2026-01-30

## 📝 Description
A "Co-Pilot" for Kaggle notebooks that maintains long-term context per competition, locates code cells, acts on them (edit/run), and analyzes execution outputs.

## 🛠 Implementation Details

### 1. Context & Memory (The "Comp-Aware" Brain)
*   **Identification**: Extract Competition ID from URL (`kaggle.com/c/[COMPETITION_ID]` or `kaggle.com/code/[USER]/[NOTEBOOK]`).
*   **Memory Keying**: When storing memories in Mem0, attach `competition_id` as metadata.
    *   *Query*: "What did I try last time?" -> Mem0 searches with filter `{ competition_id: "titanic" }`.
*   **Session Storage**: Chat history for the *current* open tab is stored in `chrome.storage.local` to persist across reloads, but long-term insights go to Mem0.

### 2. DOM Interaction Strategy (The "Kaggle Connector")
Kaggle notebooks (Jupyter) use complex DOM structures (often Monaco Editor capabilities).
*   **Ingress (Reading)**:
    *   Observer active cell focus.
    *   Read content via `innerText` or Monaco API if accessible.
*   **Actuator (Editing)**:
    *   **Locate**: User asks "Change the hyperparam cell". Agent identifies cell containing `xgb.train` or similar keywords.
    *   **Edit**: Replace cell content. *Challenge*: React-controlled inputs. May need `execCommand('insertText')` or simulating paste events.
*   **Execution (Running)**:
    *   Find the "Play" button icon associated with the focused/target cell.
    *   `click()` it programmatically.

### 3. Result Analysis Loop
1.  **Pre-Run**: Agent edits code.
2.  **Action**: Agent clicks "Run".
3.  **Observation**: content script explicitly watches the `.cell-output` div.
    *   Wait for "Busy" indicator (spinner) to vanish.
    *   Capture new text/image in output.
4.  **Inference**: Send output back to Gemini ("The error is X" or "Accuracy is 0.85").

## ⚠️ Challenges & Limitations
*   **Iframe Isolation**: Kaggle kernels run in iframes. Content script needs `all_frames: true` or correct context.
*   **Monaco Editor**: modifying code directly in the DOM is flaky. We might need to inject a script into the page context (`world: MAIN`) to interact with the Monaco global object directly.
*   **HITL Enforcement**: "Run if user asks" -> We will present a "Run Cell" button in the Side Panel, or the User clicks "Approve & Run".

## 📋 Task List
- [ ] **URL Parser**: Extract competition/notebook ID.
- [ ] **Cell Manager**: Class to identify, read, and write to specific cells.
- [ ] **Output Reader**: Observer for cell execution status.
- [ ] **Mem0 Integration**: Add `metadata: { context: "kaggle", resourceId: COMP_ID }`.
