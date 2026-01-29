# Feature: PDF DeepLink Advisor

**Status:** Proposed
**Created:** 2026-01-30

## 📝 Description
A specialized mode for reading technical PDFs. It allows the user to select text in a PDF and ask questions, delivering context-aware answers with citations.

## 🛠 Implementation Details

### 1. The "Custom Viewer" Strategy
Chrome's native PDF viewer is restrictive (no content scripts allowed in some contexts). To ensure full control, we will use a **bundled PDF.js viewer**.

*   **Interception**: Key off `.pdf` extensions or MIME types.
*   **Redirection**: `background.ts` intercepts navigation to `*.pdf`.
*   **Action**: Redirects to `ext://entrypoints/pdf/index.html?file=[ORIGINAL_URL]`.

### 2. PDF.js Integration
We will bundle `pdfjs-dist` to render the PDF inside our extension page.
*   **Text Layer**: Must be enabled to allow user selection.
*   **Canvas**: Renders the visual content.

### 3. Context Bridge (Ingress)
*   **Selection Listener**: Listen for `mouseup` events on the PDF text layer.
*   **Coordinate Mapping**: Map the selection to a specific page number and X/Y coordinate (for "DeepLink" citations).
*   **Context Payload**:
    ```json
    {
      "type": "PDF_CONTEXT",
      "text": "The transformer architecture...",
      "page": 4,
      "source": "attention_is_all_you_need.pdf"
    }
    ```

### 4. Comparison Memory
*   When a user highlights a formula/claim, we query Mem0:
    *   "Does this contradict my previous readings?"
    *   "How does this relate to the 'Vesuvius' project?"

## 📋 Task List
- [ ] **PDF.js Setup**: Install `pdfjs-dist` and configure worker.
- [ ] **Viewer Page**: `entrypoints/pdf/index.html`.
- [ ] **Navigation Handler**: Background script logic to capture PDF links (optional, or manual "Open with Sidekick").
- [ ] **Context Extraction**: Logic to scrape selected text from PDF.js layer.
