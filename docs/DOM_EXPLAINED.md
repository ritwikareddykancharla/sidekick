# 🌐 The DOM & Testing Strategy

## 🧐 What is the DOM?
The **DOM (Document Object Model)** is the programmatic interface for web documents. It represents the page so that programs (like Sidekick) can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages can connect to the page.

For Sidekick, the DOM is our **Input** (reading what the user is doing) and our **Output** (applying changes).

## 🧪 How to Test the DOM?
Testing Chrome Extensions that interact with the DOM is unique because the logic runs inside a host page.

### 1. Manual Testing (Primary for Hackathons)
Because Sidekick uses a "Staging Gate" (Human-in-the-Loop), manual testing is a core part of the workflow.
*   **Procedure**:
    1.  Open a target page (e.g., a Kaggle Notebook).
    2.  Select text or focus an input.
    3.  Open Sidekick Side Panel.
    4.  Verify the "Context" section correctly displays the selected text.
    5.  Ask AI to change it.
    6.  Click "Apply" and verify the DOM updates on the page.

### 2. Automated Unit Tests (Jest + JSDOM)
You can test your *logic* without a real browser using JSDOM, which simulates a browser environment in Node.js.
*   **What to test**: Context extraction logic.
*   **Example**:
    ```typescript
    // parser.test.ts
    document.body.innerHTML = '<div class="code-cell">print("hello")</div>';
    const content = extractKaggleContext();
    expect(content).toBe('print("hello")');
    ```

### 3. End-to-End (E2E) Testing (Puppeteer / Playwright)
This spins up a real Chrome instance with your extension installed.
*   **What to test**: The full flow (Click Button -> Side Panel Opens -> Message Sent).
*   *Note: Setting this up for extensions is complex and may be overkill for a hackathon MVP.*

---

## 🛡️ Sidekick's Specific DOM Strategy
We avoid brittle scraping. Instead of guessing selectors, we rely on **User Intent**:
1.  **Selection API**: `window.getSelection().toString()` (Robust, works everywhere).
2.  **Active Element**: `document.activeElement` (For inputs/textareas).
3.  **Accessibility Tree**: Using ARIA labels where possible.
