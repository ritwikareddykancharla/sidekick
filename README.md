# 🚀 Sidekick - AI Browser assistant (v1.0.0)

<div align="center">
  <img src="./sidekick_logo.png" alt="Sidekick Logo" width="200"/>
</div>

**Sidekick** is a cross-browser, context-aware AI assistant built for the 2026 Gemini Hackathon. It leverages **Gemini 3 Flash** and **Mem0** to provide high-fidelity assistance for PDFs, Kaggle coding, and Google Docs while maintaining a strict **Human-in-the-Loop** (HITL) architecture.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Manifest](https://img.shields.io/badge/Manifest-V3-green.svg)]()
[![Memory](https://img.shields.io/badge/Memory-Mem0%20Inside-purple.svg)](https://mem0.ai/)
[![Model](https://img.shields.io/badge/Model-Gemini%203%20Flash-orange.svg)]()

---

## 📑 Core Vision: The Manual-Approval Bridge
Sidekick is built on the principle of **Non-Autonomous Agency**. In regulated environments (Kaggle competitions, academic research, corporate drafting), automated AI actions are a liability. Sidekick acts as a **Staging Layer** that processes data but requires physical user intent to execute changes.

### Key Use-Cases:
* **📊 Kaggle Companion:** Real-time analysis of Python cells and XGBoost/LightGBM hyperparameter optimization without auto-running code.
* **📚 PDF DeepLink:** Extraction of technical insights and citations from localized PDFs using a custom `PDF.js` wrapper.
* **✍️ DocFlow:** Tone-shifting and structural editing for Google Docs via a de-coupled DOM-scraping pipeline.

---

## 🧠 System Architecture

### 1. Long-Term Memory (Mem0 Integration)
Unlike standard assistants, Sidekick uses **Mem0** to maintain a persistent user profile across different web surfaces.
* **Context Sync:** If you define a preference on Kaggle (e.g., "I prefer PyTorch for optimization"), Sidekick retrieves this memory when you open a relevant research PDF.
* **Graph-Based Relations:** Sidekick understands that your "Santa 2025" project is linked to "Linear Programming" memories, proactively surfacing relevant technical snippets.

### 2. The Execution Loop (The "Staging Gate")
1.  **Ingress:** Content script identifies active selection or DOM focus (Monaco Editor / Kix Engine).
2.  **Memory Retrieval:** Mem0 is queried for relevant user history and project-specific constraints.
3.  **Inference:** Gemini 3 Flash processes the prompt with augmented context.
4.  **Staging:** Response is rendered in a secure `chrome.sidePanel`.
5.  **Manual Egress:** The user reviews the output and clicks a physical **"Apply Edit"** button to modify the webpage.

---

## 🛠️ Technical Stack
* **Engine:** Gemini 3 Flash (Google Generative AI SDK)
* **Memory Layer:** Mem0 (Memory-as-a-Service for long-term user context)
* **Framework:** [WXT](https://wxt.dev/) (Web Extension Toolbox) for cross-browser Manifest V3 compatibility.
* **Interface:** Tailwind CSS + Headless UI components for a non-intrusive sidebar.

---

## 📥 Local Development (For Hackathon Judges)

### Prerequisites
* Node.js v20.0+
* Google AI Studio API Key
* Mem0 API Key (Optional for local dev)

### Build Pipeline
```bash
# Clone the repository
git clone [https://github.com/ritwikareddykancharla/sidekick.git](https://github.com/ritwikareddykancharla/sidekick.git)

# Install dependencies
npm install

# Build the cross-browser distribution
npm run build

```

### Loading into Chrome/Edge

1. Navigate to `chrome://extensions/`.
2. Enable **Developer Mode**.
3. Click **Load Unpacked** and select the `.output/chrome-mv3` folder.

---

## 🔒 Security & Licensing

### Apache License 2.0

This client-side browser extension is licensed under the **Apache License 2.0**. This allows for open-source collaboration and transparency during the hackathon.

### ⚠️ Proprietary Intellectual Property Notice

**Copyright © 2026 [Ritwika Kancharla]. All Rights Reserved.** While this extension is open-source, the **Sidekick SaaS Backend**, specialized model fine-tuning weights, and proprietary DOM-mapping algorithms for Google Docs/Kaggle are **Closed-Source**. Commercial use or redistribution of the Sidekick brand and backend services is strictly prohibited without a separate commercial license.

